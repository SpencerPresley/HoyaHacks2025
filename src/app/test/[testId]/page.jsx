import Link from "next/link"
import Display from "./display"

export default function PlayerPage({ params, searchParams }) {
  const player = JSON.parse(searchParams.player)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/test" 
          className="text-blue-400 hover:text-blue-300 mb-6 inline-block"
        >
          ← Back to All Players
        </Link>
        <Display player={player} />
      </div>
    </div>
  )
} 