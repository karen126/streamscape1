"use client"

import type React from "react"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Bell, MessageSquare, Search, Send, Settings, User, Video, Paperclip, Smile } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { TrialBanner } from "../trial-banner"

interface Message {
  id: number
  text: string
  sender: "user" | "other"
  timestamp: Date
}

interface Contact {
  id: number
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  online: boolean
  unread: number
}

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [message, setMessage] = useState("")
  const [activeContact, setActiveContact] = useState<Contact | null>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const [trialStartDate] = useState(() => {
    // En una aplicación real, esto vendría de la base de datos
    // Para esta demo, usamos una fecha 2 días antes de hoy para simular una prueba que está por expirar
    const date = new Date()
    date.setDate(date.getDate() - 2)
    return date
  })

  const contacts: Contact[] = [
    {
      id: 1,
      name: "Jessica Smith",
      avatar: "/placeholder.svg?height=40&width=40&text=JS",
      lastMessage: "Hey there! How are you doing today?",
      lastMessageTime: "10:15 AM",
      online: true,
      unread: 2,
    },
    {
      id: 2,
      name: "Michael Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=MJ",
      lastMessage: "Did you see the latest movie?",
      lastMessageTime: "Yesterday",
      online: false,
      unread: 0,
    },
    {
      id: 3,
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40&text=SW",
      lastMessage: "Let's meet up this weekend!",
      lastMessageTime: "Yesterday",
      online: true,
      unread: 1,
    },
    {
      id: 4,
      name: "David Brown",
      avatar: "/placeholder.svg?height=40&width=40&text=DB",
      lastMessage: "Thanks for the recommendation!",
      lastMessageTime: "Monday",
      online: false,
      unread: 0,
    },
    {
      id: 5,
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40&text=ED",
      lastMessage: "How's your day going?",
      lastMessageTime: "Monday",
      online: true,
      unread: 0,
    },
    {
      id: 6,
      name: "Robert Wilson",
      avatar: "/placeholder.svg?height=40&width=40&text=RW",
      lastMessage: "I'll send you the details later.",
      lastMessageTime: "Last week",
      online: false,
      unread: 0,
    },
    {
      id: 7,
      name: "Jennifer Taylor",
      avatar: "/placeholder.svg?height=40&width=40&text=JT",
      lastMessage: "Can't wait to see you!",
      lastMessageTime: "Last week",
      online: true,
      unread: 0,
    },
  ]

  const initialMessages: Message[] = [
    {
      id: 1,
      text: "Hey there! How are you doing today?",
      sender: "other",
      timestamp: new Date(new Date().setHours(new Date().getHours() - 2)),
    },
    {
      id: 2,
      text: "I'm doing great! Just checking out this new app. How about you?",
      sender: "user",
      timestamp: new Date(new Date().setHours(new Date().getHours() - 2, new Date().getMinutes() - 58)),
    },
    {
      id: 3,
      text: "I'm good too! This app is pretty cool. Do you want to try a video call?",
      sender: "other",
      timestamp: new Date(new Date().setHours(new Date().getHours() - 2, new Date().getMinutes() - 55)),
    },
    {
      id: 4,
      text: "Sure, that sounds great! Let me just finish up something and I'll be ready in a few minutes.",
      sender: "user",
      timestamp: new Date(new Date().setHours(new Date().getHours() - 2, new Date().getMinutes() - 50)),
    },
  ]

  useEffect(() => {
    // Set initial active contact and messages
    if (contacts.length > 0 && !activeContact) {
      setActiveContact(contacts[0])
      setMessages(initialMessages)
    }
  }, [contacts])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate reply after a delay
    setTimeout(() => {
      const replyMessage: Message = {
        id: messages.length + 2,
        text: "Thanks for your message! I'll get back to you soon.",
        sender: "other",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, replyMessage])
    }, 2000)
  }

  const handleContactSelect = (contact: Contact) => {
    setActiveContact(contact)
    // Reset messages for different contacts
    if (contact.id !== 1) {
      setMessages([
        {
          id: 1,
          text: `Hi there! I'm ${contact.name}.`,
          sender: "other",
          timestamp: new Date(new Date().setHours(new Date().getHours() - 1)),
        },
        {
          id: 2,
          text: `Nice to meet you, ${contact.name}! How are you today?`,
          sender: "user",
          timestamp: new Date(new Date().setHours(new Date().getHours() - 1, new Date().getMinutes() - 55)),
        },
      ])
    } else {
      setMessages(initialMessages)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleAttachment = () => {
    toast({
      title: "Attachment",
      description: "File attachment feature coming soon!",
    })
  }

  const handleEmojiPicker = () => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen)
  }

  const addEmoji = (emoji: string) => {
    setMessage((prev) => prev + emoji)
    setIsEmojiPickerOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
        <Link className="flex items-center gap-2 font-semibold" href="/dashboard">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            StreamScape
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <form className="relative hidden md:flex">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-64 rounded-lg bg-background pl-8 md:w-80" />
          </form>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-600" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[240px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-2 text-sm font-medium">
                <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
                  <User className="h-4 w-4" />
                  Profile
                </Link>
                <Link
                  href="/dashboard/messages"
                  className="flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-primary-foreground"
                >
                  <MessageSquare className="h-4 w-4" />
                  Messages
                </Link>
                <Link href="/dashboard/calls" className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
                  <Video className="h-4 w-4" />
                  Video Calls
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="p-4">
              <TrialBanner trialStartDate={trialStartDate} />
            </div>
          </div>
          <div className="grid flex-1 grid-cols-[260px_1fr]">
            <div className="border-r">
              <div className="p-4">
                <form>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search messages..."
                      className="w-full rounded-lg bg-background pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="px-2">
                <div className="space-y-2">
                  {contacts.map((contact) => (
                    <button
                      key={contact.id}
                      className={`flex w-full items-center gap-2 rounded-lg p-2 text-left transition-colors ${activeContact?.id === contact.id ? "bg-muted" : "hover:bg-muted"}`}
                      onClick={() => handleContactSelect(contact)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={contact.avatar} alt={contact.name} />
                          <AvatarFallback>
                            {contact.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                        )}
                      </div>
                      <div className="flex-1 truncate">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{contact.name}</span>
                          <span className="text-xs text-muted-foreground">{contact.lastMessageTime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground truncate max-w-[150px]">
                            {contact.lastMessage}
                          </div>
                          {contact.unread > 0 && (
                            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                              {contact.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              {activeContact ? (
                <>
                  <div className="flex items-center gap-4 border-b p-4">
                    <Avatar>
                      <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                      <AvatarFallback>
                        {activeContact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{activeContact.name}</div>
                      <div className="text-xs text-muted-foreground">{activeContact.online ? "Online" : "Offline"}</div>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <Button size="icon" variant="ghost" onClick={() => setIsVideoModalOpen(true)}>
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto p-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : ""}`}
                        >
                          {msg.sender === "other" && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                              <AvatarFallback>
                                {activeContact.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`rounded-lg ${msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"} p-3 max-w-[70%] break-words animate-fadeIn`}
                          >
                            <p className="text-sm">{msg.text}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{formatTime(msg.timestamp)}</span>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                  <div className="border-t p-4">
                    <form className="flex items-center gap-2" onSubmit={handleSendMessage}>
                      <Button type="button" size="icon" variant="ghost" onClick={handleAttachment}>
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <div className="relative flex-1">
                        <Input
                          className="pr-10"
                          placeholder="Type a message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="absolute right-0 top-0 h-full"
                          onClick={handleEmojiPicker}
                        >
                          <Smile className="h-4 w-4" />
                        </Button>
                        {isEmojiPickerOpen && (
                          <div className="absolute bottom-full right-0 mb-2 p-2 bg-background border rounded-md shadow-md grid grid-cols-6 gap-2">
                            {["😊", "😂", "❤️", "👍", "🎉", "🔥", "😍", "🙏", "👋", "🤔", "😎", "🥳"].map((emoji) => (
                              <button
                                key={emoji}
                                type="button"
                                className="text-xl hover:bg-muted p-1 rounded"
                                onClick={() => addEmoji(emoji)}
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <Button type="submit" size="icon">
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Your Messages</h3>
                  <p className="text-muted-foreground text-center max-w-xs">Select a conversation or start a new one</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Video Call Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Video Call</DialogTitle>
            <DialogDescription>{activeContact && `Connecting to ${activeContact.name}...`}</DialogDescription>
          </DialogHeader>
          <div className="relative aspect-video bg-black rounded-md overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {activeContact && (
                <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                  {activeContact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}
            </div>
            <div className="absolute bottom-4 right-4 h-24 w-32 bg-gray-800 rounded-md overflow-hidden border-2 border-white">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white">You</span>
              </div>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              <Button size="sm" variant="destructive" onClick={() => setIsVideoModalOpen(false)}>
                End Call
              </Button>
              <Button size="sm" variant="secondary">
                Mute
              </Button>
              <Button size="sm" variant="secondary">
                <Video className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
