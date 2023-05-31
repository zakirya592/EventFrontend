import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Card from 'react-bootstrap/Card';
import { Avatar, Space } from 'antd';
import { UserOutlined } from "@ant-design/icons"
import moment from 'moment';
import Sidebard from "../../../Component/Sidebard/Sidebard";
// import "./Userdet.css"
const drawerWidth = 220

function Helpdeskdetails() {
    
    const [dataget, setdataget] = useState();
    const [formattedDate, setFormattedDate] = useState();

    const fetchLocations = () => {
        axios.get(`http://gs1ksa.org:3015/api/get_post_help_deskById/${localStorage.getItem('deskIDview') }`)
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
    <>
      <div className=''>
          <Box sx={{ display: 'flex' }}>
              <Sidebard/>
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
                                <div className="card topcard " key={index}>
                                    <div className="w-100 row container justify-content-between">
                                        
                                        <div className="card-body col-4 offset-md-1  mt-3 ">
                                  
                                            <div className=" d-flex justify-content-between">
                                                <h6 className="fw-bold headidet" >DeskID</h6>
                                                <p className="prodel">{item.deskID}</p>
                                        </div>
                                        <div className="justify-content-between d-flex ">
                                            <h6 className="fw-bold headidet" >First Name</h6>
                                            <p className="prodel">{item.first_name}</p>
                                        </div>
                                        <div className="justify-content-between d-flex ">
                                            <h6 className="fw-bold headidet" >Last Name</h6>
                                            <p className="prodel">{item.last_name}</p>
                                        </div>
                                        <div className="justify-content-between d-flex ">
                                            <h6 className="fw-bold headidet" >Email</h6>
                                            <p className="prodel">{item.email}</p>
                                        </div>
                                        <div className="justify-content-between d-flex ">
                                            <h6 className="fw-bold headidet" >Issue</h6>
                                                <p className="prodel">{item.issue}</p>
                                        </div>
                                        <div className="justify-content-between d-flex ">
                                            <h6 className="fw-bold headidet" >Detail</h6>
                                            <p className="prodel">{item.detail}</p>
                                        </div>
                                            <div className="justify-content-between d-flex ">
                                            <h6 className="fw-bold headidet" >Ticket No</h6>
                                                <p className="prodel">{item.ticket_no}</p>
                                        </div>
                                        
                                       
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
    </>
  )
}

export default Helpdeskdetails