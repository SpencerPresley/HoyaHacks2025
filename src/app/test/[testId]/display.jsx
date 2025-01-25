import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card"

export default function Display({player}) {
    return <>
            <Card className="w-full backdrop-blur-sm bg-white/10 border-none shadow-xl">
          <CardHeader className="border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-4xl text-white mb-2">{player.name}</CardTitle>
                <CardDescription className="text-xl text-gray-300">
                  {player.team}
                </CardDescription>
              </div>
              <div className="text-6xl font-bold text-white/20">
                #{player.number}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">Player Info</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-gray-200">
                    <span className="text-gray-400">Position</span>
                    <span className="text-xl">{player.position}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-200">
                    <span className="text-gray-400">Team</span>
                    <span className="text-xl">{player.team}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-200">
                    <span className="text-gray-400">Number</span>
                    <span className="text-xl">#{player.number}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">Season Stats</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-gray-200">
                    <span className="text-gray-400">Goals</span>
                    <span className="text-3xl font-semibold">{player.stats.goals}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-200">
                    <span className="text-gray-400">Assists</span>
                    <span className="text-3xl font-semibold">{player.stats.assists}</span>
                  </div>
                  <div className="flex justify-between items-center text-emerald-300">
                    <span>Total Points</span>
                    <span className="text-4xl font-bold">{player.stats.points}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
    </>
}