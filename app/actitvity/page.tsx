"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react"

interface ActivityItem {
  id: number
  timestamp: string
  message: string
  status: "read" | "unread"
}

// Sample data for both columns
const leftActivities: ActivityItem[] = [
  { id: 1, timestamp: "5 mins ago", message: "Match LA Galaxy vs NY Red Bulls started", status: "unread" },
  { id: 3, timestamp: "5 mins ago", message: "Match LA Galaxy vs NY Red Bulls started", status: "read" },
  { id: 5, timestamp: "5 mins ago", message: "Match LA Galaxy vs NY Red Bulls started", status: "read" },
  { id: 7, timestamp: "5 mins ago", message: "Match LA Galaxy vs NY Red Bulls started", status: "read" },
  { id: 9, timestamp: "5 mins ago", message: "Match LA Galaxy vs NY Red Bulls started", status: "read" },
  { id: 11, timestamp: "5 mins ago", message: "Match LA Galaxy vs NY Red Bulls started", status: "read" },
]

const rightActivities: ActivityItem[] = [
  { id: 2, timestamp: "2 mins ago", message: "Match LA Galaxy vs NY Red Bulls started", status: "read" },
  { id: 4, timestamp: "2 mins ago", message: "Match LA Galaxy vs NY Red Bulls started", status: "read" },
  { id: 6, timestamp: "2 mins ago", message: "Match LA Galaxy vs NY Red Bulls started", status: "unread" },
  { id: 8, timestamp: "2 mins ago", message: "Match LA Galaxy vs NY Red Bulls started", status: "read" },
  { id: 10, timestamp: "2 mins ago", message: "Match LA Galaxy vs NY Red Bulls started", status: "read" },
  { id: 12, timestamp: "2 mins ago", message: "Match LA Galaxy vs NY Red Bulls started", status: "read" },
]

// Activity Item component to avoid duplication
const ActivityItem = ({ activity }: { activity: ActivityItem }) => {
  const handleDelete = (id: number) => {
    console.log(`Deleting activity ${id}`)
    // Implement delete functionality here
  }

  const handleStatusToggle = (id: number) => {
    console.log(`Toggling status for activity ${id}`)
    // Implement status toggle functionality here
  }

  return (
    <div
      className={`flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 ${
        activity.status === "unread" ? "bg-red-50" : "bg-white"
      }`}
    >
      <div className="flex items-center space-x-4 flex-1">
        <span className="text-sm text-gray-500 min-w-[80px]">{activity.timestamp}</span>
        <span className="text-sm text-gray-900 flex-1">{activity.message}</span>
      </div>
      <div className="flex items-center space-x-3">
        <Badge
          variant={activity.status === "unread" ? "destructive" : "secondary"}
          className={`text-xs px-3 py-1 ${
            activity.status === "unread"
              ? "bg-red-100 text-red-700 hover:bg-red-100"
              : "bg-gray-100 text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleStatusToggle(activity.id)}
        >
          {activity.status === "unread" ? "Unread" : "Read"}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
          onClick={() => handleDelete(activity.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default function Component() {
  return (
    <div className="w-full  mx-auto p-4">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Left Column */}
            <div className="flex-1 border-r border-gray-100">
              {leftActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>

            {/* Right Column */}
            <div className="flex-1">
              {rightActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center space-x-2 p-6 border-t border-gray-100">
            <Button variant="outline" size="sm" className="flex items-center space-x-1 px-3 py-2">
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>

            <div className="flex items-center space-x-1">
              <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                1
              </Button>
              <span className="px-2 text-gray-500">...</span>
              <Button variant="default" size="sm" className="w-8 h-8 p-0 bg-gray-800 hover:bg-gray-700">
                12
              </Button>
            </div>

            <Button variant="outline" size="sm" className="flex items-center space-x-1 px-3 py-2">
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
