import Link from 'next/link';

export default function HealthPage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to Health App</h1>
      <p className="text-xl text-gray-600 mb-8">Manage your health information in one place</p>
      <Link 
        href="/health/dashboard" 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
