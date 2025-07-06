import { type NextRequest, NextResponse } from "next/server"

// Mock prediction function - in a real app, this would use the trained ML model
function predictPersonality(features: any) {
  // Convert answers to feature vector
  const {
    time_spent_alone,
    stage_fear,
    social_event_attendance,
    going_outside,
    drained_after_socializing,
    friends_circle_size,
    post_frequency,
  } = features

  // Simple rule-based prediction for demo (replace with actual ML model)
  let introvertScore = 0
  let extrovertScore = 0

  // Time spent alone (more time alone = more introverted)
  if (time_spent_alone > 8) introvertScore += 2
  else if (time_spent_alone > 4) introvertScore += 1
  else extrovertScore += 1

  // Stage fear (fear = more introverted)
  if (stage_fear === "Yes") introvertScore += 2
  else extrovertScore += 2

  // Social event attendance (less attendance = more introverted)
  if (social_event_attendance <= 3) introvertScore += 2
  else if (social_event_attendance <= 6) introvertScore += 1
  else extrovertScore += 2

  // Going outside (less going out = more introverted)
  if (going_outside <= 3) introvertScore += 2
  else if (going_outside <= 6) introvertScore += 1
  else extrovertScore += 2

  // Drained after socializing (drained = more introverted)
  if (drained_after_socializing === "Yes") introvertScore += 2
  else extrovertScore += 2

  // Friends circle size (smaller circle = more introverted)
  if (friends_circle_size <= 3) introvertScore += 2
  else if (friends_circle_size <= 8) introvertScore += 1
  else extrovertScore += 2

  // Post frequency (less posting = more introverted)
  if (post_frequency <= 3) introvertScore += 2
  else if (post_frequency <= 6) introvertScore += 1
  else extrovertScore += 2

  const totalScore = introvertScore + extrovertScore
  const confidence = Math.max(introvertScore, extrovertScore) / totalScore
  const personality = introvertScore > extrovertScore ? "Introvert" : "Extrovert"

  // Generate insights based on answers
  const insights = []

  if (time_spent_alone > 8) {
    insights.push("You value significant alone time for reflection and recharging")
  } else if (time_spent_alone < 3) {
    insights.push("You prefer being around others and gain energy from social interaction")
  }

  if (stage_fear === "Yes") {
    insights.push("Public speaking makes you nervous, which is common for introverts")
  } else {
    insights.push("You feel comfortable speaking in public, showing extroverted confidence")
  }

  if (social_event_attendance <= 3) {
    insights.push("You prefer smaller, intimate gatherings over large social events")
  } else if (social_event_attendance >= 7) {
    insights.push("You actively seek out and enjoy social gatherings and events")
  }

  if (drained_after_socializing === "Yes") {
    insights.push("Social interactions drain your energy, requiring recovery time")
  } else {
    insights.push("Social interactions energize you and make you feel more alive")
  }

  if (friends_circle_size <= 3) {
    insights.push("You prefer a small, close-knit circle of deep friendships")
  } else if (friends_circle_size >= 10) {
    insights.push("You maintain a large network of friends and acquaintances")
  }

  return {
    prediction: personality,
    confidence: confidence,
    personality_type: personality,
    insights: insights.slice(0, 4), // Limit to 4 insights
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      "time_spent_alone",
      "stage_fear",
      "social_event_attendance",
      "going_outside",
      "drained_after_socializing",
      "friends_circle_size",
      "post_frequency",
    ]

    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Make prediction
    const results = predictPersonality(body)

    return NextResponse.json(results)
  } catch (error) {
    console.error("Prediction error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
