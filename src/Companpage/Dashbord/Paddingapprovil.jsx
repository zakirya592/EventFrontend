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
import { Avatar, Space } from 'antd';

// import "./Liststyle.css"
import axios from 'axios'

function Paddingapprovil() {


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
const [status, setstatus] = useState("")
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

  
    useEffect( ()  => {
     axios.get(`http://gs1ksa.org:3015/api/getMembersAll`)
            .then((res) => {
                setdataget(res.data.recordset);
                console.log(res.data.recordset);
                setstatus(res.data.recordset)
                setRows(res.data.recordset);
                // setlength(res.data.recordset.length);
                const dadad=res.data.recordset;
                const dataga = dadad.filter((item) => item.status !== 'Active'); // Filter the data based on the 'status' property
                setActiveData(dataga)
                setlength(dataga.length);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const memberid = localStorage.getItem("id")
    console.log("dash", memberid);
   
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
                              <TableCell numeric className="fontfamilyRoboto contracttableheaderpadding text-center" >First Name </TableCell>
                              {/* <TableCell className="tablehad">ID</TableCell> */}
                              <TableCell className=" fontfamilyRoboto contracttableheaderpadding text-center">
                                  last Name </TableCell>
                              <TableCell className=" fontfamilyRoboto contracttableheaderpadding text-center">City</TableCell>
                              <TableCell className="fontfamilyRoboto contracttableheaderpadding text-center">Club Name</TableCell>
                              <TableCell className="fontfamilyRoboto contracttableheaderpadding text-center">Suffix </TableCell>
                              <TableCell className="fontfamilyRoboto contracttableheaderpadding text-center">Club Region</TableCell>
                              <TableCell className="fontfamilyRoboto contracttableheaderpadding text-center">Status</TableCell>
                          </TableRow>

                      </TableHead>

           {
                          activeData && activeData.filter((person) =>
                            person.first_name.toLowerCase().includes(filter.toLowerCase()) &&
                            person.last_name.toLowerCase().includes(filterlastname.toLowerCase())

                          ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((itme, index) => {

                            return (
                                
                                <TableBody className="fortablebodypadding text-black fontfamilyInter">
                                    {/* {status === "null" ? (<p>jdfhdhf</p>):(<p>not</p>)} */}
                                    <TableRow
                                        className="" key={index}>
                                        <TableCell numeric className="fortablebodypadding text-blackcontract text-black fontfamilyInter ">
                                            <Avatar src={<img src={itme.selfieIDImage} alt="avatar" />} ></Avatar> {itme.first_name}
                                        </TableCell>
                                        <TableCell className="fortablebodypadding text-black fontfamilyInter text-center">
                                            {itme.last_name}
                                        </TableCell>

                                        <TableCell className="fortablebodypadding text-black fontfamilyInter text-center"> {itme.city}</TableCell>
                                        <TableCell className="fortablebodypadding text-black fontfamilyInter text-center">{itme.club_name}</TableCell>

                                        <TableCell className="fortablebodypadding text-black fontfamilyInter text-center">
                                            {itme.Suffix}
                                        </TableCell>
                                        <TableCell className="fortablebodypadding text-black fontfamilyInter text-center">{itme.club_region}</TableCell>
                                        <TableCell numeric className="fortablebodypadding text-black fontfamilyInter text-center">
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

export default Paddingapprovil