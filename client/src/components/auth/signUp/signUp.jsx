import React, {useState, useEffect} from 'react';
import {Button,Grid,TextField, InputAdornment } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import img1 from '../../../assets/abc1.png';
import logo from '../../../assets/dokan.png';
import { AccountCircle, Lock,Email, AccountBalance } from '@material-ui/icons';
import {Link} from 'react-router-dom';
import makeStyles from './styles';

import { useSignup } from "../../../hooks/useSignup";

const Signup=()=>{
    const classes=makeStyles();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [account, setAccount] = useState('');
    const [secret, setSecret] = useState('');
    const [error, setError] = useState('');
    const {signup, error: loadingError, isLoading} = useSignup();

    useEffect(()=>{
        setError(loadingError);
    }, [loadingError]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log({name, email, password, confirmPassword, account, secret});

        if(password !== confirmPassword) {
            setError("Passwords don't match.");
            return;
        }

        await signup(name, email, password, account, secret);
    }


    return(
        <main>
            <div className={classes.toolbar}>
                <Grid container style={{minHeight:'100vh'}}>
                    
                    <Grid 
                        container
                        item 
                        alignItems='center' 
                        direction='column' 
                        
                        justify='space-between'
                        style={{padding:'10px'}}>
                        <div/>
                        <div xs={12} sm={12} style={{display:'flex',flexDirection:'column',maxWidth: '400', minWidth:'300'}}>
                            <Grid container justify='center'>
                                <img src={logo} alt="logo" width={100}  />
                            </Grid>

                            <TextField 
                                label="Name" 
                                margin='normal' 
                                InputProps={{startAdornment:<InputAdornment position='start'><AccountCircle/></InputAdornment>}}
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />

                            <TextField 
                                label="Email" 
                                margin='normal' 
                                InputProps={{startAdornment:<InputAdornment position='start'><Email/></InputAdornment>}}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />

                            <TextField 
                                type='password' 
                                label="Password" 
                                margin='normal' 
                                InputProps={{startAdornment:<InputAdornment position='start'><Lock/></InputAdornment>}}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />

                            <TextField 
                                type='password' 
                                label="Confirm Password" 
                                margin='normal' 
                                InputProps={{startAdornment:<InputAdornment position='start'><Lock/></InputAdornment>}}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                            />

                            <TextField 
                                type='id' 
                                label="Bank Account" 
                                margin='normal' 
                                InputProps={{startAdornment:<InputAdornment position='start'><AccountBalance/></InputAdornment>}}
                                onChange={(e) => setAccount(e.target.value)}
                                value={account}
                            />

                            <TextField 
                                type='password' 
                                label="Payment Secrect" 
                                margin='normal' 
                                InputProps={{startAdornment:<InputAdornment position='start'><Lock/></InputAdornment>}}
                                onChange={(e) => setSecret(e.target.value)}
                                value={secret}
                            />

                            <div style={{height:20}}/>
                            <Button 
                                disabled={isLoading}
                                type="submit"
                                color='primary' 
                                variant='contained'
                                onClick={handleSubmit}
                                component={Link} 
                                to='/' 
                            >
                                SIGN UP
                            </Button>
                            <div style={{height:20}}/>
                            <Button component={Link} to='/login' >
                                SIGN IN
                            </Button>

                            {error && 
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {error}
                            </Alert>}
                        </div>
                        <div/>
                    </Grid>
                    
                    {/* <Grid item xs={12} sm={6}>
                        <img src={img1} alt="brand" style={{width:'100%',height:'100%',ObjectFit:'cover'}} />
                    </Grid> */}
                </Grid>
            </div>
        </main>
        
    );
}
export default Signup;