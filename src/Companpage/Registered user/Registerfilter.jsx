import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { TextField, } from '@mui/material';
import axios from 'axios';
import 'jspdf-autotable';
import './Register.css'
import Swal from "sweetalert2";
import { EyeFilled ,EditFilled, DeleteFilled, CheckCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Sidebard from '../../Component/Sidebard/Sidebard';
import moment from 'moment'

const drawerWidth = 220
const ActionCell = ({ row, handleAction }) => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

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

    return (
        <>
            <div>
                <button type="button" className="btn btn-primary dropdown-toggle" onClick={handleMenuOpen} data-bs-toggle="dropdown" aria-expanded="false">
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
                                    navigate(`/Helpdask/Updata/${row.deskID}`);
                                    localStorage.setItem('deskIDedit', row.deskID)
                                    localStorage.setItem('Helpdasfirntname', row.first_name)
                                    localStorage.setItem('Helpdasklastname', row.last_name)
                                    localStorage.setItem('Helpdaskemail', row.email)
                                    localStorage.setItem('Helpdaskissue', row.issue)
                                    localStorage.setItem('Helpdaskdetail', row.detail)
                                    // navigate("/Event/updata");
                                }}>Modify</span>
                        </p>
                    </li>
                    <li>
                        <p className="dropdown-item forpointer">
                            <DeleteFilled className='text-danger fw-bolder me-2' />
                            <span className='my-3 fw-bolder' onClick={
                                () =>
                                    Deletedapi(row.deskID)
                            }>Delete
                            </span>
                        </p>
                    </li>

                </ul>

            </div>
        </>

    );
};

const columns = [

    {
        field: 'deskID',
        headerName: 'DeskID',
        width: 140,
        headerAlign: 'start',
        align: 'start',
        sortable: true,
    },
    {
        field: 'first_name',
        headerName: 'First Name',
        width: 140,
        headerAlign: 'start',
        align: 'start',
        sortable: true,
    },
    {
        field: 'last_name',
        headerName: 'Last Name',
        width: 140,
        headerAlign: 'start',
        align: 'start',
        sortable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 280,
        headerAlign: 'start',
        align: 'start',
        sortable: true,
    },
    {
        field: 'issue',
        headerName: 'Issue',
        width: 240,
        headerAlign: 'start',
        align: 'start',
        sortable: false,
    },
    {
        field: 'ticket_no',
        headerName: 'Ticket no',
        width: 150,
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

function Registerfilter() {
    const [selectedRows, setSelectedRows] = useState();
    const [filterText, setFilterText] = useState('');
    const [dataget, setdataget] = useState([]);
    const apicall = () => {
        axios.get(`http://gs1ksa.org:3015/api/get_post_help_desk`)
            .then((res) => {
                setdataget(res.data.recordset);
                console.log(res.datarecordset.issue);
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
        deskID: row.deskID.toString().toLowerCase(),
        first_name: row.first_name ? row.first_name.toString().toLowerCase() : '',
        last_name: row.last_name,
        email: row.email ? row.email.toString().toLowerCase() : '',
        issue: row.issue ? row.issue.toString().toLowerCase() : '',
        ticket_no: row.ticket_no ? row.ticket_no.toString().toLowerCase() : '',
        // selfieIDImage: <img src={row.selfieIDImage} alt="Image" style={{ width: '100%', height: 'auto' }} />,

        //   complain: row.complain.toLowerCase(),
    }))
        .filter(
            (row) =>
                row.deskID.includes(filterText.toLowerCase()) ||
                row.first_name.includes(filterText.toLowerCase()) ||
                row.last_name.includes(filterText) ||
                row.email.includes(filterText.toLowerCase()) ||
                // row.issue.includes(filterText.toLowerCase()) ||
                row.Status.includes(filterText.toLowerCase()) //||
            // row.selfieIDImage.includes(filterText.toLowerCase())
        );

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
    );
}

export default Registerfilter
