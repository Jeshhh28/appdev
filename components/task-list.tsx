"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Pill, Dumbbell, Calendar, Play, MoreHorizontal } from "lucide-react"

export function TaskList() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      type: "medication",
      title: "Morning Medication",
      description: "Ibuprofen 400mg",
      time: "8:00 AM",
      completed: true,
      priority: "high",
    },
    {
      id: 2,
      type: "workout",
      title: "Upper Body Strength Training",
      description: "15 minutes of arm exercises",
      time: "10:00 AM",
      completed: true,
      priority: "medium",
    },
    {
      id: 3,
      type: "medication",
      title: "Afternoon Medication",
      description: "Physical therapy supplement",
      time: "2:00 PM",
      completed: false,
      priority: "high",
    },
    {
      id: 4,
      type: "workout",
      title: "Lower Body Mobility",
      description: "20 minutes of stretching",
      time: "4:00 PM",
      completed: false,
      priority: "medium",
    },
    {
      id: 5,
      type: "medication",
      title: "Evening Medication",
      description: "Ibuprofen 400mg",
      time: "8:00 PM",
      completed: false,
      priority: "high",
    },
    {
      id: 6,
      type: "checkup",
      title: "Weekly Check-in",
      description: "Report progress to Dr. Smith",
      time: "Tomorrow",
      completed: false,
      priority: "low",
    },
  ])

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "medication":
        return <Pill className="h-5 w-5 text-green-600" />
      case "workout":
        return <Dumbbell className="h-5 w-5 text-blue-600" />
      case "checkup":
        return <Calendar className="h-5 w-5 text-purple-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const completionPercentage = (completedTasks / totalTasks) * 100

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">My Tasks</h2>
        <p className="text-gray-600">Track your daily medications, workouts, and appointments</p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Today's Progress</span>
            <Badge variant="outline">
              {completedTasks}/{totalTasks} completed
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={completionPercentage} className="mb-2" />
          <p className="text-sm text-gray-600">{completionPercentage.toFixed(0)}% of today's tasks completed</p>
        </CardContent>
      </Card>

      {/* Task Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["medication", "workout", "checkup"].map((category) => {
          const categoryTasks = tasks.filter((task) => task.type === category)
          const completedCategoryTasks = categoryTasks.filter((task) => task.completed).length

          return (
            <Card key={category}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getTaskIcon(category)}
                    <span className="font-medium capitalize">{category}s</span>
                  </div>
                  <Badge variant="secondary">
                    {completedCategoryTasks}/{categoryTasks.length}
                  </Badge>
                </div>
                <Progress
                  value={categoryTasks.length > 0 ? (completedCategoryTasks / categoryTasks.length) * 100 : 0}
                  className="h-2"
                />
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Task List */}
      <Card>
        <CardHeader>
          <CardTitle>All Tasks</CardTitle>
          <CardDescription>Complete your daily health tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 border rounded-lg transition-all ${
                  task.completed ? "bg-green-50 border-green-200" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        {getTaskIcon(task.type)}
                        <h3 className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
                          {task.title}
                        </h3>
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{task.time}</span>
                        {task.completed && <CheckCircle className="h-4 w-4 text-green-600" />}
                      </div>
                    </div>
                    <p className={`text-sm ${task.completed ? "text-gray-400" : "text-gray-600"}`}>
                      {task.description}
                    </p>
                  </div>
                  {task.type === "workout" && !task.completed && (
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
