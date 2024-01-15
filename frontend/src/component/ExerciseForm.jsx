import {useState,useEffect} from "react";
import { Box, TextField, Typography,Divider, Button, Chip, Stack, MenuItem, Select, Alert} from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';

export default function ExerciseForm() {

    // Initialize needed state variables
    const [language,setLanguage] = useState("")
    const [languages,setLanguages] = useState([])
    const [words, setWords] = useState([]);
    const [alert, setAlert] = useState(false);
    const [formData, setFormData] = useState({
    exerciseName: '',
    language: '',
    words: [],
    });

    // Words are entered with pressing Enter
    function handleKeyDown(e) {
        if(e.key === 'Enter') {
            e.preventDefault();

            // Don't allow empty words
            if(!e.target.value){
                e.target.value = '';
                return
            }

            let temp = e.target.value.toLowerCase().split(',');

            if (temp.length != 2){
                e.target.value = '';
                return
            }

            const word = {original: temp[0],translated: temp[1]}
            setWords([...words,word]);
            e.target.value = '';
            return
        }

        return
    }

    // Update Tags
    useEffect(() => {
        setFormData({...formData,
            ["words"]: words,
        })
    },[words])


    // Handle change in form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData,
            [name]:value.toUpperCase(),
        })
    };

    // Handle deleting words
    function handleDelete (key) {
        const arr = words.filter(item => item !== key)
        setWords(arr);
    }

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({...formData,
            [words]: words,
        });

        if(!formData.exerciseName || !formData.language){
            setAlert(true)
            return
        }
        else {
            var url = `${import.meta.env.VITE_API_URL}/api/` + "words";
            fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(() => {
                console.log("Posted")
                setAlert(false);
                setWords([]);
                setFormData({
                    exerciseName: '',
                    language: '',
                    words: [],
                });
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
    <Typography sx={{m: 1}} variant="h5">Create an Exercise</Typography>    
    <Divider/>
    <TextField 
    sx={{m: 2}} 
    id="Name" 
    label="Insert Exercise Name Here" 
    variant="standard" 
    value={formData.exerciseName} 
    name="exerciseName"
    onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
    onChange={handleChange}
    />
        <TextField 
    sx={{m: 2}} 
    id="language" 
    label="Insert Exercise Language Here" 
    variant="standard" 
    value={formData.language} 
    name="language"
    onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
    onChange={handleChange}
    />
    <Typography sx={{mt: 3}}>Separate original word from translated word with a comma (,).</Typography>
    <TextField sx={{m: 2}} variant="outlined" id="words" label="Insert Words Here" name="words" onKeyDown={handleKeyDown}/><br /><br />
    <Stack direction="column" spacing={1}>
    {words.map((x,i) => 
    <Chip
    key={x + '_' + i} 
    label={x["original"] + " = " + x["translated"]}
    onDelete={() => handleDelete(x)}
    ></Chip>)}
    </Stack>
    <Button variant="contained" type="submit" value="Submit" sx={{ m: 2,bgcolor: 'success.light' }}><PostAddIcon/>Add Exercise</Button>
    <Alert sx={{display: alert ? 'flex' : 'none'}} severity="error">Error in form. Please check all fields.</Alert>
    </Box>
  );
}