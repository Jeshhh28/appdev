"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, User, AlertTriangle, Heart, Brain, Activity, Thermometer } from "lucide-react"

export function SymptomReporter() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "AI Assistant",
      content:
        "Hello! I'm here to help you report any symptoms or side effects you're experiencing. How are you feeling today?",
      time: "10:00 AM",
      isAI: true,
    },
  ])
  const [currentMessage, setCurrentMessage] = useState("")
  const [symptomSeverity, setSymptomSeverity] = useState([5])
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])

  const commonSymptoms = [
    { name: "Headache", icon: Brain, category: "neurological" },
    { name: "Nausea", icon: Activity, category: "digestive" },
    { name: "Dizziness", icon: Brain, category: "neurological" },
    { name: "Fatigue", icon: Heart, category: "general" },
    { name: "Fever", icon: Thermometer, category: "general" },
    { name: "Pain", icon: AlertTriangle, category: "general" },
    { name: "Shortness of breath", icon: Heart, category: "respiratory" },
    { name: "Muscle weakness", icon: Activity, category: "muscular" },
  ]

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "You",
        content: currentMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isAI: false,
      }
      setMessages([...messages, newMessage])

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          sender: "AI Assistant",
          content: generateAIResponse(currentMessage),
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isAI: true,
        }
        setMessages((prev) => [...prev, aiResponse])
      }, 1000)

      setCurrentMessage("")
    }
  }

  const generateAIResponse = (userMessage: string) => {
    const responses = [
      "I understand you're experiencing some discomfort. Can you tell me more about when this started?",
      "Thank you for sharing that information. On a scale of 1-10, how would you rate the severity?",
      "That's helpful information. Have you noticed any patterns or triggers for these symptoms?",
      "I've recorded your symptoms. I recommend discussing this with your doctor. Would you like me to schedule a check-in?",
      "Based on what you've described, this could be related to your current treatment. Let me flag this for your healthcare provider.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">AI Symptom Reporter</h2>
        <p className="text-gray-600">Report symptoms and side effects with our AI assistant</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Symptom Selection */}
        <Card className="border-none shadow-md">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-lg">Quick Report</CardTitle>
            <CardDescription className="text-purple-100">Select common symptoms you're experiencing</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Common Symptoms</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {commonSymptoms.map((symptom) => (
                    <Button
                      key={symptom.name}
                      variant={selectedSymptoms.includes(symptom.name) ? "default" : "outline"}
                      size="sm"
                      className={`justify-start h-auto p-2 ${
                        selectedSymptoms.includes(symptom.name)
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "hover:border-purple-300 hover:bg-purple-50"
                      }`}
                      onClick={() => toggleSymptom(symptom.name)}
                    >
                      <symptom.icon className="h-4 w-4 mr-2" />
                      <span className="text-xs">{symptom.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {selectedSymptoms.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Severity (1-10)</Label>
                  <div className="mt-2">
                    <Slider
                      value={symptomSeverity}
                      onValueChange={setSymptomSeverity}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Mild</span>
                      <span className="font-medium">{symptomSeverity[0]}</span>
                      <span>Severe</span>
                    </div>
                  </div>
                </div>
              )}

              <Button className="w-full bg-purple-600 hover:bg-purple-700" disabled={selectedSymptoms.length === 0}>
                Submit Quick Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Chat Interface */}
        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              AI Symptom Assistant
            </CardTitle>
            <CardDescription className="text-blue-100">
              Describe your symptoms in detail for personalized guidance
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px] p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isAI ? "justify-start" : "justify-end"}`}>
                    <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md`}>
                      {message.isAI && (
                        <div className="flex-shrink-0">
                          <Bot className="h-6 w-6 text-blue-600 mt-1" />
                        </div>
                      )}
                      <div
                        className={`px-4 py-2 rounded-lg shadow-sm ${
                          message.isAI
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                            : "bg-white text-gray-900 border border-gray-200"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.isAI ? "text-blue-100" : "text-gray-500"}`}>
                          {message.time}
                        </p>
                      </div>
                      {!message.isAI && (
                        <div className="flex-shrink-0">
                          <User className="h-6 w-6 text-gray-600 mt-1" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t p-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Describe your symptoms..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card className="border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
          <CardTitle>Recent Symptom Reports</CardTitle>
          <CardDescription className="text-green-100">Your symptom history and AI analysis</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[
              {
                date: "Today, 2:30 PM",
                symptoms: ["Headache", "Nausea"],
                severity: 6,
                aiAnalysis: "Possible medication side effect. Recommend hydration and rest.",
                status: "Reviewed by Dr. Smith",
              },
              {
                date: "Yesterday, 10:15 AM",
                symptoms: ["Fatigue", "Muscle weakness"],
                severity: 4,
                aiAnalysis: "Normal recovery symptoms. Continue current treatment plan.",
                status: "Pending review",
              },
            ].map((report, index) => (
              <div key={index} className="p-4 border rounded-lg bg-white shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{report.date}</span>
                  <Badge variant={report.status.includes("Pending") ? "secondary" : "default"}>{report.status}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Symptoms:</span>
                    <div className="flex space-x-1">
                      {report.symptoms.map((symptom) => (
                        <Badge key={symptom} variant="outline" className="text-xs">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">Severity: {report.severity}/10</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-blue-600">AI Analysis: </span>
                    <span className="text-gray-700">{report.aiAnalysis}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
