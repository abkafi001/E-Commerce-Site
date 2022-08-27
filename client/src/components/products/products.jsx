import React from 'react';
import {Grid} from '@material-ui/core';
import Product from './product/product';
import makeStyles from './styles';
import p1 from '../../assets/p1.jpeg';
import p4 from '../../assets/p4.jpeg';
import p3 from '../../assets/p3.jpeg';
const products=[
    { id:1, name:'Wireless Mouse',img:p1, brand:"Logitech", supplier:'Startech', description:'it is wireless mouse.', price:'$8' ,},
    { id:2, name:'Keyboard',img:p4, brand:"Logitech",supplier:'Startech', description:'it is wireless keyboard.', price:'$15' ,},
    { id:3, name:'Monitor',img:p3, brand:"HP", supplier:'Startech', description:'it is flat and rotatable.', price:'$50' ,},
    { id:1, name:'Wireless Mouse',img:p1, brand:"Logitech", supplier:'SylhetShop', description:'it is wireless mouse.', price:'$10' ,},
    
]
const Products = () =>{
    const classes=makeStyles();
    return(
        <main className={classes.content}>
            <div className={classes.toolbar} />
                <Grid container justify="center" spacing={4}>
                    {products.map((product)=>(
                            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                                <Product product={product} />
                            </Grid>
                    ))}
                </Grid>
            
        </main>
    )
    
}
export default Products;