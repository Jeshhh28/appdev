"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, Activity, Pill, MessageSquare, X, Eye } from "lucide-react"

export function AlertsPanel() {
  const alerts = [
    {
      id: 1,
      type: "medication",
      priority: "high",
      patient: "Emily Wilson",
      message: "Missed medication for 2 consecutive days",
      time: "2 hours ago",
      action: "Contact patient",
    },
    {
      id: 2,
      type: "activity",
      priority: "medium",
      patient: "Sarah Johnson",
      message: "No workout activity for 3 days",
      time: "5 hours ago",
      action: "Send reminder",
    },
    {
      id: 3,
      type: "symptom",
      priority: "high",
      patient: "John Smith",
      message: "Reported severe shoulder pain (8/10)",
      time: "1 day ago",
      action: "Schedule check-up",
    },
    {
      id: 4,
      type: "message",
      priority: "low",
      patient: "Mike Davis",
      message: "Unread message about workout difficulty",
      time: "2 days ago",
      action: "Respond to message",
    },
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "medication":
        return <Pill className="h-4 w-4" />
      case "activity":
        return <Activity className="h-4 w-4" />
      case "symptom":
        return <AlertTriangle className="h-4 w-4" />
      case "message":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" />
          Active Alerts
        </CardTitle>
        <CardDescription>Patient alerts requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getAlertIcon(alert.type)}
                  <Badge variant={getPriorityColor(alert.priority) as any}>{alert.priority}</Badge>
                  <span className="font-medium">{alert.patient}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{alert.time}</span>
                <Button variant="outline" size="sm">
                  {alert.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
