"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import PersonalityQuiz from "@/components/personality-quiz"
import Results from "@/components/results"
import Navigation from "@/components/navigation"
import { Sparkles } from "lucide-react"
import { Brain } from "lucide-react"

export default function Home() {
  const [currentStep, setCurrentStep] = useState<"welcome" | "quiz" | "results">("welcome")
  const [results, setResults] = useState<any>(null)

  const handleStartQuiz = () => {
    setCurrentStep("quiz")
  }

  const handleQuizComplete = (predictionResults: any) => {
    setResults(predictionResults)
    setCurrentStep("results")
  }

  const handleRestart = () => {
    setCurrentStep("welcome")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navigation />

      <div className="relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-6xl mx-auto py-12 px-4">
          {currentStep === "welcome" && (
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 text-sm font-medium">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Personality Assessment
                </div>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Discover Your True Self
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Take our scientifically-backed personality quiz and uncover whether you're an introvert or extrovert
                  in just 2 minutes
                </p>
              </div>

              <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900">What you'll discover:</h3>
                      <div className="space-y-4">
                        {[
                          { icon: "🎯", title: "Your Personality Type", desc: "Introvert or Extrovert classification" },
                          { icon: "📊", title: "Confidence Score", desc: "How certain our AI is about the prediction" },
                          {
                            icon: "💡",
                            title: "Personal Insights",
                            desc: "Detailed analysis of your behavioral patterns",
                          },
                          { icon: "📋", title: "Actionable Tips", desc: "Personalized recommendations for growth" },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50"
                          >
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                              <h4 className="font-semibold text-gray-900">{item.title}</h4>
                              <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-center space-y-6">
                      <div className="relative">
                        <div className="w-48 h-48 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl">
                          <Brain className="w-24 h-24 text-white" />
                        </div>
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                          <Sparkles className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <Button
                        onClick={handleStartQuiz}
                        size="lg"
                        className="px-12 py-4 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                      >
                        Start Your Journey
                        <Sparkles className="w-5 h-5 ml-2" />
                      </Button>
                      <p className="text-sm text-gray-500">Takes only 2-3 minutes • 100% Free</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === "quiz" && <PersonalityQuiz onComplete={handleQuizComplete} />}

          {currentStep === "results" && results && <Results results={results} onRestart={handleRestart} />}
        </div>
      </div>
    </div>
  )
}
