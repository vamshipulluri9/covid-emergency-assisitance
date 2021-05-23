import  React , {Component, useState} from 'react';
import HomePage from './Assets/Components/Hompage/homepage';
import theme from './Assets/Components/Theme/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core'


function App() {

  return (
  
    <div className="App" style={{width:"100%"}}>
     <ThemeProvider theme={theme}>
     <CssBaseline />
     <HomePage/>
     </ThemeProvider>
    </div>
   
    

  );
}

export default App;
