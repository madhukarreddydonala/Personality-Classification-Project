"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Share2, Download, RotateCcw, Sparkles, Trophy, Target, Lightbulb, Heart } from "lucide-react"

interface ResultsProps {
  results: {
    prediction: string
    confidence: number
    personality_type: string
    insights: string[]
  }
  onRestart: () => void
}

export default function Results({ results, onRestart }: ResultsProps) {
  const { prediction, confidence, personality_type, insights } = results

  const confidencePercentage = Math.round(confidence * 100)
  const isIntrovert = personality_type === "Introvert"

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Personality Type",
          text: `I just discovered I'm ${confidencePercentage}% likely to be an ${personality_type}!`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `I just discovered I'm ${confidencePercentage}% likely to be an ${personality_type}! Check out this personality quiz: ${window.location.href}`,
      )
      alert("Results copied to clipboard!")
    }
  }

  const handleDownload = () => {
    const resultsText = `
Personality Classification Results
=================================

Personality Type: ${personality_type}
Confidence: ${confidencePercentage}%

Key Insights:
${insights.map((insight) => `• ${insight}`).join("\n")}

Generated on: ${new Date().toLocaleDateString()}
    `.trim()

    const blob = new Blob([resultsText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "personality-results.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Main Result Card */}
      <Card
        className={`border-0 shadow-2xl overflow-hidden ${
          isIntrovert ? "bg-gradient-to-br from-purple-50 to-indigo-50" : "bg-gradient-to-br from-orange-50 to-pink-50"
        }`}
      >
        <div
          className={`h-2 ${
            isIntrovert
              ? "bg-gradient-to-r from-purple-500 to-indigo-500"
              : "bg-gradient-to-r from-orange-500 to-pink-500"
          }`}
        ></div>

        <CardContent className="p-12">
          <div className="text-center space-y-8">
            {/* Result Icon */}
            <div className="relative">
              <div
                className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl shadow-2xl ${
                  isIntrovert
                    ? "bg-gradient-to-br from-purple-400 to-indigo-400"
                    : "bg-gradient-to-br from-orange-400 to-pink-400"
                }`}
              >
                {isIntrovert ? "🤔" : "🎉"}
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Result Text */}
            <div className="space-y-4">
              <div className="inline-flex items-center px-6 py-3 bg-white/80 rounded-full shadow-lg">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                <span className="font-medium text-gray-700">Your Personality Type</span>
              </div>
              <h1
                className={`text-6xl font-bold ${
                  isIntrovert
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600"
                    : "bg-gradient-to-r from-orange-600 to-pink-600"
                } bg-clip-text text-transparent`}
              >
                {personality_type}
              </h1>
              <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
                Our AI is <span className="font-bold text-gray-900">{confidencePercentage}% confident</span> in this
                prediction
              </p>
            </div>

            {/* Confidence Meter */}
            <div className="max-w-md mx-auto space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Confidence Level</span>
                <Badge
                  variant={confidencePercentage >= 80 ? "default" : "secondary"}
                  className={`${
                    confidencePercentage >= 80
                      ? isIntrovert
                        ? "bg-gradient-to-r from-purple-500 to-indigo-500"
                        : "bg-gradient-to-r from-orange-500 to-pink-500"
                      : "bg-gray-500"
                  } text-white border-0`}
                >
                  {confidencePercentage >= 80 ? "High" : "Moderate"} Confidence
                </Badge>
              </div>
              <div className="relative">
                <Progress
                  value={confidencePercentage}
                  className={`h-4 bg-gray-200 ${
                    isIntrovert
                      ? "[&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-indigo-500"
                      : "[&>div]:bg-gradient-to-r [&>div]:from-orange-500 [&>div]:to-pink-500"
                  }`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-white drop-shadow-lg">{confidencePercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Key Insights */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className={`p-3 rounded-full ${isIntrovert ? "bg-purple-100" : "bg-orange-100"}`}>
                <Lightbulb className={`w-6 h-6 ${isIntrovert ? "text-purple-600" : "text-orange-600"}`} />
              </div>
              Key Insights About You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                      isIntrovert
                        ? "bg-gradient-to-r from-purple-500 to-indigo-500"
                        : "bg-gradient-to-r from-orange-500 to-pink-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Personality Description */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className={`p-3 rounded-full ${isIntrovert ? "bg-purple-100" : "bg-orange-100"}`}>
                <Target className={`w-6 h-6 ${isIntrovert ? "text-purple-600" : "text-orange-600"}`} />
              </div>
              What This Means
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isIntrovert ? (
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                  <h4 className="font-bold text-lg text-purple-900 mb-3">You're an Introvert! 🤔</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Introverts typically prefer quieter, more low-key environments and gain energy from solitude.
                  </p>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold text-gray-900">Your typical traits:</h5>
                  <div className="grid gap-3">
                    {[
                      "Recharge through alone time",
                      "Prefer deep, meaningful conversations",
                      "Think before speaking",
                      "Enjoy smaller social gatherings",
                      "Focus deeply on tasks and interests",
                    ].map((trait, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                        <Heart className="w-4 h-4 text-purple-500" />
                        <span className="text-gray-700">{trait}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl">
                  <h4 className="font-bold text-lg text-orange-900 mb-3">You're an Extrovert! 🎉</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Extroverts typically thrive in social environments and gain energy from interactions with others.
                  </p>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold text-gray-900">Your typical traits:</h5>
                  <div className="grid gap-3">
                    {[
                      "Gain energy from social interactions",
                      "Enjoy meeting new people",
                      "Think out loud and process externally",
                      "Feel comfortable in large groups",
                      "Seek variety and stimulation",
                    ].map((trait, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                        <Heart className="w-4 h-4 text-orange-500" />
                        <span className="text-gray-700">{trait}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">What's Next?</h3>
            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Button
                onClick={handleShare}
                variant="outline"
                className="h-16 border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 bg-transparent"
              >
                <div className="flex flex-col items-center gap-2">
                  <Share2 className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Share Results</span>
                </div>
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                className="h-16 border-2 border-green-200 hover:border-green-500 hover:bg-green-50 transition-all duration-200 bg-transparent"
              >
                <div className="flex flex-col items-center gap-2">
                  <Download className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Download PDF</span>
                </div>
              </Button>
              <Button
                onClick={onRestart}
                className="h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <div className="flex flex-col items-center gap-2">
                  <RotateCcw className="w-5 h-5" />
                  <span className="text-sm font-medium">Take Again</span>
                </div>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
