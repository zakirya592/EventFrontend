import React, { useState, useEffect, useRef } from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Sidebard from '../../Component/Sidebard/Sidebard';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Swal from "sweetalert2";
import eye from "../../img/eye.png";
import deleteicon from "../../img/Delate.png"
import { EyeFilled, EditFilled, DeleteFilled, CheckCircleFilled, FilterOutlined } from '@ant-design/icons';

// import "./Liststyle.css"
import axios from 'axios'
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 220

function Register() {
    const navigate =useNavigate()
    function createData(name, code, population, size) {
        const density = population / size;
        return { name, code, population, size, density };
    }

    const rows = [
        createData('India', 'IN', 1324171354, 3287263),
        createData('China', 'CN', 1403500365, 9596961),
        createData('Italy', 'IT', 60483973, 301340),
        createData('United States', 'US', 327167434, 9833520),
        createData('Canada', 'CA', 37602103, 9984670),
        createData('Australia', 'AU', 25475400, 7692024),
        createData('Germany', 'DE', 83019200, 357578),
        createData('Ireland', 'IE', 4857000, 70273),
        createData('Mexico', 'MX', 126577691, 1972550),
        createData('Japan', 'JP', 126317000, 377973),
        createData('France', 'FR', 67022000, 640679),
        createData('United Kingdom', 'GB', 67545757, 242495),
        createData('Russia', 'RU', 146793744, 17098246),
        createData('Nigeria', 'NG', 200962417, 923768),
        createData('Brazil', 'BR', 210147125, 8515767),
    ];
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
    const [activeData, setActiveData] = useState();
    const apicall = () => {
        axios.get(`http://gs1ksa.org:3015/api/getMembersAll`)
            .then((res) => {
                // setdataget(res.data.recordset);
                console.log(res.data);
                setRows(res.data.recordset);
                // setlength(res.data.recordset.length);
                const dadad = res.data.recordset;
                const dataga = dadad.filter((item) => item.status !== 'Active'); // Filter the data based on the 'status' property
                setActiveData(dataga)
                setlength(dataga.length);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        apicall();
    }, []);

    // Approve api section
    const Approveapi = (memberID) => {
        console.log(memberID);
        axios.put(`http://gs1ksa.org:3015/api/tblApprovalUser/${memberID}`)
            .then((res) => {
                console.log(res);
                apicall();
                Swal.fire({
                    title: "Success",
                    text: "You have  Successfully Approva this User",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function handleIconClick() {
        setShowInput(!showInput);
    }
    const [rowss, setRows] = React.useState([])
  return (
    <>
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
                      <div className=" mt-5">
                          <Paper sx={{ width: '100%', overflow: 'hidden', }}>
                              <TableContainer sx={{ maxHeight: 400 }}>
                                  <Table stickyHeader aria-label="sticky table">
                                      <TableHead>

                                          <TableRow classname='fontfamilyRoboto contracttableheaderpadding'>
                                              <TableCell numeric className="fontfamilyRoboto contracttableheaderpadding" > First Name  <FilterOutlined onClick={() => { setShowInput(!showInput) }} /></TableCell>
                                              {/* <TableCell className="tablehad">ID</TableCell> */}
                                              <TableCell className=" fontfamilyRoboto contracttableheaderpadding ">
                                                  last Name </TableCell>
                                              <TableCell className=" fontfamilyRoboto contracttableheaderpadding ">City</TableCell>
                                              <TableCell className="fontfamilyRoboto contracttableheaderpadding ">Club Name</TableCell>
                                              <TableCell className="fontfamilyRoboto contracttableheaderpadding ">National president </TableCell>
                                              <TableCell className="fontfamilyRoboto contracttableheaderpadding ">Club secretry NO</TableCell>
                                              <TableCell className="fontfamilyRoboto contracttableheaderpadding ">Status</TableCell>
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
                                          activeData && activeData.filter((person) =>
                                              person.first_name.toLowerCase().includes(filter.toLowerCase()) &&
                                              person.last_name.toLowerCase().includes(filterlastname.toLowerCase())

                                          ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((itme, index) => {
                                              return (

                                                  <TableBody className="fortablebodypadding text-black fontfamilyInter">
                                                      {/* {rows.map(({ id, name, calories, fat, carbs, protein }) => ( */}
                                                      <TableRow
                                                          className="" key={index}>
                                                          <TableCell numeric className="fortablebodypadding text-blackcontract text-black fontfamilyInter ">
                                                              <Avatar src={<img src={itme.selfieIDImage} alt="UserImage" style={{ backgroundColor: '#505254', color: '#f56a00' }} />} ></Avatar> {itme.first_name}
                                                          </TableCell>
                                                          <TableCell className="fortablebodypadding text-black fontfamilyInter ">
                                                              {itme.last_name}
                                                          </TableCell>

                                                          <TableCell className="fortablebodypadding text-black fontfamilyInter "> {itme.city}</TableCell>
                                                          <TableCell className="fortablebodypadding text-black fontfamilyInter ">{itme.club_name}</TableCell>

                                                          <TableCell className="fortablebodypadding text-black fontfamilyInter ">
                                                              {itme.national_president}
                                                          </TableCell>
                                                          <TableCell className="fortablebodypadding text-black fontfamilyInter ">{itme.club_secretry_NO}</TableCell>
                                                          <TableCell numeric className="fortablebodypadding text-black fontfamilyInter text-end">
                                                              {/* <!-- Example single danger button --> */}
                                                              <div className="btn-group">
                                                                  <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                      Action
                                                                  </button>
                                                                  <ul className="dropdown-menu">
                                                                      <li><p className="dropdown-item forpointer" onClick={() => {
                                                                          navigate(`/Userdetail/:id`);
                                                                          sessionStorage.setItem("Userdetailid", itme.memberID);
                                                                      }}><EyeFilled  className='text-primary fw-bolder me-2' /><span className='my-3 fw-bolder'>View</span> </p></li>
                                                                      <li><p className="dropdown-item forpointer"><EditFilled  className='text-primary fw-bolder me-2' /><span className='my-3 fw-bolder'>Modify</span> </p></li>
                                                                      <li><p className="dropdown-item forpointer"><DeleteFilled  className='text-danger fw-bolder me-2' /><span className='my-3 fw-bolder'>Remove</span> </p></li>
                                                                      <li><p className="dropdown-item forpointer" onClick={
                                                                          () =>
                                                                              Approveapi(itme.memberID)
                                                                      }><CheckCircleFilled  className='text-primary fw-bolder me-2' /><span className='my-3 fw-bolder'>Approve</span> </p></li>
                                                                      </ul>
                                                              </div>
                                                              {/* <div className="actionimag d-flex justify-content-around py-2 rounded w-100">
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
                                                              </div> */}
                                                          </TableCell>
                                                      </TableRow>

                                                      {/* ))} */}
                                                  </TableBody>

                                              );
                                          })}

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
    </>
  )
}

export default Register