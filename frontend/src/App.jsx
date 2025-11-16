import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/createPage'
import DetailPage from './pages/detailPage'
import EditPage from './pages/EditPage'
const App = () => {
  return (
    <div className='h-full w-full'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/create' element={<CreatePage />} />
          <Route path='/note/:id' element={<DetailPage />} />
          <Route path='/note/edit/:id' element={<EditPage />} />
        </Routes>      
    </div>
  )
}

export default App