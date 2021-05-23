import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import { Box, Button, Container} from '@material-ui/core';
import "./landingpage.css";
import { Facebook, Instagram, Twitter } from '@material-ui/icons';
import "./css/bootstrap.min.css";
import "./css/templatemo-lava.css";
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const useScript = url => {
    const script = document.createElement('script');
  
      script.src = url;
      script.async = false;
  
      document.body.appendChild(script);
  };

const useStyles = makeStyles((theme) => ({
    root: {
      //margin: theme.spacing(0),
    },
    button: {
      margin : theme.spacing(3),
      //color : theme.palette.secondary.main,
    },
    container1 : {
      width : "50%",
      minHeight : "300px",
      color : theme.palette.primary.contrastText
    }
    
  }));
  

export default function LandingPage(props){ 

	const classes = useStyles();


    return(
        
       <Box className={classes.root} style = {{width:"100%"}} >
		   

<div className="welcome-area" id="welcome">
<div className="header-text">
    <Container>
        <div className="row">
            <div className="left-text col-lg-6 col-md-12 col-sm-12 col-xs-12"
                data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
                <h1>Covid Emergency Assistance</h1>
                <p>An app built for helping india meet all the necessary needs.</p> 
                <Button variant="contained" color= "secondary" className={classes.button}  component={Link}  to="/signIn"  >LOGIN</Button>
                <Button variant="contained" color= "secondary" component={Link}  to="/signUp">Register</Button>
            </div>
        </div>
    </Container>
</div>

</div>

{//<!-- ***** Features Big Item Start ***** -->
}
    <section className="section" id="about">
        <Container>
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12"
                    data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
                    <div className="features-item">
                        <div className="features-icon">
                            <h2>01</h2>
                            <img src="Photos/double-bed.svg" alt=""/>
                            <h4>Beds</h4>
                            <p>Check the availability of Beds and Book a bed at your preferred hospital from the nearby hospitals.</p>
                            <Button variant="contained"  component={Link}  to="/requestResources" color= "secondary" className={classes.button}>
                              Check Availability
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12"
                    data-scroll-reveal="enter bottom move 30px over 0.6s after 0.4s">
                    <div className="features-item">
                        <div className="features-icon">
                            <h2>02</h2>
                            <img src="/Photos/donor.svg" alt=""/>
                            <h4>Blood</h4>
                            <p>Check the availability of required blood in nearby hospitals and contact hospital for further actions .</p>
                            <Button variant="contained"   component={Link}  to="/requestResources" color= "secondary" className={classes.button}>
                              Check Availability
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12"
                    data-scroll-reveal="enter right move 30px over 0.6s after 0.4s">
                    <div className="features-item">
                        <div className="features-icon">
                            <h2>03</h2>
                            <img src="/Photos/blood.svg" alt=""/>
                            <h4>Plasma</h4>
                            <p>Check the nearby plasma donar cured from covid and put on a request for plasma donation by donar.</p>
                            <Button variant="contained"   component={Link}  to="/requestResources" color= "secondary" className={classes.button}>
                              Check Availability
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </section>

    {
      //<!-- ***** Features Big Item End ***** -->
    }

<div className="left-image-decor"></div>
{
//<!-- ***** Features2 Big Item Start ***** -->
}
<section className="section" id="promotion">
    <Container>
        <div className="row">
            <div className="left-image col-lg-5 col-md-12 col-sm-12 mobile-bottom-fix-big"
                data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
                <img src="/Photos/helping-hand.svg" className="rounded img-fluid d-block mx-auto" alt="App"/>
            </div>
            <div className="right-text offset-lg-1 col-lg-6 col-md-12 col-sm-12 mobile-bottom-fix">
                <ul>
                    <li data-scroll-reveal="enter right move 30px over 0.6s after 0.4s">
                        <img src="/Photos/hospital.svg" alt=""/>
                        <div className="text">
                            <h4>Register as <em>Hospital</em></h4>
                            <p>If you are a Hospital managment member , then please register as hospital and then update the beds and blood availablity in your hospital .</p>
                            <Button
                                variant= "contained" 
                                component={Link} 
                                to={ props.userLogged? "/updateDetails" : "/signUp"}
                                color = "secondary"
                                className={classes.button}>
                              {props.userLogged? "Update Details" :"Register"}
                            </Button>
                        </div>
                        
                    </li>
                    <li data-scroll-reveal="enter right move 30px over 0.6s after 0.5s">
                        <img src="/Photos/donate.svg" alt=""/>
                        <div className="text">
                            <h4>Register as <em>Plasma Donor</em></h4>
                            <p>If you recently recovered from covid and willing to donate plasma to needy, Please register as the Plasma donor. We inform you when we find a requirement</p>
                        
                        <Button
                                variant= "contained" 
                                component={Link} 
                                to={ props.userLogged? "/updateDetails" : "/signUp"}
                                color = "secondary"
                                className={classes.button}>
                              {props.userLogged? "Update Details" :"Register"}
                        </Button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </Container>
</section>
{
//<!-- ***** Features Big Item End ***** -->
}    

{
//<!-- ***** Footer Start ***** -->
}
<footer id="contact-us">
        <Container>
            <div className="footer-content">
                <div className="row">
                    {
                    //<!-- ***** Contact Form Start ***** --
                  }
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="contact-form">
                            <form id="contact" action="" method="post">
                                <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                        <fieldset>
                                            <input name="name" type="text" id="name" placeholder="Full Name" required=""
                                                style={{backgroundColor: "rgba(250,250,250,0.3)"}}/>
                                        </fieldset>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <fieldset>
                                            <input name="email" type="text" id="email" placeholder="E-Mail Address"
                                                required="" style={{backgroundColor: "rgba(250,250,250,0.3)"}}/>
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <textarea name="message" rows="6" id="message" placeholder="Your Message"
                                                required="" style={{backgroundColor: "rgba(250,250,250,0.3)"}}></textarea>
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                        <Button
                                variant= "contained" 
                                onClick = {()=>{}}
                                color = "secondary"
                                className={classes.button}>
                                SUBMIT
                               </Button>
                                        </fieldset>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {
                    //<!-- ***** Contact Form End ***** -->
                    }
                    <div className="right-content col-lg-6 col-md-12 col-sm-12">
                        <h2>More About <em>Covid Emergency Assistance</em></h2>
                        <p>This app initiative is the out come of <em>E-yantra covid hackathon</em> whis is conducted by Govt of India.
                        This is developed for helping indians fight back covid 19 .
                        This app aims at providing the emergency needs and saving lives of people.</p>
                        
                        
                        <ul className="social">
                            <li><a href="#"><Icon><Instagram/></Icon></a></li>
                            <li><a href="#"><Icon><Twitter/></Icon></a></li>
                            <li><a href="#"><Icon><Facebook/></Icon></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="sub-footer">
                     - created by <em>Puppala Pranay</em> and <em>K Sai Madhav.</em>
                    </div>
                </div>
            </div>
        </Container>
    </footer>



 </Box>
    )
}