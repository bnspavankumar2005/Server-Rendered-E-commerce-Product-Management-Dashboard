"use client";

import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  return (
    <div className="mb-4">
      <CldUploadWidget 
        uploadPreset="my-store-preset" // <--- REPLACE THIS if you named it differently
        onSuccess={(result: any) => {
          // When upload is done, Cloudinary gives us the public URL
          onChange(result.info.secure_url);
        }}
      >
        {({ open }) => {
          return (
            <div 
              onClick={() => open()} 
              className="border-dashed border-2 border-gray-300 p-10 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition"
            >
              {value ? (
                // If we have an image, show it
                <div className="relative w-full h-48">
                  <img 
                    src={value} 
                    alt="Upload" 
                    className="w-full h-full object-contain" 
                  />
                </div>
              ) : (
                // If no image, show instructions
                <div className="text-gray-500 flex flex-col items-center">
                  <span className="text-4xl mb-2">📷</span>
                  <span className="font-semibold">Click to Upload Image</span>
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}