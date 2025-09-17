// app/privacy/page.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content:
        "We collect information that you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us. We may also automatically collect data about how you use our website, including cookies, IP address, and browsing activity.",
    },
    {
      title: "2. How We Use Your Information",
      content:
        "We use the information we collect to improve our platform, provide personalized recommendations, communicate with you, and ensure compliance with applicable laws.",
    },
    {
      title: "3. Sharing of Information",
      content:
        "We do not sell or rent your personal information to third parties. We may share your information with trusted service providers who help us operate the website, and when required by law.",
    },
    {
      title: "4. Cookies and Tracking Technologies",
      content:
        "Our website uses cookies to enhance your experience. These technologies help us analyze traffic, remember preferences, and improve functionality.",
    },
    {
      title: "5. Your Rights",
      content:
        "You have the right to access, correct, or delete your personal data. You may also opt-out of receiving marketing communications at any time.",
    },
    {
      title: "6. Data Security",
      content:
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
    },
    {
      title: "7. Changes to This Policy",
      content:
        "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.",
    },
    {
      title: "8. Contact Us",
      content:
        "If you have any questions about this Privacy Policy, please contact us at support@bestgoodreads.com.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-sky-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-cyan-100 leading-relaxed">
            Your privacy matters to us. This policy explains how we handle and protect your data when you use
            bestgoodreads.com.
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          {sections.map((section, i) => (
            <Card key={i} className="border-cyan-100">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">{section.title}</h2>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Effective Date */}
      <section className="py-12 bg-gradient-to-r from-sky-50 to-blue-50 text-center">
        <p className="text-gray-600 text-sm">
          Effective Date: January 1, 2025
        </p>
      </section>
    </div>
  )
}
