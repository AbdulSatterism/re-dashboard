"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2,  ChevronLeft, ChevronRight, Info } from "lucide-react";
import { useAllReportsQuery, useDeleteReportMutation } from "@/redux/feature/reportSlice";
import Swal from "sweetalert2";

interface Report {
    _id: string;
    name: string;
    phone: string;
    email: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export default function Reports() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const reportsPerPage = 7;

    const { data, isLoading, isError, error, refetch } = useAllReportsQuery({
        page: currentPage,
        limit: reportsPerPage,
        search: searchQuery,
    });

    const [deleteReport] = useDeleteReportMutation();

    const reports: Report[] = data?.data || [];
    const totalPages = data?.meta?.totalPage || 1;
    const totalReports = data?.meta?.total || 0;

 

     const handleDeleteReport = (id: string) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
           const res =   await deleteReport(id).unwrap(); 
           console.log(res?.message, 'message delete')
              Swal.fire({
                title: "Deleted!",
                text:  res.message || "The report has been deleted successfully.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
              });
              refetch();
            } catch (error) {
              Swal.fire({
                title: "Error!",
                text:  error?.data?.message || "Something went wrong while deleting.",
                icon: "error"
              });
            }
          }
        });
      };
      
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
                setSelectedReport(null);
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
                        <CardTitle className="text-2xl font-semibold text-gray-800">Reports List</CardTitle>
                        
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {/* Loading and Error States */}
                    {isLoading && (
                        <div className="text-center py-12 text-gray-500">
                            <p>Loading reports...</p>
                        </div>
                    )}
                    {isError && (
                        <div className="text-center py-12 text-red-500">
                            <p>Error fetching reports: {error?.toString() || "Unknown error"}</p>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => refetch()}
                                aria-label="Retry fetching reports"
                            >
                                Retry
                            </Button>
                        </div>
                    )}

                    {/* Table Container with Horizontal Scroll */}
                    {!isLoading && !isError && (
                        <div className="overflow-x-auto">
                            {/* Table Header */}
                            <div className="bg-[#1A1A1A] border-b border-gray-200">
                                <div className="grid grid-cols-7 gap-4 px-6 py-3 text-sm font-medium text-white">
                                    <div>Name</div>
                                    <div>Phone</div>
                                    <div>Email</div>
                                    <div>Content</div>
                                    <div>Created At</div>
                                    <div className="">Details</div>
                                    <div className="">Actions</div>
                                </div>
                            </div>

                            {/* Table Body */}
                            <div className="divide-y divide-gray-100">
                                {reports.map((report, index) => (
                                    <div
                                        key={report._id}
                                        className={`grid grid-cols-7 gap-4 px-6 py-4 items-center text-sm ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            }`}
                                    >
                                        {/* Name */}
                                        <div className="text-gray-900">{report.name || "Unnamed"}</div>

                                        {/* Phone */}
                                        <div className="text-gray-600">{report.phone || "N/A"}</div>

                                        {/* Email */}
                                        <div className="text-gray-600">{report.email}</div>

                                        {/* Content */}
                                        <div className="text-gray-600 truncate">{report.content}</div>

                                        {/* Created At */}
                                        <div className="text-gray-600">
                                            {new Date(report.createdAt).toLocaleDateString("en-US", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </div>

                                       <div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-gray-400 hover:text-blue-600"
                                                onClick={() => setSelectedReport(report)}
                                                aria-label={`View details for report from ${report.name || "Unnamed"}`}
                                            >
                                                <Info className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="">

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                                                onClick={() => handleDeleteReport(report._id)}
                                                aria-label={`Delete report from ${report.name || "Unnamed"}`}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        
                                    </div>
                                ))}
                            </div>

                            {/* Empty State */}
                            {reports.length === 0 && (
                                <div className="text-center py-12 text-gray-500">
                                    <p>No reports found</p>
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
                                    className={`w-8 h-8 p-0 ${currentPage === 1 ? "bg-gray-800 hover:bg-gray-700 text-white" : ""
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
                                        className="w-8 h-8 p-0 bg-gray-800 hover:bg-gray-700 text-white"
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
                                        className={`w-8 h-8 p-0 ${currentPage === totalPages ? "bg-gray-800 hover:bg-gray-700 text-white" : ""
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

                    {/* Reports Summary */}
                    {!isLoading && !isError && (
                        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-sm text-gray-600">
                            Showing {reports.length} of {totalReports} reports
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Custom Modal for Report Details */}
            {selectedReport && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300"
                    role="dialog"
                    aria-labelledby="modal-title"
                    aria-modal="true"
                >
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl transform transition-all duration-300 scale-100">
                        <div className="flex items-center justify-between border-b pb-3">
                            <h2 id="modal-title" className="text-xl font-semibold text-gray-800">
                                Report Details
                            </h2>
                            <button
                                onClick={() => setSelectedReport(null)}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                                aria-label="Close report details modal"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-4 space-y-4">
                            <div>
                                <span className="font-medium text-gray-700">ID:</span>{" "}
                                <span className="text-gray-600">{selectedReport._id}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Name:</span>{" "}
                                <span className="text-gray-600">{selectedReport.name || "Unnamed"}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Phone:</span>{" "}
                                <span className="text-gray-600">{selectedReport.phone || "N/A"}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Email:</span>{" "}
                                <span className="text-gray-600">{selectedReport.email}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Content:</span>{" "}
                                <span className="text-gray-600">{selectedReport.content}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Created At:</span>{" "}
                                <span className="text-gray-600">
                                    {new Date(selectedReport.createdAt).toLocaleDateString("en-US", {
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
                                    {new Date(selectedReport.updatedAt).toLocaleDateString("en-US", {
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
                                onClick={() => setSelectedReport(null)}
                                className="px-4 py-2"
                                aria-label="Close report details modal"
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