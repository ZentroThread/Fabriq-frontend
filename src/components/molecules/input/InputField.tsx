import TextInput from "@/components/atoms/input/TextInput";
import Label from "@/components/atoms/label/Label";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}
const InputField = ({label,icon,...props}:InputFieldProps) => {
  return (
    <div className="text-position-text font-light mb-4">
        <Label>{label}</Label>
        <TextInput icon={icon} {...props} />
    </div>
  )
}

export default InputField;
