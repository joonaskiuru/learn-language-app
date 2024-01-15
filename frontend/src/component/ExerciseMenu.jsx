import {useState, useEffect} from "react";
import { Button } from '@mui/material';
 
function ExerciseMenu() {
    const [exercises, setExercises] = useState([]);

    // Fetch Exercises
    useEffect(() => {
        const url = `${import.meta.env.VITE_API_URL}/api/` + "exercises";
        fetch(url).then((response) => response.json()).then((response) => {
            setExercises(response);
        })
    },[])

    return (
        <>
            {exercises.map((X,i) => 
            <Button key={x + "_" + i}>x.name</Button>
            )}
        </>
    );
}

export default ExerciseMenu;