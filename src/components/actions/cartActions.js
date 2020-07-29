
import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_SHIPPING, FILTER_ITEMS, ITEM_SELECTED, RESET_ITEM_SELECTED, SET_VIEW } from './action-types/cart-actions'

//add cart action
export const addToCart = (id) => {
    return {
        type: ADD_TO_CART,
        id
    }
}
//remove item action
export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM,
        id
    }
}
//subtract qt action
export const subtractQuantity = (id) => {
    return {
        type: SUB_QUANTITY,
        id
    }
}
//add qt action
export const addQuantity = (id) => {
    return {
        type: ADD_QUANTITY,
        id
    }
}

export const filterItems = (name) => {
    return {
        type: FILTER_ITEMS,
        name
    }
}

export const itemSelected = (id) => {
    return {
        type: ITEM_SELECTED,
        id
    }
}

export const resetItemSelected = () => {
    return {
        type: RESET_ITEM_SELECTED

    }
}
    export const setView = (viewName) => {
        return {
            type: SET_VIEW,
            viewName
        }
    }



