import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { TextField, } from '@mui/material';
import axios from 'axios';
import 'jspdf-autotable';
import './Register.css'
import Swal from "sweetalert2";
import { EyeFilled, EditFilled, DeleteFilled, CheckCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'antd';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Sidebard from '../../Component/Sidebard/Sidebard';
const drawerWidth = 220
const ActionCell = ({ row, handleAction }) => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Deleted api section
    const Deletedapi = (memberID) => {
        console.log(memberID);
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
                axios.delete(`http://gs1ksa.org:3015/api/deleteMembersById/${memberID}`)
                    .then((res) => {
                        console.log(res);
                        // apicall();

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

    // Approve api section
    const Approveapi = (memberID) => {
        console.log(memberID);
        axios.put(`http://gs1ksa.org:3015/api/tblApprovalUser/${memberID}`)
            .then((res) => {
                console.log(res);
                // apicall();
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

    // Approve api section
    const InActive = (memberID) => {
        console.log(memberID);
        axios.put(`http://gs1ksa.org:3015/api/tblInActiveUser/${memberID}`)
            .then((res) => {
                console.log(res);
                // apicall();
                Swal.fire({
                    title: "Success",
                    text: "You have  Successfully InActive this User",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>

            <div>

                <button type="button" className="btn btn-primary dropdown-toggle" onClick={handleMenuOpen} data-bs-toggle="dropdown" aria-expanded="false">
                    Action
                </button>
                <ul className="dropdown-menu ">
                    <li><p className="dropdown-item forpointer" onClick={() => {
                        navigate(`/Userdetail/${row.memberID}`);
                        sessionStorage.setItem("Userdetailid", row.memberID);
                    }}><EyeFilled className='text-primary fw-bolder me-2' /><span className='my-3 fw-bolder'>View</span> </p></li>
                    <li><p className="dropdown-item forpointer"><EditFilled className='text-primary fw-bolder me-2' /><span className='my-3 fw-bolder' onClick={() => {
                        navigate(`/Register/Edit/${row.memberID}`);
                        localStorage.setItem("updataregisteruser", row.memberID);
                        localStorage.setItem('userregisternameup', row.first_name)
                        localStorage.setItem('userlastnameup', row.last_name)
                        localStorage.setItem('userlastreet_address', row.street_address)
                        localStorage.setItem("updatabarangay", row.barangay);
                        localStorage.setItem('updataprovince', row.province)
                        localStorage.setItem('updatacity', row.city)
                        localStorage.setItem('updataclub_name', row.club_name)
                        localStorage.setItem('updataclub_region', row.club_region)
                        localStorage.setItem('updataclub_president', row.club_president)
                        localStorage.setItem('updatape_ID', row.pe_ID)
                        localStorage.setItem("updataSuffix", row.Suffix);
                        localStorage.setItem('updatalattitiude', row.lattitiude)
                        localStorage.setItem('updataclub_president', row.club_president)
                        localStorage.setItem('updatalongitude', row.longitude)
                        localStorage.setItem('updataselfieIDImage', row.selfieIDImage)
                        localStorage.setItem('updatagovernmentIDImage', row.governmentIDImage)

                        // navigate("/Event/updata");
                    }}>Modify</span> </p></li>
                    <li><p className="dropdown-item forpointer"><DeleteFilled className='text-danger fw-bolder me-2' /><span className='my-3 fw-bolder' onClick={
                        () =>
                            Deletedapi(row.memberID)
                    }>Remove</span> </p></li>
                    {row.status === 'Active' ? (
                        <li><p className="dropdown-item forpointer disabled" onClick={
                            () =>
                                Approveapi(row.memberID)
                        }><CheckCircleFilled className='text-primary fw-bolder me-2' /><span className='my-3 fw-bolder'>Approve</span> </p></li>
                    ) : (
                        <li><p className="dropdown-item forpointer" onClick={
                            () =>
                                Approveapi(row.memberID)
                        }><CheckCircleFilled className='text-primary fw-bolder me-2' /><span className='my-3 fw-bolder'>Approve</span> </p></li>
                    )}

                    {row.status === 'Active' ? (
                        <li><p className="dropdown-item forpointer " onClick={
                            () =>
                                InActive(row.memberID)
                        }><CheckCircleFilled className='text-primary fw-bolder me-2' /><span className='my-3 fw-bolder'>InActive</span> </p></li>
                    ) : (
                        <li><p className="dropdown-item forpointer disabled" onClick={
                            () =>
                                InActive(row.memberID)
                        }><CheckCircleFilled className='text-primary fw-bolder me-2' /><span className='my-3 fw-bolder'>InActive</span> </p></li>
                    )}
                </ul>

            </div>

        </>

    );
};

const columns = [
    {
        field: 'first_name',
        headerName: 'First Name',
        width: 180,
        headerAlign: 'start',
        align: 'start',
        renderCell: (params) => {
            return (
                <div className='d-flex'>
                    <Avatar src={<img src={params.row.selfieIDImage} alt="UserImage" style={{ backgroundColor: '#505254', color: '#f56a00' }} />}></Avatar>
                    <p className='my-auto ms-2'>{params.row.first_name}</p>
                </div>
            )
        },
        sortable: true,
    },
    {
        field: 'last_name',
        headerName: 'last Name',
        width: 140,
        headerAlign: 'start',
        align: 'start',
        sortable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 290,
        headerAlign: 'start',
        align: 'start',
        sortable: true,
    },
    {
        field: 'city',
        headerName: 'City',
        width: 130,
        headerAlign: 'start',
        align: 'start',
        sortable: true,
    },
    {
        field: 'club_name',
        headerName: 'Club Name	',
        width: 130,
        headerAlign: 'start',
        align: 'start',
        sortable: false,
    },
    {
        field: 'status',
        headerName: 'status',
        width: 180,
        headerAlign: 'start',
        align: 'start',
        sortable: false,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 160,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        renderCell: (params) => <ActionCell row={params.row} handleAction={handleAction} />,
    },
];

const handleAction = (action, row) => {
    // Handle the action for the clicked row
    console.log('Action:', action, 'Row:', row);
};

function Register() {
    const [selectedRows, setSelectedRows] = useState();
    const [filterText, setFilterText] = useState('');
    const [dataget, setdataget] = useState([]);
    const [activeData, setActiveData] = useState();

    function apicall () {
        axios.get(`http://gs1ksa.org:3015/api/getMembersAll`)
            .then((res) => {
                setdataget(res.data.recordset);
                console.log(res.data);
                // setRows(res.data.recordset);
                // setlength(res.data.recordset.length);
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
   
    const handleSelectAllRows = (selection) => {
        setSelectedRows(selection);
    };

    const handleFilterTextChange = (event) => {
        const text = event.target.value;
        setFilterText(text);

    };
const filteredData = dataget && dataget.map((row, index) => ({
        ...row,
        id: index, // Add a unique identifier to each row
        first_name: row.first_name.toLowerCase(),
        last_name: row.last_name ? row.last_name.toString().toLowerCase() : '',
        email: row.email.toString(),
        city: row.city ? row.city.toString().toLowerCase() : '',
        club_name: row.club_name ? row.club_name.toString().toLowerCase() : '',
        Status: row.Status ? row.Status.toString().toLowerCase() : '',
        // selfieIDImage: <img src={row.selfieIDImage} alt="Image" style={{ width: '100%', height: 'auto' }} />,
        selfieIDImage: row.selfieIDImage,
        //   complain: row.complain.toLowerCase(),
    }))
        .filter(
            (row) =>
                row.first_name.includes(filterText.toLowerCase()) ||
                row.last_name.includes(filterText.toLowerCase()) ||
                row.email.includes(filterText) ||
                row.city.includes(filterText.toLowerCase()) ||
                row.club_name.includes(filterText.toLowerCase()) ||
                row.Status.includes(filterText.toLowerCase()) //||
            // row.selfieIDImage.includes(filterText.toLowerCase())
        );


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
                            width: { sm: `calc(100% - ${drawerWidth}px)` },
                            // boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)', // Add shadow effect
                        }}
                    >
                        <div style={{ height: 500, width: '100%' }} className='mt-5'>

                            <DataGrid
                                id="dataGrid"
                                rows={filteredData}
                                columns={columns}
                                checkboxSelection
                                components={{
                                    Toolbar: GridToolbar,
                                }}

                                componentsProps={{
                                    toolbar: {
                                        filterItems: (
                                            <TextField
                                                size='small'
                                                placeholder='Filter'
                                                value={filterText}
                                                onChange={handleFilterTextChange}
                                            />
                                        ),
                                    },
                                }}
                                // style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)' }}
                                className='tablereagister'
                                onSelectionModelChange={handleSelectAllRows}
                                selectionModel={selectedRows}
                                disableColumnSelector={false}
                                disableColumnFilter={false}
                                disableColumnMenu={false}
                            />
                        </div>

                    </Box>
                </Box>
            </div >
        </>
    )
}

export default Register