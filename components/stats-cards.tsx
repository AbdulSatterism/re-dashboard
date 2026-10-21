'use client';
import { Card, CardContent } from "@/components/ui/card";
import { useAllUsersQuery, useAllUserStartQuery } from "@/redux/feature/userSlice";

export function StatsCards() {

  const { data } = useAllUserStartQuery({ page: 1, limit: 10 });
  console.log("datasss", data);

  const stats = [
    {
      title: "Total users",
      value: data?.meta?.total || 0,
      icon: (
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="80" height="80" rx="16" fill="#1A1A1A" />
          <path
            opacity="0.587821"
            d="M50.0002 32.8887C52.7614 32.8889 55 35.2765 55.0002 38.2217C55.0002 41.1671 52.7615 43.5554 50.0002 43.5557C47.2388 43.5557 45.0002 41.1672 45.0002 38.2217C45.0005 35.2764 47.239 32.8887 50.0002 32.8887ZM35.0002 24C38.682 24.0002 41.6663 27.1841 41.6663 31.1113C41.6662 35.0385 38.6819 38.2225 35.0002 38.2227C31.3184 38.2227 28.3334 35.0386 28.3333 31.1113C28.3333 27.184 31.3183 24 35.0002 24Z"
            fill="white"
          />
          <path
            d="M34.9727 41.7778C42.9523 41.778 49.5077 45.8547 49.9962 54.5776C50.0156 54.9251 49.9963 56.0005 48.7442 56.0005H21.213C20.7951 56.0005 19.9662 55.0389 20.0011 54.5767C20.6471 46.0919 27.1037 41.7778 34.9727 41.7778ZM49.336 45.3364C55.013 45.403 59.6482 48.4628 59.9972 54.9331C60.0112 55.1937 59.9971 56.0005 59.0929 56.0005H52.6661C52.6661 51.9996 51.4271 48.3072 49.336 45.3364Z"
            fill="white"
          />
        </svg>
      ),
      bgColor: "bg-blue-600",
    },


  ];

  return (
    <div className="flex justify-between items-center gap-6 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="w-full">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg `}>
                {/* <stat.icon className="w-6 h-6 text-white" /> */}
                {stat.icon}
              </div>
              <div className="space-y-4">
                <p className="text-[20px] text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-[#413E3E] text-[48px]">
                  {stat.value}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
