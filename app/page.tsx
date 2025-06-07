"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Shield, Users, Activity, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<"doctor" | "patient">("patient")
  const router = useRouter()

  const handleLogin = () => {
    // Mock authentication
    if (userType === "doctor") {
      router.push("/doctor/dashboard")
    } else {
      router.push("/patient/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="bg-gradient-to-br from-primary to-secondary md:w-1/2 p-8 flex flex-col justify-center items-center text-white">
        <div className="max-w-md text-center md:text-left">
          <div className="mb-6 inline-block p-4 bg-white/10 rounded-full">
            <Heart className="h-12 w-12" />
          </div>
          <h1 className="text-4xl font-bold mb-4">HealthCare Connect</h1>
          <p className="text-xl mb-8">Intelligent care platform connecting doctors and patients</p>

          <div className="grid grid-cols-2 gap-6 mt-12">
            <div className="flex flex-col items-center md:items-start">
              <div className="bg-white/10 p-3 rounded-full mb-3">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="font-medium mb-1">Smart Tracking</h3>
              <p className="text-sm opacity-80">Monitor progress and adherence</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="bg-white/10 p-3 rounded-full mb-3">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-medium mb-1">AI Insights</h3>
              <p className="text-sm opacity-80">Personalized care recommendations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login */}
      <div className="md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <Tabs value={userType} onValueChange={(value) => setUserType(value as "doctor" | "patient")} className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="patient" className="rounded-full">
                <Users className="h-4 w-4 mr-2" />
                Patient
              </TabsTrigger>
              <TabsTrigger value="doctor" className="rounded-full">
                <Shield className="h-4 w-4 mr-2" />
                Doctor
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-full"
              />
            </div>
            <Button onClick={handleLogin} className="w-full rounded-full">
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="text-center">
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
