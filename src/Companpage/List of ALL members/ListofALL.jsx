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
import "./Liststyle.css"
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FilterOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import Sidebard from '../../Component/Sidebard/Sidebard';
const drawerWidth = 220

function ListofALL() {

    const [open, setOpen] = React.useState(false)
    const anchorRef = React.useRef(null)

    // Main API fuction of the compount
    const [dataget, setdataget] = useState();
    const [filter, setFilter] = useState("");
    const [filterlastname, setfilterlastname] = useState("");

    const [showInput, setShowInput] = useState(false);
    const [filterlastnameinput, setfilterlastnameinput] = useState(false);

    const apicall = () => {
        axios
            .get(`http://gs1ksa.org:3015/api/getMembersAll`)
            .then((res) => {
                setdataget(res.data.recordset);
                console.log(res.data);
                setRows(res.data.recordset);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        apicall();
    }, []);

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


        <div className='mt-3 w-100 h-100 overflow-aut'>

            <Paper className="w-100 h-100 overflow-auto mt-1">
                <Table className="tablebg mt-4" id="data">
                    {/* Header section */}
                    <TableHead>

                        <TableRow classname='fontfamilyRoboto contracttableheader'>
                            <TableCell numeric className="fontfamilyRoboto contracttableheader text-center" >First Name  <FilterOutlined onClick={() => { setShowInput(!showInput) }} /></TableCell>
                            {/* <TableCell className="tablehad">ID</TableCell> */}
                            <TableCell className=" fontfamilyRoboto contracttableheader text-center">
                                last Name <FilterOutlined onClick={() => { setfilterlastnameinput(!filterlastnameinput) }} />   </TableCell>
                            <TableCell className=" fontfamilyRoboto contracttableheader text-center">City</TableCell>
                            <TableCell className="fontfamilyRoboto contracttableheader text-center">Club Name</TableCell>
                            <TableCell className="fontfamilyRoboto contracttableheader text-center">National president </TableCell>
                            <TableCell className="fontfamilyRoboto contracttableheader text-center">Club secretry NO</TableCell>
                            <TableCell className="fontfamilyRoboto contracttableheader text-center">Status</TableCell>
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
                            person.first_name.toLowerCase().includes(filter.toLowerCase()) &&
                            person.last_name.toLowerCase().includes(filterlastname.toLowerCase())

                        ).map((itme, index) => {
                            return (

                                <TableBody className="fortablebodycontract text-black fontfamilyInter">
                                    {/* {rows.map(({ id, name, calories, fat, carbs, protein }) => ( */}
                                    <TableRow
                                        className="" key={index}>
                                        <TableCell numeric className="fortablebodycontract text-blackcontract text-black fontfamilyInter text-center">
                                            {itme.first_name}
                                        </TableCell>
                                        <TableCell className="fortablebodycontract text-black fontfamilyInter text-center">
                                            {itme.last_name}
                                        </TableCell>

                                        <TableCell className="fortablebodycontract text-black fontfamilyInter text-center"> {itme.city}</TableCell>
                                        <TableCell className="fortablebodycontract text-black fontfamilyInter text-center">{itme.club_name}</TableCell>

                                        <TableCell className="fortablebodycontract text-black fontfamilyInter text-center">
                                            {itme.national_president}
                                        </TableCell>
                                        <TableCell className="fortablebodycontract text-black fontfamilyInter text-center">{itme.club_secretry_NO}</TableCell>
                                        <TableCell numeric className="fortablebodycontract text-black fontfamilyInter text-center">
                                            <div className="actionimag d-flex justify-content-around py-2 rounded w-100">
                                                <img
                                                    className="cursor my-auto"
                                                    height="17px"
                                                    src={eye}
                                                    onClick={() => {
                                                        //   navigate(`/Hospitalview/${itme._id}`);
                                                        //   sessionStorage.setItem("detailshosta", itme._id);
                                                        // navigate("/Hospitalview");
                                                    }}
                                                />
                                                <img className="cursor" src={deleteicon} />
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

export default ListofALL