"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Barley", value: 30, color: "#3b82f6" },
  { name: "Ball", value: 25, color: "#ef4444" },
  { name: "Accessories", value: 20, color: "#f59e0b" },
  { name: "Gadget", value: 15, color: "#10b981" },
  { name: "Youth", value: 10, color: "#8b5cf6" },
]

export function BestSellingProduct() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Best selling product</CardTitle>
        <p className="text-sm text-gray-600">1 Jan 24 - 5 Jan 25</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center mt-4">
          <p className="text-lg font-semibold">1240</p>
          <p className="text-sm text-gray-600">Sun Sold</p>
        </div>
      </CardContent>
    </Card>
  )
}
