"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, CheckCircle, Clock, Dumbbell, Star, MessageSquare, Calendar } from "lucide-react"

export function WorkoutViewer() {
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      title: "Upper Body Strength Training",
      description: "Focus on arm and shoulder rehabilitation exercises",
      duration: "15 minutes",
      difficulty: "Beginner",
      completed: true,
      rating: 4,
      assignedDate: "2024-01-15",
      videoUrl: "/placeholder.svg?height=200&width=300",
      instructions: [
        "Warm up with gentle arm circles for 2 minutes",
        "Perform 10 wall push-ups",
        "Hold arm raises for 30 seconds each",
        "Cool down with gentle stretches",
      ],
    },
    {
      id: 2,
      title: "Lower Body Mobility",
      description: "Gentle stretching and mobility exercises for legs",
      duration: "20 minutes",
      difficulty: "Intermediate",
      completed: false,
      rating: null,
      assignedDate: "2024-01-16",
      videoUrl: "/placeholder.svg?height=200&width=300",
      instructions: [
        "Start with gentle leg swings",
        "Perform seated leg extensions",
        "Practice balance exercises",
        "End with relaxation stretches",
      ],
    },
    {
      id: 3,
      title: "Core Stability",
      description: "Gentle core strengthening for better posture",
      duration: "12 minutes",
      difficulty: "Beginner",
      completed: false,
      rating: null,
      assignedDate: "2024-01-17",
      videoUrl: "/placeholder.svg?height=200&width=300",
      instructions: [
        "Begin with breathing exercises",
        "Gentle seated twists",
        "Modified planks against wall",
        "Relaxation and deep breathing",
      ],
    },
  ])

  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null)

  const markAsCompleted = (workoutId: number) => {
    setWorkouts(workouts.map((workout) => (workout.id === workoutId ? { ...workout, completed: true } : workout)))
  }

  const rateWorkout = (workoutId: number, rating: number) => {
    setWorkouts(workouts.map((workout) => (workout.id === workoutId ? { ...workout, rating } : workout)))
  }

  const completedWorkouts = workouts.filter((w) => w.completed).length
  const totalWorkouts = workouts.length
  const completionPercentage = (completedWorkouts / totalWorkouts) * 100

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">My Workouts</h2>
        <p className="text-gray-600">Follow your personalized exercise plan</p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Workout Progress</span>
            <Badge variant="outline">
              {completedWorkouts}/{totalWorkouts} completed
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={completionPercentage} className="mb-2" />
          <p className="text-sm text-gray-600">{completionPercentage.toFixed(0)}% of assigned workouts completed</p>
        </CardContent>
      </Card>

      {/* Workout List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Assigned Workouts</h3>
          {workouts.map((workout) => (
            <Card
              key={workout.id}
              className={`cursor-pointer transition-all ${
                selectedWorkout === workout.id ? "ring-2 ring-blue-500" : ""
              } ${workout.completed ? "bg-green-50 border-green-200" : ""}`}
              onClick={() => setSelectedWorkout(workout.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <Dumbbell className="h-5 w-5 mr-2 text-blue-600" />
                    {workout.title}
                  </CardTitle>
                  {workout.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
                </div>
                <CardDescription>{workout.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{workout.duration}</span>
                    </div>
                    <Badge variant="secondary">{workout.difficulty}</Badge>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Assigned {workout.assignedDate}</span>
                  </div>

                  {workout.completed && workout.rating && (
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-600">Your rating:</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${star <= workout.rating! ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 pt-2">
                    {!workout.completed ? (
                      <Button
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          markAsCompleted(workout.id)
                        }}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Start Workout
                      </Button>
                    ) : (
                      <Button variant="outline" className="flex-1">
                        <Play className="h-4 w-4 mr-1" />
                        Watch Again
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Workout Details */}
        <div className="space-y-4">
          {selectedWorkout && (
            <>
              <h3 className="text-lg font-semibold">Workout Details</h3>
              {(() => {
                const workout = workouts.find((w) => w.id === selectedWorkout)
                if (!workout) return null

                return (
                  <Card>
                    <CardHeader>
                      <CardTitle>{workout.title}</CardTitle>
                      <CardDescription>{workout.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Video Player */}
                        <div className="aspect-video bg-gray-100 rounded-lg relative">
                          <img
                            src={workout.videoUrl || "/placeholder.svg"}
                            alt={workout.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Button size="lg" className="rounded-full">
                              <Play className="h-6 w-6" />
                            </Button>
                          </div>
                        </div>

                        {/* Instructions */}
                        <div>
                          <h4 className="font-medium mb-2">Instructions</h4>
                          <ol className="space-y-2">
                            {workout.instructions.map((instruction, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                                  {index + 1}
                                </span>
                                <span className="text-sm">{instruction}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Rating */}
                        {workout.completed && !workout.rating && (
                          <div>
                            <h4 className="font-medium mb-2">Rate this workout</h4>
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Button
                                  key={star}
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => rateWorkout(workout.id, star)}
                                >
                                  <Star className="h-5 w-5 text-gray-300 hover:text-yellow-400" />
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Ask Question
                          </Button>
                          {workout.completed && (
                            <Button variant="outline" size="sm">
                              Mark as Difficult
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })()}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
