"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Pill, Clock, CheckCircle, AlertTriangle, Calendar, Bell } from "lucide-react"

export function MedicationTracker() {
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Ibuprofen",
      dosage: "400mg",
      frequency: "Twice daily",
      times: ["8:00 AM", "8:00 PM"],
      taken: [true, false],
      sideEffects: ["Nausea", "Dizziness"],
      nextDose: "8:00 PM",
      daysRemaining: 5,
    },
    {
      id: 2,
      name: "Physical Therapy Supplement",
      dosage: "1 tablet",
      frequency: "Once daily",
      times: ["2:00 PM"],
      taken: [false],
      sideEffects: ["Mild stomach upset"],
      nextDose: "2:00 PM",
      daysRemaining: 28,
    },
  ])

  const markAsTaken = (medId: number, timeIndex: number) => {
    setMedications(
      medications.map((med) =>
        med.id === medId
          ? {
              ...med,
              taken: med.taken.map((taken, index) => (index === timeIndex ? true : taken)),
            }
          : med,
      ),
    )
  }

  const getTodayAdherence = () => {
    const totalDoses = medications.reduce((sum, med) => sum + med.times.length, 0)
    const takenDoses = medications.reduce((sum, med) => sum + med.taken.filter(Boolean).length, 0)
    return totalDoses > 0 ? (takenDoses / totalDoses) * 100 : 0
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Medication Tracker</h2>
        <p className="text-gray-600">Track your medications and monitor adherence</p>
      </div>

      {/* Today's Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Today's Medications</span>
            <Badge variant="outline">
              {medications.reduce((sum, med) => sum + med.taken.filter(Boolean).length, 0)}/
              {medications.reduce((sum, med) => sum + med.times.length, 0)} taken
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Adherence Rate</span>
                <span className="text-sm text-gray-600">{getTodayAdherence().toFixed(0)}%</span>
              </div>
              <Progress value={getTodayAdherence()} className="mb-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Taken</p>
                  <p className="text-xs text-gray-600">
                    {medications.reduce((sum, med) => sum + med.taken.filter(Boolean).length, 0)} doses
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium">Pending</p>
                  <p className="text-xs text-gray-600">
                    {medications.reduce((sum, med) => sum + med.taken.filter((taken) => !taken).length, 0)} doses
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Next Dose</p>
                  <p className="text-xs text-gray-600">
                    {medications.find((med) => med.taken.includes(false))?.nextDose || "All done!"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medication List */}
      <div className="space-y-4">
        {medications.map((medication) => (
          <Card key={medication.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <Pill className="h-5 w-5 mr-2 text-blue-600" />
                  {medication.name}
                </CardTitle>
                <Badge variant="outline">{medication.dosage}</Badge>
              </div>
              <CardDescription>
                {medication.frequency} • {medication.daysRemaining} days remaining
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Dose Schedule */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Today's Schedule</h4>
                  <div className="space-y-2">
                    {medication.times.map((time, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={medication.taken[index]}
                            onCheckedChange={() => markAsTaken(medication.id, index)}
                          />
                          <div>
                            <p className="font-medium">{time}</p>
                            <p className="text-sm text-gray-600">{medication.dosage}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {medication.taken[index] ? (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Taken
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Side Effects */}
                {medication.sideEffects.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <h4 className="text-sm font-medium">Possible Side Effects</h4>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {medication.sideEffects.map((effect, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {effect}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4 mr-1" />
                    Set Reminder
                  </Button>
                  <Button variant="outline" size="sm">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Report Side Effect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Weekly Adherence
          </CardTitle>
          <CardDescription>Your medication adherence over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
              const adherence = Math.floor(Math.random() * 40) + 60 // Mock data
              return (
                <div key={day} className="text-center">
                  <p className="text-xs text-gray-600 mb-1">{day}</p>
                  <div className="h-16 bg-gray-100 rounded flex items-end justify-center">
                    <div
                      className={`w-full rounded ${adherence >= 80 ? "bg-green-500" : adherence >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                      style={{ height: `${adherence}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1">{adherence}%</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
