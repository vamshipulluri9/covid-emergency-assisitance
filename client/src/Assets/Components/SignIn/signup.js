import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { RotateLeft } from '@material-ui/icons';
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom';



function Copyright() {

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Covid Emergency Assistance
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
   
  },
}));

export default function SignUp(props) {

  

  const classes = useStyles();

  const [role,change_role] = useState(null);
  const [form_details,updateform] = useState({});
  const [loading, update_loading] = useState(false);

  const [addressLabel,chageAddressLabel] = useState("Address");

  if(props.userLogged)return(
    <Redirect
    to = "/profile"
    >
    </Redirect>
  )

  const handleSubmit = (event)=>{
    update_loading(true);
    var user = {
      "firstName" : form_details.firstName,
      "lastName" : form_details.lastName,
      "role" : form_details.role,
      "email" : form_details.email,
      "password" : form_details.password,
      "hospitalName" : form_details.hospitalName,
      "address" : form_details.address
    };
    event.preventDefault();
    fetch("/api/auths/signUp" , {
      method : "POST",
      body : JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      },
    },
    ).then((res)=>{
      console.log(res.body);
      if(res.status === 200){
        alert(
          "Successfully Registered"
        );
        props.updateUserFun(user);
      }
      else {
        alert(res.status);
      }
      update_loading(false);
    })
    event.preventDefault();
  }

  const handleChange = (event) =>{
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    updateform(form_details =>({...form_details,
      [name]: value,
    }));
  }

  const handleRoleChange = (event)=>{
    var value = event.target.value;
    change_role(value);
    
    if(value===2){
      chageAddressLabel("Hospital Address");
      updateform( form_details =>({...form_details,
        [event.target.name] : value,
      }))
    }
    else {
      chageAddressLabel("Personal Address");
      updateform( form_details =>({...form_details,
        [event.target.name] : value,
        hospitalName:null
      }))
  }
}

 

  return (
    
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {loading? <div>LOADING...</div> :<div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs= {12}>
              <FormControl fullWidth >
              <InputLabel htmlFor="role" id="role-label" style={{marginLeft : "8px"}}>Register as :</InputLabel>
                  <Select  variant = "outlined"
                    labelId="role"
                    id="role"
                    onChange={handleRoleChange}
                    name = "role"
                    required
                    value = {form_details.role}
                  >
                    <MenuItem value={1}>Patient</MenuItem>
                    <MenuItem value={2}>Hospital</MenuItem>
                    <MenuItem value={3}>Plasma Donor</MenuItem>
                  </Select>
                </FormControl>
              
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value = {form_details.firstName}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value = {form_details.lastName}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value = {form_details.email}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={form_details.password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            {role ===2 && (<Grid item xs={12}>
              <TextField
                autoComplete="Hname"
                name="hospitalName"
                variant="outlined"
                value = {form_details.hospitalName}
                required
                fullWidth
                id="hospitalName"
                label="Hospital Name"
                onChange={handleChange}
                
              />

            </Grid>)}
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                value={form_details.address}
                label= {addressLabel}
                onChange={handleChange}
                id="address"
                
              />
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button component={Link} to = "/signIn">
                Already have an account? Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>}
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}