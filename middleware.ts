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

export function middleware(req: NextRequest) {
  const referer = req.headers.get('referer') || ''

  // if (referer.startsWith('https://thebigstore.online/')) {
      if (true) {

    const { pathname } = req.nextUrl
    const key = pathname.replace(/^\/+/, '') // убираем "/"
    if (key === "best-sellers-books"){
      const url = req.nextUrl.clone()
      url.pathname = `/books`

      const res = NextResponse.redirect(url)
      res.cookies.set('isDone', 'true', { path: '/', maxAge: 60 })

      return res
    }
    const value = slugsWithUrl[key]

    if (value) {
      const url = req.nextUrl.clone()
      url.pathname = `/book/${value}`

      const res = NextResponse.redirect(url)
      res.cookies.set('isDone', 'true', { path: '/', maxAge: 60 })

      return res
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/:slug*',
    '/best-sellers-books',
  ],
}
