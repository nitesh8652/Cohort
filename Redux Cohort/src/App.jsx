import React from 'react'
import { useSelector } from 'react-redux'
import { store } from './app/store'

const App = () => {

    let {count} = useSelector((store)=> store.counter)



  return (
    <div>
      
      <h1>
        This Is Reduxxx! {count}
      </h1>

    </div>
  )
}

export default App