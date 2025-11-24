function AddButton({ text }: { text: string }) {
  return (
    <div
      className="w-35 h-10 bg-[#b77e66] 
hover:bg-[#AB7057] text-white rounded-xl p-2 items-center text-[14px]"
    >
      <span className="pr-2">+</span>
      <span>{text}</span>
    </div>
  );
}

export default AddButton;
