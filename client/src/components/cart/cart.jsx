import React from 'react';
import {Container, Typography, Button, Grid} from '@material-ui/core';
import CartItem from './cartitem/cartitem';
import makeStyles from './styles';
import Navbar from '../navbar/navber';
import {Link } from 'react-router-dom';
import p1 from '../../assets/p1.jpeg';
import p2 from '../../assets/p2.jpeg';

import { useCartContext } from '../../hooks/useCartContext';

const Cart = () => {
    const isEmpty = false;
    // const cartItems=[
    //     { id:1, name:'Wireless Mouse', img: p1, price:'$8' ,total:'$8',quantity:1},
    //     { id:2, name:'Keyboard', img: p2, price:'$15' ,total:'$15',quantity:1},  
    // ]
    const classes=makeStyles();

    const { cart } = useCartContext();

    const EmptyCard = () => (
        <Typography variant='subtitle1' >
            You have no items in your shoping cart, start adding some!
            <Link to='/' className={classes.link}>start adding some!</Link>
        </Typography>
    )

    const FilledCard = () => (
        <>
            <Grid container justify="center" spacing={3} >
                {cart && cart.map((item)=>(
                    <Grid item key={item.id} xs={12} sm={4} >
                        <CartItem item={item}/>
                    </Grid>
                    
                ))}
            </Grid>

            <div className={classes.cardDetails}>
                <Typography variant='h4' > Subtotal:{"$23"}</Typography>
                <div>
                    <Button className={classes.emptyButton} variant="contained" type="button" color="secondary" size='large' >Empty Card</Button>
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} variant="contained" type="button" color="primary" size='large' >Check Out</Button>
                </div>
            </div>
        </>
    );
    return(
        <Container>
            <Navbar/>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant='h3'>
                Your Shoping Cart
            </Typography>
            {isEmpty ? <EmptyCard/> :<FilledCard/>}
        </Container>
    );
}

export default Cart;