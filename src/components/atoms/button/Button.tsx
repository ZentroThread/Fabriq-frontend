export default function Button({children , ...props}:{children:React.ReactNode}) {
  return (
   <button className="px-6 py-3 rounded-xl bg-(--color-secondary) hover:bg-(--color-hover-bg) " {...props}>
    {children}
   </button>
  )
}
