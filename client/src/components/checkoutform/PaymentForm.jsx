import React from 'react';
import {Link} from 'react-router-dom';
import { Typography, Button, Divider,TextField, InputAdornment} from '@material-ui/core';

import Review from './Review';

const PaymentForm = ({back}) => {

  return (
    <>
      <Review  />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
      <TextField type='password' label="Secrect key of Bank" margin='normal' InputProps={{startAdornment:<InputAdornment position='start'></InputAdornment>}}/>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button  variant="outlined" onClick={back}>Back</Button>
        <Button component={Link} to='/' variant="contained"  color="primary">
          Pay 23$
        </Button>
      </div>
    </>
  );
};

export default PaymentForm;