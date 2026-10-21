"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Info, Star, Trash2, Edit3, Camera, X } from "lucide-react";
import Image from "next/image";

interface NewsArticle {
  id: number;
  title: string;
  timestamp: string;
  starred: boolean;
}

interface ArticleData {
  headline: string;
  description: string;
  media: {
    type: "image" | "video" | null;
    url: string | null;
    file: File | null;
  };
}

export default function Component() {
  const [articleData, setArticleData] = useState<ArticleData>({
    headline: "",
    description: "",
    media: {
      type: null,
      url: null,
      file: null,
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: "FC XYZ Wins Dramatic Playoff Spot!",
      timestamp: "2 days ago",
      starred: false,
    },
    {
      id: 2,
      title: "FC XYZ Wins Dramatic Playoff Spot!",
      timestamp: "2 days ago",
      starred: false,
    },
    {
      id: 3,
      title: "FC XYZ Wins Dramatic Playoff Spot!",
      timestamp: "2 days ago",
      starred: false,
    },
    {
      id: 4,
      title: "FC XYZ Wins Dramatic Playoff Spot!",
      timestamp: "2 days ago",
      starred: false,
    },
    {
      id: 5,
      title: "FC XYZ Wins Dramatic Playoff Spot!",
      timestamp: "2 days ago",
      starred: false,
    },
    {
      id: 6,
      title: "FC XYZ Wins Dramatic Playoff Spot!",
      timestamp: "2 days ago",
      starred: false,
    },
    {
      id: 7,
      title: "FC XYZ Wins Dramatic Playoff Spot!",
      timestamp: "2 days ago",
      starred: false,
    },
  ];

  const handleMediaUpload = (file: File) => {
    if (file) {
      const isVideo = file.type.startsWith("video/");
      const isImage = file.type.startsWith("image/");

      if (isImage || isVideo) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const url = e.target?.result as string;
          setArticleData({
            ...articleData,
            media: {
              type: isVideo ? "video" : "image",
              url: url,
              file: file,
            },
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleMediaUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleMediaUpload(file);
    }
  };

  const removeMedia = () => {
    setArticleData({
      ...articleData,
      media: {
        type: null,
        url: null,
        file: null,
      },
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePost = () => {
    console.log("Posting article:", articleData);
    // Here you would typically send the data to your backend
  };

  const MediaUploadArea = () => (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {articleData.media.url ? (
        <div className="relative bg-gray-100 rounded-lg overflow-hidden min-h-[200px]">
          {articleData.media.type === "image" ? (
            <Image
              src={articleData.media.url || "/placeholder.svg"}
              alt="Uploaded content"
              fill
              className="object-contain p-2"
            />
          ) : (
            <div className="relative w-full h-[200px] bg-black rounded-lg flex items-center justify-center">
              <video
                src={articleData.media.url}
                controls
                className="max-w-full max-h-full"
              />
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                Video
              </div>
            </div>
          )}
          <button
            onClick={removeMedia}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          className="bg-gray-100 rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px] border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex items-center gap-2 mb-3">
            <Camera className="w-6 h-6 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">
              Add image / Video
            </span>
          </div>
          <span className="text-xs text-gray-400 text-center">
            Click to upload or drag & drop
            <br />
            Images: PNG, JPG, GIF up to 10MB
            <br />
            Videos: MP4, MOV, AVI up to 50MB
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex itecms-center gap-6 mb-6">
        <h1 className="text-[30px] font-semibold">News and Artcles</h1>
        <div>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.25"
              y="0.25"
              width="47.5"
              height="47.5"
              rx="23.75"
              fill="#EFF6FF"
            />
            <rect
              x="0.25"
              y="0.25"
              width="47.5"
              height="47.5"
              rx="23.75"
              stroke="#BFDBFE"
              strokeWidth="0.5"
            />
            <g clipPath="url(#clip0_2418_10938)">
              <path
                d="M24 12C17.3828 12 12 17.3828 12 24C12 30.6172 17.3828 36 24 36C30.6172 36 36 30.6163 36 24C36 17.3837 30.6172 12 24 12ZM24 34.141C18.409 34.141 13.859 29.592 13.859 24C13.859 18.408 18.409 13.859 24 13.859C29.591 13.859 34.141 18.408 34.141 24C34.141 29.592 29.592 34.141 24 34.141Z"
                fill="black"
                fillOpacity="0.9"
              />
              <path
                d="M28.6475 22.9864H24.9295V19.2684C24.9295 18.7553 24.514 18.3389 23.9999 18.3389C23.4859 18.3389 23.0704 18.7553 23.0704 19.2684V22.9864H19.3524C18.8384 22.9864 18.4229 23.4029 18.4229 23.916C18.4229 24.4291 18.8384 24.8455 19.3524 24.8455H23.0704V28.5635C23.0704 29.0766 23.4859 29.4931 23.9999 29.4931C24.514 29.4931 24.9295 29.0766 24.9295 28.5635V24.8455H28.6475C29.1615 24.8455 29.577 24.4291 29.577 23.916C29.577 23.4029 29.1615 22.9864 28.6475 22.9864Z"
                fill="black"
                fillOpacity="0.9"
              />
            </g>
            <defs>
              <clipPath id="clip0_2418_10938">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(12 12)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div className="flex ">
        <div className="space-y-2">
          {newsArticles.map((article) => (
            <div
              key={article.id}
              className="flex  items-center gap-4 justify-between "
            >
              <div className="bg-gray-50 w-[550px] rounded-lg p-2 border border-gray-200 flex justify-between items-center">
                <div className="flex flex-col items-start">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-base text-start text-[#1E40AF]">
                      {article.timestamp}
                    </div>
                  </div>
                  <div className="text-base font-medium text-gray-700 mb-1">
                    {article.title}
                  </div>
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

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Article Form */}
            <div className="space-y-6">
              {/* Headline */}
              <div className=" rounded-lg p-6 flex items-center">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm text-gray-600 w-24">
                    Headline / Title
                  </span>
                </div>
                <Input
                  value={articleData.headline}
                  onChange={(e) =>
                    setArticleData({ ...articleData, headline: e.target.value })
                  }
                  placeholder="Write here"
                  className="w-full text-base py-4 px-2 bg-[#EFF6FF] border-gray-500 shadow-none  focus-visible:ring-0"
                />
              </div>

              {/* Description */}
              <div className="   flex items-center rounded-lg p-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm text-gray-600 w-24">
                    Description
                  </span>
                </div>
                <textarea
                  value={articleData.description}
                  onChange={(e) =>
                    setArticleData({
                      ...articleData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Write here"
                  className="w-full text-base bg-[#EFF6FF] border-gray-500 border rounded px-2 shadow-none p-0 focus-visible:ring- resize-none min-h-[100px] "
                />
              </div>

              {/* Media Upload */}
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-gray-600 w-24">
                    Image / Video
                  </span>
                </div>
                <MediaUploadArea />
              </div>
            </div>

            {/* Post Button */}
            <div className="flex justify-center mt-8">
              <Button
                onClick={handlePost}
                className="bg-[#203463] hover:bg-slate-800 text-white px-12 py-3 rounded-full text-base font-medium"
              >
                Post Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
