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

function Helpdeskbodd() {

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

    const apicall = () => {
        axios.get(`http://gs1ksa.org:3015/api/getMembersAll`)
            .then((res) => {
                setdataget(res.data.recordset);
                // console.log(res.data);
                setRows(res.data.recordset);
                setlength(res.data.recordset.length);
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
    <div>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 360 }}>
        <Table stickyHeader aria-label="sticky table">
                      <TableHead>

                          <TableRow classname='fontfamilyRoboto contracttableheaderpadding'>
                              <TableCell numeric className="fontfamilyRoboto contracttableheaderpadding " >First Name </TableCell>
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

           {
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
                                            {itme.first_name}
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
  )
}

export default Helpdeskbodd