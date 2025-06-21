import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 flex justify-between items-center px-[12%] h-14 py-5 text-white'>
      <div className='logo font-bold text-white text-2xl'>
        <span className="text-green-700"> &lt;</span>
         Pass
        <span className="text-green-700">OP &gt;</span>
         </div>
      {/* <ul>
        <li className='flex gap-4'>
          <a className='hover:font-bold' href="#">Home</a>
          <a className='hover:font-bold' href="#">About</a>
          <a className='hover:font-bold' href="#">Contacts</a>
        </li>
      </ul> */}
      <div>
        <img className='h-8 invert' src="../src/assets/git.png" alt="" />
      </div>
    </nav>
  )
}

export default Navbar
