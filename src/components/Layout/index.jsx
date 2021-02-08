import React from 'react'
import Footer from '../Footer'
import Header from '../Header'
import '../../styles/main.scss'

function Layout({children}) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  )
}

export default Layout
