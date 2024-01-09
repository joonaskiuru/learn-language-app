import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Box, TextField, Paper, Grid, Typography, MenuItem, Select, Button, Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
 
function Exercise (props) {
    const [formData, setFormData] = useState([]);

    const [words,setWords] = useState([]);

    // Fetch Exercises
    useEffect(() => {
        const url = `${import.meta.env.VITE_API_URL}/api/exercises/` + props.id + "/words" ;
        fetch(url).then((response) => response.json()).then((response) => {
            setWords(response);
        })
    },[])

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
        const id = 1;
        const data = {"exercise_name": props.name,"points": points,"max_points": words.length,"user_id": id}
        console.log(points + ": temp points")
        console.log(data + " : data")
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
        })
    }


    return (
    <Box>
        <Typography variant="h6" color="secondary.main">{props.name}</Typography>
        <Divider sx={{m: 1}}/>
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
        <Button variant="contained" type="submit" value="Submit" sx={{ m: 2,bgcolor: 'success.light' }} onClick={() => submitExercise()}>Submit Exercise<CheckIcon/></Button>
        </Box>
    );
}
 
export default Exercise;