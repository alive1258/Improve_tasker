import React, { useState } from 'react'
import { tagBackground } from '../../data/colorData'

const Task = ({ task, onDeleteTask, onEdit, onFav }) => {
  // State to manage tag colors for each task
  const [tagColors, setTagColors] = useState({})

  // Function to get a random color from tagBackground array
  const getRandomColor = () => {
    const randomIndex = Math.round(Math.random() * (tagBackground.length - 1))
    return tagBackground[randomIndex]
  }

  // Function to get the color for a specific tag
  const getTagColor = (tag, index) => {
    // If color for the tag is not set, generate a new color and update state
    if (!tagColors[tag]) {
      const newColor = getRandomColor()
      setTagColors(prevColors => ({ ...prevColors, [tag]: newColor }))
    }
    // Return the color for the tag or an empty string if not found
    return tagColors[tag] || ''
  }

  return (
    <tr className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
      <td>
        <button onClick={() => onFav(task.id)}>
          {task.isFavorite ? (
            // Star icon for favorited task
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-star"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="yellow"
              fill="yellow"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
            </svg>
          ) : (
            // Star icon for non-favorited task
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-star"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
            </svg>
          )}
        </button>
      </td>
      {/* Task title */}
      <td>{task?.title}</td>
      {/* Task description */}
      <td>
        <div>{task?.description}</div>
      </td>
      <td>
        <ul className="flex justify-center gap-1.5 flex-wrap">
          {/* Map through task tags and display each with a colored background */}
          {Array.isArray(task?.tags)
            ? task?.tags.map((tag, i) => (
                <li key={i}>
                  <span
                    style={{ background: getTagColor(tag, i) }}
                    className="inline-block h-5 whitespace-nowrap rounded-[45px] px-2.5 text-sm capitalize text-[#F4F5F6]"
                  >
                    {tag}
                  </span>
                </li>
              ))
            : null}
        </ul>
      </td>
      {/* Task priority */}
      <td className="text-center">{task?.priority}</td>
      <td>
        {/* Task options (Delete and Edit) */}
        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={() => onDeleteTask(task.id)}
            className="text-red-500"
          >
            Delete
          </button>
          <button onClick={() => onEdit(task)} className="text-blue-500">
            Edit
          </button>
        </div>
      </td>
    </tr>
  )
}

export default Task
