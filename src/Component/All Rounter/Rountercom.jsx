import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Personalinformation from '../../Companpage/Personalinformation'
import Tfoepedetails from '../../Companpage/Tfoepedetails'

function Rountercom() {
  return (
    <>
          <BrowserRouter>
              <Routes>
                  {/* ---------Home Section----------- */}
                  <Route exact path='/' element={<Personalinformation />} />
                  <Route axact path='/Sendinquiry' element={<Tfoepedetails />} />
              </Routes>
          </BrowserRouter>
    </>
  )
}

export default Rountercom