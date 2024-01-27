import React from 'react'
import notFoundPic from '../../assets/notFoundPic.webp'

const NoTaskFound = () => {
  return (
    <div className="mt-6 text-center">
      <img
        src={notFoundPic}
        alt="Empty Task List"
        className="mx-auto w-1/2 h-54 md:w-1/4"
      />
      <h1 className="text-3xl text-red-500 font-semibold mt-4">
        Oops! Task List is empty!.
      </h1>
      <p className="text-gray-500 mt-2">
        It seems like your task list is empty.
      </p>
      <p className="text-gray-500">Start by adding tasks to stay organized!</p>
    </div>
  )
}

export default NoTaskFound
