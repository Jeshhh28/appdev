"use client"

import { Button } from "@/components/ui/button"
import { LayoutDashboard, CheckSquare, Dumbbell, Pill, MessageSquare, Bot, Settings, LogOut, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

interface PatientSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function PatientSidebar({ activeTab, setActiveTab }: PatientSidebarProps) {
  const router = useRouter()

  const menuItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "tasks", label: "My Tasks", icon: CheckSquare },
    { id: "workouts", label: "Workouts", icon: Dumbbell },
    { id: "medications", label: "Medications", icon: Pill },
    { id: "chat", label: "Messages", icon: MessageSquare },
    { id: "symptoms", label: "Report Symptoms", icon: Bot },
  ]

  return (
    <div className="w-64 bg-[hsl(var(--sidebar-bg))] text-[hsl(var(--sidebar-fg))] flex flex-col shadow-lg">
      <div className="p-6 border-b border-[hsl(var(--sidebar-border))]">
        <div className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-[hsl(var(--primary))]" />
          <div>
            <h2 className="text-lg font-semibold text-white">HealthCare</h2>
            <p className="text-sm text-gray-300">Patient Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={`w-full justify-start ${
              activeTab === item.id
                ? "bg-[hsl(var(--sidebar-active))] text-white"
                : "text-gray-300 hover:bg-[hsl(var(--sidebar-hover))] hover:text-white"
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="h-4 w-4 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="p-4 border-t border-[hsl(var(--sidebar-border))] space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:bg-[hsl(var(--sidebar-hover))] hover:text-white"
        >
          <Settings className="h-4 w-4 mr-3" />
          Settings
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-400 hover:bg-[hsl(var(--sidebar-hover))] hover:text-red-300"
          onClick={() => router.push("/")}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}
