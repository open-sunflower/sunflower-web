import Link from 'next/link'

export default function Dock() {
  return (
    <nav className="flex items-center p-4 fixed bottom-0 w-full bg-slate-50/70 dark:bg-slate-950/70 backdrop-blur sm:hidden">
      <Link href="/" className="flex-grow text-center">
        <span className="i-tabler-home text-2xl" />
      </Link>
      <Link href="/search" className="flex-grow text-center">
        <span className="i-tabler-search text-2xl" />
      </Link>
      <Link href="/notification" className="flex-grow text-center">
        <span className="i-tabler-bell text-2xl" />
      </Link>
    </nav>
  )
}
