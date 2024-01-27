import React from 'react'

import Task from './Task'
const TaskList = ({ tasks, onDeleteTask, onEdit, onFav }) => {
  return (
    <>
      <div className="overflow-auto">
        <table className="table-fixed overflow-auto xl:w-full">
          <thead>
            <tr>
              <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]">
                {' '}
                Title{' '}
              </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize w-full">
                {' '}
                Description{' '}
              </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
                {' '}
                Tags{' '}
              </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                {' '}
                Priority{' '}
              </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                {' '}
                Options{' '}
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping over tasks and rendering each Task component */}
            {tasks?.map(task => (
              <Task
                key={task.id}
                task={task}
                onEdit={onEdit}
                onFav={onFav}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TaskList
