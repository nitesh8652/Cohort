import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Users from './components/Users'
import Form from './components/Form'
import { nanoid } from 'nanoid'



const App = () => {

  const [toggle, setToggle] = useState(true)
  const [updated, setUpdated] = useState(null)

  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem('users')) || []

  })

  console.log("Update karwaloo",updated)

  const deleteuser = (id) => {
    console.log('id =>', id)
    let filteruser = users.filter((val, index) => {
      return index !== id
    })
    console.log(filteruser)
    setUsers(filteruser)
    localStorage.setItem("users", JSON.stringify(filteruser))
  }


  return (
    <> 
      <Navbar setToggle={setToggle} />

      {toggle ? (
        <div>
          {
            users.map((e, index) => {
              return <Users
              setUpdated={setUpdated}
                ind={index}
                users={e}
                deleteuser={deleteuser}
                key={index}
                setToggle={setToggle}
              />
            })
          }

          {/* <Users /> */}

        </div>
      ) : (

        <Form 
        users={users} 
        setUsers={setUsers} 
        setToggle={setToggle} 
        updated={updated}
        />
      )}

    </>
  )
}

export default App