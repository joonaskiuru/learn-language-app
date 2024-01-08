import { useState, useEffect, useContext } from "react";
import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Typography, MenuItem, Select, Button, Divider, AppBar, Menu, Toolbar} from '@mui/material';
import Exercise from "./Exercises/Exercise";
import Progress from "./Exercises/Progress";
import { currentExercise } from "./Contexts";

import {
    Link as RouterLink,
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet
} from "react-router-dom";
 
function Dashboard () {
    const [activeExercise,setActiveExercise] = useState(<Progress/>);
    const [exercises, setExercises] = useState([]);

    // Fetch Exercises
    useEffect(() => {
        const url = `${import.meta.env.VITE_API_URL}/api/` + "exercises";
        fetch(url).then((response) => response.json()).then((response) => {
            console.log(response + ": response")
            setExercises(response);
        })
    },[])

    const handleChange = (x) => {
        console.log(x);

    }


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
    <> 
        <Box sx={{ flexGrow: 1,bgcolor: "lightgrey"}}>
            <Paper sx={{ m: 2, p: 1,display: {xs: "none", sm: 'block'}}}>
                <Typography variant="h6" sx={{color: 'text.secondary'}}>Exercises</Typography>
                <Typography>Do exercises!</Typography>

                <Box>
                <Divider sx={{m: 1}}/>
                <Button sx={{m: 1,bgcolor: "secondary.main"}} variant="contained" onClick={() => setActiveExercise(<Progress/>)}>Progress</Button>
                {exercises.map((x,i) => 
                <Button 
                sx={{m: 1}} 
                variant="contained"
                key={x + i}
                onClick={() => setActiveExercise(<Exercise {...x}/>)}>
                    {x.name}</Button>)}
                </Box>
            </Paper>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6} lg={4} sx={{m: 1}}>
                    <Item>
                        {activeExercise}
                    </Item>
                </Grid>
                <Grid item xs={12} md={5} lg={4} sx={{m: 1}}>
                    <Item>

                    </Item>
                </Grid>
            </Grid>
        </Box>

    </>
    );
}
 
export default Dashboard;