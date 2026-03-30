'use client';

import Link from 'next/link';
import HealthHeader from '@/components/health/HealthHeader';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HealthHeader />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: March 29, 2026</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Overview</h2>
            <p>
              This Privacy Policy explains how this App collects, uses, stores, and shares information you provide.
              By using the App, you agree to the practices described here.
            </p>
            <p className="mt-2 font-medium text-gray-800">
              This App is a personal health tracking tool. It is not operated by a HIPAA-covered entity (such as a hospital,
              insurer, or healthcare provider). As a result, HIPAA does not directly govern this App. However, we treat
              your health data with the utmost care and implement reasonable safeguards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Account information:</strong> Your name, email address, and encrypted password when you register.
              </li>
              <li>
                <strong>Health data you enter:</strong> Medical events, symptoms, medications, vitals, and notes you
                manually enter into the App.
              </li>
              <li>
                <strong>Uploaded files:</strong> Documents, images, and PDFs you upload (lab results, ECGs, doctor letters, etc.).
              </li>
              <li>
                <strong>Usage data:</strong> Standard server logs including IP addresses, browser type, and pages accessed.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide the App's features (health tracking, AI analysis, document storage).</li>
              <li>To authenticate your account and maintain session security.</li>
              <li>To send health data to AI services (Anthropic Claude API) to generate analysis when you request it.</li>
              <li>We do not sell your data. We do not use your data for advertising.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Third-Party AI Services</h2>
            <p>
              When you use the AI analysis feature, the health data you have entered is transmitted to Anthropic's
              Claude API to generate a response. This data is subject to{' '}
              <a
                href="https://www.anthropic.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Anthropic's Privacy Policy
              </a>
              . Do not submit data to AI analysis that you are not comfortable sharing with a third-party AI provider.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Data Storage and Security</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account credentials are stored in a PostgreSQL database. Passwords are hashed with bcrypt and never stored in plaintext.</li>
              <li>Uploaded files are stored on the application server.</li>
              <li>We implement reasonable technical measures to protect your data, but no system is 100% secure.</li>
              <li>You upload and store sensitive health data at your own risk.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Data Retention</h2>
            <p>
              We retain your account and uploaded data for as long as your account is active. You may request deletion
              of your account and associated data by contacting the App administrator.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Children's Data</h2>
            <p>
              This App may be used by parents and guardians to track health information for minor children. If you are
              entering health data for a minor, you represent that you are the parent or legal guardian of that child
              and have authority to manage their health information in this App.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">8. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access the data associated with your account.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your account and data.</li>
            </ul>
            <p className="mt-2">To exercise these rights, contact the App administrator.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy at any time. Continued use of the App after changes constitutes
              acceptance of the updated Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">10. Contact</h2>
            <p>
              For privacy-related questions or data deletion requests, please contact the App administrator.
            </p>
          </section>

        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 flex gap-4 text-sm">
          <Link href="/health/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
          <Link href="/health/dashboard" className="text-gray-500 hover:underline">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
