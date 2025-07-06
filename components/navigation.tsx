"use client"

import { Brain, Sparkles } from "lucide-react"

export default function Navigation() {
  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Are You an Introvert or Extrovert?</h1>
              <p className="text-purple-100 text-sm">Take our 2-minute personality quiz</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-yellow-300" />
            <span className="text-white text-sm font-medium">AI Powered</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
