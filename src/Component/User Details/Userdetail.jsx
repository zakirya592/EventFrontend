import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Sidebard from '../../Component/Sidebard/Sidebard';
import Card from 'react-bootstrap/Card';
import { Avatar, Space } from 'antd';
import { UserOutlined } from "@ant-design/icons"
import moment from 'moment';

const drawerWidth = 220

function Userdetail() {


    const [dataget, setdataget] = useState();
    const [formattedDate, setFormattedDate] = useState();

    const fetchLocations = () => {
        axios.get(`http://gs1ksa.org:3015/api/getMembersById/${sessionStorage.getItem("Userdetailid")}`)
            .then((res) => {
                setdataget(res.data.recordset);
                console.log(res.data);
                const datesss = res.data.recordset
                const dateString = { datesss }
                const dateObject = moment(dateString).toDate();
                const getdatasss = moment(dateObject).format("M/D/YYYY");
                console.log(getdatasss);
                setFormattedDate(getdatasss)
            })
            .catch((err) => {
                console.log(err);
            })
    };

    useEffect(() => {
        fetchLocations();
    }, []);
  return (
      <div className=''>
          <Box sx={{ display: 'flex' }}>
              <Sidebard />
              <AppBar
                  className='fortrans'
                  position='fixed'
                  sx={{
                      width: { sm: `calc(100% - ${drawerWidth}px)` },
                      ml: { sm: `${drawerWidth}px` }
                  }}
              ></AppBar>
              <Box
                  className=''
                  sx={{
                      flexGrow: 1,
                      my: 5,
                      mx: 1,
                      width: { sm: `calc(100% - ${drawerWidth}px)` }
                  }}
              >
                 <div className="mt-5">
                    {
                          dataget && dataget.map((item, index)=>{
                            return(
                                <div className="card " key={index}>
                                   <div>
                                        <Avatar shape="square" className="card-img-top " src={item.selfieIDImage} size={300}  ><span className="text-center"> user Have no Image</span></Avatar>
                                        <h5 className="card-title fw-bold mt-2">{item.first_name} {item.first_name}</h5>

                                   </div>
                                    <div className="card-body container">
                                        <div className="text-start d-flex justify-content-between">
                                            <h6 className="fw-bold headidet" >Email</h6>
                                            <p className="prodel">{item.email}</p>
                                        </div>
                                        <div className="text-start d-flex justify-content-between">
                                            <h6 className="fw-bold headidet" >Phone Number</h6>
                                            <p className="prodel">{item.club_secretry_NO}</p>
                                        </div>
                                        <div className="text-start d-flex justify-content-between">
                                            <h6 className="fw-bold headidet" >Street Address</h6>
                                            <p className="prodel">{item.street_address}</p>
                                        </div>
                                        <div className="text-start d-flex justify-content-between">
                                            <h6 className="fw-bold headidet" >Barangay</h6>
                                            <p className="prodel">{item.barangay}</p>
                                        </div>
                                        <div className="text-start d-flex justify-content-between">
                                            <h6 className="fw-bold headidet" >Province</h6>
                                            <p className="prodel">{item.province}</p>
                                        </div>
                                        <div className="text-start d-flex justify-content-between">
                                            <h6 className="fw-bold headidet" >City</h6>
                                            <p className="prodel">{item.city}</p>
                                        </div>
                                        <div className="text-start d-flex justify-content-between">
                                            <h6 className="fw-bold headidet" >Club Name</h6>
                                            <p className="prodel">{item.club_name}</p>
                                        </div>
                                        <div className="text-start d-flex justify-content-between">
                                            <h6 className="fw-bold headidet" >Club Region</h6>
                                            <p className="prodel">{item.club_region}</p>
                                        </div>
                                        <div className="text-start d-flex justify-content-between">
                                            <h6 className="fw-bold headidet" >National President</h6>
                                            <p className="prodel">{item.national_president}</p>
                                        </div>
                                        <div className="text-start d-flex justify-content-between">
                                            <h6 className="fw-bold headidet" >Club Secretary Contact Number</h6>
                                            <p className="prodel">{item.club_secretry_NO}</p>
                                        </div>
                                        <div className="text-start d-flex justify-content-between">
                                            <h6 className="fw-bold headidet" >Data</h6>
                                            <p className="prodel">{formattedDate}</p>
                                        </div>
                                        </div>
                                </div>
                            )
                          })
                    }
                      
                 </div>

              </Box>
          </Box>

      </div >
  )
}

export default Userdetail