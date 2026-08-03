import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { store } from './app/store'
import { decrement, increment } from './Features/counter.Slice'

const App = () => {

  let { count } = useSelector((store) => store.counter)

    let dispatch = useDispatch()


  return (
    <div>

      <h1>
        This Is Reduxxx! {count}

      </h1>
      <button
      onClick={()=>dispatch(increment())}
      >+</button>
      <button
      onClick={()=>dispatch(decrement())}>-</button>
    </div>
  )
}

export default App