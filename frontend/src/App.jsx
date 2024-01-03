
import { Component } from "react";
import { createTheme } from '@mui/material/styles';
import "./App.css";
import Navbar from "./component/Navbar";
import { ThemeProvider } from "@emotion/react";
 
const theme = createTheme({
  palette: {
    primary: {
      main: '#e6e018',
    },
    secondary: {
      main: '#181fe6'
    }
  },
});

class App extends Component {
    render() {
        return (
          <>
          <ThemeProvider theme={theme}>
          <Navbar/>
          </ThemeProvider>
          </>
        );
    }
}
 
export default App;



















