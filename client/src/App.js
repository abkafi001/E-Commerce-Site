import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Products, Navbar, Cart, Checkout, Login, Signup, Profile } from './components';

// var Cart={
//     items:[],
//     subtotal:0,
// }
// function addCart(Cart,item){
//     Cart.items.push(item);
//     Cart.subtotal+=item.price;
//     return Cart;
// }

// items:[
//     { id:1, name:'Wireless Mouse',img:"", brand:"Logitech", supplier:'Startech', description:'it is wireless mouse.', price:'$8'},
//     { id:2, name:'Keyboard',img:"", brand:"Logitech",supplier:'Startech', description:'it is wireless keyboard.', price:'$15'},
//     { id:3, name:'Monitor',img:"", brand:"HP", supplier:'Startech', description:'it is flat and rotatable.', price:'$50'},
//     { id:4, name:'Wireless Mouse',img:"", brand:"Logitech", supplier:'SylhetShop', description:'it is wireless mouse.', price:'$10'}
// ]

 const App = () => {
     return(
         <Router>
            <div>
                
                <Switch>
                    <Route exact path='/'>
                        <Navbar/>
                        <Products/>
                    </Route>
                    <Route exact path='/cart'>
                        <Navbar/>
                        <Cart/> 
                    </Route>
                    <Route exact path='/checkOut'>
                        <Navbar/>
                        <Checkout/> 
                    </Route>
                    <Route exact path='/logIn'>
                        <Login/> 
                    </Route>
                    <Route exact path='/signUp'>
                        <Signup/> 
                    </Route>
                    <Route exact path='/profile'>
                        <Navbar/>
                        <Profile/>
                    </Route>
                </Switch> 
            </div>
         </Router>
        
     )
 }
 export default App;