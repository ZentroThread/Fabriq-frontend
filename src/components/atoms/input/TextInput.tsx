const TextInput = ({ icon, ...props }: { icon?: React.ReactNode }) => {
  return (
    <div className="
      flex items-center gap-2 border border-input-border rounded-xl px-3 py-3 bg-white
      focus-within:border-input-active-border focus-within:ring-1 focus-within:ring-input-active-border
    ">
      {icon && <span className="text-mount-foreground">{icon}</span>}
      <input
        className="w-full bg-transparent outline-none"
        {...props}
      />
    </div>
  );
};

export default TextInput;
