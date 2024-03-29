import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import Navbar from '../../navbar/navber';
import useStyles from './styles';

const steps = ['Shipping address', 'Payment details'];

const Checkout = () => {
const [activeStep, setActiveStep] = useState(0);
const classes = useStyles();
const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

const next = () => {
  nextStep();
  console.log('final '+activeStep)
};

const back = () => {
  backStep();
  console.log('final '+activeStep)
};

const Confirmation = () => (
    <div>
        Confermation
    </div>
)

const Form = () => (activeStep === 0
  ? <AddressForm  next={next} />
  : <PaymentForm  back={back} />);

return (
  <>
    <Navbar />
    <CssBaseline />
    <div className={classes.toolbar} />
    <main className={classes.layout}>
      <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
              <Step key={label}>
                  <StepLabel>{label}</StepLabel>
              </Step>
              ))}
          </Stepper>
          {console.log('step length '+steps.length)}
          {console.log('initial log '+activeStep)}
          { activeStep == steps.length ? <Confirmation /> : <Form />}
      </Paper>
    </main>
  </>
  );
};

export default Checkout;