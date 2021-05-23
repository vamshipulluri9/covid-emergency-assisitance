import { Avatar, Container, Grid, Link, List, ListItem, ListItemText, ListSubheader, makeStyles, Typography} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";


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
    list :{
      
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.secondary.main,
        padding : "2em"
        
      
    }
  }));
  
  export default function Profile(props){
    const classes = useStyles();

    
    const [Profile,setProfile] = useState(null);
    const [loading, update_loading] = useState(false);
    var history = useHistory();

    useEffect(()=>{
        
            update_loading(true);
        fetch('/api/request/profile/me').then((res)=>{
            update_loading(false);
            if(res.ok) return res.json();
            else {
              alert(`Please update the details in Update section above.`);
              history.replace('/');
            }
        }).then((data)=>{
            console.log(data);
            setProfile(data);
        })
       
        
    } , [])
    


if(!props.userLogged)return(
  <Redirect
  to = "/signIn"
  ></Redirect>
);


return (
    <Container spacing = {2} style={{padding:'2em'}}>
       { loading?<div>LOADING...</div>: <div className={classes.paper}>
    <Avatar className={classes.avatar}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h2" style={{marginBottom : "2em"}}>
      PROFILE
    </Typography>
    {Profile?<Grid container>
        <Grid item xs = {12} lg = {6}>
        <List
         subheader={
        <h4>USER DETAILS</h4>
        }
        className={classes.list}
         >
      <ListItem >
        <ListItemText primary="First Name: " secondary = {Profile[0].firstName} />
      </ListItem>
      <ListItem >
        <ListItemText primary="Last Name : " secondary = {Profile[0].lastName} />
      </ListItem>
      <ListItem >
        <ListItemText primary="Email : " secondary = {Profile[0].email} />
      </ListItem>
      <ListItem >
        <ListItemText primary="Address : " secondary = {Profile[0].address} />
      </ListItem>
    
      </List>
       </Grid>
       <Grid item xs={12}  lg  = {6} >
       {
           Profile[0].role===2 ?
            <div>
                <List
                    subheader={
                    <h5>
                     Hospital Details.
                     </h5>
                    }
                    className={classes.list}
                    
                >

                <ListItem >
                    <ListItemText primary="Hospital Name :" secondary = {Profile[1].hospitalName} />
                </ListItem>
                {Profile[1].beds?<ListItem >
                    <ListItemText primary="Beds:"  />
                    <List disablePadding>
                    <ListItem >
                    <ListItemText primary="ICU beds :" secondary = {Profile[1].beds["ICUbeds"]} />
                    </ListItem>
                    <ListItem >
                    <ListItemText primary="other beds :" secondary = {Profile[1].beds["otherbeds"]} />
                    </ListItem>
                    </List>
                </ListItem>: null}
                <hr/>
                {Profile[1].oxygen?<ListItem >
                    <ListItemText primary="Oxygen:"  />
                    <List disablePadding>
                    <ListItem >
                    <ListItemText primary="Kits :" secondary = {Profile[1].oxygen["kits"]} />
                    </ListItem>
                    <ListItem >
                    <ListItemText primary="Stock:" secondary = {Profile[1].oxygen["stock"]} />
                    </ListItem>
                    </List>
                </ListItem>:null}
                <hr/>
                {Profile[1].blood?<ListItem >
                    <ListItemText primary="Blood :"  />
                    <List disablePadding>
                    {["A+","B+","AB+","O+","A-","B-","AB-","O-"].map((group)=>{
                         return (
                             <ListItem>
                         <ListItemText primary ={`${group} : `} secondary = {Profile[1].blood[group] ?Profile[1].blood[group]: 0 }/>
                         </ListItem>
                         )
                     })}
                    </List>
                </ListItem>:null}
                
                

                </List>
                
            </div>
            :Profile[0].role===3 ?
            <div>
                <List>
                    <ListItem >
                    <ListItemText primary="Blood Group:" secondary = {Profile[1].bloodGroup} />
                    </ListItem>
                    <ListItem >
                    <ListItemText primary="Available for Donation :" secondary = {Profile[1].isAvailable?"Yes":"No"} />
                    </ListItem>
                </List>
            </div>
            :null
       }
       </Grid>
    </Grid>:null}
    </div>}
    </Container>
);
}