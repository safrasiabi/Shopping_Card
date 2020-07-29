import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart, itemSelected,setView } from './actions/cartActions'
import { useHistory } from "react-router-dom";
import ItemDetail from './ItemDetail';
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

class ItemList extends Component {
    
    handleClick = (id) => {
        this.props.addToCart(id);
    }

    handleImageClick = (id) => {
        this.props.itemSelected(id);
        this.props.setView('detail');
    }

    render() {

        let itemList = this.props.items.map(item => {
            return (
                <div className="card" key={item.id}>

                    <div className="card-image pointer">
                        
                        <Link to="/"  onClick={() => { this.handleImageClick(item.id) }}> <img src={item.img} alt={item.title}  /></Link>
                        <span className="card-title">{item.title}</span>
                    </div>
                    <div className="card-content">
                        <p>{item.desc}</p>
                        <p><b>Price: {item.price}$</b></p>
                        <Link to="/"  onClick={() => { this.handleImageClick(item.id) }}>Click For detail</Link>
                    </div>
                </div>

            )
        })

        

        return (
           
            <div className="container">
                
                <h3 className="center">Our items</h3>
                <div className="box">
                    {itemList}
                </div>
            </div>
            
        )
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.items,
    }
}


const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id) => { dispatch(addToCart(id)) },
        itemSelected: (id) => { dispatch(itemSelected(id)) },
        setView: (val) => dispatch(setView(val)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList)