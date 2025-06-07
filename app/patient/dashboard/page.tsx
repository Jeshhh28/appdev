"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  LayoutDashboard,
  CheckSquare,
  Dumbbell,
  Pill,
  MessageSquare,
  Bot,
  Clock,
  Calendar,
  Heart,
  Play,
} from "lucide-react"
import { TopNavigation } from "@/components/top-navigation"
import { TaskList } from "@/components/task-list"
import { ChatInterface } from "@/components/chat-interface"
import { SymptomReporter } from "@/components/symptom-reporter"
import { MedicationTracker } from "@/components/medication-tracker"
import { WorkoutViewer } from "@/components/workout-viewer"

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const todayStats = {
    workoutsCompleted: 2,
    workoutsTotal: 3,
    medicationsTaken: 4,
    medicationsTotal: 5,
    adherenceScore: 85,
  }

  const menuItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "tasks", label: "My Tasks", icon: CheckSquare },
    { id: "workouts", label: "Workouts", icon: Dumbbell },
    { id: "medications", label: "Medications", icon: Pill },
    { id: "chat", label: "Messages", icon: MessageSquare },
    { id: "symptoms", label: "Report Symptoms", icon: Bot },
  ]

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation userType="patient" userName="John Smith" />

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Navigation Tabs */}
          <div className="mb-8">
            <TabsList className="w-full justify-start overflow-x-auto py-1 px-1 gap-1">
              {menuItems.map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Dashboard Content */}
          <TabsContent value="overview" className="mt-0">
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">Good morning, John!</h1>
                  <p className="text-muted-foreground">Let's track your progress today</p>
                </div>
                <Button className="rounded-full">
                  <Bot className="h-4 w-4 mr-2" />
                  Report Symptoms
                </Button>
              </div>

              {/* Progress Summary */}
              <Card className="health-card">
                <div className="health-card-header">
                  <h2 className="health-card-title">
                    <Heart className="h-5 w-5 text-primary" />
                    Today's Progress
                  </h2>
                  <Badge variant="outline" className="rounded-full">
                    {todayStats.adherenceScore}% adherence
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Workouts */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-secondary/10">
                            <Dumbbell className="h-5 w-5 text-secondary" />
                          </div>
                          <span className="font-medium">Workouts</span>
                        </div>
                        <span className="text-lg font-bold">
                          {todayStats.workoutsCompleted}/{todayStats.workoutsTotal}
                        </span>
                      </div>
                      <Progress
                        value={(todayStats.workoutsCompleted / todayStats.workoutsTotal) * 100}
                        className="h-2"
                        indicatorClassName="bg-secondary"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">1 remaining</span>
                        <Button variant="ghost" size="sm" className="h-8 gap-1 text-secondary">
                          <Play className="h-3 w-3" />
                          Start Next
                        </Button>
                      </div>
                    </div>

                    {/* Medications */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-primary/10">
                            <Pill className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-medium">Medications</span>
                        </div>
                        <span className="text-lg font-bold">
                          {todayStats.medicationsTaken}/{todayStats.medicationsTotal}
                        </span>
                      </div>
                      <Progress
                        value={(todayStats.medicationsTaken / todayStats.medicationsTotal) * 100}
                        className="h-2"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Next dose at 8:00 PM</span>
                        <Button variant="ghost" size="sm" className="h-8 gap-1 text-primary">
                          View All
                        </Button>
                      </div>
                    </div>

                    {/* Weekly Trend */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-accent/10">
                            <Calendar className="h-5 w-5 text-accent" />
                          </div>
                          <span className="font-medium">Weekly Trend</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-end h-12">
                        {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => {
                          const height = Math.floor(Math.random() * 40) + 60
                          return (
                            <div key={day} className="flex flex-col items-center">
                              <div
                                className={`w-6 rounded-t-sm ${i === 3 ? "bg-primary" : "bg-primary/30"}`}
                                style={{ height: `${height}%` }}
                              ></div>
                              <span className="text-xs mt-1 text-muted-foreground">{day}</span>
                            </div>
                          )
                        })}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Week of June 1</span>
                        <Button variant="ghost" size="sm" className="h-8 gap-1 text-accent">
                          Full Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Tasks */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="health-card lg:col-span-2">
                  <div className="health-card-header">
                    <h2 className="health-card-title">
                      <Clock className="h-5 w-5 text-secondary" />
                      Upcoming Tasks
                    </h2>
                    <Button variant="outline" size="sm" className="rounded-full">
                      View All
                    </Button>
                  </div>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {[
                        {
                          id: 1,
                          type: "medication",
                          title: "Evening Medication",
                          time: "8:00 PM",
                          description: "Ibuprofen 400mg",
                          icon: Pill,
                          iconColor: "text-primary",
                        },
                        {
                          id: 2,
                          type: "workout",
                          title: "Physical Therapy Session",
                          time: "9:00 AM Tomorrow",
                          description: "Upper body strength training",
                          icon: Dumbbell,
                          iconColor: "text-secondary",
                        },
                        {
                          id: 3,
                          type: "checkup",
                          title: "Weekly Check-in",
                          time: "Tomorrow",
                          description: "Video call with Dr. Smith",
                          icon: Calendar,
                          iconColor: "text-accent",
                        },
                      ].map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-5 hover:bg-muted/50">
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-full bg-opacity-10 ${task.iconColor.replace("text-", "bg-")}`}>
                              <task.icon className={`h-5 w-5 ${task.iconColor}`} />
                            </div>
                            <div>
                              <p className="font-medium">{task.title}</p>
                              <p className="text-sm text-muted-foreground">{task.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant="outline" className="rounded-full">
                              {task.time}
                            </Badge>
                            <Button size="sm" className="rounded-full">
                              {task.type === "workout" ? (
                                <>
                                  <Play className="h-3 w-3 mr-1" />
                                  Start
                                </>
                              ) : (
                                "View"
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Doctor's Notes */}
                <Card className="health-card">
                  <div className="health-card-header">
                    <h2 className="health-card-title">
                      <MessageSquare className="h-5 w-5 text-accent" />
                      Doctor's Notes
                    </h2>
                  </div>
                  <CardContent className="p-5">
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted">
                        <p className="text-sm mb-2">
                          Your progress is looking good! Remember to complete today's shoulder exercises and take your
                          evening medication.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Dr. Smith • Today</span>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            Reply
                          </Button>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full rounded-full">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message Doctor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-24 flex-col gap-2 rounded-xl border-2"
                  onClick={() => setActiveTab("symptoms")}
                >
                  <div className="p-2 rounded-full bg-accent/10">
                    <Bot className="h-5 w-5 text-accent" />
                  </div>
                  <span>Report Symptoms</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex-col gap-2 rounded-xl border-2"
                  onClick={() => setActiveTab("workouts")}
                >
                  <div className="p-2 rounded-full bg-secondary/10">
                    <Dumbbell className="h-5 w-5 text-secondary" />
                  </div>
                  <span>View Workouts</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex-col gap-2 rounded-xl border-2"
                  onClick={() => setActiveTab("medications")}
                >
                  <div className="p-2 rounded-full bg-primary/10">
                    <Pill className="h-5 w-5 text-primary" />
                  </div>
                  <span>Track Medications</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex-col gap-2 rounded-xl border-2"
                  onClick={() => setActiveTab("chat")}
                >
                  <div className="p-2 rounded-full bg-destructive/10">
                    <MessageSquare className="h-5 w-5 text-destructive" />
                  </div>
                  <span>Message Doctor</span>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="mt-0">
            <TaskList />
          </TabsContent>

          <TabsContent value="workouts" className="mt-0">
            <WorkoutViewer />
          </TabsContent>

          <TabsContent value="medications" className="mt-0">
            <MedicationTracker />
          </TabsContent>

          <TabsContent value="chat" className="mt-0">
            <ChatInterface userType="patient" />
          </TabsContent>

          <TabsContent value="symptoms" className="mt-0">
            <SymptomReporter />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
