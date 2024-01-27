import React from 'react'
import Banner from './components/Banner/Banner'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import TaskBoard from './components/TaskBoard/TaskBoard'

const Page = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <TaskBoard />
      <Footer />
    </>
  )
}

export default Page
