import React, { useContext, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useState } from 'react';
import {Link} from 'react-router-dom';


import { Redirect, useHistory } from 'react-router';

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
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(/Photos/signIn1.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {

  
  const history = useHistory();
  const classes = useStyles();

 
  const [auth_details,update_auth] = useState({rememberMe : false});
  const [loading, update_loading] = useState(false);


 

  if(props.userLogged)return <Redirect to="/profile"></Redirect>;
  

  const handleChange= (event) =>{
    update_auth(prev_auth => (
      { ...prev_auth,
        [event.target.name] : event.target.name==='rememberMe'? event.target.checked : event.target.value
      }
    ))
  }

  const handleSubmit = (event)=>{
    update_loading(true);
    event.preventDefault();
    fetch("/api/auths/signIn" , {
      method : "POST",
      body : JSON.stringify({
        "email" : auth_details.email,
        "password" : auth_details.password
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    },
    ).then((res)=>{
      if(res.status === 200){
        alert(`
          email : ${auth_details.email}
          pass : ${auth_details.password}
          checked : ${auth_details.rememberMe}
        `);
       return res.json();
      }
      else {
        alert(res.status);
        update_loading(false);
      }
      
    }).then((data)=>{
      props.updateUserFun(data);
      update_loading(false);
      return(<Redirect
      to= "/profile"
      ></Redirect>)
    })
  
  }

  return (
  
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {loading ? <div className={classes.paper}>LOADING ....</div> :<div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit = {handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value = {auth_details.email}
              onChange = {handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {handleChange}
              value = {auth_details.password}
            />
            <FormControlLabel
              control={<Checkbox checked = {auth_details.rememberMe} value = {auth_details.rememberMe} color="primary" onChange = {handleChange} name="rememberMe"/>}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Button component = {Link} to= "/signUp" >
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>}
      </Grid>
    </Grid>
  );
}