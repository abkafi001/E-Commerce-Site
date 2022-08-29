import React, {useEffect} from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import useStyles from './styles';

const CartItem=({item})=>{
    const classes = useStyles();

    useEffect(() => {console.log({item})});

    return ( item && 

        <Card className={classes.root}>
          
          <CardMedia 
            image={item.img} 
            alt={item.name} 
            className={classes.media} 
          />

          <CardContent className={classes.cardContent}>

            <Typography variant="h4">
              {item.name}
            </Typography>

            <Typography variant="h5">
              {item.total}
            </Typography>

          </CardContent>

          <CardActions className={classes.cardActions}>
            <div className={classes.buttons}>
              <Button type="button" size="small" >-</Button>
              <Typography>{item.unit}</Typography>
              <Button type="button" size="small" >+</Button>
            </div>
            <Button variant="contained" type="button" color="secondary" >Remove</Button>
          </CardActions>
        </Card>
      
    );
};
export default CartItem;