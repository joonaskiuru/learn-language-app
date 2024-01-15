import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, Button, Divider } from '@mui/material';
import Exercise from "./Exercises/Exercise";
import Progress from "./Exercises/Progress";
import { currentExercise } from "./Contexts";
 
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
                onClick={() => setActiveExercise(
                <currentExercise.Provider value={[activeExercise,setActiveExercise]}><Exercise {...x}/></currentExercise.Provider>)}>
                    {x.name}</Button>)}
                </Box>
            </Paper>
            <Box>
            {activeExercise}
            </Box>
        </Box>

    </>
    );
}
 
export default Dashboard;