import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center'>
      <div className='logo font-bold text-white text-2xl'>
        <span className="text-green-700"> &lt;</span>
         Pass
        <span className="text-green-700">OP &gt;</span>
         </div>
         <div className='flex pb-1 my-1 justify-center items-center'>
            Created with <img className='bg-cover whitespace-nowrap h-6' src="../src/assets/heart.png" loading='lazy' /> by Aditya Singla
         </div>
    </div>
  )
}

export default Footer
