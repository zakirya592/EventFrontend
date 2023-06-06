import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Sidebard from '../../Component/Sidebard/Sidebard';
import Card from 'react-bootstrap/Card';
import { Avatar, Space } from 'antd';
import { UserOutlined } from "@ant-design/icons"
import moment from 'moment';
import { useNavigate, useParams } from "react-router-dom";
import "./Userdet.css"
const drawerWidth = 220
function Userdetail() {

    const navigate = useNavigate();
    let { userId } = useParams();
    const [dataget, setdataget] = useState();
    const [formattedDate, setFormattedDate] = useState();

    const fetchLocations = () => {
        axios.get(`http://gs1ksa.org:3015/api/getMembersById/${userId}`)
            .then((res) => {
                setdataget(res.data.recordset);
                console.log(res.data);
                const datesss = res.data.recordset
                const dateString = { datesss }
                const dateObject = moment(dateString).toDate();
                const getdatasss = moment(dateObject).format("M/D/YYYY");
                console.log(getdatasss);
                setFormattedDate(getdatasss)
            })
            .catch((err) => {
                console.log(err);
            })
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const handleClick = () => {
        // Generate the map URL using the address data
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${localStorage.getItem('loacation',)}`;

        // Open the map URL in a new window or tab
        window.open(mapUrl, '_blank');
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
                    <div className="mt-5">
                        {
                            dataget && dataget.map((item, index) => {
                                return (
                                    <div className="card topcard " key={index}>
                                        <div className="w-100 row justify-content-between">

                                            <div className=" leftside col-4  ">
                                                <Avatar className="card-img- mt-3 " src={item.selfieIDImage} size={200}  ><span className="text-center"> user Have no Image</span></Avatar>
                                                <h5 className="card-title fw-bold mt-2">{item.first_name} {item.last_name}</h5>

                                                <div className="emailss my-4 ">
                                                    <h6 className="fw-bolder headidet" >Email :</h6>
                                                    <p className="prodel text-white">{item.email}</p>
                                                </div>
                                            </div>

                                            <div className="card-body col-4 offset-md-1  mt-3 ">

                                                <div className="justify-content-between d-flex ">
                                                    <h6 className="fw-bold headidet" >Province</h6>
                                                    <p className="prodel">{item.province}</p>
                                                </div>

                                                <div className="justify-content-between d-flex ">
                                                    <h6 className="fw-bold headidet" >City</h6>
                                                    <p className="prodel">{item.city}</p>
                                                </div>

                                                <div className="justify-content-between d-flex ">
                                                    <h6 className="fw-bold headidet" >Barangay</h6>
                                                    <p className="prodel">{item.barangay}</p>
                                                </div>

                                                <div className="justify-content-between d-flex ">
                                                    <h6 className="fw-bold headidet" >Club Name</h6>
                                                    <p className="prodel">{item.club_name}</p>
                                                </div>

                                                <div className="justify-content-between d-flex ">
                                                    <h6 className="fw-bold headidet" >Club Region</h6>
                                                    <p className="prodel">{item.club_region}</p>
                                                </div>

                                                <div className="justify-content-between d-flex ">
                                                    <h6 className="fw-bold headidet" >Data</h6>
                                                    <p className="prodel">{formattedDate}</p>
                                                </div>

                                                <div className="justify-content-between d-flex ">
                                                    <h6 className="fw-bold headidet" >Street Address</h6>
                                                    <u> <p className="prodel page-link useraddrloaction text-primary" onClick={handleClick}>{item.street_address}{localStorage.setItem('loacation', item.street_address)}</p></u>
                                                </div>


                                                <button type="button" class="btn btn-outline-secondary px-4 py-2 mx-3 " onClick={() => {
                                                    navigate("/Register");
                                                }}>Back</button>
                                            </div>
                                            <div className="col-2"></div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                </Box>
            </Box>

        </div >
    )
}

export default Userdetail