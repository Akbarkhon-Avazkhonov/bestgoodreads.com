// API configuration and helper functions

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://38.242.212.35:3000"

export interface Category {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export interface ApiBook {
  id: number // This is the real ID we'll use for routing
  name: string
  ASIN: string
  description: string | null
  price: string | null
  info: string // JSON string containing book details
  infoFromApi: string
  categoryId: number
  createdAt: string
  updatedAt: string
}

export interface BookInfo {
  DetailPageURL: string
  id: number // This is from the info field, but we'll use ApiBook.id for routing
  title: string
  author: string
  genre: string
  rating: number
  reviewsCount: number
  cover: string
  description: string
  fullReview: string
  publishYear: number
  pages: number
  language: string
  originalLanguage: string
  publisher: string
  isbn: string
  dimensions: string
  weight: string
  tags: string[]
  themes: string[]
  awards: string[]
  adaptations: string[]
  reviewer: string
  reviewerAvatar: string
  reviewerBio: string
  publishDate: string
  readingTime: string
  likes: number
  dislikes: number
  keyQuotes: string[]
  similarBooks: Array<{
    id: number
    title: string
    author: string
  }>
  ratingBreakdown?: {
    "5": number
    "4": number
    "3": number
    "2": number
    "1": number
  }
}

export interface ProcessedBook extends BookInfo {
  apiId: number // The real ID from the API for routing
  slug: string // Add slug for SEO-friendly URLs
  categoryId: number // Add category ID for filtering
}

export async function getCategories(): Promise<Category[]> {
  return [
      { id: 1, name: "Arts & Photography", createdAt: "", updatedAt: "" },
      { id: 2, name: "Biographies & Memoirs", createdAt: "", updatedAt: "" },
      { id: 3, name: "Business & Money", createdAt: "", updatedAt: "" },
      { id: 4, name: "Children's Books", createdAt: "", updatedAt: "" },
      { id: 5, name: "Comics & Graphic Novels", createdAt: "", updatedAt: "" },
      { id: 6, name: "Computers & Technology", createdAt: "", updatedAt: "" },
      { id: 7, name: "Cookbooks, Food & Wine", createdAt: "", updatedAt: "" },
      { id: 8, name: "Health, Fitness & Dieting", createdAt: "", updatedAt: "" },
      { id: 9, name: "History", createdAt: "", updatedAt: "" },
      { id: 10, name: "Literature & Fiction", createdAt: "", updatedAt: "" },
      { id: 11, name: "Mystery, Thriller & Suspense", createdAt: "", updatedAt: "" },
      { id: 12, name: "Romance", createdAt: "", updatedAt: "" },
      { id: 13, name: "Science Fiction & Fantasy", createdAt: "", updatedAt: "" },
      { id: 14, name: "Self-Help", createdAt: "", updatedAt: "" },
    ]
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`, {
      headers: {
        accept: "*/*",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const categories: Category[] = await response.json()
    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    // Return fallback categories if API fails
    return [
      { id: 1, name: "Arts & Photography", createdAt: "", updatedAt: "" },
      { id: 2, name: "Biographies & Memoirs", createdAt: "", updatedAt: "" },
      { id: 3, name: "Business & Money", createdAt: "", updatedAt: "" },
      { id: 4, name: "Children's Books", createdAt: "", updatedAt: "" },
      { id: 5, name: "Comics & Graphic Novels", createdAt: "", updatedAt: "" },
      { id: 6, name: "Computers & Technology", createdAt: "", updatedAt: "" },
      { id: 7, name: "Cookbooks, Food & Wine", createdAt: "", updatedAt: "" },
      { id: 8, name: "Health, Fitness & Dieting", createdAt: "", updatedAt: "" },
      { id: 9, name: "History", createdAt: "", updatedAt: "" },
      { id: 10, name: "Literature & Fiction", createdAt: "", updatedAt: "" },
      { id: 11, name: "Mystery, Thriller & Suspense", createdAt: "", updatedAt: "" },
      { id: 12, name: "Romance", createdAt: "", updatedAt: "" },
      { id: 13, name: "Science Fiction & Fantasy", createdAt: "", updatedAt: "" },
      { id: 14, name: "Self-Help", createdAt: "", updatedAt: "" },
    ]
  }
}

// Helper function to get category name by ID
export function getCategoryName(categories: Category[], categoryId: number): string {
  const category = categories.find((cat) => cat.id === categoryId)
  return category?.name || "Unknown Category"
}

// Helper function to get category ID by name
export function getCategoryId(categories: Category[], categoryName: string): number | null {
  const category = categories.find((cat) => cat.name === categoryName)
  return category?.id || null
}

// Get all books from the new endpoint
export async function getAllBooks(): Promise<ProcessedBook[]> {
  const fallbackBooks: ProcessedBook[] = [
     {
      apiId: 1,
      id: 1,
      slug: "the-women-of-arlington-hall-novel",
      title: "The Women of Arlington Hall: A Novel",
      author: "Kate Quinn",
      genre: "Historical Fiction > World War II",
      rating: 4.7,
      reviewsCount: 500,
      cover: "https://m.media-amazon.com/images/I/81tf1H0uRdL._SY342_.jpg",
      description: "A gripping tale of the unsung women codebreakers of Arlington Hall during World War II. These brilliant minds tackle encrypted enemy messages, navigating espionage, betrayal, and personal sacrifices to help win the war. Kate Quinn weaves a compelling story of courage, intelligence, and resilience in this unforgettable historical novel.",
      fullReview: "Kate Quinn shines again with a vivid, suspenseful portrayal of WWII’s hidden heroes. The Women of Arlington Hall is a captivating blend of history and drama, perfect for fans of historical fiction.",
      publishYear: 2024,
      pages: 384,
      language: "English",
      originalLanguage: "English",
      publisher: "William Morrow",
      isbn: "B0DJTD3XM2",
      dimensions: "N/A (Ebook)",
      weight: "N/A (Ebook)",
      tags: ["historical-fiction", "world-war-ii", "codebreakers", "women-in-history", "espionage"],
      themes: ["Courage", "Espionage", "Female Empowerment", "Sacrifice"],
      awards: [],
      adaptations: [],
      reviewer: "Sample Reviewer",
      reviewerAvatar: "/placeholder.svg",
      reviewerBio: "A sample reviewer bio",
      publishDate: "2024-11-05",
      readingTime: "8 min read",
      likes: 100,
      dislikes: 2,
      keyQuotes: ["Their pens broke codes; their hearts carried the war.", "In the quiet of Arlington Hall, heroes were born."],
      similarBooks: [],
      ratingBreakdown: { "5": 72, "4": 20, "3": 5, "2": 2, "1": 1 },
      categoryId: 1,
      DetailPageURL: "https://www.amazon.com/Women-Arlington-Hall-Novel-ebook/dp/B0DJTD3XM2?tag=bestgoodreads-20",
    }, {
      apiId: 2,
      id: 2,
      slug: "the-secret-of-secrets-robert-langdon",
      title: "The Secret of Secrets (A Robert Langdon Novel)",
      author: "James Rollins",
      genre: "Mystery, Thriller & Suspense > Thrillers & Suspense > Technothrillers",
      rating: 4.2,
      reviewsCount: 1500,
      cover: "https://m.media-amazon.com/images/I/71KSpVjctXL._SY466_.jpg",
      description: "The shocking secret lies hidden in the smallest letters known to man. In this latest electrifying Robert Langdon thriller, the renowned Harvard symbologist and his fearless sidekick Sienna Brooks race across the globe to save the world from a shadowy enemy with a horrifying agenda. As the countdown to doomsday begins, Langdon must decipher a series of cryptic symbols embedded in the most ancient and mysterious text ever written: the Voynich Manuscript. But this time, the stakes are higher than ever, and the truth is more terrifying than anyone could imagine.",
      fullReview: "An exhilarating addition to the Robert Langdon series, blending history, science, and suspense in Rollins' signature style.",
      publishYear: 2025,
      pages: 432,
      language: "English",
      originalLanguage: "English",
      publisher: "William Morrow",
      isbn: "978-0385546890",
      dimensions: "6.13 x 1.25 x 9.25 inches",
      weight: "1.05 pounds",
      tags: ["mystery", "thriller", "robert-langdon", "dan-brown"],
      themes: ["Conspiracy", "Ancient Secrets", "Science and Religion"],
      awards: [],
      adaptations: [],
      reviewer: "Sample Reviewer",
      reviewerAvatar: "/placeholder.svg",
      reviewerBio: "A sample reviewer bio",
      publishDate: "2025-09-15",
      readingTime: "10 min read",
      likes: 50,
      dislikes: 2,
      keyQuotes: ["The smallest letters hold the greatest secrets.", "In the shadows of history, the truth awaits."],
      similarBooks: [],
      ratingBreakdown: { "5": 55, "4": 25, "3": 12, "2": 5, "1": 3 },
      categoryId: 1,
      DetailPageURL: "https://www.amazon.com/Secret-Secrets-Novel-Robert-Langdon/dp/0385546890?tag=bestgoodreads-20",
    },
    {
      apiId: 3,
      id: 3,
      slug: "just-shine-how-to-be-a-better-you",
      title: "Just Shine: How to Be a Better You",
      author: "Sigma",
      genre: "Self-Help > Personal Transformation > Happiness",
      rating: 4.6,
      reviewsCount: 250,
      cover: "https://m.media-amazon.com/images/I/81kMSeocOqL._SY385_.jpg",
      description: "In Just Shine, Sigma shares practical advice and motivational insights on self-improvement, helping readers unlock their potential and become the best version of themselves through daily habits and mindset shifts.",
      fullReview: "A refreshing take on personal growth, packed with actionable tips that make self-improvement feel achievable and fun.",
      publishYear: 2023,
      pages: 256,
      language: "English",
      originalLanguage: "English",
      publisher: "Penguin Books",
      isbn: "978-0593206292",
      dimensions: "5.5 x 0.8 x 8.3 inches",
      weight: "0.65 pounds",
      tags: ["self-help", "personal-development", "motivation"],
      themes: ["Self-Improvement", "Happiness", "Mindset"],
      awards: [],
      adaptations: [],
      reviewer: "Sample Reviewer",
      reviewerAvatar: "/placeholder.svg",
      reviewerBio: "A sample reviewer bio",
      publishDate: "2023-05-16",
      readingTime: "6 min read",
      likes: 75,
      dislikes: 1,
      keyQuotes: ["Shine bright by embracing your true self.", "Small changes lead to big transformations."],
      similarBooks: [],
      ratingBreakdown: { "5": 70, "4": 20, "3": 7, "2": 2, "1": 1 },
      categoryId: 1,
      DetailPageURL: "https://www.amazon.com/Just-Shine-How-Better-You/dp/0593206290?tag=bestgoodreads-20",
    },
    {
      apiId: 4,
      id: 4,
      slug: "my-first-learn-to-write-workbook",
      title: "My First Learn-to-Write Workbook: Practice for Kids with Pen Control, Line Tracing, Letters, and More!",
      author: "Crystal Radke",
      genre: "Children's Books > Early Learning > Handwriting",
      rating: 4.7,
      reviewsCount: 1200,
      cover: "https://m.media-amazon.com/images/I/71c+ReofeoL._SY385_.jpg",
      description: "Help your child develop essential fine motor skills with this fun workbook! Featuring 100 activities that teach children how to form letters, numbers, and shapes while practicing pen control. Perfect for preschoolers and kindergarteners starting their writing journey.",
      fullReview: "A fantastic workbook for young learners! The activities are engaging and help build confidence in writing. Highly recommended for parents and teachers.",
      publishYear: 2019,
      pages: 100,
      language: "English",
      originalLanguage: "English",
      publisher: "Rockridge Press",
      isbn: "978-1641526274",
      dimensions: "8.5 x 0.3 x 11 inches",
      weight: "0.7 pounds",
      tags: ["children", "workbook", "handwriting", "preschool", "education"],
      themes: ["Early Learning", "Fine Motor Skills", "Alphabet Practice"],
      awards: [],
      adaptations: [],
      reviewer: "Sample Reviewer",
      reviewerAvatar: "/placeholder.svg",
      reviewerBio: "A sample reviewer bio",
      publishDate: "2019-08-20",
      readingTime: "3 min read",
      likes: 80,
      dislikes: 3,
      keyQuotes: ["Practice makes perfect in writing!", "Fun activities for little hands."],
      similarBooks: [],
      ratingBreakdown: { "5": 75, "4": 18, "3": 5, "2": 1, "1": 1 },
      categoryId: 1,
      DetailPageURL: "https://www.amazon.com/My-First-Learn-Write-Workbook/dp/1641526270?tag=bestgoodreads-20",
    },
    {
      apiId: 5,
      id: 5,
      slug: "wild-card-elsie-silver",
      title: "Wild Card (The Morgan Brothers Book 4)",
      author: "Elsie Silver",
      genre: "Romance > Contemporary > Small Town & Rural",
      rating: 4.8,
      reviewsCount: 850,
      cover: "https://m.media-amazon.com/images/I/91fSPIcCwEL._SY466_.jpg",
      description: "It all starts with a dare. A challenge. A bet. Emmitt was the one guy in my class who wasn't afraid of me. The one who challenged me to a game of truth or dare on the first day of kindergarten. The one who could handle my stubbornness. But somewhere along the way, that boy became a man who made my heart race every time he walked into a room. Now, years later, he's back in my life, and the stakes are higher than ever. Can I trust him with my heart, or will this wild card upend everything?",
      fullReview: "Another sizzling addition to the Morgan Brothers series! Elsie Silver delivers steamy romance with heart and humor that keeps you turning the pages.",
      publishYear: 2024,
      pages: 350,
      language: "English",
      originalLanguage: "English",
      publisher: "One Acre Press",
      isbn: "B0DWSZPM62",
      dimensions: "N/A (Ebook)",
      weight: "N/A (Ebook)",
      tags: ["romance", "contemporary", "small-town", "sports", "cowboy"],
      themes: ["Second Chances", "Forbidden Love", "Family Dynamics"],
      awards: [],
      adaptations: [],
      reviewer: "Sample Reviewer",
      reviewerAvatar: "/placeholder.svg",
      reviewerBio: "A sample reviewer bio",
      publishDate: "2024-10-08",
      readingTime: "8 min read",
      likes: 120,
      dislikes: 1,
      keyQuotes: ["Dare to love the wild one.", "In the game of hearts, he's my wild card."],
      similarBooks: [],
      ratingBreakdown: { "5": 80, "4": 15, "3": 3, "2": 1, "1": 1 },
      categoryId: 1,
      DetailPageURL: "https://www.amazon.com/Wild-Card-Elsie-Silver-ebook/dp/B0DWSZPM62?tag=bestgoodreads-20",
    },
    {
      apiId: 6,
      id: 6,
      slug: "avatar-jonathan-cahn",
      title: "The Avatar",
      author: "Jonathan Cahn",
      genre: "Christian Books & Bibles > Prophecies",
      rating: 4.9,
      reviewsCount: 300,
      cover: "https://m.media-amazon.com/images/I/81tf1H0uRdL._SY466_.jpg",
      description: "In The Avatar, New York Times bestselling author Jonathan Cahn unveils a stunning prophetic revelation about the spiritual forces shaping our world today. Through a gripping narrative, Cahn connects ancient prophecies to modern events, uncovering the rise of a mysterious figure—the Avatar—and its implications for the future. This book combines biblical insight, historical analysis, and spiritual wisdom to challenge readers to discern the times we live in.",
      fullReview: "Jonathan Cahn delivers another thought-provoking masterpiece, blending biblical prophecy with contemporary relevance. A must-read for those seeking spiritual clarity in turbulent times.",
      publishYear: 2025,
      pages: 368,
      language: "English",
      originalLanguage: "English",
      publisher: "Frontline",
      isbn: "978-1636415208",
      dimensions: "6 x 1.2 x 9 inches",
      weight: "1.1 pounds",
      tags: ["christian", "prophecy", "spiritual", "biblical"],
      themes: ["End Times", "Spiritual Awakening", "Prophetic Insight"],
      awards: [],
      adaptations: [],
      reviewer: "Sample Reviewer",
      reviewerAvatar: "/placeholder.svg",
      reviewerBio: "A sample reviewer bio",
      publishDate: "2025-09-03",
      readingTime: "9 min read",
      likes: 90,
      dislikes: 2,
      keyQuotes: ["The Avatar rises, but the truth endures.", "In the shadows of prophecy, light reveals the way."],
      similarBooks: [],
      ratingBreakdown: { "5": 85, "4": 10, "3": 3, "2": 1, "1": 1 },
      categoryId: 1,
      DetailPageURL: "https://www.amazon.com/Avatar-Jonathan-Cahn/dp/1636415202?tag=bestgoodreads-20",
    },
    {
      apiId: 7,
      id: 7,
      slug: "nemesis-unputdownable-gripping-thriller",
      title: "Nemesis (An unputdownable and gripping thriller) (The Thriller Series)",
      author: "K.J. McGill",
      genre: "Mystery, Thriller & Suspense > Thrillers > Psychological",
      rating: 4.5,
      reviewsCount: 200,
      cover: "https://m.media-amazon.com/images/I/81l9xuAkBIL._SY466_.jpg",
      description: "In Nemesis, a brilliant detective hunts a shadowy killer whose motives are rooted in revenge and deception. As the body count rises, secrets from the past unravel, leading to a shocking twist that questions everything. This unputdownable thriller keeps you guessing until the final page.",
      fullReview: "A pulse-pounding read that masterfully builds suspense. McGill's twists are ingenious, making Nemesis a standout in the thriller genre.",
      publishYear: 2024,
      pages: 320,
      language: "English",
      originalLanguage: "English",
      publisher: "Independently published",
      isbn: "B0DZBLSNDK",
      dimensions: "N/A (Ebook)",
      weight: "N/A (Ebook)",
      tags: ["thriller", "psychological", "suspense", "mystery", "crime"],
      themes: ["Revenge", "Deception", "Justice", "Psychological Tension"],
      awards: [],
      adaptations: [],
      reviewer: "Sample Reviewer",
      reviewerAvatar: "/placeholder.svg",
      reviewerBio: "A sample reviewer bio",
      publishDate: "2024-12-01",
      readingTime: "7 min read",
      likes: 60,
      dislikes: 3,
      keyQuotes: ["Nemesis approaches, and no one escapes.", "In the game of revenge, the hunter becomes the hunted."],
      similarBooks: [],
      ratingBreakdown: { "5": 60, "4": 25, "3": 10, "2": 3, "1": 2 },
      categoryId: 1,
      DetailPageURL: "https://www.amazon.com/Nemesis-unputdownable-gripping-thriller-Thriller-ebook/dp/B0DZBLSNDK?tag=bestgoodread-20",
    },
    {
      apiId: 8,
      id: 8,
      slug: "dating-after-the-end-of-the-world-jeneva-rose",
      title: "Dating After the End of the World",
      author: "Jeneva Rose",
      genre: "Romance > Contemporary > Romantic Comedy",
      rating: 4.6,
      reviewsCount: 400,
      cover: "https://m.media-amazon.com/images/I/81gbQx5mXiL._SY466_.jpg",
      description: "In a post-apocalyptic world where survival is key, love becomes the ultimate challenge. Follow a resilient heroine navigating the ruins of society while swiping right on potential partners amid zombies, scarcity, and unexpected alliances. Jeneva Rose blends humor, heart, and high-stakes romance in this witty tale of finding connection when the world has fallen apart.",
      fullReview: "Jeneva Rose's signature blend of suspense and romance shines in this end-of-the-world rom-com. It's hilarious, heartfelt, and impossible to put down—perfect for fans of her thrilling series.",
      publishYear: 2024,
      pages: 320,
      language: "English",
      originalLanguage: "English",
      publisher: "Independently published",
      isbn: "B0DW4HPCMF",
      dimensions: "N/A (Ebook)",
      weight: "N/A (Ebook)",
      tags: ["romance", "post-apocalyptic", "romantic-comedy", "survival", "dating"],
      themes: ["Love in Chaos", "Second Chances", "Humor in Adversity", "Resilience"],
      awards: [],
      adaptations: [],
      reviewer: "Sample Reviewer",
      reviewerAvatar: "/placeholder.svg",
      reviewerBio: "A sample reviewer bio",
      publishDate: "2024-10-15",
      readingTime: "7 min read",
      likes: 85,
      dislikes: 2,
      keyQuotes: ["In the end of the world, the heart still swipes right.", "Love survives where bullets don't."],
      similarBooks: [],
      ratingBreakdown: { "5": 68, "4": 22, "3": 6, "2": 2, "1": 2 },
      categoryId: 1,
      DetailPageURL: "https://www.amazon.com/Dating-After-World-Jeneva-Rose-ebook/dp/B0DW4HPCMF?tag=bestgoodreads-20",
    },
    {
      apiId: 9,
      id: 9,
      slug: "i-love-you-to-the-moon-and-back",
      title: "I Love You to the Moon and Back",
      author: "Amelia Hepworth",
      genre: "Children's Books > Bedtime & Dreaming",
      rating: 4.8,
      reviewsCount: 2500,
      cover: "https://m.media-amazon.com/images/I/81mpSoJzv4L._SY342_.jpg",
      description: "A heartwarming board book that celebrates the unbreakable bond between a parent and child. Follow an adorable bear cub and parent as they express their love through sweet rhymes, perfect for bedtime or any time. With charming illustrations by Tim Warnes, this book is a cozy read for young children and their families.",
      fullReview: "This delightful book captures the essence of parental love with its simple, touching prose and beautiful illustrations. A perfect bedtime story for little ones!",
      publishYear: 2015,
      pages: 28,
      language: "English",
      originalLanguage: "English",
      publisher: "Tiger Tales",
      isbn: "978-1589255518",
      dimensions: "6.5 x 0.8 x 6.5 inches",
      weight: "0.65 pounds",
      tags: ["children", "board-book", "bedtime", "love", "parenting"],
      themes: ["Parental Love", "Family Bonding", "Bedtime Stories"],
      awards: [],
      adaptations: [],
      reviewer: "Sample Reviewer",
      reviewerAvatar: "/placeholder.svg",
      reviewerBio: "A sample reviewer bio",
      publishDate: "2015-03-03",
      readingTime: "3 min read",
      likes: 150,
      dislikes: 1,
      keyQuotes: ["I love you to the moon and back, my little bear.", "Forever and always, my heart is yours."],
      similarBooks: [],
      ratingBreakdown: { "5": 80, "4": 15, "3": 3, "2": 1, "1": 1 },
      categoryId: 1,
      DetailPageURL: "https://www.amazon.com/I-Love-You-Moon-Back/dp/1589255518?tag=bestgoodreads-20",
    },
    {
      apiId: 10,
      id: 10,
      slug: "the-reckoning-hour-lincoln-legal-thriller",
      title: "The Reckoning Hour: A Lincoln Legal Thriller",
      author: "John Grisham",
      genre: "Mystery, Thriller & Suspense > Legal Thrillers",
      rating: 4.4,
      reviewsCount: 600,
      cover: "https://m.media-amazon.com/images/I/81+ASdVnrZL._SY466_.jpg",
      description: "In this gripping legal thriller, John Grisham introduces a new hero, attorney Jake Lincoln, who takes on a high-stakes case that pits him against a corrupt system. When a small-town murder case unravels a web of conspiracy, Jake must navigate courtroom drama, dangerous enemies, and moral dilemmas to uncover the truth before time runs out.",
      fullReview: "Grisham delivers another page-turner with sharp legal intrigue and a compelling new protagonist. The Reckoning Hour is a must-read for fans of courtroom suspense.",
      publishYear: 2024,
      pages: 400,
      language: "English",
      originalLanguage: "English",
      publisher: "Doubleday",
      isbn: "B0D9PCQ73B",
      dimensions: "N/A (Ebook)",
      weight: "N/A (Ebook)",
      tags: ["legal-thriller", "mystery", "suspense", "courtroom-drama", "crime"],
      themes: ["Justice", "Corruption", "Moral Dilemmas", "Conspiracy"],
      awards: [],
      adaptations: [],
      reviewer: "Sample Reviewer",
      reviewerAvatar: "/placeholder.svg",
      reviewerBio: "A sample reviewer bio",
      publishDate: "2024-10-22",
      readingTime: "9 min read",
      likes: 80,
      dislikes: 3,
      keyQuotes: ["In the courtroom, truth is the only weapon.", "Time runs out, but justice demands its hour."],
      similarBooks: [],
      ratingBreakdown: { "5": 60, "4": 25, "3": 10, "2": 3, "1": 2 },
      categoryId: 1,
      DetailPageURL: "https://www.amazon.com/Reckoning-Hour-Lincoln-Legal-Thriller-ebook/dp/B0D9PCQ73B?tag=bestgoodreads-20",
    }

  ]
    return fallbackBooks

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    const response = await fetch(`${API_BASE_URL}/products/all-products`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      mode: "cors",
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)
    }

    const apiBooks: ApiBook[] = await response.json()

    if (!Array.isArray(apiBooks)) {
      throw new Error("Invalid response format: expected array")
    }

    const books: ProcessedBook[] = apiBooks
      .map((apiBook) => {
        try {
          if (!apiBook.info) {
            console.warn(`Book ${apiBook.id} has no info field`)
            return null
          }

          const bookInfo: BookInfo = JSON.parse(apiBook.info)

          // Add default ratingBreakdown if not present
          if (!bookInfo.ratingBreakdown) {
            bookInfo.ratingBreakdown = {
              "5": Math.floor(Math.random() * 50) + 30,
              "4": Math.floor(Math.random() * 30) + 20,
              "3": Math.floor(Math.random() * 20) + 10,
              "2": Math.floor(Math.random() * 10) + 5,
              "1": Math.floor(Math.random() * 5) + 2,
            }
          }

          // Create processed book with API ID for routing
          const processedBook: ProcessedBook = {
            ...bookInfo,
            apiId: apiBook.id, // Use the real API ID for routing
            categoryId: apiBook.categoryId, // Add category ID for filtering
          }

          return processedBook
        } catch (error) {
          console.error(`Error parsing book info for book ${apiBook.id}:`, error)
          return null
        }
      })
      .filter((book): book is ProcessedBook => book !== null)

    if (books.length === 0) {
      console.warn("No valid books found, using fallback")
      return fallbackBooks
    }

    console.log(`✅ Successfully loaded ${books.length} books from all products`)
    return books
  } catch (error) {
    console.warn(`⚠️ Failed to fetch all books, using fallback:`, error)
    return fallbackBooks
  }
}

// Get books by category ID
export async function getBooksByCategory(categoryId: number): Promise<ProcessedBook[]> {
  return []
  try {
    const allBooks = await getAllBooks()
    // Filter books by categoryId
    const filteredBooks = allBooks.filter((book) => book.categoryId === categoryId)
    return filteredBooks
  } catch (error) {
    console.error(`Error fetching books for category ${categoryId}:`, error)
    return []
  }
}

// Get a single book by API ID
export async function getBookById(bookId: string): Promise<ProcessedBook | null> {
  try {
    const allBooks = await getAllBooks()
    const book = allBooks.find((book) => book.apiId.toString() === bookId)
    return book || null
  } catch (error) {
    console.error(`Error fetching book ${bookId}:`, error)
    return null
  }
}

// Get a single book by slug
export async function getBookBySlug(bookSlug: string): Promise<ProcessedBook | null> {
  try {
    const allBooks = await getAllBooks()
    console.log(`Searching for book with slug: ${bookSlug}`)
    const decodedSlug = decodeURIComponent(bookSlug)

    const book = allBooks.find((book) => book.slug === decodedSlug)
    console.log(`Searching for book with slug: ${bookSlug}`, book ? "Found" : "Not Found")
    return book || null
  } catch (error) {
    console.error(`Error fetching book ${bookSlug}:`, error)
    return null
  }
}
