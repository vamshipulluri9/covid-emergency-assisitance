import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Select, MenuItem, FormControl, InputLabel, Paper } from '@material-ui/core';
import { RotateLeft } from '@material-ui/icons';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Redirect } from 'react-router';

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
    table: {
      minWidth: 650,
    },
    resultHeading: {
      ...theme.typography.button,
      backgroundColor: theme.palette.primary.main,
      color : theme.palette.secondary.dark,
      padding: theme.spacing(1),
      textAlign : 'center'
    },
  }));
  

export default function RequestResources(props){
    const classes = useStyles();

    const [main,setMain] = useState(null);
    const [supp,setSupp] = useState(null);
    const [noUnits,setNoUnits] = useState(null);
    const [loading, update_loading] = useState(false);
    const [docs,getDocs] = useState(null);
    const [reqbody,updatebody] = useState(null);

    /*
/////////auth check
    const {userLogged} = useContext(UserContext);
   const role = userLogged ? userLogged.role: null;

  if(!userLogged)return(
    <Redirect
    to = "/signIn"
    />
  );
  else if (role!=1)return (
    <Redirect
    to="/"
    />
  );
////////////////
*/
if(!props.userLogged)return(
  <Redirect
  to = "/signIn"
  ></Redirect>
);
else if(props.userLogged.role!=1)return(
  <Redirect
  to = "/"
  ></Redirect>
);

    const handleChange = (event)=>{
      var main1 = main;
      var supp1 = supp;
      var noUnits1= noUnits;

        if(event.target.name === "main"){
          setMain(event.target.value);
          setSupp(null);
          setNoUnits(null);
          main1 = event.target.value;
          supp1 = null;
          noUnits1= null;
        }
        else if(event.target.name==="supp") {
          setSupp(event.target.value);
          setNoUnits(null);
          supp1 = event.target.value
          noUnits1= null;
        }
        else {
          setNoUnits(event.target.value);
          noUnits1 = event.target.value;
        }

        var body;
        getDocs(null);
        update_loading(true);
        if(main1==="oxygen"){
          body = {
            "main" : main1,
            "supp" : "kits",
            "requirement" : 1
          }
          getSearches("/api/request/hospitals" , body);
        }
        else if(main1 ==="plasma" && supp1!=null){
          body = {
            bloodGroup : supp1
          }
          getSearches("/api/request/plasmaDonars" , body);
        }
        else if((main1==="blood" && supp1!=null && supp1!="ICUbeds" && supp1!="otherbeds" && noUnits1!=null) || (main1 ==="beds" && (supp1 === "ICUbeds" ||supp1==="otherbeds") )){
          body = {
            "main" : main1,
            "supp" : supp1,
            "requirement" :( main1 ==="blood" ? noUnits1 :1 )
          }
          getSearches("/api/request/hospitals" , body);
        }
        else {
          update_loading(false);
        }
        updatebody(body);
    }

    const getSearches = (url , body)=>{

      fetch(url , {
        method : "POST",
        body : JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      },
      ).then((res)=>{
        console.log(res.body);
        if(res.status === 200){
         alert( "Results Obtained");
         return res.json();
         
        }
        else {
          alert(res.status);
          update_loading(false);
        }
        
      }).then((data)=>{ 
        getDocs(data);
        update_loading(false);
      })
      //setMain(null);
      //setSupp(null);
      //setNoUnits(null);
  
     }


  
    const DataTable=()=>{
      return (
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{main==="plasma" ? "Donar Name " :"Hospital Name"}</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">{ main ==="plasma" ? "Email" : main==="oxygen" ? "Oxygen Kits" : `${main}[${supp}]`}</TableCell>
            <TableCell align="right">{ main ==="plasma" ? "Request" : "Book"}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {docs.map((doc) => (
            <TableRow key={doc._id}>
              <TableCell component="th" scope="row">
                {main==="plasma"?`${doc.donarName}`:doc.hospitalName}
              </TableCell>
              <TableCell align="right">{doc.address}</TableCell>
              <TableCell align="right">{main==="plasma"?doc.email:main==="oxygen" ? doc[main]["kits"] : doc[main][supp]}</TableCell>
              <TableCell align="right"
              onClick = {(event)=>{
                update_loading(true);
                alert(doc._id);
                reqbody._id = doc._id;
                if(main==="plasma"){
                  var url = "/api/request/plasmaDonars/book";
                }
                else url = "/api/request/hospitals/book";
                fetch(url , {
                  method : "POST",
                  body : JSON.stringify(reqbody),
                  headers: {
                    'Content-Type': 'application/json'
                  },
                }).then((res)=>{
                  if(res.ok)alert("booked successfully");
                  else alert(res.status);
                  
                  setMain(null);
                  setNoUnits(null);
                  setSupp(null);
                  getDocs(null);
                  update_loading(false);
                });
              }}
              >Click Here</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      );
    }



    return (
        <Container spacing = {2}>
           { loading?<div>LOADING...</div>: <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h2">
          Check Resources ..
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs= {12}>
              <FormControl fullWidth >
              <InputLabel htmlFor="main" id="main-label" style={{marginLeft : "8px"}}>Required Resource :</InputLabel>
                  <Select  variant = "outlined"
                    labelId="main"
                    id="main"
                    onChange={handleChange}
                    name = "main"
                    required
                    value = {main}
                  > 
                    <MenuItem value={"beds"}>Beds</MenuItem>
                    <MenuItem value={"oxygen"}>Oxygen</MenuItem>
                    <MenuItem value={"blood"}>Blood</MenuItem>
                    <MenuItem value={"plasma"}>Plasma</MenuItem>

                  </Select>
                </FormControl>
                </Grid>
                {
                 main === "beds" ? 
                 <Grid item xs= {12}>
                  <FormControl fullWidth >
              <InputLabel htmlFor="supp" id="supp-label" style={{marginLeft : "8px"}}>Bed Type :</InputLabel>
                  <Select  variant = "outlined"
                    labelId="supp"
                    id="supp"
                    onChange={handleChange}
                    name = "supp"
                    required
                    value = {supp}
                  > 
                    <MenuItem value={"ICUbeds"}>ICU Bed</MenuItem>
                    <MenuItem value={"otherbeds"}>Normal Bed</MenuItem>
                    
                  </Select>
                </FormControl>
                </Grid>
                  : main==="blood" ?  <Grid item xs= {12}><Grid item xs= {12}>
                  <FormControl fullWidth >
                  <InputLabel htmlFor="supp" id="supp-label" style={{marginLeft : "8px"}}>Blood Group :</InputLabel>
                      <Select  variant = "outlined"
                        labelId="supp"
                        id="supp"
                        onChange={handleChange}
                        name = "supp"
                        required
                        value = {supp}
                      > 
                        <MenuItem value={"A+"}>A+</MenuItem>
                        <MenuItem value={"B+"}>B+</MenuItem>
                        <MenuItem value={"AB+"}>AB+</MenuItem>
                        <MenuItem value={"O+"}>O+</MenuItem>
                        <MenuItem value={"A-"}>A-</MenuItem>
                        <MenuItem value={"B-"}>B-</MenuItem>
                        <MenuItem value={"AB-"}>AB-</MenuItem>
                        <MenuItem value={"O-"}>O-</MenuItem>
                        
                      </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs= {12}>
                    <TextField
                      autoComplete="noUnits"
                      name="noUnits"
                      variant="outlined"
                      required
                      fullWidth
                      id="noUnits"
                     label="Number of units"
                      value = {noUnits}
                     onChange={handleChange}
                    />
                    </Grid></Grid> : 
                     main === "plasma" ? 
                     <Grid item xs= {12}>
                      <FormControl fullWidth >
                  <InputLabel htmlFor="supp" id="supp-label" style={{marginLeft : "8px"}}>Blood Group :</InputLabel>
                      <Select  variant = "outlined"
                        labelId="supp"
                        id="supp"
                        onChange={handleChange}
                        name = "supp"
                        required
                        value = {supp}
                      > 
                        <MenuItem value={"A+"}>A+</MenuItem>
                        <MenuItem value={"B+"}>B+</MenuItem>
                        <MenuItem value={"AB+"}>AB+</MenuItem>
                        <MenuItem value={"O+"}>O+</MenuItem>
                        <MenuItem value={"A-"}>A-</MenuItem>
                        <MenuItem value={"B-"}>B-</MenuItem>
                        <MenuItem value={"AB-"}>AB-</MenuItem>
                        <MenuItem value={"O-"}>O-</MenuItem>
                        
                      </Select>
                    </FormControl>
                    </Grid>:null
                    
                }
                <Grid item xs= {12}>
            <div className={classes.resultHeading}>{"Search Results .."}</div>
            </Grid>

                <Grid item xs= {12}>
                  {docs ?DataTable():null}
                </Grid>
              
            
            </Grid>
            </form>
            </div>
            }

            
            
        </Container>
    )
}