"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Info, X } from "lucide-react";
import Image from "next/image";

interface TeamData {
  teamName: string;
  leagueName: string;
  image: string | null;
}

export default function Component() {
  const [team1Data, setTeam1Data] = useState<TeamData>({
    teamName: "Xyz",
    leagueName: "Xyz",
    image: null,
  });

  const [team2Data, setTeam2Data] = useState<TeamData>({
    teamName: "Xyz",
    leagueName: "Xyz",
    image: null,
  });

  const team1FileRef = useRef<HTMLInputElement>(null);
  const team2FileRef = useRef<HTMLInputElement>(null);

  const matches = [
    { id: 1, time: "80:45", live: true },
    { id: 2, time: "80:46", live: true },
    { id: 3, time: "80:45", live: true },
    { id: 4, time: "80:45", live: true },
    { id: 5, time: "80:45", live: true },
    { id: 6, time: "80:45", live: true },
  ];

  const handleImageUpload = (file: File, team: "team1" | "team2") => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (team === "team1") {
          setTeam1Data({ ...team1Data, image: imageUrl });
        } else {
          setTeam2Data({ ...team2Data, image: imageUrl });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    team: "team1" | "team2"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file, team);
    }
  };

  const removeImage = (team: "team1" | "team2") => {
    if (team === "team1") {
      setTeam1Data({ ...team1Data, image: null });
      if (team1FileRef.current) {
        team1FileRef.current.value = "";
      }
    } else {
      setTeam2Data({ ...team2Data, image: null });
      if (team2FileRef.current) {
        team2FileRef.current.value = "";
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, team: "team1" | "team2") => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file, team);
    }
  };

  const ImageUploadArea = ({
    team,
    image,
    onFileSelect,
    onRemove,
    fileRef,
  }: {
    team: "team1" | "team2";
    image: string | null;
    onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
    fileRef: React.RefObject<HTMLInputElement | null>;
  }) => (
    <div className="relative">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={onFileSelect}
        className="hidden"
      />

      {image ? (
        <div className="relative bg-gray-100 rounded-lg overflow-hidden min-h-[120px]">
          <Image
            src={image || "/placeholder.svg"}
            alt={`${team} logo`}
            fill
            className="object-contain p-2"
          />
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div
          className="bg-gray-100 rounded-lg p-8 flex flex-col items-center justify-center min-h-[120px] border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer"
          onClick={() => fileRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, team)}
        >
          <Camera className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-600 mb-1">Add image</span>
          <span className="text-xs text-gray-400 text-center">
            Click to upload or drag & drop
            <br />
            PNG, JPG, GIF up to 10MB
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 border border-gray-200 rounded-xl">
      {/* Left Sidebar */}
      <div className="w-2/5 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Matches</h2>
          <Info className="w-4 h-4 text-gray-400" />
        </div>

        <div className="mb-4">
          <h3 className="text-[20px] font-medium text-gray-700 mb-3">
            Ongoing
          </h3>

          <div className="space-y-2">
            {matches.map((match) => (
              <div
                key={match.id}
                className="flex  items-center gap-4 justify-between "
              >
                <div className="bg-gray-50 w-[550px] rounded-lg p-3 border border-gray-200 flex justify-between items-center">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs text-gray-500">Final</div>
                    </div>
                    <div className="text-base font-medium text-gray-700 mb-1">
                      LALIGA
                    </div>
                  </div>

                  {/* <div className="flex items-center justify-between"> */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">MLS</span>
                    <div className="">
                      <Image
                        src="/team.svg"
                        alt="logo"
                        width={20}
                        height={40}
                      />
                    </div>
                    <span className="text-sm font-bold">0:0</span>
                    <div className="">
                      <Image
                        src="/team.svg"
                        alt="logo"
                        width={20}
                        height={40}
                      />
                    </div>
                    <span className="text-sm font-semibold">MLS</span>
                  </div>
                  <div>
                    <span className="text-xs text-blue-600 font-medium">
                      {match.time}
                    </span>
                  </div>

                  <div className="">
                    {match.live && (
                      <Badge
                        // variant="destructive"
                        className="text-xs px-1.5 py-0.5 h-5 bg-white text-[#9F1239]"
                      >
                        Live
                      </Badge>
                    )}
                  </div>
                  {/* </div> */}
                </div>
                <div className="">
                  <div className="flex items-center gap-6 border border-gray-200 py-6 px-2 rounded-lg">
                    <svg
                      width="25"
                      height="26"
                      viewBox="0 0 25 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.7514 10.5013L15.1514 3.90127C14.8514 3.60127 14.4014 3.60127 14.1014 3.90127L11.7014 6.30127C11.3264 6.67627 11.4764 7.12627 11.7014 7.35127L12.2264 7.87627L9.97642 10.1263C8.85142 9.90127 5.77642 9.37627 4.12642 11.0263C3.82642 11.3263 3.82642 11.7763 4.12642 12.0763L8.40142 16.3513L3.67642 21.0763C3.37642 21.3763 3.37642 21.8263 3.67642 22.1263C3.97642 22.4263 4.50142 22.3513 4.72642 22.1263L9.45142 17.4013L13.7264 21.6763C14.1764 22.0513 14.6264 21.9013 14.7764 21.6763C16.4264 20.0263 15.9014 16.9513 15.6764 15.8263L17.9264 13.5763L18.4514 14.1013C18.7514 14.4013 19.2014 14.4013 19.5014 14.1013L21.9014 11.7013C22.0514 11.2513 22.0514 10.8013 21.7514 10.5013ZM18.8264 12.3763L18.3014 11.8513C18.0014 11.5513 17.5514 11.5513 17.2514 11.8513L14.1764 15.0013C13.9514 15.2263 13.8764 15.4513 13.9514 15.7513C14.1764 16.5763 14.5514 18.6013 13.9514 19.9513L5.70142 11.7013C6.97642 11.1013 9.07642 11.4763 9.90142 11.7013C10.1264 11.7763 10.4264 11.7013 10.6514 11.4763L13.7264 8.40127C14.1764 7.95127 13.9514 7.57627 13.7264 7.35127L13.2014 6.82627L14.6264 5.47627L20.1764 11.0263L18.8264 12.3763Z"
                        fill="black"
                        fillOpacity="0.9"
                      />
                    </svg>

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 6.99951C18.7348 6.99951 18.4804 7.10487 18.2929 7.29241C18.1054 7.47994 18 7.7343 18 7.99951V19.1905C17.9713 19.6962 17.744 20.1701 17.3675 20.5089C16.991 20.8477 16.4959 21.0241 15.99 20.9995H8.01C7.5041 21.0241 7.00898 20.8477 6.63251 20.5089C6.25603 20.1701 6.02869 19.6962 6 19.1905V7.99951C6 7.7343 5.89464 7.47994 5.70711 7.29241C5.51957 7.10487 5.26522 6.99951 5 6.99951C4.73478 6.99951 4.48043 7.10487 4.29289 7.29241C4.10536 7.47994 4 7.7343 4 7.99951V19.1905C4.02854 20.2267 4.46658 21.2094 5.21818 21.9234C5.96978 22.6373 6.97367 23.0242 8.01 22.9995H15.99C17.0263 23.0242 18.0302 22.6373 18.7818 21.9234C19.5334 21.2094 19.9715 20.2267 20 19.1905V7.99951C20 7.7343 19.8946 7.47994 19.7071 7.29241C19.5196 7.10487 19.2652 6.99951 19 6.99951ZM20 3.99951H16V1.99951C16 1.7343 15.8946 1.47994 15.7071 1.2924C15.5196 1.10487 15.2652 0.999512 15 0.999512H9C8.73478 0.999512 8.48043 1.10487 8.29289 1.2924C8.10536 1.47994 8 1.7343 8 1.99951V3.99951H4C3.73478 3.99951 3.48043 4.10487 3.29289 4.29241C3.10536 4.47994 3 4.7343 3 4.99951C3 5.26473 3.10536 5.51908 3.29289 5.70662C3.48043 5.89415 3.73478 5.99951 4 5.99951H20C20.2652 5.99951 20.5196 5.89415 20.7071 5.70662C20.8946 5.51908 21 5.26473 21 4.99951C21 4.7343 20.8946 4.47994 20.7071 4.29241C20.5196 4.10487 20.2652 3.99951 20 3.99951ZM10 3.99951V2.99951H14V3.99951H10Z"
                        fill="black"
                        fillOpacity="0.9"
                      />
                      <path
                        d="M11 16.9995V9.99951C11 9.7343 10.8946 9.47994 10.7071 9.29241C10.5196 9.10487 10.2652 8.99951 10 8.99951C9.73478 8.99951 9.48043 9.10487 9.29289 9.29241C9.10536 9.47994 9 9.7343 9 9.99951V16.9995C9 17.2647 9.10536 17.5191 9.29289 17.7066C9.48043 17.8942 9.73478 17.9995 10 17.9995C10.2652 17.9995 10.5196 17.8942 10.7071 17.7066C10.8946 17.5191 11 17.2647 11 16.9995ZM15 16.9995V9.99951C15 9.7343 14.8946 9.47994 14.7071 9.29241C14.5196 9.10487 14.2652 8.99951 14 8.99951C13.7348 8.99951 13.4804 9.10487 13.2929 9.29241C13.1054 9.47994 13 9.7343 13 9.99951V16.9995C13 17.2647 13.1054 17.5191 13.2929 17.7066C13.4804 17.8942 13.7348 17.9995 14 17.9995C14.2652 17.9995 14.5196 17.8942 14.7071 17.7066C14.8946 17.5191 15 17.2647 15 16.9995Z"
                        fill="black"
                        fillOpacity="0.9"
                      />
                    </svg>

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.51 18.6353H4.62L7.55 18.3653C7.96 18.3253 8.34 18.1453 8.63 17.8553L19.69 6.79529C20.21 6.27529 20.5 5.58529 20.5 4.85529C20.5 4.12529 20.21 3.43529 19.69 2.91529L18.98 2.20529C17.94 1.16529 16.13 1.16529 15.09 2.20529L13.68 3.61529L4.04 13.2553C3.75 13.5453 3.57 13.9253 3.54 14.3353L3.27 17.2653C3.24 17.6353 3.37 17.9953 3.63 18.2653C3.87 18.5053 4.18 18.6353 4.51 18.6353ZM17.04 2.89529C17.36 2.89529 17.68 3.01529 17.92 3.26529L18.63 3.97529C18.7468 4.09014 18.8396 4.2271 18.903 4.37819C18.9663 4.52928 18.9989 4.69147 18.9989 4.85529C18.9989 5.01912 18.9663 5.18131 18.903 5.3324C18.8396 5.48348 18.7468 5.62044 18.63 5.73529L17.75 6.61529L15.28 4.14529L16.16 3.26529C16.4 3.02529 16.72 2.89529 17.04 2.89529ZM5.03 14.4753C5.03 14.4153 5.06 14.3653 5.1 14.3253L14.21 5.20529L16.68 7.67529L7.57 16.7853C7.57 16.7853 7.47 16.8553 7.42 16.8553L4.79 17.0953L5.03 14.4653V14.4753ZM22.5 21.8253C22.5 22.2353 22.16 22.5753 21.75 22.5753H1.75C1.34 22.5753 1 22.2353 1 21.8253C1 21.4153 1.34 21.0753 1.75 21.0753H21.75C22.16 21.0753 22.5 21.4153 22.5 21.8253Z"
                        fill="black"
                        fillOpacity="0.9"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-end mb-6">
            <Button className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-6">
              Add / Edit
            </Button>
          </div>

          {/* Teams Section */}
          <div className="flex justify-between items-center gap- mb-8">
            {/* Team 1 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Team 1
              </h3>

              <ImageUploadArea
                team="team1"
                image={team1Data.image}
                onFileSelect={(e) => handleFileSelect(e, "team1")}
                onRemove={() => removeImage("team1")}
                fileRef={team1FileRef}
              />

              <div className="space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  {/* <span className="text-sm text-gray-600 w-20">Xyz</span> */}
                  <span className="text-xs text-gray-400 mx-4">Team Name</span>
                  <Input
                    value={team1Data.teamName}
                    onChange={(e) =>
                      setTeam1Data({ ...team1Data, teamName: e.target.value })
                    }
                    className="flex-1 text-sm"
                  />
                </div>

                <div className="flex items-center justify-between">
                  {/* <span className="text-sm text-gray-600 w-20">Xyz</span> */}
                  <span className="text-xs text-gray-400 mx-4">
                    League Name
                  </span>
                  <Input
                    value={team1Data.leagueName}
                    onChange={(e) =>
                      setTeam1Data({ ...team1Data, leagueName: e.target.value })
                    }
                    className="flex-1 text-sm"
                  />
                </div>
              </div>
            </div>
            <h1 className="text-2xl font-normal text-center">Flags</h1>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Team 2
              </h3>

              <ImageUploadArea
                team="team2"
                image={team2Data.image}
                onFileSelect={(e) => handleFileSelect(e, "team2")}
                onRemove={() => removeImage("team2")}
                fileRef={team2FileRef}
              />

              <div className="space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  {/* <span className="text-sm text-gray-600 w-20">Xyz</span> */}
                  <span className="text-xs text-gray-400 mx-4">Team Name</span>
                  <Input
                    value={team2Data.teamName}
                    onChange={(e) =>
                      setTeam2Data({ ...team2Data, teamName: e.target.value })
                    }
                    className="flex-1 text-sm"
                  />
                </div>

                <div className="flex items-center justify-between">
                  {/* <span className="text-sm text-gray-600 w-20">Xyz</span> */}
                  <span className="text-xs text-gray-400 mx-4">
                    League Name
                  </span>
                  <Input
                    value={team2Data.leagueName}
                    onChange={(e) =>
                      setTeam2Data({ ...team2Data, leagueName: e.target.value })
                    }
                    className="flex-1 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Match Summary */}
          <Card className="bg-[#EFF6FF] p-6 mb-6">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-xs text-gray-500 mb-1">Phase</div>
                <div className="text-sm font-medium text-gray-900">Final</div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Score</div>
                <div className="text-lg font-bold text-gray-900">0:0</div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Time</div>
                <div className="text-sm font-medium text-gray-900">80:88</div>
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-center">
            <Button className="bg-[#203463] hover:bg-slate-800 text-white px-12 py-2 rounded-full">
              Save now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
