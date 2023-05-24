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

    const navigate = useNavigate()
    function createData(name, code, population, size) {
        const density = population / size;
        return { name, code, population, size, density };
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [open, setOpen] = React.useState(false)
    const anchorRef = React.useRef(null)

    // Main API fuction of the compount
    const [dataget, setdataget] = useState();
    const [filter, setFilter] = useState("");
    const [filterlastname, setfilterlastname] = useState("");
    const [length, setlength] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [filterlastnameinput, setfilterlastnameinput] = useState(false);
    const [data, setData] = useState([]);
    const [activeData, setActiveData] = useState();
    const apicall = () => {
        axios.get(`http://gs1ksa.org:3015/api/getMembersAll`)
            .then((res) => {
                setdataget(res.data.recordset);
                console.log(res.data);
                setRows(res.data.recordset);
                setlength(res.data.recordset.length);
                // const formattedDate = moment(res).format('M/D/Y')
                const dadad = res.data.recordset;
                const dataga = dadad.filter((item) => item.status !== 'Active'); // Filter the data based on the 'status' property
                setActiveData(dataga)
                // setlength(dataga.length);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        apicall();
    }, []);
    const [rowss, setRows] = React.useState([])

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
          

          <Paper sx={{ width: '100%', overflow: 'hidden', }}>
                              <TableContainer sx={{ maxHeight: 500, height: '450px' } }>
                                  <Table stickyHeader aria-label="sticky table">
                                      <TableHead>

                                          <TableRow classname='fontfamilyRoboto contracttableheaderpadding'>
                                              <TableCell numeric className="fontfamilyRoboto contracttableheaderpadding" > First Name  <FilterOutlined onClick={() => { setShowInput(!showInput) }} /></TableCell>
                                              {/* <TableCell className="tablehad">ID</TableCell> */}
                                              <TableCell className=" fontfamilyRoboto contracttableheaderpadding ">
                                                  last Name </TableCell>
                                              <TableCell className=" fontfamilyRoboto contracttableheaderpadding ">
                                                  Email </TableCell>
                                              <TableCell className=" fontfamilyRoboto contracttableheaderpadding ">City</TableCell>
                                              <TableCell className="fontfamilyRoboto contracttableheaderpadding ">Club Name</TableCell>
                                              <TableCell className="fontfamilyRoboto contracttableheaderpadding ">National president </TableCell>
                                              <TableCell className="fontfamilyRoboto contracttableheaderpadding ">Club secretry NO</TableCell>
                                              <TableCell className="fontfamilyRoboto contracttableheaderpadding text-center">Status</TableCell>
                                             </TableRow>

                                      </TableHead>
                                      {showInput &&
                                          <input
                                              type="text"
                                              value={filter}
                                              onChange={(e) => setFilter(e.target.value)}
                                              className='w-50 rounded'
                                          />}

                                      {
                                          dataget && dataget.length > 0 ?(
                                              dataget && dataget.filter((person) =>
                                                  person.first_name.toLowerCase().includes(filter.toLowerCase()) &&
                                                  person.last_name.toLowerCase().includes(filterlastname.toLowerCase())

                                              ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((itme, index) => {
                                                  return (

                                                      <TableBody className="fortablebodypadding text-black fontfamilyInter">
                                                          {/* {rows.map(({ id, name, calories, fat, carbs, protein }) => ( */}
                                                          <TableRow
                                                              className="" key={index}>
                                                              <TableCell numeric className="fortablebodypadding text-blackcontract text-black fontfamilyInter ">
                                                                  <Avatar src={<img src={itme.selfieIDImage} alt="UserImage" style={{ backgroundColor: '#505254', color: '#f56a00' }} />} ></Avatar> {itme.first_name} {sessionStorage.setItem("first_name", itme.first_name)}
                                                              </TableCell>
                                                              <TableCell className="fortablebodypadding text-black fontfamilyInter ">
                                                                  {itme.last_name}
                                                                  {sessionStorage.setItem("last_name", itme.last_name)}
                                                              </TableCell>

                                                              <TableCell className="fortablebodypadding text-black fontfamilyInter ">
                                                                  {itme.email}
                                                              </TableCell>

                                                              <TableCell className="fortablebodypadding text-black fontfamilyInter "> {itme.city}{sessionStorage.setItem("city", itme.city)}</TableCell>
                                                              <TableCell className="fortablebodypadding text-black fontfamilyInter ">{itme.club_name} {sessionStorage.setItem("club_name", itme.club_name)}</TableCell>

                                                              <TableCell className="fortablebodypadding text-black fontfamilyInter ">
                                                                  {itme.national_president} {sessionStorage.setItem("national_president", itme.national_president)}
                                                              </TableCell>
                                                              <TableCell className="fortablebodypadding text-black fontfamilyInter ">{itme.club_secretry_NO}  {sessionStorage.setItem("club_secretry_NO", itme.club_secretry_NO)}</TableCell>
                                                              <TableCell className="fortablebodypadding text-black fontfamilyInter ">{itme.status}</TableCell>
                                                             
                                                          </TableRow>

                                                          {/* ))} */}
                                                      </TableBody>

                                                  );
                                              })
                                          ):(
                                             <div>
          <p className='text-center w-100 nodata'  >
            No data available.
          </p>
        </div>
                                          )
                                         
                                          
                                          }

                                  </Table>
                              </TableContainer>
                              <TablePagination
                                  rowsPerPageOptions={[10, 25, 100]}
                                  component="div"
                                  count={length}
                                  rowsPerPage={rowsPerPage}
                                  page={page}
                                  onPageChange={handleChangePage}
                                  onRowsPerPageChange={handleChangeRowsPerPage}
                              />
                          </Paper>

        </div>


                </Box>
        </Box>
        </div >
  )
}

export default Helpdask