"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pill, Clock, Users, Calendar, Edit, Trash2, AlertTriangle } from "lucide-react"

export function MedicationManager() {
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Ibuprofen",
      dosage: "400mg",
      frequency: "Twice daily",
      duration: "7 days",
      assignedTo: "All Patients",
      sideEffects: ["Nausea", "Dizziness"],
      createdDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Physical Therapy Supplement",
      dosage: "1 tablet",
      frequency: "Once daily",
      duration: "30 days",
      assignedTo: "8 Patients",
      sideEffects: ["Mild stomach upset"],
      createdDate: "2024-01-14",
    },
  ])

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
    assignTo: "all",
    sideEffects: "",
  })

  const handleCreateMedication = () => {
    const medication = {
      id: medications.length + 1,
      ...newMedication,
      assignedTo: newMedication.assignTo === "all" ? "All Patients" : "Selected Patients",
      sideEffects: newMedication.sideEffects
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      createdDate: new Date().toISOString().split("T")[0],
    }
    setMedications([...medications, medication])
    setNewMedication({ name: "", dosage: "", frequency: "", duration: "", assignTo: "all", sideEffects: "" })
    setIsCreateOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Medication Management</h2>
          <p className="text-gray-600">Create and manage medication plans for your patients</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Medication Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Medication Plan</DialogTitle>
              <DialogDescription>Add a new medication plan for your patients</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Medication Name</Label>
                <Input
                  id="name"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                  placeholder="Enter medication name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input
                    id="dosage"
                    value={newMedication.dosage}
                    onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                    placeholder="e.g., 400mg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select
                    value={newMedication.frequency}
                    onValueChange={(value) => setNewMedication({ ...newMedication, frequency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Once daily">Once daily</SelectItem>
                      <SelectItem value="Twice daily">Twice daily</SelectItem>
                      <SelectItem value="Three times daily">Three times daily</SelectItem>
                      <SelectItem value="As needed">As needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={newMedication.duration}
                  onChange={(e) => setNewMedication({ ...newMedication, duration: e.target.value })}
                  placeholder="e.g., 7 days"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sideEffects">Possible Side Effects</Label>
                <Input
                  id="sideEffects"
                  value={newMedication.sideEffects}
                  onChange={(e) => setNewMedication({ ...newMedication, sideEffects: e.target.value })}
                  placeholder="Separate with commas"
                />
              </div>
              <div className="space-y-2">
                <Label>Assign To</Label>
                <Select
                  value={newMedication.assignTo}
                  onValueChange={(value) => setNewMedication({ ...newMedication, assignTo: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Patients</SelectItem>
                    <SelectItem value="selected">Selected Patients</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreateMedication} className="w-full">
                Create Medication Plan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <CardDescription>Medication plan and tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{medication.frequency}</span>
                  </div>
                  <span className="text-gray-600">{medication.duration}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{medication.assignedTo}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Created {medication.createdDate}</span>
                </div>
                {medication.sideEffects.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-1 text-sm text-amber-600">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Side Effects:</span>
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
                <div className="flex items-center space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
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
