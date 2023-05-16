import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Personalinformation from '../../Companpage/Personalinformation'
import Tfoepedetails from '../../Companpage/Tfoepedetails'
import Login from '../Login/Login';
import ListofALL from '../../Companpage/List of ALL members/ListofALL';
import Event from '../../Companpage/Event/Event';
import Eventupdata from '../../Companpage/Event/Updata/Eventupdata';
import Createevent from '../../Companpage/Event/Create Event/Createevent';
import Dashbord from '../../Companpage/Dashbord/Dashbord';

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
          <Route exact path='/Dashbord' element={<Dashbord />} />
          <Route exact path='/List/members' element={<ListofALL />} />
          <Route exact path='/Event/Add' element={<Createevent/>} />
          <Route exact path='/Event' element={<Event />} />
          <Route exact path='/Event/updata/:_id' element={<Eventupdata />} />
          
              </Routes>
          </BrowserRouter>
    </>
  )
}

export default Rountercom