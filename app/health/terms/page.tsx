'use client';

import Link from 'next/link';
import HealthHeader from '@/components/health/HealthHeader';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HealthHeader />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: March 29, 2026</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h2>
            <p>
              By creating an account or using this application ("the App"), you agree to these Terms of Service.
              If you do not agree, do not use the App.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Not a Medical Device — No Medical Advice</h2>
            <p>
              <strong>This App is a personal health record organizer and AI-assisted research tool. It is NOT a medical device, clinical decision support system, or substitute for professional medical advice, diagnosis, or treatment.</strong>
            </p>
            <p className="mt-2">
              Any AI-generated analysis, summaries, or suggestions are provided for informational and organizational purposes only.
              They do not constitute medical advice and should never replace the judgment of a licensed healthcare provider.
              Always consult your physician or qualified health professional for any medical decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">3. User Responsibility for Uploaded Content</h2>
            <p>
              You are solely responsible for all content you upload, enter, or store in the App, including health records,
              images, lab results, notes, and any other personal health information ("Your Data").
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>You represent that you have the legal right to upload and share any content you submit.</li>
              <li>You accept full responsibility for the accuracy, completeness, and appropriateness of Your Data.</li>
              <li>You must not upload content that belongs to another person without their explicit consent.</li>
              <li>You must not upload content that violates any law or third-party rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Health Data and Sensitive Information</h2>
            <p>
              This App allows you to store sensitive personal health information. By using the App you acknowledge:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>No app can guarantee absolute security. You upload and store sensitive data at your own risk.</li>
              <li>You should not upload information you are not comfortable entrusting to a third-party application.</li>
              <li>For information about how we handle your data, see our <Link href="/health/privacy" className="text-blue-600 underline">Privacy Policy</Link>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">5. AI Analysis Disclaimer</h2>
            <p>
              The App uses third-party AI services (including Anthropic Claude) to analyze health data you provide.
              By using the AI analysis features, you understand and agree:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>AI-generated outputs may contain errors, omissions, or outdated information.</li>
              <li>AI analysis is not reviewed or validated by licensed medical professionals.</li>
              <li>Do not make medical decisions based solely on AI-generated content.</li>
              <li>Your data may be transmitted to third-party AI providers to generate responses (see Privacy Policy).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">6. No Emergency Services</h2>
            <p>
              <strong>This App is not designed for medical emergencies.</strong> If you or someone else is experiencing a
              medical emergency, call 911 (or your local emergency number) immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Account Security</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activity
              under your account. Notify us immediately if you suspect unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, the App and its operators shall not be liable for any indirect,
              incidental, special, or consequential damages arising from your use of the App or reliance on any content
              within it. Your use of this App is entirely at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">9. Changes to These Terms</h2>
            <p>
              We may update these Terms at any time. Continued use of the App after changes constitutes acceptance
              of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">10. Contact</h2>
            <p>
              For questions about these Terms, please contact the App administrator.
            </p>
          </section>

        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 flex gap-4 text-sm">
          <Link href="/health/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
          <Link href="/health/dashboard" className="text-gray-500 hover:underline">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
