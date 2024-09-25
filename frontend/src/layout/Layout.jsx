import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
    </div>
  )
}

export default Layout