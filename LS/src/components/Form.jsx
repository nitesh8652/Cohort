import React from 'react'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const Form = ({ setToggle, setUsers, users, updated }) => {


  let {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode:'onChange',
    defaultValues:updated
  })

  // let obj = {
  //   name: "tuk tuk gaadi",
  //   email: "toyata@gmail.com",
  //   car: "toyata"
  // }


  // localStorage.setItem("user", JSON.stringify(obj))

  // let a = localStorage.getItem("user")
  // let b = JSON.parse(a)
  // console.log(a)

  let formsubmit = (data) => {


    if(updated){

      setUsers((prev)=>{
        return prev.map((val)=>{
          return val.id === updated.id?{...data} : val
        })
      })

    }else{



      // console.log(data)
      // setUsers((prev)=> [...prev,data]) 
      let arr = [...users, {...data, id: nanoid() }]
      setUsers(arr)
  
      // setUsers([...users, data ])
      localStorage.setItem("users", JSON.stringify(arr))
    }

    reset()
    setToggle((prev) => !prev)
  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        // onSubmit={handleSubmit((data) => { console.log(data) })}

        onSubmit={handleSubmit(formsubmit)}

        className="bg-white shadow-lg rounded-2xl p-8 w-96 flex flex-col gap-4">

        <input
          {...register("name", {
            required: "Name is required"
          })}

          type="text" placeholder='Enter your name'
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <input
          {...register("email", {
            required: "email"
          })}
          type="email" placeholder='Enter your email'
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <input
          {...register("url", {
            required: "url"
          })}
          type="url" placeholder='Enter your url'
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />


        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Form