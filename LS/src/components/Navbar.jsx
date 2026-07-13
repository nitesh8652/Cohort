import React from 'react'
// import { setToggle } from '../App'

const Navbar = ({setToggle}) => {

 

  return (
    <nav className="flex items-center justify-between bg-gray-900 text-white px-6 py-3">
      <button 
      onClick={()=> setToggle((prev)=> !prev)}
       

      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium">
        User
      </button>
    </nav>
  )
}

export default Navbar