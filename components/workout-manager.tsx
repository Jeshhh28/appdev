"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Play, Users, Calendar, Clock, Plus } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function WorkoutManager() {
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      title: "Upper Body Strength Training",
      description: "Focus on arm and shoulder rehabilitation exercises",
      duration: "15 minutes",
      difficulty: "Beginner",
      assignedTo: "All Patients",
      createdDate: "2024-01-15",
      videoUrl: "/placeholder.svg?height=200&width=300",
    },
  ]);

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    title: "",
    description: "",
    duration: "",
    difficulty: "Beginner",
    assignTo: "all",
  });

  const handleUploadWorkout = () => {
    const workout = {
      id: workouts.length + 1,
      ...newWorkout,
      assignedTo:
        newWorkout.assignTo === "all" ? "All Patients" : "Selected Patients",
      createdDate: new Date().toISOString().split("T")[0],
      videoUrl: "/placeholder.svg?height=200&width=300",
    };
    setWorkouts([...workouts, workout]);
    setNewWorkout({
      title: "",
      description: "",
      duration: "",
      difficulty: "Beginner",
      assignTo: "all",
    });
    setIsUploadOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Workout Management</h1>
          <p className="text-muted-foreground">
            Upload and manage workout videos for your patients
          </p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full">
              <Plus className="h-4 w-4 mr-2" />
              Upload Workout
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Upload New Workout</DialogTitle>
              <DialogDescription>
                Add a new workout video for your patients
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Workout Title</Label>
                <Input
                  id="title"
                  value={newWorkout.title}
                  onChange={(e) =>
                    setNewWorkout({ ...newWorkout, title: e.target.value })
                  }
                  placeholder="Enter workout title"
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newWorkout.description}
                  onChange={(e) =>
                    setNewWorkout({ ...newWorkout, description: e.target.value })
                  }
                  placeholder="Describe the workout"
                  className="rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={newWorkout.duration}
                    onChange={(e) =>
                      setNewWorkout({ ...newWorkout, duration: e.target.value })
                    }
                    placeholder="e.g., 15 minutes"
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={newWorkout.difficulty}
                    onValueChange={(value) =>
                      setNewWorkout({ ...newWorkout, difficulty: value })
                    }
                  >
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Video Upload</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    MP4, MOV up to 100MB
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Assign To</Label>
                <Select
                  value={newWorkout.assignTo}
                  onValueChange={(value) =>
                    setNewWorkout({ ...newWorkout, assignTo: value })
                  }
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Patients</SelectItem>
                    <SelectItem value="selected">Selected Patients</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleUploadWorkout} className="w-full rounded-lg">
                Upload Workout
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all" className="rounded-full">
            All Workouts
          </TabsTrigger>
          <TabsTrigger value="recent" className="rounded-full">
            Recently Added
          </TabsTrigger>
          <TabsTrigger value="popular" className="rounded-full">
            Most Assigned
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <Card key={workout.id} className="health-card overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <img
                    src={workout.videoUrl || "/placeholder.svg"}
                    alt={workout.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Button
                      size="icon"
                      className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                    >
                      <Play className="h-5 w-5 text-white" />
                    </Button>
                  </div>
                  <Badge className="absolute top-3 right-3 rounded-full">
                    {workout.difficulty}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold mb-2">{workout.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {workout.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{workout.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{workout.assignedTo}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm col-span-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Created {workout.createdDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
