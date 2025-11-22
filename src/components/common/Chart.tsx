import { Frown } from 'lucide-react'
import React from 'react'

interface ChartProps{
  label : string,
  description : string,
  children?: React.ReactNode
}

function Chart({label, description,children} : ChartProps) {
  return (
    <div className='w-full h-100 bg-card flex flex-col rounded-2xl p-5 shadow-md'>
      <div className='text-style text-[20px] font-semibold'>{label}</div>
      <div className='text-position-text'>{description}</div>
      <div className="mt-4 w-full h-56">
        {children ? children : <div className="text-muted-foreground p-30 pl-60 text-[14px] flex gap-4 items-center"><Frown/>No chart data</div>}
      </div>
    </div>
  )
}

export default Chart