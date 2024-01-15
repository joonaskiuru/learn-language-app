import {useState, useEffect} from "react";
import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Typography, Divider, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExerciseForm from "./ExerciseForm";
import LockIcon from '@mui/icons-material/Lock';
 
function Admin() {
    const [exercises, setExercises] = useState([]);
    const [activePage,setActivePage] = useState('Main');
    const admin = sessionStorage.getItem("is_admin")
    console.log(admin + " : admin")

    // Fetch Exercises
    useEffect(() => {
        const url = `${import.meta.env.VITE_API_URL}/api/` + "exercises";
        fetch(url).then((response) => response.json()).then((response) => {
            console.log(response + ": response")
            setExercises(response);
        })
    },[])

    const deleteExercise = (id) => {
        const url = `${import.meta.env.VITE_API_URL}/api/exercises/${id}/words` ;
        fetch(url, { method: 'DELETE'})
        .then(() => fetch(`${import.meta.env.VITE_API_URL}/api/` + "exercises").then((response) => response.json()).then((response) => {
            console.log(response + ": response")
            setExercises(response);
            })
        )
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const updateExercises = () => {
        const url = `${import.meta.env.VITE_API_URL}/api/` + "exercises";
        fetch(url).then((response) => response.json()).then((response) => {
            console.log(response + ": response")
            setExercises(response);
        })
    }

    return (
        <>
        {admin == 1 ? <Box sx={{ flexGrow: 1,bgcolor: "lightgrey"}}>
            <Paper sx={{ m: 2, p: 1,display: {xs: "none", sm: 'block'}}}>
                <Typography variant="h6" sx={{color: 'text.secondary'}}>Admin</Typography>
                <Typography>Manage Exercises</Typography>

            </Paper>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6} lg={4} sx={{m: 1}}>
                    <Item>
                        <ExerciseForm updateExercises={updateExercises}/>
                    </Item>
                </Grid>
                <Grid item xs={12} md={5} lg={4} sx={{m: 1}}>
                    <Item>
                        <Typography sx={{m: 1}} variant="h5">All Exercises</Typography>
                        <Divider/>
                        {exercises.map((x,i) => <Typography key={x + i}>{x.name}<Button sx={{color: "error.dark"}} onClick={() => deleteExercise(x.id)}>Delete<DeleteIcon/></Button></Typography>)}
                    </Item>
                </Grid>
            </Grid>
        </Box> : 
        <Box sx={{bgcolor: "lightgrey"}}>
        <Paper sx={{m: 2, p: 2}}>
            <Typography variant="h5"><LockIcon sx={{mr: 2}}/>Not Logged In As Administrator</Typography>
            <Typography>Log in as user with admin rights to modify exercises.</Typography>
        </Paper></Box>}
        
    </>
    );
}

export default Admin;