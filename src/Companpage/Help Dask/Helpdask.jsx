import React, { useState, useEffect } from 'react';
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
// import { DownOutlined } from '@ant-design/icons';
import eye from "../../img/eye.png";
import deleteicon from "../../img/Delate.png"
// import "./Liststyle.css"
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FilterOutlined } from '@ant-design/icons';
import { UserOutlined, EditFilled } from '@ant-design/icons';
import { Avatar } from 'antd';
import Sidebard from '../../Component/Sidebard/Sidebard';
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';

const drawerWidth = 220

function Helpdask() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false)
    const anchorRef = React.useRef(null)

    // Main API fuction of the compount
    const [dataget, setdataget] = useState();
    const [filter, setFilter] = useState("");
    const [filterlastname, setfilterlastname] = useState("");

    const [showInput, setShowInput] = useState(false);
    const [filterlastnameinput, setfilterlastnameinput] = useState(false);
    const [formattedDate, setFormattedDate] = useState();
    const apicall = () => {
        axios.get(`http://gs1ksa.org:3015/api/getEventAll`)
            .then((res) => {
                setdataget(res.data.recordset);
                console.log(res.data);
                setRows(res.data.recordset);
                const datesss = res.data.recordset
                const dateString = { datesss }
                const dateObject = moment(dateString).toDate();
                const getdatasss = moment(dateObject).format("M/D/YYYY");
                console.log(getdatasss);
                setFormattedDate(getdatasss)
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        apicall();
    }, []);

    // Deleted api section
    const Deletedapi = (id) => {
        console.log(id);
        axios
            .delete(`http://gs1ksa.org:3015/api/deleteEventById/${id}`)
            .then((res) => {
                console.log(res);
                apicall();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function handleIconClick() {
        setShowInput(!showInput);
    }
    const [rows, setRows] = React.useState([])
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


        <div className='mt-5 w-100 h-100 overflow-aut'>
{/* <div className='d-flex  mt-4'>
              <button
                  className='loginbtn border-0 w-auto px-4 py-2 rounded text-white'
                  type='submit'
                  onClick={(()=>{
                      navigate('/Event/Add')
                  })}
              >
                 Create new Event

              </button>
              </div> */}
            <Paper className="w-100 h-100 overflow-auto mt-1">
                <Table className="tablebg mt-4" id="data">
                    {/* Header section */}
                    <TableHead>

                        <TableRow classname='fontfamilyRoboto contracttableheader'>
                            <TableCell numeric className="fontfamilyRoboto contracttableheader text-center" >Event Name  <FilterOutlined onClick={() => { setShowInput(!showInput) }} /></TableCell>
                            {/* <TableCell className="tablehad">ID</TableCell> */}
                            <TableCell className=" fontfamilyRoboto contracttableheader text-center">
                                Event Description   </TableCell>
                            <TableCell className=" fontfamilyRoboto contracttableheader text-center">Location</TableCell>
                            <TableCell className="fontfamilyRoboto contracttableheader text-center">Location Area</TableCell>
                            <TableCell className="fontfamilyRoboto contracttableheader text-center">Start Date </TableCell>
                            <TableCell className="fontfamilyRoboto contracttableheader text-center">End Date</TableCell>
                            <TableCell className="fontfamilyRoboto contracttableheader text-center">Status</TableCell>
                             <TableCell className="fontfamilyRoboto contracttableheader text-center">Action</TableCell>
                        </TableRow>

                    </TableHead>
                    {showInput &&
                        <input
                            type="text"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className='w-50 rounded'
                        />}

                    {filterlastnameinput &&
                        <input
                            type="text"
                            value={filterlastname}
                            onChange={(e) => setfilterlastname(e.target.value)}
                            className='w-50 rounded'
                        />} 


                    {
                        dataget && dataget.filter((person) =>
                            person.event_name.toLowerCase().includes(filter.toLowerCase())
                        ).map((itme, index) => {
                            return (

                                <TableBody className="fortablebodycontract text-black fontfamilyInter">
                                    {/* {rows.map(({ id, name, calories, fat, carbs, protein }) => ( */}
                                    <TableRow
                                        className="" key={index}>
                                        <TableCell numeric className="fortablebodycontract text-blackcontract text-black fontfamilyInter text-center">
                                            {itme.event_name}
                                            {localStorage.setItem("eventnae", itme.event_name )}
                                        </TableCell>
                                        <TableCell className="fortablebodycontract text-black fontfamilyInter text-center">
                                            {itme.event_description}
                                            {localStorage.setItem("description", itme.event_description)}
                                        </TableCell>

                                        <TableCell className="fortablebodycontract text-black fontfamilyInter text-center"> {itme.location} {localStorage.setItem("location", itme.location)}</TableCell>
                                        <TableCell className="fortablebodycontract text-black fontfamilyInter text-center">{itme.location_area}  {localStorage.setItem("location_area", itme.location_area)}</TableCell>

                                        <TableCell className="fortablebodycontract text-black fontfamilyInter text-center">
                                            {itme.start_date}
                                        </TableCell>
                                        <TableCell className="fortablebodycontract text-black fontfamilyInter text-center">{itme.end_date}</TableCell>
                                        <TableCell className="fortablebodycontract text-black fontfamilyInter text-center">{itme.status}</TableCell>
                                        <TableCell numeric className="fortablebodycontract text-black fontfamilyInter text-center">
                                            <div className="actionimag d-flex justify-content-around py-2 rounded w-100">
                                                <EditFilled className="cursor my-auto deletingimag text-white"
                                                    height="17px" onClick={() => {
                                                        navigate(`/Event/updata/:id`);
                                                        sessionStorage.setItem("updata", itme.id);
                                                        // navigate("/Event/updata");
                                                    }}/>
                                                {/* <img
                                                    className="cursor my-auto deletingimag" 
                                                    height="17px"
                                                    src={eye}
                                                    onClick={() => {
                                                        // navigate(`/Event/updata/:_id/${itme.id}`);
                                                          sessionStorage.setItem("updata", itme._id);
                                                        navigate("/Event/updata");
                                                    }}
                                                /> */}
                                                <img className="cursor deletingimag" src={deleteicon}  onClick = {
                               () => 
                                Deletedapi(itme.id)
                             }/>
                                            </div>
                                        </TableCell>
                                    </TableRow>

                                    {/* ))} */}
                                </TableBody>

                            );
                        })}

                </Table>
            </Paper>


        </div>


                </Box>
        </Box>
        </div >
  )
}

export default Helpdask