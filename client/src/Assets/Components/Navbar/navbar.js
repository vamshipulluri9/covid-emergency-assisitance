import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,
  Container,
  Hidden,
  
  List,
  ListItem,
  ListItemText,
  Fab,
  } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import HideOnScroll from "./HideOnScroll";
import SideDrawer from "./SideDrawer";
import BackToTop from "./BackToTop";
import { Home, KeyboardArrowUp } from "@material-ui/icons";
import { NavLink, Redirect, useHistory , Link } from 'react-router-dom';
import {logOut} from '../../Functions/functions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between` 
  },
  navListDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`
  },
  navButtons : {
    "&:hover" :{
        color : "white",
        backgroundColor : "transparent"
    }
  }
}));

const navLinks = [
  { title: `CheckResources`, path: `/requestResources` },
  { title: `update`, path: `/updateDetails` },
  {title : `Home` , path : `/`}
];

export default function MenuAppBar(props) {
  const classes = useStyles();
  //const [auth, setAuth] = React.useState(true);
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history1 = useHistory();
  const open = Boolean(anchorEl);
  const auth = props.userLogged ? true:false;
  const role = props.userLogged? props.userLogged.role : null;

  var navLinks;

  navLinks = !role ? [
    { title: `CheckResources`, path: `/requestResources` },
    { title: `update`, path: `/updateDetails` },
    {title : `Home` , path : `/`}
  ] : role ===1 ? [
    { title: `CheckResources`, path: `/requestResources` },
    {title : `Home` , path : `/`}
  ] : [
    { title: `update`, path: `/updateDetails` },
    {title : `Home` , path : `/`}
  ]

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = ()=>{
    
    logOut().then(status=>{
      handleClose();
      props.updateUserFun(null);
      history1.replace("/");
      
    })
    
  }


  return (
    <div className={classes.root}>
      <HideOnScroll>
      <AppBar position="static">
        <Toolbar component="nav">
        <Container maxWidth="lg" className={classes.navbarDisplayFlex} style = {{alignItems:"center"}}>
          <Hidden mdUp>
                <SideDrawer navLinks={navLinks} />
            </Hidden>
          <Typography variant="h6" className={classes.title}>
            Covid Emergency Assistance
          </Typography>
          <Hidden smDown>
                <List
                  component="nav"
                  aria-labelledby="main navigation"
                  className={classes.navListDisplayFlex}
                >
                  {navLinks.map(({ title, path }) => (
                    <Button component={Link}
                     to = {path}
                     color = "secondary"
                    className = {classes.navButtons}
                    >
                       <ListItem button >
                        <ListItemText primary={title} />
                      </ListItem>
                    </Button>
                  ))}
                </List>
              </Hidden>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={()=>{
                  handleClose();
                  history1.replace("/profile");
                }}>Profile</MenuItem>
                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
              </Menu>
            </div>
          )}
          {
              !auth && (
                <Button component = {Link}
                    to = "/signIn"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    endIcon={<Icon><LockOpenIcon/></Icon>}
                >
        Log In
      </Button>
              )
          }
          </Container>
        </Toolbar>
      </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" style={{minHeight:"0"}} />

      <BackToTop>
        <Fab color="secondary" size="large" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </BackToTop>
    </div>
  );
}