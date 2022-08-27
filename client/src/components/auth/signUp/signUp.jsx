import React from 'react';
import {Button,Grid,TextField, InputAdornment } from '@material-ui/core';
import img1 from '../../../assets/abc1.png';
import logo from '../../../assets/dokan.png';
import { AccountCircle, Lock,Email, AccountBalance } from '@material-ui/icons';
import {Link} from 'react-router-dom';
import makeStyles from './styles';

const Signup=()=>{
    const classes=makeStyles();
    console.log('Signup');
    return(
        <main>
            <div className={classes.toolbar}>
                <Grid container style={{minHeight:'100vh'}}>
                    
                    <Grid 
                        container 
                        item 
                        alignItems='center' 
                        direction='column' 
                        xs={12} 
                        sm={6}
                        justify='space-between'
                        style={{padding:'10px'}}>
                        <div/>
                        <div style={{display:'flex',flexDirection:'column',maxWidth: '400',minWidth:'300'}}>
                            <Grid container justify='center'>
                                <img src={logo} alt="logo" width={100}  />
                            </Grid>
                            <TextField label="Username" margin='normal' InputProps={{startAdornment:<InputAdornment position='start'><AccountCircle/></InputAdornment>}}/>
                            <TextField label="Email" margin='normal' InputProps={{startAdornment:<InputAdornment position='start'><Email/></InputAdornment>}}/>
                            <TextField type='password' label="Password" margin='normal' InputProps={{startAdornment:<InputAdornment position='start'><Lock/></InputAdornment>}}/>
                            <TextField type='password' label="Confirm Password" margin='normal' InputProps={{startAdornment:<InputAdornment position='start'><Lock/></InputAdornment>}}/>
                            <TextField type='id' label="Bank Account" margin='normal' InputProps={{startAdornment:<InputAdornment position='start'><AccountBalance/></InputAdornment>}}/>
                            <TextField type='password' label="Payment Secrect" margin='normal' InputProps={{startAdornment:<InputAdornment position='start'><Lock/></InputAdornment>}}/>
                            <div style={{height:20}}/>
                            <Button component={Link} to='/' color='primary' variant='contained'>
                                SIGN UP
                            </Button>
                            <div style={{height:20}}/>
                            <Button component={Link} to='/login' >
                                SIGN IN
                            </Button>
                        </div>
                        <div/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <img src={img1} alt="brand" style={{width:'100%',height:'100%',ObjectFit:'cover'}} />
                    </Grid>
                </Grid>
            </div>
        </main>
        
    );
}
export default Signup;