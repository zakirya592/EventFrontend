import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import Badge from '@mui/material/Badge'
// import { DownOutlined } from '@ant-design/icons';
import eye from '../../img/eye.png'
import deleteicon from '../../img/Delate.png'
// import "./Liststyle.css"
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { FilterOutlined } from '@ant-design/icons'
import { UserOutlined, EditFilled, DeleteFilled, CheckCircleFilled, EyeFilled } from '@ant-design/icons'
import Sidebard from '../../Component/Sidebard/Sidebard'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from "sweetalert2";


import moment from 'moment'

const drawerWidth = 220

function Event () {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
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
  // Main API fuction of the compount
  const [dataget, setdataget] = useState()
  const [filter, setFilter] = useState('')
  const [filterlastname, setfilterlastname] = useState('')

  const [showInput, setShowInput] = useState(false)
  const [filterlastnameinput, setfilterlastnameinput] = useState(false)
  const [formattedDate, setFormattedDate] = useState()
    const [length, setlength] = useState("");
  const apicall = () => {
    axios
      .get(`http://gs1ksa.org:3015/api/getEventAll`)
      .then(res => {
        setdataget(res.data.recordset)
        console.log(res.data)
        setRows(res.data.recordset)
        const datesss = res.data.recordset
        const dateString = { datesss }
        const dateObject = moment(dateString).toDate()
        const getdatasss = moment(dateObject).format('M/D/YYYY')
        console.log(getdatasss)
        setFormattedDate(getdatasss)
          setlength(res.data.recordset.length);
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    apicall()
  }, [])

  // Deleted api section
  const Deletedapi = id => {
    console.log(id)
       const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success mx-2',
                cancelButton: 'btn btn-danger mx-2',
                // actions: 'mx-3'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://gs1ksa.org:3015/api/deleteEventById/${id}`)
                    .then(res => {
                        console.log(res)
                        apicall()
                    })
                    .catch(err => {
                        console.log(err)
                    })
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'User has been deleted.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary User is safe :)',
                    'error'
                )
            }
        })


  }

  function handleIconClick () {
    setShowInput(!showInput)
  }
  const [rows, setRows] = React.useState([])

    // Approve api section
    const Inactiveapi = (id) => {
        console.log(id);
        axios.put(`http://gs1ksa.org:3015/api/tblUpdateEventstatusInactive/${id}`)
            .then((res) => {
                console.log(res);
                apicall();
                Swal.fire({
                    title: "Success",
                    text: "You have  Inactive Event  this Event",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Approve api section
    const Activeapi = (id) => {
        console.log(id);
        axios.put(`http://gs1ksa.org:3015/api/tblUpdateEventstatusActive/${id}`)
            .then((res) => {
                console.log(res);
                apicall();
                Swal.fire({
                    title: "Success",
                    text: "You have  Successfully Active this Event",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };


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
            <div className='d-flex  mt-4'>
              <button
                className='loginbtn border-0 w-auto px-4 py-2 rounded text-white'
                type='submit'
                onClick={() => {
                  navigate('/Event/Add')
                }}
              >
                Create new Event
              </button>
            </div>
            <Paper className='w-100 h-100 overflow-auto mt-1'>
                <TableContainer sx={{ maxHeight: 500, height: '450px' ,width:'100%'} }>
              <Table className='tablebg mt-4' id='data'>
                {/* Header section */}
                <TableHead>
                  <TableRow classname='fontfamilyRoboto contracttableheader'>
                    <TableCell
                      numeric
                      className='fontfamilyRoboto contracttableheader text-center'
                    >
                      Event Name{' '}
                      <FilterOutlined
                        onClick={() => {
                          setShowInput(!showInput)
                        }}
                      />
                    </TableCell>
                    {/* <TableCell className="tablehad">ID</TableCell> */}
                    <TableCell className=' fontfamilyRoboto contracttableheader text-start'>
                      Event Description{' '}
                    </TableCell>
                    <TableCell className=' fontfamilyRoboto contracttableheader text-start'>
                      Location
                    </TableCell>
                    <TableCell className='fontfamilyRoboto contracttableheader text-start'>
                      Location Area
                    </TableCell>
                    <TableCell className='fontfamilyRoboto contracttableheader text-start'>
                      Start Date{' '}
                    </TableCell>
                    <TableCell className='fontfamilyRoboto contracttableheader text-start'>
                      End Date
                    </TableCell>
                    <TableCell className='fontfamilyRoboto contracttableheader text-center'>
                      Status
                    </TableCell>
                    <TableCell className='fontfamilyRoboto contracttableheader text-center'>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                {showInput && (
                  <input
                    type='text'
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    className='w-50 rounded'
                  />
                )}

                {filterlastnameinput && (
                  <input
                    type='text'
                    value={filterlastname}
                    onChange={e => setfilterlastname(e.target.value)}
                    className='w-50 rounded'
                  />
                )}

                {dataget &&
                  dataget
                    .filter(person =>
                      person.event_name
                        .toLowerCase()
                        .includes(filter.toLowerCase())
                                  ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((itme, index) => {
                      return (
                        <TableBody className='fortablebodycontract text-black fontfamilyInter'>
                          {/* {rows.map(({ id, name, calories, fat, carbs, protein }) => ( */}
                          <TableRow className='' key={index}>
                            <TableCell
                              numeric
                              className='fortablebodycontract text-blackcontract text-black fontfamilyInter text-start'
                            >
                              {itme.event_name}
                              {localStorage.setItem(
                                'eventnae',
                                itme.event_name
                              )}
                            </TableCell>
                            <TableCell className='fortablebodycontract text-black fontfamilyInter text-start'>
                              {itme.event_description}
                              {localStorage.setItem(
                                'description',
                                itme.event_description
                              )}
                            </TableCell>

                            <TableCell className='fortablebodycontract text-black fontfamilyInter text-start'>
                              {' '}
                              {itme.location}{' '}
                              {localStorage.setItem('location', itme.location)}
                            </TableCell>
                            <TableCell className='fortablebodycontract text-black fontfamilyInter text-start'>
                              {itme.location_area}{' '}
                              {localStorage.setItem(
                                'location_area',
                                itme.location_area
                              )}
                            </TableCell>

                            <TableCell className='fortablebodycontract text-black fontfamilyInter text-start'>
                              {formattedDate}
                            </TableCell>
                            <TableCell className='fortablebodycontract text-black fontfamilyInter text-start'>
                              {itme.end_date}
                            </TableCell>
                            <TableCell className='fortablebodycontract text-black fontfamilyInter text-center'>
                              {itme.status}
                            </TableCell>
                            <TableCell
                              numeric
                              className='fortablebodycontract text-black fontfamilyInter text-center'
                            >
                            
                              <div className='btn-group'>
                                <button
                                  type='button'
                                  className='btn btn-primary dropdown-toggle'
                                  data-bs-toggle='dropdown'
                                  aria-expanded='false'
                                >
                                  Action
                                </button>
                                <ul className='dropdown-menu'>
                                              {/* Modify */}
                                  <li>
                                    <p className='dropdown-item forpointer'>
                                      <EditFilled className='text-primary fw-bolder me-2' />
                                      <span
                                        className='my-3 fw-bolder'
                                        onClick={() => {
                                          navigate(`/Event/updata/:id`)
                                            sessionStorage.setItem("updata", itme.id);
                                        }}
                                      >
                                        Modify
                                      </span>{' '}
                                    </p>
                                  </li>
                                              {/* Remove */}
                                  <li>
                                    <p className='dropdown-item forpointer'>
                                      <DeleteFilled className='text-danger fw-bolder me-2' />
                                      <span
                                        className='my-3 fw-bolder'
                                        onClick={() =>
                                        //   Deletedapi(itme.memberID)
                                           Deletedapi(itme.id)
                                        }
                                      >
                                        Remove
                                      </span>{' '}
                                    </p>
                                  </li>

                                  {itme.status === 'InActive' ? (
                                    <li>
                                      <p
                                        className='dropdown-item forpointer disabled'
                                        onClick={() =>
                                            Inactiveapi(itme.id)
                                        }
                                      >
                                        <CheckCircleFilled className='text-primary fw-bolder me-2' />
                                        <span className='my-3 fw-bolder'>
                                          InActive
                                        </span>
                                      </p>
                                    </li>
                                  ) : (
                                    <li>
                                      <p
                                        className='dropdown-item forpointer'
                                          onClick={() =>
                                            Inactiveapi(itme.id)
                                        }
                                      >
                                        <CheckCircleFilled className='text-primary fw-bolder me-2' />
                                        <span className='my-3 fw-bolder'>
                                          InActive
                                        </span>{' '}
                                      </p>
                                    </li>
                                  )}

                                   {itme.status === 'Active' ? (
                                    <li>
                                      <p
                                        className='dropdown-item forpointer disabled'
                                        onClick={() =>
                                            Activeapi(itme.id)
                                        }
                                      >
                                        <CheckCircleFilled className='text-primary fw-bolder me-2' />
                                        <span className='my-3 fw-bolder'>
                                          Active
                                        </span>
                                      </p>
                                    </li>
                                  ) : (
                                    <li>
                                      <p
                                        className='dropdown-item forpointer'
                                          onClick={() =>
                                            Activeapi(itme.id)
                                        }
                                      >
                                        <CheckCircleFilled className='text-primary fw-bolder me-2' />
                                        <span className='my-3 fw-bolder'>
                                          Active
                                        </span>{' '}
                                      </p>
                                    </li>
                                  )}

                                  {/* {itme.status === 'Active' ? (
                                    <li>
                                      <p
                                        className='dropdown-item forpointer '
                                        onClick={() => InActive(itme.memberID)}
                                      >
                                        <CheckCircleFilled className='text-primary fw-bolder me-2' />
                                        <span className='my-3 fw-bolder'>
                                          InActive
                                        </span>{' '}
                                      </p>
                                    </li>
                                  ) : (
                                    <li>
                                      <p
                                        className='dropdown-item forpointer disabled'
                                        onClick={() => InActive(itme.memberID)}
                                      >
                                        <CheckCircleFilled className='text-primary fw-bolder me-2' />
                                        <span className='my-3 fw-bolder'>
                                          InActive
                                        </span>{' '}
                                      </p>
                                    </li>
                                  )} */}
                                </ul>
                              </div>
                            </TableCell>
                          </TableRow>

                          {/* ))} */}
                        </TableBody>
                      )
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
    </div>
  )
}

export default Event
