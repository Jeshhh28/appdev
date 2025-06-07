"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  Pill,
  MessageSquare,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  Plus,
} from "lucide-react"
import { TopNavigation } from "@/components/top-navigation"
import { PatientOverview } from "@/components/patient-overview"
import { WorkoutManager } from "@/components/workout-manager"
import { MedicationManager } from "@/components/medication-manager"
import { ChatInterface } from "@/components/chat-interface"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    {
      title: "Active Patients",
      value: "24",
      change: "+2 this week",
      icon: Users,
      color: "text-secondary",
    },
    {
      title: "Adherence Rate",
      value: "87%",
      change: "+5% from last month",
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      title: "Pending Alerts",
      value: "3",
      change: "2 high priority",
      icon: AlertTriangle,
      color: "text-destructive",
    },
    {
      title: "Messages",
      value: "12",
      change: "8 unread",
      icon: MessageSquare,
      color: "text-accent",
    },
  ]

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "patients", label: "Patients", icon: Users },
    { id: "workouts", label: "Workouts", icon: Dumbbell },
    { id: "medications", label: "Medications", icon: Pill },
    { id: "chat", label: "Messages", icon: MessageSquare },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation userType="doctor" userName="Dr. Smith" />

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
                  <h1 className="text-3xl font-bold">Welcome back, Dr. Smith</h1>
                  <p className="text-muted-foreground">Here's what's happening with your patients today</p>
                </div>
                <Button className="rounded-full">
                  <Plus className="h-4 w-4 mr-2" />
                  New Patient
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="health-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-full bg-opacity-10 ${stat.color.replace("text-", "bg-")}`}>
                          <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <Badge variant="outline">{stat.change}</Badge>
                      </div>
                      <div>
                        <p className="text-3xl font-bold mb-1">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Priority Patients */}
              <Card className="health-card">
                <div className="health-card-header">
                  <h2 className="health-card-title">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Priority Patients
                  </h2>
                  <Button variant="ghost" size="sm" className="rounded-full">
                    View All
                  </Button>
                </div>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {[
                      {
                        name: "Emily Wilson",
                        issue: "Missed medication for 2 consecutive days",
                        risk: "high",
                        avatar: "/placeholder.svg?height=40&width=40",
                      },
                      {
                        name: "Sarah Johnson",
                        issue: "No workout activity for 3 days",
                        risk: "medium",
                        avatar: "/placeholder.svg?height=40&width=40",
                      },
                      {
                        name: "John Smith",
                        issue: "Reported severe shoulder pain (8/10)",
                        risk: "high",
                        avatar: "/placeholder.svg?height=40&width=40",
                      },
                    ].map((patient, index) => (
                      <div key={index} className="flex items-center justify-between p-5 hover:bg-muted/50">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-muted-foreground">{patient.issue}</p>
                          </div>
                        </div>
                        <Badge variant={patient.risk === "high" ? "destructive" : "default"} className="rounded-full">
                          {patient.risk} risk
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Today's Schedule */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="health-card lg:col-span-1">
                  <div className="health-card-header">
                    <h2 className="health-card-title">
                      <Calendar className="h-5 w-5 text-primary" />
                      Today's Schedule
                    </h2>
                    <Button variant="ghost" size="sm" className="rounded-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {[
                        {
                          time: "09:00 AM",
                          title: "Patient Check-in",
                          patient: "John Smith",
                          status: "completed",
                        },
                        {
                          time: "11:30 AM",
                          title: "Review Treatment Plan",
                          patient: "Sarah Johnson",
                          status: "upcoming",
                        },
                        {
                          time: "02:00 PM",
                          title: "New Patient Consultation",
                          patient: "Mike Davis",
                          status: "upcoming",
                        },
                        {
                          time: "04:30 PM",
                          title: "Team Meeting",
                          patient: "",
                          status: "upcoming",
                        },
                      ].map((appointment, index) => (
                        <div key={index} className="flex items-start p-4 gap-4">
                          <div className="text-right min-w-[80px]">
                            <p className="text-sm font-medium">{appointment.time}</p>
                            {appointment.status === "completed" ? (
                              <Badge
                                variant="outline"
                                className="mt-1 text-xs bg-primary/10 text-primary border-primary/20"
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Done
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="mt-1 text-xs bg-muted border-muted-foreground/20">
                                <Clock className="h-3 w-3 mr-1" />
                                Upcoming
                              </Badge>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{appointment.title}</p>
                            {appointment.patient && (
                              <p className="text-sm text-muted-foreground">{appointment.patient}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Patient Adherence */}
                <Card className="health-card lg:col-span-2">
                  <div className="health-card-header">
                    <h2 className="health-card-title">
                      <TrendingUp className="h-5 w-5 text-secondary" />
                      Patient Adherence
                    </h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-full">
                        Workouts
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-full">
                        Medications
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="space-y-6">
                      {[
                        { name: "John Smith", adherence: 92 },
                        { name: "Sarah Johnson", adherence: 78 },
                        { name: "Mike Davis", adherence: 95 },
                        { name: "Emily Wilson", adherence: 65 },
                      ].map((patient, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{patient.name}</span>
                            </div>
                            <span className="text-sm font-medium">{patient.adherence}%</span>
                          </div>
                          <Progress
                            value={patient.adherence}
                            className="h-2"
                            indicatorClassName={
                              patient.adherence > 80
                                ? "bg-primary"
                                : patient.adherence > 60
                                  ? "bg-secondary"
                                  : "bg-destructive"
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="patients" className="mt-0">
            <PatientOverview />
          </TabsContent>

          <TabsContent value="workouts" className="mt-0">
            <WorkoutManager />
          </TabsContent>

          <TabsContent value="medications" className="mt-0">
            <MedicationManager />
          </TabsContent>

          <TabsContent value="chat" className="mt-0">
            <ChatInterface userType="doctor" />
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
