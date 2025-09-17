// app/contact/page.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react"

export default function ContactPage() {
const contacts = [
  {
    icon: Mail,
    title: "Email Us",
    value: "support@bestgoodreads.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+1 (555) 482-7391",
  },
  {
    icon: MapPin,
    title: "Our Office",
    value: "742 Maple Blvd, Seattle, WA, USA",
  },
]


  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-sky-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-cyan-100 leading-relaxed">
            Have questions, feedback, or partnership inquiries?  
            We’d love to hear from you. Get in touch with our team today.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-cyan-100 to-sky-100 text-cyan-800 border-cyan-200">
              📞 Get in Touch
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">We’re Here to Help</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Whether you’re a reader, author, or partner, our team is just one message away.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contacts.map((contact, i) => (
              <Card key={i} className="border-cyan-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-cyan-100 to-sky-100 mb-4">
                    <contact.icon className="w-8 h-8 text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{contact.title}</h3>
                  <p className="text-gray-700">{contact.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-cyan-100 to-sky-100 text-cyan-800 border-cyan-200">
              💌 Send a Message
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Write to Us</h2>
            <p className="text-lg text-gray-700">
              Fill out the form below and we’ll get back to you as soon as possible.
            </p>
          </div>
          <Card className="border-cyan-100 shadow-lg">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    placeholder="Write your message..."
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
                >
                  Send Message
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
