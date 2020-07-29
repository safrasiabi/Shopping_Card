import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart, addQuantity, subtractQuantity, setView } from './actions/cartActions'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

class ItemDetail extends Component {

    handleClick = (id) => {
        this.props.addToCart(id);
        this.props.setView('cart');
    }

    //to add the quantity
    handleAddQuantity = (id) => {
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id) => {
        this.props.subtractQuantity(id);
    }

    render() {

        let selectedItem = this.props.selectedItem;

        return (
            <div>
                <div key={selectedItem.id}>

                    <div className="item-detail-wrapper">
                        <div className="item-detail-card-image">
                            <img src={selectedItem.img} alt={selectedItem.title} />
                            <span className="item-detail-title"><h3>{selectedItem.title}</h3></span>

                        </div>
                        <div className="card-content">
                            <p>{selectedItem.desc}</p>
                            <p><b>Price: {selectedItem.price}$</b></p>
                            <p>
                                <b>Quantity: {this.props.selectedItemQuantity}</b>
                            </p>
                            <div className="add-remove">
                                <Link to=""><i className="material-icons" onClick={() => { this.handleSubtractQuantity(selectedItem.id) }}>arrow_drop_down</i></Link>
                                <Link to=""><i className="material-icons" onClick={() => { this.handleAddQuantity(selectedItem.id) }}>arrow_drop_up</i></Link>
                            </div>
                            {/* <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={() => { this.handleClick(selectedItem.id) }}><i className="material-icons">add</i></span> */}
                            {this.props.selectedItemQuantity > 0 ?
                                <a class='waves-effect waves-light btn-large' onClick={() => { this.handleClick(selectedItem.id) }}>Add To Cart</a>
                                : ''}

                        </div>
                    </div>

                </div>
            </div>

        )


    }
}
const mapStateToProps = (state) => {
    return {
        items: state.items,
        selectedItem: state.selectedItem,
        selectedItemQuantity: state.selectedItemQuantity

    }
}


const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id) => { dispatch(addToCart(id)) },
        addQuantity: (id) => { dispatch(addQuantity(id)) },
        subtractQuantity: (id) => { dispatch(subtractQuantity(id)) },
        setView: (val) => dispatch(setView(val)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail)