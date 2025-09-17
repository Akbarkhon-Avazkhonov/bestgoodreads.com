// app/terms/page.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TermsOfServicePage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing or using bestgoodreads.com, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please discontinue using the website.",
    },
    {
      title: "2. Use of the Platform",
      content:
        "You may use our platform only for lawful purposes and in accordance with these Terms. You agree not to misuse, disrupt, or attempt to gain unauthorized access to the site or its services.",
    },
    {
      title: "3. User Content",
      content:
        "Any content you post, such as comments or reviews, must be accurate and not violate any laws or the rights of others. We reserve the right to remove any content that breaches these terms.",
    },
    {
      title: "4. Intellectual Property",
      content:
        "All content on bestgoodreads.com, including text, graphics, logos, and reviews, is protected by copyright and intellectual property laws. You may not copy, reproduce, or distribute content without permission.",
    },
    {
      title: "5. Affiliate Disclaimer",
      content:
        "bestgoodreads.com participates in the Amazon Services LLC Associates Program and other affiliate programs. This means we may earn a commission from qualifying purchases made through our links.",
    },
    {
      title: "6. Limitation of Liability",
      content:
        "We are not responsible for any damages or losses resulting from the use or inability to use our website. The content is provided 'as is' without warranties of any kind.",
    },
    {
      title: "7. Changes to Terms",
      content:
        "We may update these Terms of Service from time to time. Continued use of the platform after changes indicates your acceptance of the new terms.",
    },
    {
      title: "8. Governing Law",
      content:
        "These Terms of Service are governed by and construed in accordance with the laws of the United States. Any disputes will be resolved in the courts of New York, NY.",
    },
    {
      title: "9. Contact Us",
      content:
        "If you have any questions about these Terms, please contact us at support@bestgoodreads.com.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-sky-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Terms of Service</h1>
          <p className="text-xl text-cyan-100 leading-relaxed">
            Please read these Terms of Service carefully before using bestgoodreads.com.
          </p>
        </div>
      </section>

      {/* Terms Content */}
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
