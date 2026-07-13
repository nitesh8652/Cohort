import React from 'react'

const Users = ({ users, setToggle, deleteuser, ind, setUpdated }) => {
  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96 flex flex-col items-center gap-4">
        <img className="w-40" src={users.url} />
        <h1 className="font-extrabold text-xl">{users.name}</h1>
        <h1 className="font-extrabold text-xl">{users.email}</h1>
        <div className="flex flex-col w-full gap-3">


          <button
            onClick={() => deleteuser(ind)}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition">
            Delete
          </button>
      
          <button
            onClick={() => {

              setToggle(false)
              setUpdated(users)

            }}

            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition">
            Edit
          </button>


        </div>
      </div>
    </div>
  )
}

export default Users