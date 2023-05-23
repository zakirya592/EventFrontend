import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import eye from "../../img/eye.png";
import deleteicon from "../../img/Delate.png"
// import "./Liststyle.css"
import axios from 'axios'
import moment from 'moment';

function Currenteventdashbord() {
  
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
    const [formattedDate, setFormattedDate] = useState();

    const apicall = () => {
        axios.get(`http://gs1ksa.org:3015/api/getEventAll`)
            .then((res) => {
                setdataget(res.data.recordset);
                console.log(res.data.recordset);
                setRows(res.data.recordset);
                setlength(res.data.recordset.length);
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

    function handleIconClick() {
        setShowInput(!showInput);
    }
    const [row, setRows] = React.useState([])
  return (
      <Paper sx={{ width: '100%', overflow: 'hidden', height:'350px' }}>
      <TableContainer sx={{ maxHeight: 360 }}>
        <Table stickyHeader aria-label="sticky table">
                      <TableHead>

                          <TableRow classname='fontfamilyRoboto contracttableheaderpadding'>
                          <TableCell numeric className="fontfamilyRoboto contracttableheaderpadding " >Event Name </TableCell>
                              {/* <TableCell className="tablehad">ID</TableCell> */}
                              <TableCell className=" fontfamilyRoboto contracttableheaderpadding ">
                                  Event Description </TableCell>
                          <TableCell className=" fontfamilyRoboto contracttableheaderpadding ">Location</TableCell>
                          <TableCell className="fontfamilyRoboto contracttableheaderpadding ">Location Area</TableCell>
                              <TableCell className="fontfamilyRoboto contracttableheaderpadding ">Start Date </TableCell>
                              <TableCell className="fontfamilyRoboto contracttableheaderpadding ">Status</TableCell>
                              <TableCell className="fontfamilyRoboto contracttableheaderpadding ">Action</TableCell>
                          </TableRow>

                      </TableHead>

       
{/* .filter((person) =>
                  person.first_name.toLowerCase().includes(filter.toLowerCase()) &&
                  person.last_name.toLowerCase().includes(filterlastname.toLowerCase())

                  ) */}
                         {/* <TableBody> */}
      {dataget && dataget.length > 0 ? (
                      dataget.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((itme,index) => {
            return (

                                <TableBody className="fortablebodypadding text-black fontfamilyInter">
                                    {/* {rows.map(({ id, name, calories, fat, carbs, protein }) => ( */}
                                    <TableRow
                                        className="" key={index}>
                                        <TableCell numeric className="fortablebodypadding text-blackcontract text-black fontfamilyInter ">
                                            {itme.event_name}
                                        </TableCell>
                                        <TableCell className="fortablebodypadding text-black fontfamilyInter ">
                                            {itme.event_description}
                                        </TableCell>

                                        <TableCell className="fortablebodypadding text-black fontfamilyInter "> {itme.location}</TableCell>
                                        <TableCell className="fortablebodypadding text-black fontfamilyInter ">{itme.location_area}</TableCell>

                                        <TableCell className="fortablebodypadding text-black fontfamilyInter ">
                                            {formattedDate}
                                        </TableCell>
                                        <TableCell className="fortablebodypadding text-black fontfamilyInter ">{itme.status}</TableCell>
                                        <TableCell numeric className="fortablebodypadding text-black fontfamilyInter ">
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
          })
      ) : (
        <TableRow>
          <TableCell >
            No data available.
          </TableCell>
        </TableRow>
      )}
    {/* </TableBody> */}

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
 
  )
}

export default Currenteventdashbord