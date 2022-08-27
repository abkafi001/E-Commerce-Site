import React from 'react';
import { Card,CardMedia,CardContent,CardActions,Typography , IconButton  } from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons';

import useStyles from './style'

const Product=({product})=>{
    const classes=useStyles();
    console.log(product.id);
    return(
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.img } title={product.name} />
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
                    Brand : {product.brand}
                </Typography>
                <Typography variant='body2' gutterBottom>
                    description : {product.description}
                </Typography>
                <Typography variant='body2' gutterBottom>
                    Supplier : {product.supplier}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Cart">
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>
        </Card>
    )
}
export default Product;