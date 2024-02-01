'use client';
import Link from 'next/link';
import { useState } from 'react';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@mui/material/Input';

const ariaLabel = { 'aria-label': 'description' };
import {
    Paper,
    Grid,
    Stack,
    TextField,
    FormControlLabel,
    FormGroup,
    Checkbox,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
    Box,
    CardContent,
    CardMedia,
    Card,
    Typography,
    Avatar,
    IconButton,
    LinearProgress,
    
} from '@mui/material'
import BaseCard from '@/app/(DashboardLayout)/form-component/shared/BaseCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));
  
const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });



    const Forms = () => {
      const [val,setVal]=useState([]);
      const [isCheckboxChecked, setCheckboxChecked] = useState(false);
    const handleAdd=() => {
      const abc =[...val,[]];
      setVal(abc);
    };
    const handleDelete = (i:number) => {
      const deletval=[...val];
      deletval.splice(i,1)
      setVal(deletval)
    };
     // fonction pour changer la poste
    
    const [job,setJob] = useState("Job");
    const [email,setEmail] = useState("Email");
    const [phone,setPhone] = useState("Phone");

    return (
      
    
      <Grid container spacing={3}>

        {/* Daly part */}
        
          <Grid item xs={12} lg={4}>
          <Box textAlign={"center"}>
          <Avatar
            src="/1.jpg"
            sx={{ width: 100, height: 100, m: "0 auto" }}
          />
          <Typography variant="h5" mt={4}>
            Montassar Yassin
          </Typography>
          
          
          {/* <Typography variant="subtitle1" color="textSecondary" mb={2}>
            Oodo Developer
          </Typography> */}
        
        </Box>
          
          
            <Stack spacing={3} >
              <TextField id="outlined-basic" label="Job" value = {job} variant="standard" onChange={(e) => setJob(e.target.value)}/>
              <TextField id="filled-basic" label="E-mail" variant="standard" onChange={(e) => setEmail(e.target.value)}/>
              <TextField id="filled-basic" label="Phone" variant="standard" onChange={(e) => setPhone(e.target.value)}/>
            </Stack>
         
          <Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={1}
                  >
                
                  </Stack>
                  
                </Box>
        </Grid>

        {/* Daly part */}

        <Grid item xs={12} lg={8} >
       
          <BaseCard title={job} >
            <>
               <Stack spacing={3} direction={'row'}>
               
              <TextField
              id="outlined-multiline-static"
              label="Your hook"
              multiline
              rows={5}
              
               style={{ width: 'calc(5ch * 17)' }}  
              />
              
            </Stack>

            {/* Email and Phone stack */}<br/> <br /> 
            <Stack spacing={3} direction={'row'}> 
            <Input defaultValue="E-mail" value={email} inputProps={ariaLabel} disabled  style={{ width: 'calc(5ch * 6)' }}/>
            <Input defaultValue="Phone" value={phone} inputProps={ariaLabel} disabled />

              
            </Stack>
              
            
            <br />

            
            <br />
            {val.map((data,i)=>{
                return (
                  <>
                  <h1>Work Experience :</h1>
                  <br />
                  <Stack direction={'row'} spacing={3}>
            <TextField
                id="date-basic"
                label=""
                type="date"
                variant="outlined"
                 style={{ width: 'calc(5ch * 5.5)' }} 
              />
              <TextField
id="date-basic"
label=""
type="date"
variant="outlined"
style={{ width: 'calc(5ch * 5.5)' }}
disabled={isCheckboxChecked}
/>
<FormControlLabel
control={
<Checkbox
defaultChecked={isCheckboxChecked}
onChange={() => setCheckboxChecked(!isCheckboxChecked)}
/>
}
label="Until today"
/>
            </Stack>
                  <br />
                  <Stack spacing={3}   >
              
              <TextField
                id="name-basic"
                label="Company"
                variant="outlined" 
                style={{ width: 'calc(5ch * 11.6)' }}
              />
              <TextField
                id="name-basic"
                label="Position"
                variant="outlined"
                style={{ width: 'calc(5ch * 11.6)' }} 
              />
              
              <br />
            
            </Stack>
            
            <br />
            <Stack spacing={3} direction={'row'}>
            <TextField
              id="outlined-multiline-static"
              label="Text Area"
              multiline
              rows={5}
            style={{ width: 'calc(5ch * 17)' }}  
              />
            </Stack>
            <br />
            <Box display="flex" justifyContent="flex-end" alignItems="center">
  <Button onClick={() => handleDelete(i)}>
    remove
  </Button>
  <Box ml={1}>
  <Button>
    save
  </Button>
  </Box>
  </Box>
                  </>
                )


              })}
            
            <br />
            <Button onClick={()=>handleAdd()}>
              + Add Experience
            </Button>
            
            </>
          </BaseCard>
        </Grid>
        
  
       
      </Grid>
    );
  };
  
  export default Forms;