import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart, itemSelected } from './actions/cartActions'
import { useHistory } from "react-router-dom";
import ItemDetail from './ItemDetail';
import ItemList from './ItemList';
import Cart from './Cart';
import Navbar from './Navbar';


class Home extends Component {

    handleClick = (id) => {
        this.props.addToCart(id);
    }

    handleImageClick = (id) => {
        this.props.itemSelected(id);
    }

    render() {
     
       
        let view=null;
            switch(this.props.selectedView) {
                case 'home':
                  view= <ItemList />
                  break;
                case 'detail':
                  view=  <ItemDetail />
                  break;
                  case 'cart':
                  view = <Cart />
                  break;
                default:
                    view= <ItemList />
              }

              return (
           
                <div >
                  
                    <Navbar/> {view}
                   
                </div>
                
            )
         
              

    }
}
const mapStateToProps = (state) => {
    return {
        items: state.items,
        selectedItem: state.selectedItem,
        selectedView: state.selectedView


    }
}


const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id) => { dispatch(addToCart(id)) },
        itemSelected: (id) => { dispatch(itemSelected(id)) }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)