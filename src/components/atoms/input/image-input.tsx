import { forwardRef } from "react";

interface ImageInputProps {
  onSelect: (file: File) => void;
}

const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  ({ onSelect }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed");
        e.target.value = "";
        return;
      }

      onSelect(file);

      e.target.value = "";
    };

    return (
      <input
        ref={ref}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    );
  }
);

ImageInput.displayName = "ImageInput";
export default ImageInput;
