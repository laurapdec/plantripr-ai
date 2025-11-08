import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-8">
          <Link href="/" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Terms of Service</h1>
          <p className="text-gray-600">Last updated: November 8, 2025</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-8">
          <div className="prose prose-gray max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Plantrip'r AI, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily use Plantrip'r AI for personal, non-commercial transitory viewing only.
            </p>
            
            <h2>3. User Account</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.
            </p>
            
            <h2>4. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service.
            </p>
            
            <h2>5. Prohibited Uses</h2>
            <p>
              You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts.
            </p>
            
            <h2>6. Content</h2>
            <p>
              Our service allows you to create, upload, and share content. You retain ownership of any intellectual property rights that you hold in that content.
            </p>
            
            <h2>7. Limitation of Liability</h2>
            <p>
              In no event shall Plantrip'r AI be liable for any indirect, incidental, special, consequential, or punitive damages.
            </p>
            
            <h2>8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any material changes.
            </p>
            
            <h2>9. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at legal@plantripr.ai
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}