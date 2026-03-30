import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Store outside public/ so files are not directly accessible via URL
const UPLOAD_DIR = join(process.cwd(), 'private-uploads', 'health');

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const category = (formData.get('category') as string) || 'general';
    const note = (formData.get('note') as string) || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'File type not allowed. Supported: JPG, PNG, GIF, WebP, PDF, TXT' }, { status: 400 });
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 });
    }

    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filename = `${timestamp}_${category}_${safeName}`;
    const filepath = join(UPLOAD_DIR, filename);

    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    const record = {
      id: timestamp.toString(),
      filename,
      originalName: file.name,
      category,
      note,
      size: file.size,
      type: file.type,
      url: `/api/health/files/${filename}`,
      uploadedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, file: record });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed: ' + error.message }, { status: 500 });
  }
}
