import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const Review = () => {
const products=[
    { id:1, name:'Wireless Mouse', brand:"Logitech", supplier:'Startech' , price: '$8' ,quantity:1},
    { id:2, name:'Keyboard', brand:"Logitech",supplier:'Startech',  price: '$15' ,quantity:1},
    
]
return(
  <>
    <Typography variant="h6" gutterBottom >Order summary</Typography>
    <List disablePadding>
      {products.map((product) => (
        <ListItem style={{ padding: '10px 0' }} key={product.name}>
          <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
          <Typography variant="body2">{product.price}</Typography>
        </ListItem>
      ))}
      <ListItem style={{ padding: '10px 0' }}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
          23$
        </Typography>
      </ListItem>
    </List>
  </>
);
}
export default Review;