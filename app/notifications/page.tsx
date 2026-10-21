

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Search, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { useAllNotificationsQuery, useDeleteNotificationMutation, useReadNotificationQuery } from "@/redux/feature/userSlice";
import { toast } from "sonner";
import Swal from "sweetalert2";

interface Notification {
  _id: string;
  content: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function NotificationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const notificationsPerPage = 5;

  // Fetch notifications from API with pagination and search
  const { data, isLoading, isError, error, refetch } = useAllNotificationsQuery({
    page: currentPage,
    limit: notificationsPerPage,
    search: searchQuery,
  });

  const [deleteNotification] = useDeleteNotificationMutation();
  // const [readNotification] = useReadNotificationMutation();
  const { data: read } = useReadNotificationQuery({ id: selectedNotification?._id || "" });

  // Extract notifications and meta data
  const notifications: Notification[] = data?.data || [];
  const totalPages = data?.meta?.totalPage || 1;
  const totalNotifications = data?.meta?.total || 0;

  // Delete notification function
  const handleDeleteNotification = async (id: string) => {
    try {
      const res = await deleteNotification(id).unwrap();
      toast.success(res.message || "Notification deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete notification");
    }
  };

  const handleReadNotification = async (id: string) => {
    const result = await Swal.fire({
      title: "Mark as read?",
      text: "This notification will be marked as read.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await refetch();
        console.log(res, '=================')

        if (res?.data?.success) {
          Swal.fire("Done!", "Notification marked as read.", "success");
          // 🔄 update UI here
        } else {
          Swal.fire("Error!", "Could not mark as read.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
        console.error(error);
      }
    }
  };



  // Pagination functions
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedNotification(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className=" p-4">
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle className="text-2xl font-semibold text-gray-800">Notifications</CardTitle>
            {/* <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Search by content..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-64 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                aria-label="Search notifications"
              />
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-gray-500 hover:text-blue-600"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div> */}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Loading and Error States */}
          {isLoading && (
            <div className="text-center py-12 text-gray-500">
              <p>Loading notifications...</p>
            </div>
          )}
          {isError && (
            <div className="text-center py-12 text-red-500">
              <p>Error fetching notifications: {error?.toString() || "Unknown error"}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => refetch()}
                aria-label="Retry fetching notifications"
              >
                Retry
              </Button>
            </div>
          )}

          {/* Notifications List */}
          {!isLoading && !isError && (
            <div className="space-y-4 px-6 py-4">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className="flex items-center justify-between p-3 bg-white hover:bg-red-50 cursor-pointer border rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{notification.content}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(notification.createdAt).toLocaleString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <button
                      // onClick={() => handleReadNotification(notification._id, notification.read)}
                      onClick={() => handleReadNotification(notification._id)}

                      className={`text-xs px-2 py-1 rounded cursor-pointer ${notification.read ? "bg-gray-100 text-gray-800" : "bg-red-100 text-red-800"
                        }`}
                      aria-label={`Mark notification as ${notification.read ? "unread" : "read"}`}
                    >
                      {notification.read ? "Read" : "Unread"}
                    </button> */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-blue-600"
                      onClick={() => setSelectedNotification(notification)}
                      aria-label={`View details for notification ${notification.content}`}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                      onClick={() => handleDeleteNotification(notification._id)}
                      aria-label={`Delete notification ${notification.content}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p>No notifications found</p>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && !isLoading && !isError && (
            <div className="flex items-center justify-center space-x-2 p-6 border-t border-gray-100">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-1 px-3 py-2"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>

              <div className="flex items-center space-x-1">
                <Button
                  variant={currentPage === 1 ? "default" : "outline"}
                  size="sm"
                  className={`w-8 h-8 p-0 ${currentPage === 1 ? "bg-[#1A1A1A] hover:bg-[#1A1A1A] text-white" : ""
                    }`}
                  onClick={() => goToPage(1)}
                  aria-label="Page 1"
                >
                  1
                </Button>

                {totalPages > 2 && currentPage > 2 && (
                  <span className="px-2 text-gray-500">...</span>
                )}

                {currentPage > 1 && currentPage < totalPages && (
                  <Button
                    variant="default"
                    size="sm"
                    className="w-8 h-8 p-0 bg-[#1A1A1A]  text-white"
                    aria-label={`Page ${currentPage}`}
                  >
                    {currentPage}
                  </Button>
                )}

                {totalPages > 2 && currentPage < totalPages - 1 && (
                  <span className="px-2 text-gray-500">...</span>
                )}

                {totalPages > 1 && (
                  <Button
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="sm"
                    className={`w-8 h-8 p-0 ${currentPage === totalPages ? "bg-[#1A1A1A] hover:bg-[#1A1A1A] text-white" : ""
                      }`}
                    onClick={() => goToPage(totalPages)}
                    aria-label={`Page ${totalPages}`}
                  >
                    {totalPages}
                  </Button>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-1 px-3 py-2"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Notifications Summary */}
          {!isLoading && !isError && (
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-sm text-gray-600">
              Showing {notifications.length} of {totalNotifications} notifications
            </div>
          )}
        </CardContent>
      </Card>

      {/* Custom Modal for Notification Details */}
      {selectedNotification && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300"
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 id="modal-title" className="text-xl font-semibold text-gray-800">
                Notification Details
              </h2>
              <button
                onClick={() => setSelectedNotification(null)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                aria-label="Close notification details modal"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <span className="font-medium text-gray-700">ID:</span>{" "}
                <span className="text-gray-600">{selectedNotification._id}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Content:</span>{" "}
                <span className="text-gray-600">{selectedNotification.content}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Status:</span>{" "}
                <span className="text-gray-600">{selectedNotification.read ? "Read" : "Unread"}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Created At:</span>{" "}
                <span className="text-gray-600">
                  {new Date(selectedNotification.createdAt).toLocaleString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Updated At:</span>{" "}
                <span className="text-gray-600">
                  {new Date(selectedNotification.updatedAt).toLocaleString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setSelectedNotification(null)}
                className="px-4 py-2"
                aria-label="Close notification details modal"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}