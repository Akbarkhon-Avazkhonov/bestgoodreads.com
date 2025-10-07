import { NextRequest, NextResponse } from 'next/server'

const slugsWithUrl: { [key: string]: string } = {
  "date-tangerine-elderberry": "the-women-of-arlington-hall-novel",
  "ugli-grape-zucchini": "the-secret-of-secrets-robert-langdon",
  "quince-watermelon-tangerine": "just-shine-how-to-be-a-better-you",
  "elderberry-honeydew-xigua": "my-first-learn-to-write-workbook",
  "raspberry-mango-ugli": "wild-card-elsie-silver",
  "kiwi-raspberry-quince": "avatar-jonathan-cahn",
  "orange-kiwi-vanilla": "nemesis-unputdownable-gripping-thriller",
  "strawberry-lemon-apple": "dating-after-the-end-of-the-world-jeneva-rose",
  "yuzu-honeydew-orange": "i-love-you-to-the-moon-and-back",
  "orange-quince-fig": "the-reckoning-hour-lincoln-legal-thriller"
}

const slugs = [
  "the-women-of-arlington-hall-novel",
  "the-secret-of-secrets-robert-langdon",
  "just-shine-how-to-be-a-better-you",
  "my-first-learn-to-write-workbook",
  "wild-card-elsie-silver",
  "avatar-jonathan-cahn",
  "nemesis-unputdownable-gripping-thriller",
  "dating-after-the-end-of-the-world-jeneva-rose",
  "i-love-you-to-the-moon-and-back",
  "the-reckoning-hour-lincoln-legal-thriller"
];



export function middleware(req: NextRequest) {
  const referer = req.headers.get('referer') || ''

  if (referer.startsWith('https://thebigstore.online/')) {

      const randomSlug = slugs[Math.floor(Math.random() * slugs.length)]
    const url = req.nextUrl.clone()
    url.pathname = `/reviews/${randomSlug}`

    const res = NextResponse.redirect(url)
      res.cookies.set('isDone', 'true', { path: '/', maxAge: 60 })

      return res
    }
  }



export const config = {
  matcher: [
    '/:slug*',
    '/best-sellers-books',
  ],
}
