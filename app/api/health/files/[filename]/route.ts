import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join, basename } from 'path';
import { existsSync } from 'fs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const UPLOAD_DIR = join(process.cwd(), 'private-uploads', 'health');

export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string } }
) {
  // Require authentication
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Sanitize filename — strip any path traversal attempts
  const filename = basename(params.filename);
  const filepath = join(UPLOAD_DIR, filename);

  // Ensure the resolved path is inside UPLOAD_DIR
  if (!filepath.startsWith(UPLOAD_DIR)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (!existsSync(filepath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const fileBuffer = await readFile(filepath);

  // Derive content type from filename extension
  const ext = filename.split('.').pop()?.toLowerCase();
  const contentTypeMap: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    pdf: 'application/pdf',
    txt: 'text/plain',
  };
  const contentType = (ext && contentTypeMap[ext]) || 'application/octet-stream';

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `inline; filename="${filename}"`,
      'Cache-Control': 'private, no-store',
    },
  });
}
