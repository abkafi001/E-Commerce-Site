import React, { useState } from 'react';
import {Button,Grid,TextField, InputAdornment } from '@material-ui/core';
import img1 from '../../../assets/abc1.png';
import logo from '../../../assets/dokan.png';
import {AccountCircle,Lock} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import makeStyles from './styles';
import { useLogin } from "../../../hooks/useLogin"

const Login=()=>{
    const classes=makeStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log({email, password})
        await login(email, password)
    }

    return(
            <div >
                <Grid container style={{minHeight:'100vh'}}>
                    {/* <Grid item xs={12} sm={6}>
                        <img src={img1} alt="brand" style={{width:'100%',height:'100%',ObjectFit:'cover'}} />
                    </Grid> */}
                    <Grid 
                        container 
                        item 
                        alignItems='center' 
                        direction='column' 

                        justify='space-between'
                        style={{padding:'10px'}}>
                        <div/>
                        <div style={{display:'flex',flexDirection:'column',maxWidth: '400',minWidth:'300'}}>
                            <Grid container justify='center'>
                                <img src={logo} alt="logo" width={200}  />
                            </Grid>
                            <TextField 
                                type="email"
                                label="Email" 
                                margin='normal' 
                                InputProps=
                                    {{startAdornment:<InputAdornment position='start'>
                                        <AccountCircle/>
                                    </InputAdornment>}}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <TextField 
                                type="password"
                                label="Password" 
                                margin='normal' 
                                InputProps={{startAdornment:<InputAdornment position='start'><Lock/></InputAdornment>}}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <div style={{height:20}}/>
                            <Button disabled={isLoading}
                                type="submit" 
                                color='primary' 
                                variant='contained'
                                onClick={handleSubmit}
                                component={Link} 
                                to='/'
                            >
                                SIGN IN
                            </Button>
                            <div style={{height:20}}/>
                            <Button component={Link} to='/signUp' >
                                SIGN UP
                            </Button>
                        </div>
                        <div/>

                        {error && <div className="error">{error}</div>}
                    </Grid>
                </Grid>
            </div>
    );
}
export default Login;