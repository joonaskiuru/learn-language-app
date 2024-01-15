import { useState, useEffect, useContext } from "react";
import { styled } from '@mui/material/styles';
import { Box, TextField, Paper, Grid, Typography, MenuItem, Select, Button, Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ExercisePoints from "./ExercisePoints";
import { currentExercise } from "../Contexts";
import Progress from "./Progress";

 
function Exercise (props) {
    const [formData, setFormData] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [words,setWords] = useState([]);
    const [activeExercise,setActiveExercise] = useContext(currentExercise);
    const user_id = sessionStorage.getItem("user_id")

    // Fetch Exercises
    useEffect(() => {
        console.log(props.id + ": props id")
        const url = `${import.meta.env.VITE_API_URL}/api/exercises/` + props.id + "/words" ;
        fetch(url).then((response) => response.json()).then((response) => {
            setWords(response);
        })
    },[activeExercise])

    // Handle change in form
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name + ": name")
        console.log(value + " : value")
        setFormData({...formData,
            [name]:value,
        })
    };  console.log(formData)

    const submitExercise = () => {
        let points = 0;
        words.map((x) => {
            if(x["translated"] === formData[x["original"]]){
                console.log(formData[x["original"]] + ": corr")
                points += 1;
            }
        })

        const data = {"exercise_name": props.name,"points": points,"max_points": words.length,"user_id": user_id, "exercise_id": props.id}
        console.log(points + ": temp points")
        console.log(data["user_id"] + " : data")
        const url = `${import.meta.env.VITE_API_URL}/api/points/`;
        fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            console.log("Posted")
            setFormData([]);
            openDialog()
        })
    }

    const openDialog = () => {
        setDialogOpen(true);

    }

    const closeDialog = () => {
        setDialogOpen(false);
        setActiveExercise(<Progress/>)
    }

    return (
    <Paper sx={{display: "flex",flexDirection: "column", justifyContent: "center",alignItems: "center", m: 5}}>

        <Typography variant="h6" color="secondary.main" textAlign={"center"}>{props.name}</Typography>
        <Divider sx={{m: 1, width: "90%"}}/>
        {words.map((x,i) =>
            <Box key={x + "_" + i} 
            display={"flex"} sx={{justifyContent: "center",alignItems: "center", m: 2}}>
            <Typography sx={{mr: 2}}>{x["original"]} = </Typography>
            <TextField
            size="small"
            id={x + "_" + i} 
            label="Insert Answer"
            variant="outlined" 
            value={formData.x} 
            name={x["original"]}
            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
            onChange={handleChange}
            />
            </Box>
        
        )}

        <Button variant="contained" type="submit" value="Submit" sx={{ m: 2, bgcolor: 'success.light',color: "white" }} onClick={() => submitExercise()}>Submit Exercise<CheckIcon/></Button>
        <Divider sx={{m: 1, width: "90%"}}/>
        <ExercisePoints exerciseName={props.name} user={user_id} open={dialogOpen} close={closeDialog}/>

    </Paper>
    );
}
 
export default Exercise;