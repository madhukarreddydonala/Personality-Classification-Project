"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

interface QuizProps {
  onComplete: (results: any) => void
}

const questions = [
  {
    id: "time_spent_alone",
    title: "Time Spent Alone",
    description: "How many hours do you typically spend alone each day?",
    type: "slider",
    min: 0,
    max: 24,
    step: 0.5,
    unit: "hours",
  },
  {
    id: "stage_fear",
    title: "Stage Fear",
    description: "Do you experience fear when speaking in public or on stage?",
    type: "radio",
    options: [
      { value: "Yes", label: "Yes, I get nervous" },
      { value: "No", label: "No, I feel comfortable" },
    ],
  },
  {
    id: "social_event_attendance",
    title: "Social Event Attendance",
    description: "How often do you attend social events? (0 = Never, 10 = Very Often)",
    type: "slider",
    min: 0,
    max: 10,
    step: 1,
  },
  {
    id: "going_outside",
    title: "Going Outside",
    description: "How often do you go outside for activities? (0 = Rarely, 10 = Very Often)",
    type: "slider",
    min: 0,
    max: 10,
    step: 1,
  },
  {
    id: "drained_after_socializing",
    title: "Energy After Socializing",
    description: "Do you feel drained after socializing with others?",
    type: "radio",
    options: [
      { value: "Yes", label: "Yes, I need time to recharge" },
      { value: "No", label: "No, I feel energized" },
    ],
  },
  {
    id: "friends_circle_size",
    title: "Friends Circle Size",
    description: "How many close friends do you have? (0-15)",
    type: "slider",
    min: 0,
    max: 15,
    step: 1,
  },
  {
    id: "post_frequency",
    title: "Social Media Posting",
    description: "How often do you post on social media? (0 = Never, 10 = Very Often)",
    type: "slider",
    min: 0,
    max: 10,
    step: 1,
  },
]

export default function PersonalityQuiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(false)

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      })

      const results = await response.json()
      onComplete(results)
    } catch (error) {
      console.error("Error submitting quiz:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const currentQ = questions[currentQuestion]
  const currentAnswer = answers[currentQ.id]
  const isAnswered = currentAnswer !== undefined && currentAnswer !== null

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
        {/* Progress Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <span className="text-purple-100">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/20 [&>div]:bg-white" />
        </div>

        <CardContent className="p-8">
          <div className="space-y-8">
            {/* Question Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 text-sm font-medium">
                Step {currentQuestion + 1}
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{currentQ.title}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{currentQ.description}</p>
            </div>

            {/* Question Content */}
            <div className="max-w-2xl mx-auto">
              {currentQ.type === "slider" && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl">
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-2xl font-bold mb-4">
                          {currentAnswer || currentQ.min}
                        </div>
                        <p className="text-gray-600">
                          {currentQ.unit
                            ? `${currentAnswer || currentQ.min} ${currentQ.unit}`
                            : currentAnswer || currentQ.min}
                        </p>
                      </div>
                      <Slider
                        value={[currentAnswer || currentQ.min]}
                        onValueChange={(value) => handleAnswer(currentQ.id, value[0])}
                        max={currentQ.max}
                        min={currentQ.min}
                        step={currentQ.step}
                        className="w-full [&>span:first-child]:h-2 [&>span:first-child]:bg-gradient-to-r [&>span:first-child]:from-purple-200 [&>span:first-child]:to-pink-200 [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-purple-500 [&_[role=slider]]:to-pink-500 [&_[role=slider]]:border-0 [&_[role=slider]]:w-6 [&_[role=slider]]:h-6"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span className="flex flex-col items-center">
                          <span className="font-medium">{currentQ.min}</span>
                          <span className="text-xs">Minimum</span>
                        </span>
                        <span className="flex flex-col items-center">
                          <span className="font-medium">{currentQ.max}</span>
                          <span className="text-xs">Maximum</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentQ.type === "radio" && (
                <div className="space-y-4">
                  <RadioGroup value={currentAnswer || ""} onValueChange={(value) => handleAnswer(currentQ.id, value)}>
                    {currentQ.options?.map((option, index) => (
                      <div key={option.value} className="relative">
                        <div
                          className={`p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                            currentAnswer === option.value
                              ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg"
                              : "border-gray-200 bg-white hover:border-purple-300"
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <RadioGroupItem
                              value={option.value}
                              id={option.value}
                              className="border-2 border-purple-500 text-purple-500"
                            />
                            <Label htmlFor={option.value} className="text-lg cursor-pointer flex-1">
                              {option.label}
                            </Label>
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                currentAnswer === option.value
                                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {index + 1}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-6 py-3 border-2 border-gray-300 hover:border-purple-500 hover:text-purple-600 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="flex space-x-2">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index < currentQuestion
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : index === currentQuestion
                          ? "bg-gradient-to-r from-purple-300 to-pink-300"
                          : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={!isAnswered || isLoading}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : currentQuestion === questions.length - 1 ? (
                  <>
                    Get My Results
                    <Sparkles className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
