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
import { EyeFilled, EditFilled, DeleteFilled, CheckCircleFilled, FilterOutlined } from '@ant-design/icons';
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar } from 'antd';
import Sidebard from '../../Component/Sidebard/Sidebard';
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';
import Swal from "sweetalert2";

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
    const [showInput, setShowInput] = useState(false);;
    const [activeData, setActiveData] = useState();
    // Get api
    const apicall = () => {
        axios.get(`http://gs1ksa.org:3015/api/get_post_help_desk`)
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

    // Deleted api section
    const Deletedapi = (deskID) => {
        console.log(deskID);
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
                axios.delete(`http://gs1ksa.org:3015/api/deleteHelp_desk_ById/${deskID}`)
                    .then((res) => {
                        console.log(res);
                        apicall();

                    })
                    .catch((err) => {
                        console.log(err);
                    });
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
                                className='loginbtn border-0 w-auto px-4 py-2 mb-4 mt-2 rounded text-white'
                                type='submit'
                                onClick={() => {
                                    navigate('/Helpdask/Add')
                                }}
                            >
                                Add  HelpDask
                            </button>
                        </div>
                        <Paper sx={{ width: '100%', overflow: 'hidden', }}>
                            <TableContainer sx={{ maxHeight: 500, height: '450px' }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>

                                        <TableRow classname='fontfamilyRoboto contracttableheaderpadding'>
                                            <TableCell className=" fontfamilyRoboto contracttableheaderpadding ">
                                                DeskID</TableCell>
                                            <TableCell numeric className="fontfamilyRoboto contracttableheaderpadding " > First Name  <FilterOutlined onClick={() => { setShowInput(!showInput) }} /></TableCell>
                                            {/* <TableCell className="tablehad">ID</TableCell> */}
                                            <TableCell className=" fontfamilyRoboto contracttableheaderpadding ">
                                                last Name </TableCell>
                                            <TableCell className=" fontfamilyRoboto contracttableheaderpadding ">
                                                Email </TableCell>
                                            <TableCell className=" fontfamilyRoboto contracttableheaderpadding ">Issue</TableCell>
                                            <TableCell className="fontfamilyRoboto contracttableheaderpadding ">Ticket no</TableCell>
                                            <TableCell className="fontfamilyRoboto contracttableheaderpadding text-center">Action</TableCell>
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
                                        dataget && dataget.length > 0 ? (
                                            dataget && dataget.filter((person) =>
                                                person.first_name.toLowerCase().includes(filter.toLowerCase()) &&
                                                person.last_name.toLowerCase().includes(filterlastname.toLowerCase())

                                            ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((itme, index) => {
                                                return (

                                                    <TableBody className="fortablebodypadding text-black fontfamilyInter">
                                                        {/* {rows.map(({ id, name, calories, fat, carbs, protein }) => ( */}
                                                        <TableRow
                                                            className="" key={index}>
                                                            <TableCell numeric className="fortablebodypadding text-blackcontract pointername fontfamilyInter text-Primary" onClick={() => {
                                                                navigate(`/Helpdeskdetails/:id`);
                                                                localStorage.setItem('deskIDview', itme.deskID)
                                                                // navigate("/Event/updata");
                                                            }}>
                                                                {itme.deskID}
                                                            </TableCell>
                                                            <TableCell numeric className="fortablebodypadding pointername text-blackcontract text-black fontfamilyInter " onClick={() => {
                                                                navigate(`/Helpdeskdetails/:id`);
                                                                localStorage.setItem('deskIDview', itme.deskID)
                                                                // navigate("/Event/updata");
                                                            }}>
                                                              {itme.first_name}
                                                            </TableCell>
                                                            <TableCell className="fortablebodypadding text-black fontfamilyInter ">
                                                                {itme.last_name}
                                                            </TableCell>

                                                            <TableCell className="fortablebodypadding text-black fontfamilyInter ">
                                                                {itme.email}
                                                            </TableCell>

                                                            <TableCell className="fortablebodypadding text-black fontfamilyInter "> {itme.issue}</TableCell>
                                                            <TableCell className="fortablebodypadding text-black fontfamilyInter ">{itme.ticket_no}</TableCell>
                                                            <TableCell numeric className="fortablebodypadding text-black fontfamilyInter text-end">
                                                                {/* <!-- Example single danger button --> */}
                                                                {/* {itme.status === 'Active' ? ( */}
                                                                <div className="btn-group">
                                                                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        Action
                                                                    </button>
                                                                    <ul className="dropdown-menu">
                                                                        <li>
                                                                            <p className="dropdown-item forpointer" onClick={() => {
                                                                                // navigate(`/Userdetail/:id`);
                                                                                navigate(`/NewTicket`);
                                                                            }}>
                                                                                <EyeFilled className='text-primary fw-bolder me-2' />
                                                                                <span className='my-3 fw-bolder'> Create New Ticket</span>
                                                                            </p>
                                                                        </li>
                                                                        <li>
                                                                            <p className="dropdown-item forpointer">
                                                                                <EditFilled className='text-primary fw-bolder me-2' />
                                                                                <span className='my-3 fw-bolder'
                                                                                    onClick={() => {
                                                                                        navigate(`/Helpdask/Updata/:_id`);
                                                                                        localStorage.setItem('deskIDedit', itme.deskID)
                                                                                        localStorage.setItem('Helpdasfirntname', itme.first_name)
                                                                                        localStorage.setItem('Helpdasklastname', itme.last_name)
                                                                                        localStorage.setItem('Helpdaskemail', itme.email)
                                                                                        localStorage.setItem('Helpdaskissue', itme.issue)
                                                                                        localStorage.setItem('Helpdaskdetail', itme.detail)
                                                                                        // navigate("/Event/updata");
                                                                                    }}>Modify</span>
                                                                            </p>
                                                                        </li>
                                                                        <li>
                                                                            <p className="dropdown-item forpointer">
                                                                                <DeleteFilled className='text-danger fw-bolder me-2' />
                                                                                <span className='my-3 fw-bolder' onClick={
                                                                                    () =>
                                                                                        Deletedapi(itme.deskID)
                                                                                }>Delete
                                                                                </span>
                                                                            </p>
                                                                        </li>

                                                                    </ul>
                                                                </div>


                                                            </TableCell>
                                                        </TableRow>

                                                    </TableBody>

                                                );
                                            })
                                        ) : (
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