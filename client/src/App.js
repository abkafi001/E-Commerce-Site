import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  Products,
  Navbar,
  Cart,
  Checkout,
  Login,
  Signup,
  Profile,
} from "./components";

import { useAuthContext } from "./hooks/useAuthContext";

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
  const { user } = useAuthContext();

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            {user ? <Products /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/cart">
            {user ? <Cart /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/checkout">
            {user ? <Checkout /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login">
            {!user ? <Login /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/signup">
            {!user ? <Signup /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/profile">
            {user ? <Profile /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;
