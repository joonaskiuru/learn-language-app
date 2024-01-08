import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Typography, MenuItem, Select, Button, Divider } from '@mui/material';
 
function Exercise (props) {
    console.log("it works")

    return (
    <> <Paper>{props.name}</Paper>
        <Typography>Hello</Typography>
    </>
    );
}
 
export default Exercise;