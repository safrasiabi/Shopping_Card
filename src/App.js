import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Cart from './components/Cart'
import ItemDetail from './components/ItemDetail'

class App extends Component {
  render() {
    return (
       <BrowserRouter>
            <div className="App">
            
              
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/itemDetail" component={ItemDetail}/>
                  </Switch>
             </div>
       </BrowserRouter>
      
    );
  }
}

export default App;
