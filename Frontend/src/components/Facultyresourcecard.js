import { EditIcon, ViewIcon } from 'lucide-react'
import React from 'react'

const Facultyresourcecard = ({data}) => {
  return (
    <div>
    <div className='flex gap-4 p-3 rounded-lg shadow-lg items-center justify-between flex-wrap'>
    <div>
    <img src={data.i} className='w-[50px] h-[50px]' alt='thumbnail'></img>
    </div>
    <div className='flex flex-col gap-2'> 
    <div className='font-bold '>{data.title}</div>
    </div>
    <div className='flex gap-3'>
    <button title='edit'><EditIcon></EditIcon></button>
    <button title='view'><ViewIcon></ViewIcon></button>
    </div>
    
    </div>
    </div>
  )
}

export default Facultyresourcecard