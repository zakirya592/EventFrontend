import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Sidebard from '../../Component/Sidebard/Sidebard';


const drawerWidth = 220

function Userdetail() {


    const [dataget, setdataget] = useState();

  

    const fetchLocations = () => {
        axios.get(`http://gs1ksa.org:3015/api/ListOFAllLocation`)
            .then((res) => {
                // setdataget(res.data.recordset);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    useEffect(() => {
        fetchLocations();
    }, []);
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
                 

              </Box>
          </Box>

      </div >
  )
}

export default Userdetail