import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Sidebard from '../../Component/Sidebard/Sidebard';
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";


const style = {
    width: '95%',
    height: '80%'
}
const containerStyle = {
    // position: 'relative',
    width: '95%',
    height: '80%'
}

const drawerWidth = 220

function EaglesClub({ google }) {

    const [locationsapi, setlocationsapi] = useState([]);

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = () => {
        axios.get(`http://gs1ksa.org:3015/api/ListOFAllLocation`)
            .then((res) => {
                setlocationsapi(res.data.recordset);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
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
                        <div className="container mx-3 mt-5" style={{width:"97%"}}>
                      {/* <LoadScriptNext googleMapsApiKey="AIzaSyDVCqqdXFDq8EjLgNI60Tge8lStQu4A6Sg">
                          <Map google={google}  mapContainerStyle={containerStyle} center={center} zoom={2}>
                              {locationsapi && locationsapi.map((items,ind) => {
                                 return(
                                    <div>
                                 <Marker
                                      key={ind}
                                      position={{
                                          lat: parseFloat(items.latitude), // Ensure latitude is parsed as a float
                                          lng: parseFloat(items.longitude), // Ensure longitude is parsed as a float
                                        }}
                                  />
                                       </div>
                              )})}
                          </Map>
                      </LoadScriptNext> */}

                      <Map google={google} initialCenter={{ lat: 43.68, lng: -79.43 }} zoom={12} containerStyle={containerStyle} >
                          {locationsapi && locationsapi.map((item, index) => (
                              <Marker
                                  key={index}
                                  position={{
                                      lat: parseFloat(item.lattitiude), // Ensure latitude is parsed as a float
                                      lng: parseFloat(item.longitude),
                                  }}
                              //   name={location.name}
                              />
                          ))}
                      </Map>

                        </div>
                       
                </Box>
        </Box>

        </div >
  )
}

export default  GoogleApiWrapper({
    apiKey: "AIzaSyAUI_hqf3GJQ7c80e0rK9aki1fT6kDVuiU",
})(EaglesClub)