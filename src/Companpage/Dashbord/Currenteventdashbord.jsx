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

    const apicall = () => {
        axios.get(`http://gs1ksa.org:3015/api/getMembersAll`)
            .then((res) => {
                setdataget(res.data.recordset);
                console.log(res.data);
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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
                      <TableHead>

                          <TableRow classname='fontfamilyRoboto contracttableheader'>
                              <TableCell numeric className="fontfamilyRoboto contracttableheader text-center" >First Name </TableCell>
                              {/* <TableCell className="tablehad">ID</TableCell> */}
                              <TableCell className=" fontfamilyRoboto contracttableheader text-center">
                                  last Name </TableCell>
                              <TableCell className=" fontfamilyRoboto contracttableheader text-center">City</TableCell>
                              <TableCell className="fontfamilyRoboto contracttableheader text-center">Club Name</TableCell>
                              <TableCell className="fontfamilyRoboto contracttableheader text-center">National president </TableCell>
                              <TableCell className="fontfamilyRoboto contracttableheader text-center">Club secretry NO</TableCell>
                              <TableCell className="fontfamilyRoboto contracttableheader text-center">Status</TableCell>
                          </TableRow>

                      </TableHead>

       

                         {/* <TableBody> */}
      {dataget && dataget.length > 0 ? (
        dataget.filter((person) =>
                            person.first_name.toLowerCase().includes(filter.toLowerCase()) &&
                            person.last_name.toLowerCase().includes(filterlastname.toLowerCase())

                        )
          .map((itme,index) => {
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