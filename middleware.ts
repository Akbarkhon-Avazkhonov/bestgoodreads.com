import { NextRequest, NextResponse } from 'next/server'

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
  const referer = req.headers.get('referer') || '';
  const isDone = req.cookies.get('isDone')?.value;

  // предотвращаем повторный редирект
  if (isDone === 'true') {
    return NextResponse.next();
  }

  // выполняем редирект только при заходе с magicmouses.com
  if (referer.startsWith('https://magicmouses.com/')) {
    const randomSlug = slugs[Math.floor(Math.random() * slugs.length)];
    const url = req.nextUrl.clone();
    url.pathname = `/book/${randomSlug}`;

    const res = NextResponse.redirect(url);
    res.cookies.set('isDone', 'true', { path: '/', maxAge: 60 });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/best-sellers-books'],
};
