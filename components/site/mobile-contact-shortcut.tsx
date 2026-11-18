import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export function MobileContactShortcut() {
  return (
    <Link
      href="/contact"
      className="fixed bottom-24 right-4 z-30 inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-float)] md:hidden"
    >
      <MessageCircle className="size-5" strokeWidth={1.8} aria-hidden="true" />
      <span className="sr-only">Contact us</span>
    </Link>
  )
}
