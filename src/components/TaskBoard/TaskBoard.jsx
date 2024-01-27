import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { TaskContext } from '../../context'
import NoTaskFound from './NoTaskFound'
import TaskAction from './TaskAction'
import TaskList from './TaskList'
import TaskModal from './TaskModal'

const TaskBoard = () => {
  const { state, dispatch } = useContext(TaskContext)
  const [showAddModal, setShowAddModal] = useState(false)
  const [taskUpdate, setTaskUpdate] = useState(null)
  const [originalTasks, setOriginalTasks] = useState(state.taskData)

  // Function to update the originalTasks state
  const updateOriginalTasks = newTaskData => {
    setOriginalTasks(newTaskData)
  }

  // Function to close the task modal
  const handleCloseClick = () => {
    setTaskUpdate(null)
    setShowAddModal(false)
  }

  // Function to handle adding or editing a task
  const handleAddEditTask = (newTask, isAdd) => {
    // Confirmation message for adding or editing a task
    const confirmationMessage = isAdd
      ? `Are you sure you want to Add This Task?`
      : `Are you sure you want to Edit This Task?`

    // Display a confirmation dialog
    const isConfirmed = window.confirm(confirmationMessage)
    // Dispatch the appropriate action based on add or edit
    if (isConfirmed) {
      if (isAdd) {
        dispatch({
          type: 'ADD_TASK',
          payload: newTask,
        })
        // Display a success toast for adding a new task
        toast.success(`New Task "${newTask.title}" added successfully!`, {
          position: toast.TOP_RIGHT,
        })
        // Update the originalTasks array
        updateOriginalTasks([...originalTasks, newTask])
      } else {
        dispatch({
          type: 'EDIT_TASK',
          payload: newTask,
        })
        // Display a success toast for editing a task
        toast.success(`Task "${newTask.title}" updated successfully!`, {
          position: toast.TOP_RIGHT,
        })
        // Update the originalTasks array with the edited task
        updateOriginalTasks(
          originalTasks.map(task => (task.id === newTask.id ? newTask : task))
        )
      }
    }
    // Reset taskUpdate and hide the task modal
    setTaskUpdate(null)
    setShowAddModal(false)
  }

  // Function to handle editing a task
  const handleEditTask = task => {
    setTaskUpdate(task)
    setShowAddModal(true)
  }

  // Function to handle deleting a task
  const handleDeleteTask = taskId => {
    // Find the deleted task from the originalTasks array
    const deletedTask = originalTasks.find(task => task.id === taskId)

    // Show a confirmation dialog
    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${deletedTask.title}"?`
    )

    if (isConfirmed) {
      // Dispatch the DELETE_TASK action
      dispatch({
        type: 'DELETE_TASK',
        payload: taskId,
      })

      // Display a success toast for deleting a task
      toast.success(`Task "${deletedTask.title}" removed successfully!`, {
        position: toast.TOP_RIGHT,
        onClose: () => {
          // Remove the deleted task from the originalTasks array
          const updatedOriginalTasks = originalTasks.filter(
            task => task.id !== taskId
          )
          updateOriginalTasks(updatedOriginalTasks)
        },
      })
    }
  }

  // Function to search for tasks based on a searchTerm
  const searchTasks = searchTerm => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase()

    // Check if the search term is empty
    if (!trimmedSearchTerm) {
      // If empty, set the taskData to the originalTasks
      dispatch({
        type: 'SEARCH_TASKS',
        payload: originalTasks,
      })
    } else {
      // If not empty, filter tasks based on the search term
      const filteredTasks = originalTasks.filter(task =>
        task.title.toLowerCase().includes(trimmedSearchTerm)
      )
      // Update the taskData with the filtered tasks
      dispatch({
        type: 'SEARCH_TASKS',
        payload: filteredTasks,
      })
    }
  }

  // Function to handle toggling the favorite status of a task
  const handleFavTask = taskId => {
    // Dispatch the TOGGLE_FAV_TASK action with the taskId
    dispatch({
      type: 'TOGGLE_FAV_TASK',
      payload: taskId,
    })

    // Get the updated task after dispatch
    const updatedTask = state.taskData.find(task => task.id === taskId)

    // Show a toast message based on the current favorite status
    const message = updatedTask
      ? updatedTask.isFavorite
        ? `Task "${updatedTask.title}" removed from favorites.`
        : `Task "${updatedTask.title}" added to favorites!`
      : `Task with id ${taskId} not found.`

    const toastType = updatedTask && updatedTask.isFavorite ? 'info' : 'success'

    // Show the toast message
    toast[toastType](message, {
      position: toast.TOP_RIGHT,
    })
  }

  // Function to handle deleting all tasks
  const handleDeleteAllTask = () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete All Tasks?`
    )

    if (isConfirmed) {
      // Dispatch the DELETE_ALL_TASKS action
      dispatch({
        type: 'DELETE_ALL_TASKS',
      })

      // Display a success toast for deleting all tasks
      toast.success(`All Tasks removed successfully!`, {
        position: toast.TOP_RIGHT,
        onClose: () => {
          // After deleting all tasks, update originalTasks to an empty array
          updateOriginalTasks([])
        },
      })
    }
  }

  return (
    <>
      <section className="mb-20" id="tasks">
        {/* Render the TaskModal component if showAddModal is true */}
        {showAddModal && (
          <TaskModal
            onSave={handleAddEditTask}
            onCloseClick={handleCloseClick}
            taskUpdate={taskUpdate}
          />
        )}
        <div className="container">
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            {/* Render the TaskAction component */}
            <TaskAction
              onAddClick={() => setShowAddModal(true)}
              onDeleteAllTask={handleDeleteAllTask}
              onSearch={searchTasks}
              tasks={state.taskData}
            />
            <div>
              {/* Render TaskList or NoTaskFound based on tasks availability */}
              {state.taskData.length > 0 ? (
                <TaskList
                  tasks={state.taskData}
                  onEdit={handleEditTask}
                  onFav={handleFavTask}
                  onDeleteTask={handleDeleteTask}
                />
              ) : (
                <NoTaskFound />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TaskBoard
