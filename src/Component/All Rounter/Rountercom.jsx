import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Personalinformation from '../../Companpage/Personalinformation'
import Tfoepedetails from '../../Companpage/Tfoepedetails'

function Rountercom() {
  function gat() {
    console.log('data');
  }
  return (
    <>
          <BrowserRouter>
              <Routes>
                  {/* ---------Home Section----------- */}
          <Route exact path='/' element={<Personalinformation  />}  />
          <Route axact path='/Sendinquiry' element={<Tfoepedetails handleFunction={gat} />} />
              </Routes>
          </BrowserRouter>
    </>
  )
}

export default Rountercom