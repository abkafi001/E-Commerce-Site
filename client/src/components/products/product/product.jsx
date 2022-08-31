import React from 'react';
import { Card,CardMedia,CardContent,CardActions,Typography , IconButton  } from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons';

import useStyles from './style'

import { useAuthContext } from '../../../hooks/useAuthContext';
import { useCartContext } from '../../../hooks/useCartContext';

const Product=({product})=>{
    const classes=useStyles();

    const { dispatch } = useCartContext();
    const { user } = useAuthContext();

    const handleClick = async (e) => {
        // console.log(product)

        const response = await fetch("http://127.0.0.1:3001/api/users/add-product", 
        {
            method: 'POST',
            headers: {
                "x-auth-token": user.token,
                "content-type": "application/json"
            },

            body: JSON.stringify({
                product_id: product._id,
                price: product.price
            })
        });

        const json = await response.json();

        dispatch({type: 'SET_CART', payload: json.cart});

    }
    
    return(

        <Card className={classes.root}>

            <CardMedia 
            
                className = {classes.media} 

                image = {`data:${product.image.contentType};\
                        base64, ${Buffer.from(product.image.data).toString('base64')}`} 

                title = {product.name} />

            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant='h5' gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant='h5' gutterBottom>
                        {product.price}
                    </Typography>
                </div>
                <Typography variant='body1' gutterBottom>
                    Available : {product.unit} unit
                </Typography>
                <Typography variant='body2' gutterBottom>
                    description : {product.description}
                </Typography>
                <Typography variant='body2' gutterBottom>
                    Supplier : {product.supplier.name}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton onClick={handleClick} aria-label="Add to Cart">
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>
        </Card>
    )
}
export default Product;