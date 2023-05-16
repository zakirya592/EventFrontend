import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useMediaQuery, IconButton } from '@material-ui/core'
import Swal from "sweetalert2";
import { useTheme } from '@mui/material/styles'
import "./Dashbord.css"
import {
    SearchOutlined,
    CalendarOutlined,
} from '@ant-design/icons'
import Sidebard from '../../Component/Sidebard/Sidebard';
import Rigestermember from './Rigestermember';
import Currenteventdashbord from './Currenteventdashbord';
import Helpdeskbodd from './Helpdeskbodd';
const drawerWidth = 220

function Dashbord() {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const isSmallScreen = useMediaQuery('(max-width: 600px)')

    const navigate = useNavigate();
    const [event, setevent] = useState()
    const [Description, setDescription] = useState()
    const [location, setlocation] = useState()
    const [location_area, setlocation_area] = useState()
    const [status, setstatus] = useState()
    const [start_date, setstart_date] = useState()
    const memberid = localStorage.getItem("id")
    console.log("dash", memberid);
    useEffect(() => {
        axios.get(`http://gs1ksa.org:3015/api/getMembersById/${memberid}`, {
            
        },).then((res) => {
         
            console.log(res.data.recordset[0].status);
            console.log(res.data.recordset[0].status);
            setstatus(res.data.recordset[0].status)
            const approl = res.data.recordset[0].status
            if (approl !=="Active"){
                console.log("this account not varified");
            }
            else{
                console.log("AW pji");
          }
    
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    
 
   
  return (

    <div>
          {status === "Active" ? (
     
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
                          <div className="row mt-5 mx-auto">
                              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2 ">
                                  <div className="mb-3 text-start registeraccount border border-secondary rounded bg-light backgroundcolor ">
                                      <p className='fw-bolder fs-6 p-3'>Create new Event</p>
                                      <Rigestermember />
                                  </div>
                              </div>

                              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2  ">
                                  <div className="mb-3 text-start registeraccount border border-secondary rounded bg-light backgroundcolor">
                                      <p className='fw-bolder fs-6 p-3'>Current Event</p>
                                      <Currenteventdashbord />
                                  </div>
                              </div>

                              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2 ">
                                  <div className="mb-3 text-start registeraccount border border-secondary rounded bg-light backgroundcolor ">
                                      <p className='fw-bolder fs-6 p-3'>Help Desk Active</p>
                                      <Helpdeskbodd />
                                  </div>
                              </div>

                              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2  ">
                                  <div className="mb-3 text-start registeraccount border border-secondary rounded bg-light backgroundcolor">
                                      <p className='fw-bolder fs-6 p-3'>Padding for Approval</p>
                                      <Currenteventdashbord />
                                  </div>
                              </div>

                          </div>


                      </Box>
                  </Box>
          ) : (
                  <div className='Danger'>

                      You have login  Successfully,but you account is {status}  kindly wait for Admin Approva
                </div>
          )}
    </div>
  )
}

export default Dashbord