import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

interface Player {
  id: number;
  name: string;
  team: string;
  position: string;
  number: string;
  stats: {
    goals: number;
    assists: number;
    points: number;
  }
}

const players: Player[] = [
  {
    id: 1,
    name: "Connor McDavid",
    team: "Edmonton Oilers",
    position: "Center",
    number: "97",
    stats: {
      goals: 32,
      assists: 48,
      points: 80
    }
  },
  {
    id: 2,
    name: "Nathan MacKinnon",
    team: "Colorado Avalanche",
    position: "Center",
    number: "29",
    stats: {
      goals: 28,
      assists: 45,
      points: 73
    }
  },
  {
    id: 3,
    name: "Auston Matthews",
    team: "Toronto Maple Leafs",
    position: "Center",
    number: "34",
    stats: {
      goals: 45,
      assists: 25,
      points: 70
    }
  },
  {
    id: 4,
    name: "Alexander Ovechkin",
    team: "Washington Capitals",
    position: "Left Wing",
    number: "8",
    stats: {
      goals: 35,
      assists: 25,
      points: 60
    }
  }
]

export default function Test() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Player Cards</h1>
      <div className="flex flex-col items-center max-w-2xl mx-auto space-y-6">
        {players.map((player) => (
          <Link 
            href={{
              pathname: `/test/${player.id}`,
              query: { player: JSON.stringify(player) }
            }} 
            key={player.id} 
            className="w-full"
          >
            <Card className="w-full backdrop-blur-sm bg-white/10 border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-2xl text-white">{player.name}</CardTitle>
                <CardDescription className="text-gray-300">{player.team} - #{player.number}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-md text-blue-300">Position: {player.position}</p>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center text-gray-200">
                    <span>Goals</span>
                    <span className="text-xl font-semibold">{player.stats.goals}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-200">
                    <span>Assists</span>
                    <span className="text-xl font-semibold">{player.stats.assists}</span>
                  </div>
                  <div className="flex justify-between items-center text-emerald-300">
                    <span>Total Points</span>
                    <span className="text-2xl font-bold">{player.stats.points}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t border-white/10">
                <p className="text-sm text-gray-400">Click to view details →</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}