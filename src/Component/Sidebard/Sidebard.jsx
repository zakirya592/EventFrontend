import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
// import Logoutpop from "../Popup/Logout/Logoutpop.jsx"
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { MdOutlineLeaderboard } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import logo from '../../img/a1.webp'
import "./Sidebar.css"
import { UserOutlined, LogoutOutlined, CalendarOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { useNavigate } from "react-router-dom";


const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(0)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

function Sidebard(stat) {
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = useState(stat == "true" ? true : false);
    const [show, setshow] = useState(true);

    const handleDrawerOpen = () => {
        sessionStorage.setItem("open", 1);
        console.log(sessionStorage.getItem("open"));
        setOpen(true);
        setshow(false);
        //   dispatch(formWidth(true));
    };

    const handleDrawerClose = () => {
        sessionStorage.setItem("open", open);
        setOpen(false);
        setshow(true);
        //   dispatch(formWidth(false));
    };
  return (
    
      <Box className="sidebar" sx={{ display: "flex" }}>
          <CssBaseline />

          <AppBar className="Navbar" position="fixed" open={open}>
              <Toolbar>
                  <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      sx={{
                          // marginRight: 1,
                          ...(open && { display: "none" }),
                      }}
                      className="arrowforwardicon"
                  >
                      <BsFillArrowRightCircleFill className="righticon" />
                  </IconButton>
                  <IconButton
                      color="inherit"
                      aria-label="close drawer"
                      onClick={handleDrawerClose}
                      edge="end"
                      sx={{
                          // marginRight: 1,
                          ...(open == false && { display: "none" }),
                      }}
                      className="arrowbackicon"
                  >
                      <BsFillArrowLeftCircleFill className="backicon" />
                  </IconButton>

                  {/* <Header /> */}
              </Toolbar>
          </AppBar>

          <Drawer variant="permanent" open={open}>
              <div className="">
                  {theme.direction === "rtl" ? (
                      <BsFillArrowLeftCircleFill />
                  ) : (
                      <div className="d-none">{<BsFillArrowRightCircleFill />}</div>
                  )}
              </div>

              <Divider />
              <div className="mx-2 ">
                  {show ? (
                      <span className="p-2 ">
                          <center className="fortopercolor">
                              {/* <img className="w-75 mt-1" src={logo} alt="" /> */}
                              <Avatar src={<img src={logo} alt="avatar" />} />
                              <p className="emailscolr mt-2 fw-bold">{localStorage.getItem('emailhomme')}</p>
                          </center>
                      </span>
                  ) : (
                      <span className="p-1 ">
                          <center>
                                  <Avatar size={100} src={<img src={logo} alt="avatar" />} />
                                  
                                  <p className="emailscolr mt-2 fw-bold">{localStorage.getItem('emailhomme')}</p>
                              {/* <img className="w-75 mx-auto mt-1" src={logo} alt="" /> */}
                          </center>
                      </span>
                  )}
                      {/* Dashboard and Health Providers section */}
                     

                  <Divider className="divhrline" />
                    <List>
                      {['Dashboard'].map((text, index) => (
                          <ListItem key={text} disablePadding onClick={(()=>{
                              navigate('/Dashbord')
                          })}>
                              <ListItemButton>
                                  <ListItemIcon>
                                      {index % 2 === 0 ? <UserOutlined className="sidebaricon my-auto" /> : <UserOutlined className="sidebaricon my-auto" />}
                                  </ListItemIcon>
                                  <ListItemText primary={text} />
                              </ListItemButton>
                          </ListItem>
                      ))}
                  </List>
                  <Divider className="divhrline" />
                  <List>
                      {['Current Event'].map((text, index) => (
                          <ListItem key={text} disablePadding onClick={(() => {
                              navigate('/Event')
                          })}>
                              <ListItemButton>
                                  <ListItemIcon>
                                      {index % 2 === 0 ? <CalendarOutlined className="sidebaricon my-auto" /> : <CalendarOutlined className="sidebaricon my-auto" />}
                                  </ListItemIcon>
                                  <ListItemText primary={text} />
                              </ListItemButton>
                          </ListItem>
                      ))}
                  </List>
                  <Divider className="divhrline" />
                    <List>
                      {['Help Desk'].map((text, index) => (
                          <ListItem key={text} disablePadding>
                              <ListItemButton>
                                  <ListItemIcon>
                                      {index % 2 === 0 ? <UserOutlined className="sidebaricon my-auto" /> : <UserOutlined className="sidebaricon my-auto" />}
                                  </ListItemIcon>
                                  <ListItemText primary={text} />
                              </ListItemButton>
                          </ListItem>
                      ))}
                  </List>
                  <Divider className="divhrline" />
                  <List>
                      {['Eagles Club'].map((text, index) => (
                          <ListItem key={text} disablePadding>
                              <ListItemButton>
                                  <ListItemIcon>
                                      {index % 2 === 0 ? <UsergroupAddOutlined className="sidebaricon my-auto" /> : <UsergroupAddOutlined className="sidebaricon my-auto" />}
                                  </ListItemIcon>
                                  <ListItemText primary={text} />
                              </ListItemButton>
                          </ListItem>
                      ))}
                  </List>
                  <Divider className="divhrline" />
                  <List>
                      {['Log Out'].map((text, index) => (
                          <ListItem key={text} disablePadding onClick={(() => {
                              navigate('/')
                          })}>
                              <ListItemButton>
                                  <ListItemIcon>
                                      {index % 2 === 0 ? <LogoutOutlined className="sidebaricon my-auto" /> : <LogoutOutlined className="sidebaricon my-auto" />}
                                  </ListItemIcon>
                                  <ListItemText primary={text} />
                              </ListItemButton>
                          </ListItem>
                      ))}
                  </List>
              </div>
          </Drawer>
      </Box>

  )
}

export default Sidebard