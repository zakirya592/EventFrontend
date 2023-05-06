import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Personalinformation from '../../Companpage/Personalinformation'
import Tfoepedetails from '../../Companpage/Tfoepedetails'
import Login from '../Login/Login';
import ListofALL from '../../Companpage/List of ALL members/ListofALL';

function Rountercom() {
  function gat() {
    console.log('data');
  }
  return (
    <>
          <BrowserRouter>
              <Routes>
                  {/* ---------Home Section----------- */}
          <Route exact path='/Personalinformation' element={<Personalinformation  />}  />
          <Route axact path='/Sendinquiry' element={<Tfoepedetails handleFunction={gat} />} />
          <Route exact path='/' element={<Login />} />
          <Route exact path='/List/members' element={<ListofALL />} />
              </Routes>
          </BrowserRouter>
    </>
  )
}

export default Rountercom