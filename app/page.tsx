import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Star,
  Users,
  Award,
  Globe,
  Heart,
  MessageSquare,
  ArrowRight,
  Quote,
  BookMarked,
  GraduationCap,
  Lightbulb,
  HeartHandshake,
  Search,
  Sparkles,
  Calendar,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getAllBooks, getCategories } from "@/lib/api"

export default async function LandingPage() {
  // Fetch data on the server
  const [books, categories] = await Promise.all([getAllBooks(), getCategories()])

  // Get featured books (first 6 books)
  const featuredBooks = books.slice(0, 6)

  // Get top categories (first 8 categories)
  const topCategories = categories.slice(0, 8)

  // Calculate some stats
  const totalBooks = books.length
  const averageRating = books.reduce((sum, book) => sum + book.rating, 0) / books.length
  const totalReviews = books.reduce((sum, book) => sum + book.reviewsCount, 0)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : i < rating
              ? "fill-yellow-200 text-yellow-400"
              : "text-gray-300"
        }`}
      />
    ))
  }

  // Sample testimonials
  const testimonials = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Literature Professor, Harvard University",
      avatar: "/images/critic-anna-litvinova.png",
      content:
        "This platform has revolutionized how I discover and recommend books to my students. The expert reviews are incredibly insightful and well-researched.",
      rating: 5,
    },
    {
      name: "James Rodriguez",
      role: "Book Blogger & Critic",
      avatar: "/images/critic-david-bookman.png",
      content:
        "As a professional book reviewer, I'm impressed by the quality and depth of analysis here. It's become my go-to resource for literary discovery.",
      rating: 5,
    },
    {
      name: "Emily Chen",
      role: "Avid Reader & Book Club Leader",
      avatar: "/images/critic-elena-reader.png",
      content:
        "I've discovered so many amazing books through this platform. The community discussions and expert insights make reading even more enjoyable.",
      rating: 5,
    },
  ]

  // Sample stats
  const stats = [
    { label: "Expert Reviews", value: totalBooks.toLocaleString(), icon: BookOpen },
    { label: "Happy Readers", value: "50,000+", icon: Users },
    { label: "Average Rating", value: averageRating.toFixed(1), icon: Star },
    { label: "Total Reviews", value: totalReviews.toLocaleString(), icon: MessageSquare },
  ]

  // Features
  const features = [
    {
      icon: GraduationCap,
      title: "Expert Curated Reviews",
      description:
        "Professional critics, university professors, and literary scholars provide in-depth analysis of every book.",
    },
    {
      icon: Users,
      title: "Vibrant Community",
      description: "Connect with fellow book lovers, join discussions, and share your reading experiences.",
    },
    {
      icon: Lightbulb,
      title: "Personalized Recommendations",
      description: "Get tailored book suggestions based on your reading history and preferences.",
    },
    {
      icon: Globe,
      title: "Global Literature",
      description: "Discover books from around the world, including translations and international bestsellers.",
    },
    {
      icon: Award,
      title: "Award-Winning Selection",
      description: "Find Pulitzer Prize winners, Nobel laureates, and other critically acclaimed works.",
    },
    {
      icon: HeartHandshake,
      title: "Reading Groups",
      description: "Join or create reading groups to discuss books with like-minded readers.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-cyan-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-xl shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-sky-600 bg-clip-text text-transparent">
                bestgoodreads.com

              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/books" className="text-gray-700 hover:text-cyan-600 transition-colors">
                Browse Books
              </Link>
              <Link href="#features" className="text-gray-700 hover:text-cyan-600 transition-colors">
                Features
              </Link>
              <Link href="#testimonials" className="text-gray-700 hover:text-cyan-600 transition-colors">
                Reviews
              </Link>
              <Button
                asChild
                className="bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl px-6"
              >
                <Link href="/books">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-100 via-sky-50 to-blue-100 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-sky-400/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-gradient-to-r from-cyan-100 to-sky-100 text-cyan-800 border-cyan-200 text-sm px-4 py-2">
              🎉 Over {totalBooks.toLocaleString()} expert-reviewed books available
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Discover your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600">
                {" "}
                next{" "}
              </span>
              literary adventure
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
              Explore the world's finest literature through expert reviews from renowned critics, university professors,
              and passionate readers. Join our community of book lovers and discover your next favorite read.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl"
                asChild
              >
                <Link href="/books">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Books
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-cyan-200 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-400 transition-all duration-300 rounded-xl"
                asChild
              >
                <Link href="#features">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Learn More
                </Link>
              </Button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg mb-2">
                    <stat.icon className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-20 bg-gradient-to-br from-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-cyan-100 to-sky-100 text-cyan-800 border-cyan-200">
              ⭐ Editor's Choice
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Books</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Handpicked by our literary experts, these books represent the finest in contemporary and classic
              literature
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <Card
                key={book.apiId}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-cyan-100 flex flex-col h-full"
              >
                <div className="relative">
                  <div className="relative w-full h-48">
                    <Image
                      src={book.cover || "/placeholder.svg"}
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <Badge className="absolute top-2 right-2 bg-white/90 text-gray-800 shadow-md rounded-lg text-xs">
                    {book.genre}
                  </Badge>
                  <div className="absolute top-2 left-2 flex items-center space-x-1 bg-white/90 rounded-lg px-2 py-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold text-gray-800">{book.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900 min-h-[3.5rem]">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-700 mb-3 font-medium">by {book.author}</p>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">{renderStars(book.rating)}</div>
                      <span className="text-sm text-gray-600">({book.reviewsCount} reviews)</span>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-3 mb-4 min-h-[4.5rem]">{book.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4 min-h-[2rem]">
                      {book.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs border-cyan-200 text-cyan-700 rounded-lg"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {book.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs border-cyan-200 text-cyan-700 rounded-lg">
                          +{book.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Author and Date Info */}
                  <div className="flex items-center justify-between mb-4 pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6 ring-2 ring-cyan-200">
                        <AvatarImage src={book.reviewerAvatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs bg-gradient-to-br from-cyan-100 to-sky-100 text-cyan-700">
                          {book.reviewer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-700 font-medium">{book.reviewer}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(book.publishDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                   {/* Кнопка "Read Expert Review" */}
  <Button
    className="w-full bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl mb-2"
    asChild
  >
    <Link href={`/book/${book.apiId}`}>
      Read Expert Review
      <ArrowRight className="w-4 h-4 ml-2" />
    </Link>
  </Button>

  {/* Кнопка "Купить" */}
  {book.DetailPageURL && (
    <Button
      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl shadow transition-all duration-300 transform hover:scale-105"
      asChild
    >
      <a
        href={
          book.DetailPageURL &&
          process.env.NEXT_PUBLIC_AMAZON_TAG1 &&
          process.env.NEXT_PUBLIC_AMAZON_TAG2
            ? book.DetailPageURL.replace(
                process.env.NEXT_PUBLIC_AMAZON_TAG1,
                process.env.NEXT_PUBLIC_AMAZON_TAG2
              )
            : book.DetailPageURL || "#"
        }
        target="_self"
        rel="noopener noreferrer"
      >
        Buy on Amazon
        <ArrowRight className="w-4 h-4 ml-2" />
      </a>
    </Button>
  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl px-8"
              asChild
            >
              <Link href="/books">
                View All {totalBooks.toLocaleString()} Books
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Explore by Genre</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              From classic literature to contemporary fiction, discover books across all genres
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {topCategories.map((category) => (
              <Card
                key={category.id}
                className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-cyan-100 cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-gradient-to-br from-cyan-100 to-sky-100 rounded-2xl inline-block mb-4 group-hover:from-cyan-200 group-hover:to-sky-200 transition-all duration-300">
                    <BookOpen className="w-8 h-8 text-cyan-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-700">Discover amazing books in this genre</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-cyan-100 to-sky-100 text-cyan-800 border-cyan-200">
              ✨ Platform Features
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose bestgoodreads.com?</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We've built the ultimate platform for book discovery, combining expert insights with community wisdom
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-cyan-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-cyan-100 to-sky-100 mb-4">
                    <feature.icon className="w-6 h-6 text-cyan-700" />
                  </div>
                  <h3 className="font-semibold text-xl text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-cyan-100 via-sky-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/80 text-cyan-800 border-cyan-200">💬 What Our Community Says</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Loved by Readers Worldwide</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Join thousands of satisfied readers who have discovered their next favorite books through our platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border-cyan-100 hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="w-8 h-8 text-cyan-400 mr-3" />
                    <div className="flex items-center">{renderStars(testimonial.rating)}</div>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <Avatar className="w-12 h-12 ring-2 ring-cyan-200 mr-4">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-br from-cyan-100 to-sky-100 text-cyan-700">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Discover your next great read in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-cyan-500 to-sky-600 text-white mb-6 shadow-lg">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Browse & Search</h3>
              <p className="text-gray-700">
                Explore our curated collection of books or search by title, author, or genre to find exactly what you're
                looking for.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-cyan-500 to-sky-600 text-white mb-6 shadow-lg">
                <BookMarked className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Read Expert Reviews</h3>
              <p className="text-gray-700">
                Dive into detailed reviews from literary critics, professors, and passionate readers to make informed
                choices.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-cyan-500 to-sky-600 text-white mb-6 shadow-lg">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Discover & Enjoy</h3>
              <p className="text-gray-700">
                Find your next favorite book, join discussions, and share your own reading experiences with our
                community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-sky-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Trusted by Book Lovers Everywhere</h2>
            <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
              Our platform continues to grow as more readers discover the joy of expert-curated book recommendations
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{totalBooks.toLocaleString()}+</div>
              <div className="text-cyan-200">Books Reviewed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-cyan-200">Active Readers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{totalReviews.toLocaleString()}+</div>
              <div className="text-cyan-200">Community Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-cyan-200">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-white to-cyan-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-700">Everything you need to know about bestgoodreads.com</p>
          </div>
          <div className="space-y-6">
            {[
              {
                question: "How are books selected for review?",
                answer:
                  "Our editorial team, consisting of literary critics, university professors, and industry experts, carefully curates books based on literary merit, cultural significance, and reader interest. We review both classic literature and contemporary works across all genres.",
              },
              {
                question: "Who writes the expert reviews?",
                answer:
                  "Our reviews are written by a diverse team of literary critics, university professors, published authors, and experienced book reviewers. Each reviewer's credentials and expertise are clearly displayed with their reviews.",
              },
              {
                question: "Is the platform free to use?",
                answer:
                  "Yes! bestgoodreads.com is completely free to use. You can browse our entire collection of expert reviews, participate in community discussions, and discover new books without any cost.",
              },
              {
                question: "How can I contribute to the community?",
                answer:
                  "You can contribute by leaving comments on book reviews, participating in discussions, rating books you've read, and sharing your own reading experiences. We also welcome applications from qualified reviewers.",
              },
              {
                question: "Do you have mobile apps?",
                answer:
                  "Our website is fully responsive and works perfectly on all devices. We're currently developing dedicated mobile apps for iOS and Android, which will be available soon.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border-cyan-100">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-100 via-sky-50 to-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-cyan-100">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Ready to Discover Your Next Favorite Book?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Join thousands of readers who trust our expert reviews to guide their literary journey. Start exploring
              today and never run out of amazing books to read.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl"
                asChild
              >
                <Link href="/books">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Start Exploring Books
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-cyan-200 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-400 transition-all duration-300 rounded-xl"
                asChild
              >
                <Link href="#features">
                  <Users className="w-5 h-5 mr-2" />
                  Join Our Community
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-cyan-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-xl">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">bestgoodreads.com</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                The premier destination for discovering exceptional literature through expert reviews and community
                insights. Connecting readers with extraordinary books from around the world.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Users className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Globe className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Explore</h3>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link href="/books" className="hover:text-white transition-colors">
                    All Books
                  </Link>
                </li>
                <li>
                  <Link href="/books" className="hover:text-white transition-colors">
                    Featured Reviews
                  </Link>
                </li>
                <li>
                  <Link href="/books" className="hover:text-white transition-colors">
                    New Releases
                  </Link>
                </li>
                <li>
                  <Link href="/books" className="hover:text-white transition-colors">
                    Classic Literature
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Community</h3>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Reading Groups
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Discussions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Book Clubs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Author Events
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 bestgoodreads.com. Connecting readers with extraordinary literature worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
