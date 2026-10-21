"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronLeft,
  ChevronRight,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";

interface CommunityPost {
  id: number;
  avatar: string;
  userName: string;
  title: string;
  date: string;
  time: string;
  reaction: number;
  comment: number;
  vote: string | number;
  selected: boolean;
}

export default function Component() {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: 1,
      avatar: "/users.png",
      userName: "Xyz",
      title: "FC XYZ Wins Dramatic Playoff Spot!",
      date: "01 Jan 2025",
      time: "6.00 Pm",
      reaction: 150,
      comment: 100,
      vote: "N/A",
      selected: false,
    },
    {
      id: 2,
      avatar: "/users.png",
      userName: "Xyz",
      title: "FC XYZ Wins Dramatic Playoff Spot!",
      date: "01 Jan 2025",
      time: "6.00 Pm",
      reaction: 150,
      comment: 100,
      vote: "N/A",
      selected: false,
    },
    {
      id: 3,
      avatar: "/users.png",
      userName: "Xyz",
      title: "FC XYZ Wins Dramatic Playoff Spot!",
      date: "01 Jan 2025",
      time: "6.00 Pm",
      reaction: 150,
      comment: 100,
      vote: "Post",
      selected: false,
    },
    {
      id: 4,
      avatar: "/users.png",
      userName: "Xyz",
      title: "FC XYZ Wins Dramatic Playoff Spot!",
      date: "01 Jan 2025",
      time: "6.00 Pm",
      reaction: 150,
      comment: 100,
      vote: "N/A",
      selected: false,
    },
    {
      id: 5,
      avatar: "/users.png",
      userName: "Xyz",
      title: "FC XYZ Wins Dramatic Playoff Spot!",
      date: "01 Jan 2025",
      time: "6.00 Pm",
      reaction: 150,
      comment: 100,
      vote: "Post",
      selected: false,
    },
    {
      id: 6,
      avatar: "/users.png",
      userName: "Xyz",
      title: "FC XYZ Wins Dramatic Playoff Spot!",
      date: "01 Jan 2025",
      time: "6.00 Pm",
      reaction: 150,
      comment: 100,
      vote: 150,
      selected: false,
    },
  ]);

  const [currentPage, setCurrentPage] = useState(12);
  const totalPages = 12;

  const handleSelectPost = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, selected: !post.selected } : post
      )
    );
  };

  const handleSelectAll = () => {
    const allSelected = posts.every((post) => post.selected);
    setPosts(posts.map((post) => ({ ...post, selected: !allSelected })));
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    // Back button
    buttons.push(
      <Button
        key="back"
        variant="outline"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back
      </Button>
    );

    // Page 1
    buttons.push(
      <Button
        key={1}
        variant={currentPage === 1 ? "default" : "outline"}
        onClick={() => handlePageChange(1)}
        className={`w-10 h-10 text-sm font-medium rounded-md ${
          currentPage === 1
            ? "bg-slate-700 text-white hover:bg-slate-800"
            : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
        }`}
      >
        1
      </Button>
    );

    // Ellipsis
    if (currentPage > 3) {
      buttons.push(
        <Button
          key="ellipsis"
          variant="outline"
          disabled
          className="w-10 h-10 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-default"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      );
    }

    // Current page (if not 1)
    if (currentPage !== 1) {
      buttons.push(
        <Button
          key={currentPage}
          variant="default"
          className="w-10 h-10 text-sm font-medium bg-slate-700 text-white hover:bg-slate-800 rounded-md"
        >
          {currentPage}
        </Button>
      );
    }

    // Next button
    buttons.push(
      <Button
        key="next"
        variant="outline"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    );

    return buttons;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Community Post & Polls
          </h1>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-blue-50 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-medium text-gray-700">
              <div className="col-span-1 flex items-center">
                <Checkbox
                  checked={
                    posts.length > 0 && posts.every((post) => post.selected)
                  }
                  onCheckedChange={handleSelectAll}
                  className="mr-2"
                />
                Avatar
              </div>
              <div className="col-span-1">User Name</div>
              <div className="col-span-3">Title</div>
              <div className="col-span-1">Date</div>
              <div className="col-span-1">Time</div>
              <div className="col-span-1">Reaction</div>
              <div className="col-span-1">Comment</div>
              <div className="col-span-1">Vote</div>
              <div className="col-span-2">Action</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className={`grid grid-cols-12 gap-4 px-6 py-4 text-sm ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors`}
              >
                <div className="col-span-1 flex items-center">
                  <Checkbox
                    checked={post.selected}
                    onCheckedChange={() => handleSelectPost(post.id)}
                    className="mr-3"
                  />
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <Image
                      src={post.avatar || "/placeholder.svg"}
                      alt={`${post.userName} avatar`}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="col-span-1 flex items-center text-gray-900 font-medium">
                  {post.userName}
                </div>
                <div className="col-span-3 flex items-center text-gray-900">
                  {post.title}
                </div>
                <div className="col-span-1 flex items-center text-gray-700">
                  {post.date}
                </div>
                <div className="col-span-1 flex items-center text-gray-700">
                  {post.time}
                </div>
                <div className="col-span-1 flex items-center text-gray-900 font-medium">
                  {post.reaction}
                </div>
                <div className="col-span-1 flex items-center text-gray-900 font-medium">
                  {post.comment}
                </div>
                <div className="col-span-1 flex items-center text-gray-900 font-medium">
                  {post.vote}
                </div>
                <div className="col-span-2 flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
                    className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {renderPaginationButtons()}
        </div>
      </div>
    </div>
  );
}
