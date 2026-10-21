"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { Upload } from "lucide-react";

export default function AddLink() {
  const [formData, setFormData] = useState({
    category: "",
    linkName: "",
    inputLink: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = ["Jersey", "Shoes", "Accessories", "Equipment"];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (category: string) => {
    setFormData((prev) => ({ ...prev, category }));
    setIsDropdownOpen(false);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Saving link:", {
      ...formData,
      image: imagePreview ? "Image uploaded" : "No image",
    });
    // Here you would typically send the data to your backend
  };

  return (
    <div className=" bg-white p-6">
      <div>
        <h1 className="text-xl font-medium text-gray-900 mb-8 ">Add Link</h1>
        <div className="border border-[#DBEAFE] mb-5"></div>
      </div>
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Image Upload Section */}
            <div className="col-span-1">
              <div
                onClick={handleImageClick}
                className="w-full aspect-[3/4] bg-gray-100 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <>
                    <span className="text-gray-500 mb-2">Add image</span>
                    <Upload className="w-5 h-5 text-gray-500" />
                  </>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            {/* Form Fields Section */}
            <div className="col-span-2 space-y-6">
              {/* Category Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-blue-50 text-left px-4 py-2.5 rounded-md flex items-center justify-between"
                  >
                    <span className="text-gray-500">
                      {formData.category || "Select a Category"}
                    </span>
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                      {categories.map((category) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() => handleCategorySelect(category)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Link Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Link Name
                </label>
                <input
                  type="text"
                  name="linkName"
                  value={formData.linkName}
                  onChange={handleInputChange}
                  placeholder="Write here"
                  className="w-full px-4 py-2.5 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Input Link Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Input Link
                </label>
                <input
                  type="text"
                  name="inputLink"
                  value={formData.inputLink}
                  onChange={handleInputChange}
                  placeholder="Link here"
                  className="w-full px-4 py-2.5 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSave}
              className="bg-[#203463] hover:bg-slate-900 text-white font-medium px-16 py-2.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Save Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
