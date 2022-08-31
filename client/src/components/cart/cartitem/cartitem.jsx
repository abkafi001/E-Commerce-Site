import React, {useEffect, useState} from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import useStyles from './styles';

import { useAuthContext } from '../../../hooks/useAuthContext';
import { useCartContext } from '../../../hooks/useCartContext';
 
const CartItem=({item})=>{
    const classes = useStyles();

    const { cart, dispatch } = useCartContext();
    const { user } = useAuthContext();
    const [ product, setProduct ] = useState();

    useEffect(() => {
      // console.log("cart item e dhukse")
      // console.log(item)
      const fetchProduct = async () => {
        const response = await fetch(`http://127.0.0.1:3001/api/products/${item.product_id}`, {
          headers: {
            "x-auth-token": user.token,
            "content-Type": "application/json"
          }
        })

        const json = await response.json();

        // console.log('from carItem: '+json.product)

        setProduct(json.product);
      }

      // console.log(user)

      if(user){
        // console.log("fetccccc")
        fetchProduct();
      }
    }, []);

    // useEffect(() => {
    //   console.log("effff")
    //   console.log(product && product.image)
    // }, [product]);

    const handleClick = async (e) => {

      e.preventDefault()

      const value = e.currentTarget.value;

      // console.log("product"+e.currentTarget.value)

      const response = await fetch(`http://127.0.0.1:3001/api/users/${value}-product`, 
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

      dispatch({type: value.toUpperCase(), payload: item.product_id});

    }

    const handleRemove = (e) => {

    }

    return (
      <>
        { product?.image &&
        <Card className={classes.root}>
          
          
          <CardMedia 
            image={`data:${product.image.contentType};\
                    base64, ${Buffer.from(product.image.data).toString('base64')}`}
            alt={item.name} 
            className={classes.media} 
          />

          <CardContent className={classes.cardContent}>

            <Typography variant="h4">
              {product?.name}
            </Typography>

            <Typography variant="h5">
              {(item.unit*item.price).toFixed(2)} $
            </Typography>

          </CardContent>

          <CardActions className={classes.cardActions}>
            <div className={classes.buttons}>

              <Button 
                type="button" 
                size="small" 
                value="remove"
                onClick={handleClick}
              >
                -
              </Button>

              <Typography>{item.unit}</Typography>

              <Button 
                type="button" 
                size="small" 
                value="add"
                onClick={handleClick}
              >
                +
              </Button>

            </div>
            {/* <Button variant="contained" type="button" color="secondary" >Remove</Button> */}
          </CardActions>
        </Card>
        }
      </>
    );
};
export default CartItem;