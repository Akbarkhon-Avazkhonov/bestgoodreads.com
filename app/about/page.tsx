// app/about/page.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, Lightbulb, HeartHandshake, Globe, Award } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: BookOpen,
      title: "Passion for Literature",
      description: "We believe in the transformative power of books and the insights they provide.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Our platform thrives thanks to thousands of readers, reviewers, and professors worldwide.",
    },
    {
      icon: Lightbulb,
      title: "Knowledge Sharing",
      description: "We aim to make expert reviews accessible to everyone, everywhere.",
    },
    {
      icon: HeartHandshake,
      title: "Integrity & Trust",
      description: "We maintain the highest editorial standards and value transparency.",
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description: "From local classics to international bestsellers, we cover literature worldwide.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Every review is curated with care by experienced critics and academics.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-sky-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-cyan-100 leading-relaxed">
            bestgoodreads.com is your trusted companion in discovering extraordinary books.  
            Our mission is to connect readers with insightful expert reviews and a vibrant community of book lovers.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-cyan-100 to-sky-100 text-cyan-800 border-cyan-200">
              📖 Our Story
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It All Began</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Founded by a team of literature enthusiasts, professors, and technology experts, bestgoodreads.com started
              with one mission: to create the most comprehensive and trustworthy source of expert book reviews.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-cyan-100 to-sky-100 text-cyan-800 border-cyan-200">
              🌟 Our Values
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What We Stand For</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              At the heart of our platform are values that drive everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <Card key={i} className="border-cyan-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-cyan-100 to-sky-100 mb-4">
                    <value.icon className="w-8 h-8 text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-sky-600 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-lg text-cyan-100 mb-8">
            Whether you're a casual reader, a professional critic, or a literature professor, we invite you to be part
            of our growing community.
          </p>
          <Button
            size="lg"
            className="bg-white text-cyan-700 hover:bg-cyan-100 shadow-lg transition-all duration-300 rounded-xl"
            asChild
          >
            <Link href="/books">Start Exploring Books</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
