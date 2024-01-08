
import { Component } from "react";
import { createTheme } from '@mui/material/styles';
import "./App.css";
import Navbar from "./component/Navbar";
import { ThemeProvider } from "@emotion/react";
 
const theme = createTheme({
  palette: {
    primary: {
      main: '#F6D776',
    },
    secondary: {
      main: '#6DA4AA'
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



















