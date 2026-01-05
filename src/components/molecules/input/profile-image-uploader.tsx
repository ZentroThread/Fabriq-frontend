import { useEffect, useRef } from "react";
import Button from "@/components/atoms/button/add-button";
import ImageInput from "@/components/atoms/input/image-input";

interface Props {
  imageUrl?: string;
  editable?: boolean;
  onImageChange: (file: File, preview: string) => void;
}

export default function ProfileImageUploader({
  imageUrl,
  editable = false,
  onImageChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (imageUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-32 h-32 rounded-2xl border overflow-hidden bg-main-bg">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-sm text-gray-400">
            No Image
          </div>
        )}
      </div>

      <ImageInput
        ref={inputRef}
        onSelect={(file) => {
          const preview = URL.createObjectURL(file);
          onImageChange(file, preview);
        }}
      />

      {editable && (
        <Button
          text="Update"
          width="w-32"
          onClick={() =>{ 
            inputRef.current?.click()
          }}
        />
      )}
    </div>
  );
}
