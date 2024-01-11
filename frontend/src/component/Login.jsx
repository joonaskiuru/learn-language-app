import {useState,useEffect, useContext} from "react";
import { Box, TextField, Typography, Divider, Button, Alert} from '@mui/material';


export default function Login() {

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
            setAlert(true)
            return
        }
        else {
            const url = `${import.meta.env.VITE_API_URL}/api/login`;
            fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then((response) => {
                if(response["token"]){
                    sessionStorage.setItem("token",response["token"]);
                    sessionStorage.setItem("isAdmin",response["is_admin"]);
                    console.log("Posted");
                    setAlert(false);
                    setFormData({
                        userName: '',
                        password: ''
                    });
                }
                else {
                    setAlert(true);
                }
            })
        }
    }

  return (
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
    value={formData.password} 
    name="password"
    onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
    onChange={handleChange}
    />
    <Button variant="contained" type="submit" value="Submit" sx={{ m: 2,bgcolor: 'success.light' }}>Login</Button>
    <Alert sx={{display: alert ? 'flex' : 'none'}} severity="error">Error in form. Please check all fields.</Alert>
    </Box>
  );
}