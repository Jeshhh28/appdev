"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, TrendingDown, Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export function AnalyticsDashboard() {
  const insights = [
    {
      title: "High Adherence Patients",
      value: "18/24",
      percentage: 75,
      trend: "up",
      description: "Patients with >80% adherence rate",
    },
    {
      title: "Common Side Effects",
      value: "Nausea (45%)",
      percentage: 45,
      trend: "stable",
      description: "Most reported side effect this week",
    },
    {
      title: "Workout Completion",
      value: "87%",
      percentage: 87,
      trend: "up",
      description: "Average completion rate",
    },
    {
      title: "Medication Adherence",
      value: "92%",
      percentage: 92,
      trend: "up",
      description: "Overall medication compliance",
    },
  ]

  const alerts = [
    {
      type: "high",
      message: "Plan B leads to 30% more fatigue complaints",
      patients: 8,
      action: "Review plan effectiveness",
    },
    {
      type: "medium",
      message: "3 patients missed medications for 2+ days",
      patients: 3,
      action: "Send reminder notifications",
    },
    {
      type: "low",
      message: "Workout completion rate increased by 15%",
      patients: 24,
      action: "Continue current approach",
    },
  ]

  const patientRiskScores = [
    { name: "Emily Wilson", score: 85, risk: "high", factors: ["Missed medications", "Low activity", "Side effects"] },
    { name: "Sarah Johnson", score: 65, risk: "medium", factors: ["Irregular workouts", "Mild complaints"] },
    { name: "John Smith", score: 25, risk: "low", factors: ["Good adherence", "Regular activity"] },
    { name: "Mike Davis", score: 15, risk: "low", factors: ["Excellent compliance", "No complaints"] },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <p className="text-gray-600">AI-powered insights and patient analytics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{insight.title}</h3>
                {insight.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : insight.trend === "down" ? (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                ) : (
                  <Activity className="h-4 w-4 text-gray-600" />
                )}
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold">{insight.value}</p>
                <Progress value={insight.percentage} className="h-2" />
                <p className="text-xs text-gray-500">{insight.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI-Generated Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" />
              AI-Generated Insights
            </CardTitle>
            <CardDescription>Automated analysis and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          alert.type === "high" ? "destructive" : alert.type === "medium" ? "default" : "secondary"
                        }
                      >
                        {alert.type} priority
                      </Badge>
                      <span className="text-sm text-gray-600">{alert.patients} patients</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium mb-1">{alert.message}</p>
                  <p className="text-xs text-gray-600">Recommended: {alert.action}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patient Risk Scoring */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Patient Risk Scores
            </CardTitle>
            <CardDescription>AI-calculated risk assessment for each patient</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patientRiskScores.map((patient, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{patient.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Risk Score: {patient.score}</span>
                      <Badge
                        variant={
                          patient.risk === "high" ? "destructive" : patient.risk === "medium" ? "default" : "secondary"
                        }
                      >
                        {patient.risk}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={patient.score} className="mb-2" />
                  <div className="flex flex-wrap gap-1">
                    {patient.factors.map((factor, factorIndex) => (
                      <Badge key={factorIndex} variant="outline" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Symptom & Side Effect Trends</CardTitle>
          <CardDescription>Pattern analysis across treatment plans</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Most Common Symptoms</h3>
              {[
                { symptom: "Nausea", percentage: 45, trend: "stable" },
                { symptom: "Fatigue", percentage: 38, trend: "down" },
                { symptom: "Headache", percentage: 32, trend: "up" },
                { symptom: "Dizziness", percentage: 28, trend: "stable" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{item.symptom}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{item.percentage}%</span>
                    {item.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-red-500" />
                    ) : item.trend === "down" ? (
                      <TrendingDown className="h-3 w-3 text-green-500" />
                    ) : (
                      <Activity className="h-3 w-3 text-gray-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Plan Performance</h3>
              {[
                { plan: "Plan A", success: 92, patients: 12 },
                { plan: "Plan B", success: 78, patients: 8 },
                { plan: "Plan C", success: 85, patients: 4 },
              ].map((plan, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{plan.plan}</span>
                    <span className="text-sm font-medium">{plan.success}%</span>
                  </div>
                  <Progress value={plan.success} className="h-2" />
                  <span className="text-xs text-gray-500">{plan.patients} patients</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Behavioral Patterns</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Morning workouts: 85% completion</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">Evening meds: 78% adherence</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm">Weekend activity drops 25%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
