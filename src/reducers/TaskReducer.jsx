import { initialTask } from '../data/task'

// Defining the initial state for the task reducer
const initialState = {
  taskData: initialTask,
}

// Defining the task reducer function
const taskReducer = (state, action) => {
  switch (action.type) {
    // Case for adding a new task
    case 'ADD_TASK': {
      return {
        taskData: [...state.taskData, action.payload],
      }
    }
    // Case for editing an existing task
    case 'EDIT_TASK': {
      return {
        taskData: state.taskData.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      }
    }
    // Case for deleting a task
    case 'DELETE_TASK': {
      return {
        taskData: state.taskData.filter(task => task.id !== action.payload),
      }
    }
    // Case for toggling the favorite status of a task
    case 'TOGGLE_FAV_TASK': {
      const { payload: taskId } = action
      const updatedTaskData = state.taskData.map(task =>
        task.id === taskId ? { ...task, isFavorite: !task.isFavorite } : task
      )

      return {
        ...state,
        taskData: updatedTaskData,
      }
    }
    // Case for searching tasks
    case 'SEARCH_TASKS': {
      return {
        ...state,
        taskData: action.payload,
      }
    }
    // Case for deleting all tasks
    case 'DELETE_ALL_TASKS': {
      return {
        taskData: [],
      }
    }
    // Default case for handling unknown action types
    default:
      return state
  }
}

export { initialState, taskReducer }
