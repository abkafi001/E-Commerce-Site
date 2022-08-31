import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FormInput from './CustomTextField';

import { useAuthContext } from '../../hooks/useAuthContext';

const AddressForm = ({next}) => {
  console.log('Address Form');  
  const methods = useForm();

  const { user, dispatch } = useAuthContext();

  const [firstName ,setFirstName] = useState('');
  const [lastName ,setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ 
      type: "LOGIN", 
      payload: {
        ...user, 
        address: {
          firstName: firstName, 
          lastName: lastName, 
          address: address, 
          email: email,
          city: city, 
          zip: zip}} 
    });

    methods.handleSubmit( () => next() )();
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping address</Typography>
      <FormProvider {...methods} >
        <form onSubmit={handleSubmit}>
            
          <Grid container spacing={3}>
            <FormInput onChange={(e) => setFirstName(e.target.value)}  name="firstName" label="First name" />
            <FormInput onChange={(e) => setLastName(e.target.value)}  name="lastName" label="Last name" />
            <FormInput onChange={(e) => setAddress(e.target.value)}  name="address" label="Address line 1" />
            <FormInput onChange={(e) => setEmail(e.target.value)}  name="email" label="Email" />
            <FormInput onChange={(e) => setCity(e.target.value)}  name="city" label="City" />
            <FormInput onChange={(e) => setZip(e.target.value)}   name="zip" label="Zip / Postal code" />
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
    );
}
export default AddressForm;