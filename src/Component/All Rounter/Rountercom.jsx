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
import Loaction from '../../Companpage/Loaction';
import Helpdask from '../../Companpage/Help Dask/Helpdask';
import EaglesClub from '../../Companpage/Eagles Club/EaglesClub';
import Register from '../../Companpage/Registered user/Register';
import Userdetail from '../User Details/Userdetail';
import Mapss from '../../Companpage/Mapss';
import Edit from '../../Companpage/Registered user/Edit/Edit';
import NewTicket from '../../Companpage/Help Dask/NewTicket';
import Forgetpassword from '../Login/Forgetpassword';
import Changepassword from '../Login/Changepassword';
import OTP from '../Login/OTP';
import Helpdeskdetails from '../../Companpage/Help Dask/Helpdesk details/Helpdeskdetails';
import Updatahelp from '../../Companpage/Help Dask/Updatahelp';
import Addhelpdesk from '../../Companpage/Help Dask/Addhelpdesk';
import Setting from '../../Companpage/Setting/Setting';

function Rountercom() {
  function gat() {
    console.log('data');
  }
  return (
    <>
          <BrowserRouter>
              <Routes>
                  {/* ---------Register Section----------- */}
          <Route exact path='/Personalinformation' element={<Personalinformation  />}  />
          <Route axact path='/Sendinquiry' element={<Tfoepedetails handleFunction={gat} />} />
          {/* ==================Setting========================== */}
          <Route exact path='/Setting' element={<Setting />} />
          {/* =================Login section=================== */}
          <Route exact path='/' element={<Login />} />
          <Route exact path='/Forgetpassword' element={<Forgetpassword />} />
          <Route exact path='/OTP' element={<OTP />} />
          <Route exact path='/Changepassword' element={<Changepassword />} />
          {/*==================== Dashbord section================= */}
          <Route exact path='/Dashbord' element={<Dashbord />} />
          <Route exact path='/List/members' element={<ListofALL />} />
          {/* =============Event================ */}
          <Route exact path='/Event' element={<Event />} />
          <Route exact path='/Event/Add' element={<Createevent/>} />
          <Route exact path='/Event/updata/:_id' element={<Eventupdata />} />
          {/* ==============Eagles club ================== */}
          <Route exact path='/Loaction' element={<Loaction />} />
          <Route exact path='/EaglesClub' element={<EaglesClub />} />
          {/* ===================Register user============== */}
          <Route exact path='/Register' element={<Register />} />
          <Route exact path='/Register/Edit/:id' element={<Edit />} />
          <Route exact path='/Userdetail/:_id' element={<Userdetail />} />
          {/* ===============Help Dask ======================= */}
          <Route exact path='/Helpdask' element={<Helpdask />} />
          <Route exact path='NewTicket' element={<NewTicket />} />
          <Route exact path='/Helpdeskdetails/:_id' element={<Helpdeskdetails />} />
          <Route exact path='/Helpdask/Updata/:_id' element={<Updatahelp />} />
          <Route exact path='/Helpdask/Add' element={<Addhelpdesk />} />
          
              </Routes>
          </BrowserRouter>
    </>
  )
}

export default Rountercom