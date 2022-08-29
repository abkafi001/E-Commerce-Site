import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Typography , IconButton, Container  } from '@material-ui/core';
import {AddShoppingCart , AccountCircle} from '@material-ui/icons';
import makeStyles from './style';
import Content from './content,jsx/content';
import Navbar from '../navbar/navber';
import { Grid } from 'semantic-ui-react';



const Profile=()=>{
    const classes=makeStyles();
    // const person={Username:"Sukanto Kumar Das", email:"email@email.com", password:"12345678", bank_sectect:"87654321", balance:"5000"}

    

    return(
        <div >
            <Navbar />
            <Container>
                <div className={classes.toolbar} />

                <Typography className={classes.title} variant='h3'>
                        Your Profile
                </Typography>
                <Content />
                
            </Container>
        </div>
    )
}
export default Profile;