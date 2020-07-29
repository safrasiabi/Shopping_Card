import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addToCart, filterItems, resetItemSelected, setView } from './actions/cartActions'
class Navbar extends Component {

    searchQuery(event) {

        this.props.setView('home');
        this.props.searchQuery(event.target.value);

    }


    handleGotoCartClick = (event) => {
        this.props.setView('cart');
    }

    handleContinueShoppingClick = (event) => {
        this.props.setView('home');
    }




    render() {
        let totalItemCount = 0;
        this.props.addedItems.forEach(item => {
            totalItemCount += item.quantity
        });
        return (

            <nav className="nav-wrapper">

                <div className="container">


                    <ul className="left">
                        <li className="page-title"><b>Online Shoe Store</b></li>
                        

                    </ul>
                    <ul className="right">
                        <li><Link className='continue-shopping' to="/" onClick={this.handleContinueShoppingClick}>Continue shopping</Link></li>
                        <li> <input className="search-input" type="text" onChange={value => this.searchQuery(value)} placeholder="Search for items" /> </li>
                       
                        <li><Link to="/" onClick={this.handleGotoCartClick}><i className="material-icons">shopping_cart</i></Link></li>
                        {totalItemCount}

                    </ul>
                </div>
            </nav>
        )


    }
}




const mapStateToProps = (state) => {
    return {
        items: state.items,
        addedItems: state.addedItems

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        searchQuery: (val) => dispatch(filterItems(val)),
        setView: (val) => dispatch(setView(val)),


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

