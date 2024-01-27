import React, { useReducer } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Page from './Page'
import { TaskContext } from './context'
import { initialState, taskReducer } from './reducers/TaskReducer'

function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  return (
    <>
      <TaskContext.Provider value={{ state, dispatch }}>
        <Page />
        <ToastContainer />
      </TaskContext.Provider>
    </>
  )
}

export default App
