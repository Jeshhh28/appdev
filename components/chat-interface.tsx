"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Paperclip, Search, Phone, Video, MoreHorizontal } from "lucide-react"

interface ChatInterfaceProps {
  userType: "doctor" | "patient"
}

export function ChatInterface({ userType }: ChatInterfaceProps) {
  const [selectedChat, setSelectedChat] = useState(1)
  const [message, setMessage] = useState("")

  const chats =
    userType === "doctor"
      ? [
          {
            id: 1,
            name: "John Smith",
            lastMessage: "I completed today's exercises but felt some pain in my shoulder",
            time: "2 min ago",
            unread: 2,
            avatar: "/placeholder.svg?height=40&width=40",
            status: "online",
          },
          {
            id: 2,
            name: "Sarah Johnson",
            lastMessage: "Thank you for the new workout plan!",
            time: "1 hour ago",
            unread: 0,
            avatar: "/placeholder.svg?height=40&width=40",
            status: "offline",
          },
          {
            id: 3,
            name: "Mike Davis",
            lastMessage: "When should I take the evening medication?",
            time: "3 hours ago",
            unread: 1,
            avatar: "/placeholder.svg?height=40&width=40",
            status: "online",
          },
        ]
      : [
          {
            id: 1,
            name: "Dr. Smith",
            lastMessage: "How are you feeling after yesterday's session?",
            time: "30 min ago",
            unread: 1,
            avatar: "/placeholder.svg?height=40&width=40",
            status: "online",
          },
        ]

  const messages = [
    {
      id: 1,
      sender: userType === "doctor" ? "John Smith" : "Dr. Smith",
      content: "I completed today's exercises but felt some pain in my shoulder",
      time: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: userType === "doctor" ? "Dr. Smith" : "John Smith",
      content: "Thank you for letting me know. Can you describe the pain? Is it sharp or dull?",
      time: "10:32 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: userType === "doctor" ? "John Smith" : "Dr. Smith",
      content: "It's more of a dull ache, especially when I lift my arm above my head",
      time: "10:35 AM",
      isOwn: false,
    },
    {
      id: 4,
      sender: userType === "doctor" ? "Dr. Smith" : "John Smith",
      content:
        "That's normal for this stage of recovery. Let's reduce the intensity for the next few days. I'll update your plan.",
      time: "10:37 AM",
      isOwn: true,
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add message logic here
      setMessage("")
    }
  }

  const selectedChatData = chats.find((chat) => chat.id === selectedChat)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Chat List */}
      <Card className="lg:col-span-1 border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="text-lg">Messages</CardTitle>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px]">
            <div className="space-y-1">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 border-b ${
                    selectedChat === chat.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {chat.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {chat.status === "online" && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{chat.name}</h3>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && <Badge className="bg-blue-600 text-white text-xs">{chat.unread}</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="lg:col-span-2 border-none shadow-md">
        <CardHeader className="border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={selectedChatData?.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {selectedChatData?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{selectedChatData?.name}</h3>
                <p className="text-sm text-blue-100">
                  {selectedChatData?.status === "online" ? "Online" : "Last seen 2 hours ago"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px] p-4 bg-gray-50">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                      msg.isOwn ? "bg-blue-600 text-white" : "bg-white text-gray-900 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.isOwn ? "text-blue-100" : "text-gray-500"}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t p-4">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
