import React from 'react';
import {Link} from 'react-router-dom';
import { Typography, Button, Divider,TextField, InputAdornment} from '@material-ui/core';

import Review from './Review';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useCartContext } from '../../hooks/useCartContext';

const PaymentForm = ({back}) => {

  const { user } = useAuthContext();
  const { cart } = useCartContext();

  const handleClick = (e) => {

    e.preventDefault();

    const buy = async () => {

      const login_response = await fetch("http://127.0.0.1:4001/login", {
        method: 'POST',
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify({
          id: user.bank_cred.account_no,
          password: user.bank_cred.secret
        })
      })

      const { token } = await login_response.json();

      console.log({token})

      const subtotal = cart.reduce((total, item) => total += (item.unit*item.price), 0);

      console.log(subtotal);

      const pay_response = await fetch("http://127.0.0.1:4001/transfer", {
        method: "POST",
        headers: {
          "x-auth-token": token,
          "content-Type": "application/json"
        },
        body: JSON.stringify({
          id: "630ec7335183e4a603050c50",
          ammount: subtotal
        })
      })

      const { txId } = await pay_response.json();

      const response = await fetch("http://127.0.0.1:3001/api/orders/buy", {
        method: "POST",
        headers: {
          "x-auth-token": user.token,
          "content-Type": "application/json"
        },
        body: JSON.stringify({
          txId: txId,
          products: cart
        })
      })

      const json = await response.json();

      console.log({json})

      if(user){
        buy();
      }
    }
  };

  return (
    <>
      <Review  />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
      <TextField type='password' label="Secrect key of Bank" margin='normal' InputProps={{startAdornment:<InputAdornment position='start'></InputAdornment>}}/>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button  variant="outlined" onClick={back}>Back</Button>
        <Button onChange={handleClick} component={Link} to='/' variant="contained"  color="primary">
          Pay
        </Button>
      </div>
    </>
  );
};

export default PaymentForm;