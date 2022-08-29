import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, ManuItem, Manu, Typography } from '@material-ui/core';
import { ShoppingCart , AccountCircle} from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import logo from '../../assets/dokan.png';
import useStyles from './styles';
import {Link , useLocation } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from "../../hooks/useLogout"


const Navbar = () => {
    const classes=useStyles();
    const location = useLocation();
    const { user } = useAuthContext();
    const { logout } = useLogout();

    const handleClick = (e) => {
        logout();
    };

    return(
        <>
        <AppBar position='fixed' className={classes.appBar} >
            <Toolbar>
                <Typography component={Link} to='/' varient='h6' className={classes.title} color='inherit'>
                    <img src={logo} alt="Dokan.com" height='80' className={classes.image} />
                    E-commarce.com
                </Typography>
                <div classes={classes.grow} />
                {/* <div className={classes.button}>
                    {(location.pathname ==='/') && 
                    <Typography component={Link} to='/login' className={classes.text} color='inherit'>
                        LOG IN
                    </Typography>}
                </div>
                <div className={classes.button}>
                    {(location.pathname ==='/') && 
                    <Typography component={Link} to='/signUp' className={classes.text} color='inherit'>
                        SIGN UP
                    </Typography>}
                </div> */}
                <div className={classes.button}>
                    {(location.pathname ==='/') && 
                    (<Typography component={Link} to='/profile' varient='h6' className={classes.title} color='inherit'>
                        Profile
                        <AccountCircle/>
                    </Typography>)}
                </div>
                <div className={classes.button}>
                    {(location.pathname ==='/') && 
                    (<IconButton component={Link} to='/cart' aria-label="Show" >
                        <Badge badgeContent={2} color="secondary">
                            <ShoppingCart/>
                        </Badge>
                    </IconButton>)}
                </div>
                <div className={classes.button} onClick={handleClick}>
                    {(location.pathname ==='/') && 
                    (<Typography component={Link} to='/login' varient='h6' className={classes.title} color='inherit'>
                        Logout
                        <ExitToAppIcon />
                    </Typography>)}
                </div>
                
            </Toolbar>
        </AppBar>
        </>
    )
};
export default Navbar;