"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Search, Filter, MoreHorizontal, Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function PatientOverview() {
  const [searchTerm, setSearchTerm] = useState("")

  const patients = [
    {
      id: 1,
      name: "John Smith",
      age: 45,
      condition: "Post-Surgery Recovery",
      adherence: 92,
      status: "active",
      lastActivity: "2 hours ago",
      riskScore: "low",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      age: 38,
      condition: "Physical Therapy",
      adherence: 78,
      status: "attention",
      lastActivity: "1 day ago",
      riskScore: "medium",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Mike Davis",
      age: 52,
      condition: "Cardiac Rehabilitation",
      adherence: 95,
      status: "active",
      lastActivity: "30 minutes ago",
      riskScore: "low",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Emily Wilson",
      age: 29,
      condition: "Injury Recovery",
      adherence: 65,
      status: "risk",
      lastActivity: "3 days ago",
      riskScore: "high",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary/10 text-primary"
      case "attention":
        return "bg-secondary/10 text-secondary"
      case "risk":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "attention":
        return <Clock className="h-4 w-4" />
      case "risk":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Patients</h1>
          <p className="text-muted-foreground">Manage and monitor your patients</p>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {patients.map((patient) => (
          <Card key={patient.id} className="health-card">
            <CardContent className="p-0">
              <div className="p-5 flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{patient.name}</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Message</DropdownMenuItem>
                        <DropdownMenuItem>Assign Workout</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Update Plan</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {patient.condition} • Age {patient.age}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={`rounded-full ${getStatusColor(patient.status)}`}>
                    {getStatusIcon(patient.status)}
                    <span className="ml-1 capitalize">{patient.status}</span>
                  </Badge>
                  <span className="text-xs text-muted-foreground">Last active: {patient.lastActivity}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Adherence</span>
                    <span className="font-medium">{patient.adherence}%</span>
                  </div>
                  <Progress
                    value={patient.adherence}
                    className="h-1.5"
                    indicatorClassName={
                      patient.adherence > 80 ? "bg-primary" : patient.adherence > 60 ? "bg-secondary" : "bg-destructive"
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={`rounded-full ${
                      patient.riskScore === "high"
                        ? "border-destructive/30 text-destructive"
                        : patient.riskScore === "medium"
                          ? "border-secondary/30 text-secondary"
                          : "border-primary/30 text-primary"
                    }`}
                  >
                    {patient.riskScore} risk
                  </Badge>
                  <Button size="sm" className="rounded-full">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
