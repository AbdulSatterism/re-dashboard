
// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {  useAllUserStartQuery } from "@/redux/feature/userSlice";
// import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
// import { useMemo } from "react";

// export function UserGrowthChart() {
//   const { data: userData, isLoading } = useAllUserStartQuery({ page: 1, limit: 100 });
//   console.log(userData)
//   // const { data } = useAllUserStartQuery({ page: 1, limit: 10 });


//   // Process the API data to count users per month
//   const chartData = useMemo(() => {
//     if (!userData?.data) return [];

//     // Initialize months
//     const months = [
//       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
//     ];

//     // Count users by month
//     const counts = new Array(12).fill(0);
//     userData.data.forEach((user) => {
//       if (user.createdAt) {
//         const monthIndex = new Date(user.createdAt).getMonth(); // 0–11
//         counts[monthIndex] += 1;
//       }
//     });

//     // Build formatted data for the chart
//     return months.map((month, index) => ({
//       month,
//       value: counts[index],
//     }));
//   }, [userData]);

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex items-center justify-between">
//           <div>
//             <CardTitle>User Growth</CardTitle>
//           </div>
//         </div>
//         <div className="text-center mt-2">
//           <p className="text-2xl font-bold">
//             Total {userData?.meta?.total || 0}
//           </p>
//         </div>
//       </CardHeader>

//       <CardContent>
//         {isLoading ? (
//           <p className="text-center text-gray-500 py-10">Loading chart...</p>
//         ) : (
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart data={chartData}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value" fill="#1A1A1A" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         )}
//       </CardContent>
//     </Card>
//   );
// }
"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAllUserStartQuery } from "@/redux/feature/userSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function UserGrowthChart() {
  const { data: userData, isLoading } = useAllUserStartQuery({
    page: 1,
    limit: 100,
  });

  // ✅ Get all available years
  const years = useMemo(() => {
    if (!userData?.data) return [];
    return Array.from(
      new Set(
        userData.data.map((u: any) =>
          new Date(u.createdAt).getFullYear()
        )
      )
    ).sort();
  }, [userData]);

  // ✅ Default selected year (latest)
  const [selectedYear, setSelectedYear] = useState<number | null>(
    years.length ? (years[years.length - 1] as number) : 2025
  );

  // ✅ MONTH-WISE DATA FOR SELECTED YEAR
  const chartData = useMemo(() => {
    if (!userData?.data || !selectedYear) return [];

    const monthCounts = new Array(12).fill(0);

    userData.data.forEach((user: any) => {
      const date = new Date(user.createdAt);
      if (date.getFullYear() === selectedYear) {
        monthCounts[date.getMonth()] += 1;
      }
    });

    return MONTHS.map((month, index) => ({
      month,
      users: monthCounts[index],
    }));
  }, [userData, selectedYear]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            User Growth ({selectedYear})
          </CardTitle>

          {/* Year Selector */}
          <select
            className="border rounded-md px-2 py-1 text-sm"
            value={selectedYear ?? ""}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {years.map((year) => (
              <option key={year as number} value={year as number}>
                {year as number}
              </option>
            ))}
          </select>
        </div>
      </CardHeader>
             
      <CardContent>
        {isLoading ? (
          <p className="text-center py-10 text-gray-500">
            Loading chart...
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="users"
                fill="#1A1A1A"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
