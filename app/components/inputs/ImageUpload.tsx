"use client";

import { ReactElement } from "react";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";
import { CldUploadWidget } from "next-cloudinary";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value: string;
  onChange(value: string): void;
}

const UPLOAD_PRESET = "hdxznera";

export default function ImageUpload({
  value,
  onChange,
}: ImageUploadProps): ReactElement {
  // Handlers
  const handleUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <CldUploadWidget
      uploadPreset={UPLOAD_PRESET}
      onUpload={handleUpload}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative flex cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 p-20 text-neutral-600 transition hover:opacity-70"
          >
            <TbPhotoPlus size={50} />

            <div className="text-lg font-semibold">Click to upload</div>

            {value ? (
              <div className="absolute inset-0 h-full w-full">
                <Image
                  fill
                  src={value}
                  alt="Upload"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : null}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}
