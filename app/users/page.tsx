"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Trash2, Search } from "lucide-react";
import { useAllUsersQuery, useDeleteUserMutation, useSendEmailMutation } from "@/redux/feature/userSlice";
import Swal from "sweetalert2";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import debounce from "lodash/debounce";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  image: string;
  gender: string;
  dob: string | null;
  isDeleted: boolean;
  verified: boolean;
  isFirstLogin: boolean;
  createdAt: string;
  updatedAt: string;
  phone?: string;
}



export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastUserRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const isInitialMount = useRef(true);

  // Debounced search
  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearch(value);
    }, 500),
    []
  );

  // Fetch users from API with pagination and search
  const { data, isLoading, isError, refetch } = useAllUsersQuery({
    page: page,
    search: debouncedSearch || "",
  });

  const [deleteUser] = useDeleteUserMutation();
  const [sendEmail] = useSendEmailMutation();

  // Handle initial data load and search reset
  useEffect(() => {
    if (data?.data) {
      if (page === 1) {
        // First page or search reset
        setUsers(data.data);
        setTotalUsers(data.meta?.total || 0);
      } else {
        // Append new data for infinite scroll
        setUsers(prev => {
          // Avoid duplicates
          const newUsers = data.data.filter(
            (newUser: User) => !prev.some(existingUser => existingUser._id === newUser._id)
          );
          return [...prev, ...newUsers];
        });
      }

      // Check if there are more pages
      setHasMore(page < (data.meta?.totalPage || 1));
    }
  }, [data, page]);

  // Reset pagination when search changes
  useEffect(() => {
    if (!isInitialMount.current) {
      setPage(1);
      setUsers([]);
      setHasMore(true);
    }
    isInitialMount.current = false;
  }, [debouncedSearch]);

  // Setup intersection observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Don't set up observer if no more data to load or currently loading
    if (!hasMore || isLoading || isLoadingMore) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !isLoadingMore) {
          setIsLoadingMore(true);
          setPage(prev => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "200px", // Load more when 200px from bottom
        threshold: 0.1,
      }
    );

    // Observe the loading indicator or last user
    const target = loadingRef.current || lastUserRef.current;
    if (target) {
      observerRef.current.observe(target);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, isLoadingMore, users.length]);

  // Reset loading state after data loads
  useEffect(() => {
    if (data && isLoadingMore) {
      setIsLoadingMore(false);
    }
  }, [data, isLoadingMore]);

  // Delete user function
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteUser(id).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: res.message || "The user has been deleted successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          // Remove deleted user from local state
          setUsers(prev => prev.filter(user => user._id !== id));
          setTotalUsers(prev => prev - 1);
        } catch (error: any) {
          Swal.fire({
            title: "Error!",
            text: error?.data?.message || "Something went wrong while deleting.",
            icon: "error",
          });
        }
      }
    });
  };

  // Send email function
  const handleMail = async (phone: string | undefined) => {
    if (!phone) {
      Swal.fire({
        title: "Error!",
        text: "User phone number is not available.",
        icon: "error",
      });
      return;
    }

    if (!message.trim()) {
      Swal.fire({
        title: "Error!",
        text: "Please enter a message to send.",
        icon: "error",
      });
      return;
    }

    try {
      const res = await sendEmail({
        phone,
        message,
      }).unwrap();
      Swal.fire({
        title: "Success!",
        text: res.message || "Email sent successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setMessage(""); // Clear the message input after sending
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error?.data?.message || "Something went wrong while sending the email.",
        icon: "error",
      });
    }
  };

  const IMAGE = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className="w-full mx-auto p-4">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle className="text-lg font-medium">Users List</CardTitle>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Search by name, email, or role..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  debouncedSetSearch(e.target.value);
                }}
                className="w-64"
                aria-label="Search users"
              />
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Loading and Error States - Moved outside table */}
          {isLoading && page === 1 && users.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>Loading users...</p>
            </div>
          )}

          {isError && users.length === 0 && (
            <div className="text-center py-12 text-red-500">
              <p>Error fetching users. Please try again.</p>
              <Button
                onClick={() => refetch()}
                className="mt-2"
                variant="outline"
              >
                Retry
              </Button>
            </div>
          )}

          {/* Table Container */}
          {!isError && (
            <div className="overflow-x-auto min-h-[400px]">
              {/* Table Header - Only show if we have users */}
              {users.length > 0 && (
                <div className="bg-[#1A1A1A] border-b py-4 border-gray-200">
                  <div className="grid grid-cols-7 gap-4 px-6 py-3 text-base font-medium text-white">
                    <div>Image</div>
                    <div>User Name</div>
                    <div>Phone</div>
                    <div>Email</div>
                    <div>Date Join</div>
                    <div>Message</div>
                    <div>Action</div>
                  </div>
                </div>
              )}

              {/* Table Body */}
              <div className="divide-y divide-gray-100">
                {users.map((user, index) => (
                  <div
                    key={`${user._id}-${index}`}
                    ref={index === users.length - 1 ? lastUserRef : null}
                    className={`grid grid-cols-7 gap-4 px-6 py-4 items-center text-sm w-full ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                  >
                    {/* Avatar */}
                    <div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user.image ? `${IMAGE}${user.image}` : "/placeholder-avatar.png"}
                          alt={user.name || "User"}
                        />
                        <AvatarFallback className="bg-orange-100 text-orange-600">
                          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Name */}
                    <div className="text-gray-900">
                      {user.name || "Unnamed"}
                    </div>

                    {/* Phone */}
                    <div className="text-gray-600">{user?.phone || "N/A"}</div>
                    {/* Email */}
                    <div className="text-gray-600">{user?.email || "N/A"}</div>

                    {/* Joining Date */}
                    <div className="text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>

                    {/* Send Email */}
                    <div>
                      <Dialog>
                        <DialogTrigger className="border border-gray-300 hover:border-gray-400 p-2 rounded-lg transition-colors">
                          Send Message
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="mb-4">
                              Send Message to {user.name || "User"}
                            </DialogTitle>
                            <Textarea
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="Enter your message"
                              className="min-h-[100px]"
                            />
                            <Button
                              className="mt-4"
                              onClick={() => handleMail(user.phone)}
                            >
                              Send Message
                            </Button>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>

                    {/* Action */}
                    <div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(user._id)}
                        aria-label={`Delete user ${user.name || "Unnamed"}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Loading more indicator - Always render for observer */}
              <div ref={loadingRef} className="min-h-[50px]">
                {(isLoadingMore || (isLoading && page > 1)) && (
                  <div className="text-center py-4 text-gray-500">
                    <div className="inline-flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                      <p>Loading more users...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* No more users indicator */}
              {/* {!hasMore && users.length > 0 && (
                <div className="text-center py-6 text-gray-500 border-t">
                  <p>All users loaded ({totalUsers} total users)</p>
                </div>
              )} */}

              {/* Empty State */}
              {users.length === 0 && !isLoading && !isError && (
                <div className="text-center py-12 text-gray-500">
                  <p>No users found</p>
                  {debouncedSearch && (
                    <p className="text-sm mt-2">Try a different search term</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Users Summary */}
          {users.length > 0 && !isLoading && !isError && (
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-sm text-gray-600">
              Showing {users.length} of {totalUsers} users
              {hasMore && " • Scroll down to load more"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}