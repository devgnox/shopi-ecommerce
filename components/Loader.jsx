import { LoaderCircleIcon } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className='mx-auto h-48 w-full flex items-center justify-center'>
      <LoaderCircleIcon className='animate-spin size-7' />
    </div>
  )
}

export default Loader
