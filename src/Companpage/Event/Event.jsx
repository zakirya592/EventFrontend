import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { TextField, } from '@mui/material';
import axios from 'axios';
import 'jspdf-autotable';
// import './Register.css'
import Swal from "sweetalert2";
import { EditFilled, DeleteFilled, CheckCircleFilled } from '@ant-design/icons';
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
            // apicall()
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
  // Approve api section
  const Inactiveapi = (id) => {
    console.log(id);
    axios.put(`http://gs1ksa.org:3015/api/tblUpdateEventstatusInactive/${id}`)
      .then((res) => {
        console.log(res);
        // apicall();
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
        // apicall();
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
    <>
      <div>
        <button type="button" className="btn btn-primary dropdown-toggle" onClick={handleMenuOpen} data-bs-toggle="dropdown" aria-expanded="false">
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
                  navigate(`/Event/updata/${row.id}`)
                  // localStorage.setItem("updata", row.id);
                  { localStorage.setItem('eventnae', row.event_name) }
                  { localStorage.setItem('description', row.event_description) }
                  { localStorage.setItem('location_area', row.location_area) }
                  { localStorage.setItem('location', row.location) }

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
                  //   Deletedapi(row.memberID)
                  Deletedapi(row.id)
                }
              >
                Remove
              </span>{' '}
            </p>
          </li>

          {row.status === 'InActive' ? (
            <li>
              <p
                className='dropdown-item forpointer disabled'
                onClick={() =>
                  Inactiveapi(row.id)
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
                  Inactiveapi(row.id)
                }
              >
                <CheckCircleFilled className='text-primary fw-bolder me-2' />
                <span className='my-3 fw-bolder'>
                  InActive
                </span>{' '}
              </p>
            </li>
          )}

          {row.status === 'Active' ? (
            <li>
              <p
                className='dropdown-item forpointer disabled'
                onClick={() =>
                  Activeapi(row.id)
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
                  Activeapi(row.id)
                }
              >
                <CheckCircleFilled className='text-primary fw-bolder me-2' />
                <span className='my-3 fw-bolder'>
                  Active
                </span>{' '}
              </p>
            </li>
          )}
        </ul>

      </div>
    </>

  );
};

const columns = [

  {
    field: 'event_name',
    headerName: 'Event Name',
    width: 180,
    headerAlign: 'start',
    align: 'start',
    sortable: true,
  },
  {
    field: 'event_description',
    headerName: 'Event Description',
    width: 250,
    headerAlign: 'start',
    align: 'start',
    sortable: true,
  },
  {
    field: 'Location',
    headerName: 'Location',
    width: 150,
    headerAlign: 'start',
    align: 'start',
    sortable: true,
  },
  {
    field: 'location_area',
    headerName: 'Location Area',
    width: 150,
    headerAlign: 'start',
    align: 'start',
    sortable: true,
  },
  {
    field: 'start_date',
    headerName: 'Start Date',
    width: 150,
    headerAlign: 'start',
    align: 'start',
    sortable: false,
  },
  {
    field: 'status',
    headerName: 'status',
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

function Event() {
  const navigate = useNavigate()
  const [selectedRows, setSelectedRows] = useState();
  const [filterText, setFilterText] = useState('');
  const [dataget, setdataget] = useState([]);
  const [formattedDate, setFormattedDate] = useState()
  const apicall = () => {
    axios.get(`http://gs1ksa.org:3015/api/getEventAll`)
      .then((res) => {
        setdataget(res.data.recordset);
        console.log(res.datarecordset.start_date);
        const datesss = res.data.recordset
        const dateString = { datesss }
        const dateObject = moment(dateString).toDate()
        const getdatasss = moment(dateObject).format('M/D/YYYY')
        console.log(getdatasss)
        setFormattedDate(getdatasss)
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
    // Add a unique identifier to each row
    event_name: row.event_name.toLowerCase(),
    event_description: row.event_description ? row.event_description.toString().toLowerCase() : '',
    Location: row.location,
    location_area: row.location_area ? row.location_area.toString().toLowerCase() : '',
    start_date: row.start_date ? row.start_date.toString().toLowerCase() : '',
    Status: row.Status ? row.Status.toLowerCase() : '',
    // selfieIDImage: <img src={row.selfieIDImage} alt="Image" style={{ width: '100%', height: 'auto' }} />,

    //   complain: row.complain.toLowerCase(),
  }))
    .filter(
      (row) =>
        row.event_name.includes(filterText.toLowerCase()) ||
        row.event_description.includes(filterText.toLowerCase()) ||
        row.Location.includes(filterText) ||
        row.location_area.includes(filterText.toLowerCase()) ||
        // row.start_date.includes(filterText.toLowerCase()) ||
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
            <div className="d-flex my-3">
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
  )
}

export default Event
