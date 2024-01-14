import {useState, useEffect, useContext} from "react";
import { Box, TextField, Typography, Divider, Button, Alert, Paper, Container} from '@mui/material';
import { authToken } from "./Contexts";


export default function Login({handleLogin}) {

    // Initialize needed state variables
    const [alert, setAlert] = useState(false);
    const [formData, setFormData] = useState({
    userName: '',
    password: ''
    });

    // Handle change in form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData,
            [name]:value,
        })
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!formData.userName || !formData.password){
            setAlert("Error in form. Please check all fields.")
            return
        }
        else {
            const url = `${import.meta.env.VITE_API_URL}/api/auth/login`;
            fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then((response) => response.json())
            .then((response) => {
                if(response["token"]) {
                    sessionStorage.setItem("token",response["token"]);
                    sessionStorage.setItem("is_admin",response["is_admin"]);
                    sessionStorage.setItem("user",formData.userName)
                    sessionStorage.setItem("user_id",response["user_id"])
                    handleLogin()
                    console.log("Posted");
                    setAlert(false);
                    setFormData({
                        userName: '',
                        password: ''
                    });
                }
                else {
                    setAlert("Invalid Login.");
                }
            })
        }
    }

  return (
    <Container sx={{bgcolor: "primary.light", p: 5}}>
        <Typography sx={{m: 2}} variant="h5">LEARN LANGUAGE - APP</Typography>   
        <Divider sx={{m: 1}}/> 
    <Paper sx={{m: "auto", p:5,}}>
    <Box
    sx={{display: "flex",flexDirection: "column", justifyContent: 'center'}}
    component="form"
    noValidate
    autoComplete="off"
    onSubmit={handleSubmit}
    >
    <Typography sx={{m: 1}} variant="h5">Login</Typography>    
    <Divider/>
    <TextField 
    sx={{m: 2}} 
    id="Name" 
    label="Username" 
    variant="outlined" 
    value={formData.userName} 
    name="userName"
    onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
    onChange={handleChange}
    />
    <TextField 
    sx={{m: 2}} 
    id="language" 
    label="Password" 
    variant="outlined"
    type="password"
    value={formData.password} 
    name="password"
    onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
    onChange={handleChange}
    />
    <Button variant="contained" type="submit" value="Submit" sx={{ m: 2,bgcolor: 'success.light' }}>Login</Button>
    <Alert sx={{display: alert ? 'flex' : 'none'}} severity="error">{alert}</Alert>
    </Box>
    </Paper>
    </Container>
  );
}