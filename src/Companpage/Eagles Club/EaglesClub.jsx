import React, { useState, useEffect, useRef } from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Sidebard from '../../Component/Sidebard/Sidebard';

const drawerWidth = 220

function EaglesClub() {
    
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
                        <div className="container mt-5">
                            
                        </div>
                </Box>
        </Box>
        </div >
  )
}

export default EaglesClub