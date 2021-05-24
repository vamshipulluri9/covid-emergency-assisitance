import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { SystemUpdate } from '@material-ui/icons';
import React , {useContext, useState} from 'react';
import {Typography , makeStyles , Checkbox , Link, CssBaseline,Avatar,Paper,Button,Box} from '@material-ui/core';
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
  

export default function UpdateDetails(props){
    const classes = useStyles();

   
    const history = useHistory();
   const [updatedDetails,update] = useState({});
   const [loading, update_loading] = useState(false);

   /*
   ///////////////auth check
   const user_logged = useContext(UserContext)[0];
   const role = user_logged ? user_logged.role: null;

   if(!user_logged)return(
    <Redirect
    to = "/signIn"
    />
  );
  else if (role===1)return (
    <Redirect
    to="/"
    />
  );

////////////*/
if(!props.userLogged){
  console.log(props.userLogged)
  return(
    <Redirect
    to="/signin"
    ></Redirect>
  )
}
else if(props.userLogged.role===1)return(
  <Redirect
  to = "/"
  ></Redirect>
);

   const role = props.userLogged ? props.userLogged.role: null;

   const sendUpdates = (url , body)=>{

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
       alert( "updated successfully");
      }
      else {
        alert(res.status);
      }
      update_loading(false);
    })
    update({});

   }

    const handleSubmit = (event)=>{
      update_loading(true);
      if(role ===3){
        var body = {
          bloodGroup : updatedDetails.bloodGroup,
          isAvailable : updatedDetails.isAvailable
        }
        sendUpdates("/api/plasmaDonars/update" , body);
      }else{
      
      if (updatedDetails.resource === 1) {
        var body = {
          resource : 1,
          beds : {}
        };
        if(updatedDetails.ICUbeds)body.beds.ICUbeds = updatedDetails.ICUbeds;
        if(updatedDetails.otherbeds)body.beds.otherbeds = updatedDetails.otherbeds;
        sendUpdates("/api/hospitals/update" , body);
      }
      else if (updatedDetails.resource === 2){
        var body = {
          resource : 2,
          oxygen : {

          }
        };
        if(updatedDetails.oxygenKits)body.oxygen.kits = updatedDetails.oxygenKits;
        if(updatedDetails.oxygenStock)body.oxygen.stock = updatedDetails.oxygenStock;
        sendUpdates("/api/hospitals/update" , body);
      }
      else if(updatedDetails.resource ===3){
        var body = {
          resource : 3,
          blood:{

          }
        };
        ["A+","B+","AB+","O+","A-","B-","AB-","O-"].forEach((group)=>{
          if(updatedDetails[group])body.blood[group] = updatedDetails[group];
        })
        sendUpdates("/api/hospitals/update" , body);
      }
    }
        event.preventDefault();

    }

    const handleChange=(event)=>{

        update(prev_details => (
            { ...prev_details,
              [event.target.name] : event.target.type === 'checkbox' ? event.target.checked : event.target.value
            }
          ))

    }

    

    const DonarForm = ()=>{
        return (
            <Grid container spacing = {2}>
                <Grid item xs={12} >
                <FormControl fullWidth >
                  <InputLabel htmlFor="bloodGroup" id="bloodGroupLabel" style={{marginLeft : "8px"}}>Blood Group :</InputLabel>
                      <Select  variant = "outlined"
                        labelId="bloodGroup"
                        id="bloodGroup"
                        onChange={handleChange}
                        name = "bloodGroup"
                        required
                        value = {updatedDetails.bloodGroup}
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
                <Grid item xs={12}>
                    <FormControlLabel 
                    control={<Checkbox checked = {updatedDetails.isAvailable} value = {updatedDetails.isAvailable} color="primary" onChange = {handleChange} name="isAvailable"/>}
                    label = "Are you available for Plamsa Donation ?"
                    ></FormControlLabel>
                </Grid>
            </Grid>
        )
    }

    const HospitalForm = ()=>{
        return(
          <Grid container spacing={2}>
              <Grid item xs={12}>
                  <FormControl fullWidth>
                      <InputLabel htmlFor="resourceSelect">Select Resource to update</InputLabel>
                      <Select
                      variant = "standard"
                      labelId="resourceSelect"
                      id="resourceSelect"
                      onChange={handleChange}
                      name = "resource"
                      required
                      value = {updatedDetails.resource}>
                          <MenuItem value={1}>Beds</MenuItem>
                          <MenuItem value={2}>Oxygen</MenuItem>
                          <MenuItem value={3}>Blood</MenuItem>
                         {/*<MenuItem value= {4}>Profile</MenuItem>*/}
                      </Select>
                  </FormControl>

               </Grid>
              
              {
                  updatedDetails.resource===1 && (<Grid container spacing={2}>
                      <Grid item xs={12} >
                          <TextField
                          variant = "outlined"
                          value = {updatedDetails.ICUbeds}
                          name="ICUbeds"
                          fullWidth
                          label = "Number of ICU beds available"
                          onChange = {handleChange}
                          >

                          </TextField>
                      </Grid>
                       <Grid item xs={12}>
                       <TextField
                       variant = "outlined"
                       value = {updatedDetails.otherbeds}
                       name="otherbeds"
                       fullWidth
                       label = "Number of common beds available"
                       onChange = {handleChange}
                       >

                       </TextField>
                   </Grid>
                   </Grid>
                  )

                  
              }

              {
                  updatedDetails.resource===2 && (<Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField
                        variant = "outlined"
                        value = {updatedDetails.oxygenKits}
                        name="oxygenKits"
                        fullWidth
                        label = "Number of available oxygen kits"
                        onChange = {handleChange}
                        required
                        id = "oxygenKits"
                        >

                        </TextField>
                    </Grid>
                     <Grid item xs={12}>
                     <TextField
                     variant = "outlined"
                     value = {updatedDetails.oxygenStock}
                     name="oxygenStock"
                     fullWidth
                     label = "Amount of oxygen in stock (liters)"
                     onChange = {handleChange}
                     id="oxygenStock"
                     required
                     >

                     </TextField>
                 </Grid>
                 </Grid>
                )
              }

            {     
                  updatedDetails.resource===3 && (<Grid container spacing={2}>
                      <Grid xs={12}>
                      <InputLabel fullWidth style={{margin:"5px"}}>Amount of Blood available of each group in liters</InputLabel>
                      </Grid>
                      {
                       
                      ["A+","B+","AB+","O+","A-","B-","AB-","O-"].map((group) =>
                       <Grid item xs={12} sm ={3}>
                        <TextField
                        variant = "outlined"
                        value = {updatedDetails.group}
                        name={group}
                        fullWidth
                        label = {group}
                        onChange = {handleChange}
                        >

                        </TextField>
                    </Grid>
                    )
                    }
                 </Grid>
                )
              }

            {/*     
                  updatedDetails.resource===4 && (<Grid container spacing={2}>
                     
                       
                <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value = {updatedDetails.email}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="Hname"
                name="hospitalName"
                variant="outlined"
                value = {updatedDetails.hospitalName}
                required
                fullWidth
                id="hospitalName"
                label="Hospital Name"
                onChange={handleChange}
                
              />

            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                value={updatedDetails.address}
                label= "Hospital Address"
                onChange={handleChange}
                id="address"
                
              />
            </Grid>
          </Grid>
                )
              */}

              
          </Grid>
        )
    }

    var RoleForm ;
    if(role===2)RoleForm = HospitalForm();
    else if(role===3) RoleForm =DonarForm();

    return(


<Grid container component="main" className={classes.root}>
<CssBaseline />
<Grid item xs={false} sm={4} md={7} className={classes.image} />
<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
  {loading?<div>LOADING....</div>:<div className={classes.paper}>
  <Avatar className={classes.avatar}>
          <SystemUpdate/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Details
        </Typography>
    <form className={classes.form} noValidate onSubmit = {handleSubmit}>
     {RoleForm}
 
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Update
      </Button>
      <Box mt={5}>
        <Copyright />
      </Box>
    </form>
  </div>}
</Grid>
</Grid>

    )
}