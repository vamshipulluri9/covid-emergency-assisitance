# Covid Emergency Assisance

## Description
Covid emergency assistance is a fully functional Web application which is aimed at providing the emergency resources to patients with need. 

Through this app one can check the availability of different emergency resources and book/request that particular resource from the source of their choice.

This app behaves as a platform where the Hospitals and Plasma Donors can register in app and update the details of resources available with them and on the same app Patients can register and check the availability of any resource and book/ request for that particular resource .

Hospitals update the details of - Beds , Oxygen , Blood available with them. 
Plasma Donors update the details of - Blood group , Whether they are available of donation .

All these details are stored in a database and accessed by web app when a patient registers and checks availability of particular resource . In this way all the emergency stuff is maintained and made accessible at single place at your finger tips. This way no one will be refrained from getting basic/emergency needs.

## Software Involved

The Entire project can be divided into : 

Front End :-   done by REACTJS ( additional packages :- MaterialUI )  
Back End :-   done by EXPRESSJS (additional packages : express-jwt , Bcrypt, Mongoose )  
Database :-  MONGODB (ATLAS)  
Deployment :- Heroku Cloud Platform  

So Most of the project is based on JAVASCRIPT language.

## Steps To run locally :

`cd Covid-Emergency-Assistance_production`  
`npm install`  

`cd Covid-Emergency-Assistance_production/client`  
`npm install`  
`npm build`  

`cd ../`  
`npm start`

## ProcessFlow Diagram

![Process Flow Diagram](ProcessFlowDiagram.png)

