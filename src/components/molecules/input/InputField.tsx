import TextInput from "@/components/atoms/input/textInput";
import Label from "@/components/atoms/label/label";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}
const InputField = ({label,icon,...props}:InputFieldProps) => {
  return (
    <div className="mb-4">
        <Label>{label}</Label>
        <TextInput icon={icon} {...props} />
    </div>
  )
}

export default InputField;
