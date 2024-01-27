import React, { useState } from 'react'

const TaskModal = ({ onSave, onCloseClick, taskUpdate }) => {
  // State for managing the task data, add/edit mode, and form errors
  const [task, setTask] = useState(
    taskUpdate || {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      tags: [],
      priority: '',
      isFavorite: false,
    }
  )

  const [isAdd, setAdd] = useState(!taskUpdate)
  const [errors, setErrors] = useState({})

  // Event handler for updating the task data on input change
  const handleChangeTask = e => {
    const name = e.target.name
    let value = e.target.value

    // Clear the error for the specific field when its value changes
    setErrors({
      ...errors,
      [name]: '',
    })

    // Conditionally update the 'tags' field by splitting and trimming the tags

    const updatedTask =
      name === 'tags'
        ? { ...task, [name]: value.split(',').map(tag => tag.trim()) }
        : { ...task, [name]: value }

    setTask(updatedTask)
  }

  // Event handler for saving the task data
  const handleSaveClick = e => {
    e.preventDefault()

    const newErrors = {}
    // Validation checks for required field
    newErrors.title = !task.title ? 'Title is required' : ''
    newErrors.description = !task.description ? 'Description is required' : ''
    newErrors.tags =
      !task.tags || task.tags.length === 0 ? 'At least one tag is required' : ''
    newErrors.priority = !task.priority ? 'Priority is required' : ''

    // If there are validation errors, update the state and return
    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors)
      return
    }
    // If no errors, clear the error state and call the onSave function
    setErrors({})
    onSave(task, isAdd)
  }

  return (
    <>
      <div className="bg-black bg-opacity-70 h-full w-full z-50 absolute top-0 left-0">
        <form className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11">
          <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
            {isAdd ? 'Add Task' : 'Edit Task'}
          </h2>

          {/* <!-- inputs --> */}
          <div className="space-y-9 text-white lg:space-y-10">
            {/* <!-- title --> */}
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="title">Title</label>
              <input
                className={`block w-full rounded-md bg-[#2D323F] px-3 py-2.5 ${
                  errors.title ? 'border-red-500 border-2' : ''
                }`}
                type="text"
                name="title"
                id="title"
                value={task.title}
                onChange={handleChangeTask}
                required
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>
            {/* <!-- description --> */}
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="description">Description</label>
              <textarea
                className={`block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 ${
                  errors.description ? 'border-red-500 border-2' : ''
                }`}
                type="text"
                name="description"
                id="description"
                value={task.description}
                onChange={handleChangeTask}
                required
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
            {/* <!-- input group --> */}
            <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
              {/* <!-- tags --> */}
              <div className="space-y-2 lg:space-y-3">
                <label htmlFor="tags">Tags</label>
                <input
                  className={`block w-full rounded-md bg-[#2D323F] px-3 py-2.5 ${
                    errors.tags ? 'border-red-500 border-2' : ''
                  }`}
                  type="text"
                  name="tags"
                  id="tags"
                  value={task.tags}
                  onChange={handleChangeTask}
                  required
                />
                {errors.tags && (
                  <p className="text-red-500 text-sm">{errors.tags}</p>
                )}
              </div>
              {/* <!-- priority --> */}
              <div className="space-y-2 lg:space-y-3">
                <label htmlFor="priority">Priority</label>
                <select
                  className={`block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5 ${
                    errors.priority ? 'border-red-500 border-2' : ''
                  }`}
                  name="priority"
                  id="priority"
                  value={task.priority}
                  onChange={handleChangeTask}
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                {errors.priority && (
                  <p className="text-red-500 text-sm">{errors.priority}</p>
                )}
              </div>
            </div>
          </div>

          {/* <!-- inputs ends --> */}
          <div className="mt-16 flex justify-between lg:mt-20">
            <button
              onClick={handleSaveClick}
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              {isAdd ? 'Create new Task' : 'Save Task'}
            </button>
            <button
              onClick={onCloseClick}
              className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default TaskModal
