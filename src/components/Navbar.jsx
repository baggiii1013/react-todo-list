import React from 'react'

const Navbar = () => {
  return (
    <div className='flex bg-violet-700 w-12/12 justify-between text-white py-2'>
        <div className="logo">
            <span className='font-bold text-lg mx-9'>Todo's app</span>
        </div>
        <ul className="flex gap-3 mx-9 text-lg">
            <li className='cursor-pointer'>Home</li>
            <li className='cursor-pointer'>Tasks</li>
        </ul>
    </div>
  )
}

export default Navbar