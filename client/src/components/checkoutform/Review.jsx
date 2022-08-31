import React,{ useState, useEffect} from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

import { useCartContext } from '../../hooks/useCartContext';
import { useProductsContext } from '../../hooks/useProductsContext';

const Review = () => {
// const products=[
//     { id:1, name:'Wireless Mouse', brand:"Logitech", supplier:'Startech' , price: '$8' ,quantity:1},
//     { id:2, name:'Keyboard', brand:"Logitech",supplier:'Startech',  price: '$15' ,quantity:1},
    
// ]

  const { cart } = useCartContext();
  const { products } = useProductsContext();

  const [ newCart, setNewCart ] = useState([]);


  useEffect(() => {

    let arr = [];

    for(const item of cart){
      console.log({item})

      console.log({products})
      const product = products.find(product => product._id === item.product_id);
      console.log('d')
      console.log({product})
      if(product){
        arr.push({...item, name: product.name});
      }
    }

    setNewCart(arr);
  }, []);


  return(
    <>
      <Typography variant="h6" gutterBottom >Order summary</Typography>
      <List disablePadding>
        {newCart.map((product) => (
          <ListItem style={{ padding: '10px 0' }} key={product.product_id}>
            <ListItemText primary={product.name} secondary={`Quantity: ${product.unit}`} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: '10px 0' }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {cart.reduce((subtotal, item) =>  subtotal = subtotal + (Number(item.unit)*Number(item.price)), 0 ).toFixed(2)} $
          </Typography>
        </ListItem>
      </List>
    </>
  );
}
export default Review;