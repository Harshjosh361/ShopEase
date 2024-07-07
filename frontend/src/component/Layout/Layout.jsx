import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from "react-hot-toast";

function Layout(props) {
  return (
    <div>
      <Header></Header>
      <main style={{minHeight:'80vh'}}>{props.children}</main>
      <Toaster />
      <Footer></Footer>
    </div>
  )
}

export default Layout
