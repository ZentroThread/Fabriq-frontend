import { useEffect, useRef } from "react";
import Button from "@/components/atoms/button/custom-button";
import ImageInput from "@/components/atoms/input/image-input";
import { cn } from "@/utils/style";

interface ProfileImageUploaderProps {
  imageUrl?: string;
  editable?: boolean;
  onImageChange: (file: File, preview: string) => void;
  className?: string;
}

export default function ProfileImageUploader({
  imageUrl,
  editable = false,
  onImageChange,
  className,
}: ProfileImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const createdBlobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (imageUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleImageSelect = (file: File) => {
    if (createdBlobUrlRef.current) {
      URL.revokeObjectURL(createdBlobUrlRef.current);
    }
    const preview = URL.createObjectURL(file);
    createdBlobUrlRef.current = preview;
    onImageChange(file, preview);
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div
        className="w-32 h-32 rounded-2xl border overflow-hidden bg-main-bg relative flex items-center justify-center"
        aria-label="Profile image preview"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="User profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-sm text-gray-400">No Image</span>
        )}
      </div>

      <ImageInput ref={inputRef} onSelect={handleImageSelect} />

      {editable && (
        <Button
          text="Update"
          width="w-32"
          onClick={() => inputRef.current?.click()}
          aria-label="Update profile image"
        />
      )}
    </div>
  );
}
