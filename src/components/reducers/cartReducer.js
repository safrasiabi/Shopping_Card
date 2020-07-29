import Item1 from '../../images/item1.jpg'
import Item2 from '../../images/item2.jpg'
import Item3 from '../../images/item3.jpg'
import Item4 from '../../images/item4.jpg'
import Item5 from '../../images/item5.jpg'
import Item6 from '../../images/item6.jpg'
import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_SHIPPING, FILTER_ITEMS, ITEM_SELECTED, RESET_ITEM_SELECTED, SET_VIEW } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        { id: 1, title: 'Winter body', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima", price: 110, img: Item1 },
        { id: 2, title: 'Adidas', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima", price: 80, img: Item2 },
        { id: 3, title: 'Vans', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima", price: 120, img: Item3 },
        { id: 4, title: 'White', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima", price: 260, img: Item4 },
        { id: 5, title: 'Cropped-sho', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima", price: 160, img: Item5 },
        { id: 6, title: 'Blues', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima", price: 90, img: Item6 }
    ],
    addedItems: [],
    total: 0,
    selectedId: null,
    isItemSelected: false,
    selectedItemQuantity: 0


}
export default function cartReducer(state = initState, action) {

    //INSIDE HOME COMPONENT
    if (action.type === ADD_TO_CART) {
        let addedItem = state.items.find(item => item.id === action.id)
        //check if the action id exists in the addedItems
        let exisingAddedItem = state.addedItems.find(item => item.id === action.id)
        if (exisingAddedItem)
            return {
                ...state,
                total: state.total

            }

        addedItem.quantity = state.selectedItemQuantity;
        addedItem.selectedItemTotal = addedItem.quantity * addedItem.price
        return {
            ...state,
            addedItems: [...state.addedItems, addedItem],
            total: state.total
        }

    }
    if (action.type === REMOVE_ITEM) {
        let itemToRemove = state.addedItems.find(item => action.id === item.id)
        let new_items = state.addedItems.filter(item => action.id !== item.id)

        //calculating the total

        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)
        itemToRemove.quantity = 0;
        return {
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if (action.type === ADD_QUANTITY) {
        let itemToAdd = initState.items.find(item => item.id === action.id);



        //check if the action id exists in the addedItems
        let existinItem = state.addedItems.find(item => action.id === item.id)
        itemToAdd.quantity ? itemToAdd.quantity += 1 : itemToAdd.quantity = 1;

        let newTotal = state.total + itemToAdd.price;
        if (existinItem) existinItem.selectedItemTotal += existinItem.price;

        return {
            ...state,
            total: newTotal,
            selectedItemQuantity: itemToAdd.quantity

        }



    }
    if (action.type === SUB_QUANTITY) {
        let itemToSub = initState.items.find(item => item.id === action.id);
        let existinItemtoSub = state.addedItems.find(item => action.id === item.id)
        if (existinItemtoSub) existinItemtoSub.selectedItemTotal -= existinItemtoSub.price;
        if (!itemToSub.quantity || itemToSub.quantity === 0) {
            return {
                ...state
            }
        }
        if (itemToSub.quantity === 1) {
            itemToSub.quantity -= 1
            //if the qt == 0 then it should be removed
            let new_items_after = state.addedItems.filter(item => action.id !== item.id)
            return {
                ...state,
                total: state.total - itemToSub.price,
                addedItems: new_items_after,
                addedItemQuantity: 0,
                selectedItemQuantity: 0

            }
        }
        else {
            itemToSub.quantity -= 1
            return {
                ...state,
                total: state.total - itemToSub.price,
                selectedItemQuantity: itemToSub.quantity

            }
        }

    }

    if (action.type === ADD_SHIPPING) {
        return {
            ...state,
            total: state.total + 6
        }
    }

    if (action.type === 'SUB_SHIPPING') {
        return {
            ...state,
            total: state.total - 6
        }
    }

    //Filter
    if (action.type === FILTER_ITEMS) {
        let itemsFiltred = getFilterOptions(action.name);
        return {
            ...state,
            items: itemsFiltred
        }
    }

    //select item
    if (action.type === ITEM_SELECTED) {
        state.selectedItemQuantity = 0;
        let item = initState.items.find(item => item.id === action.id);
        return {
            ...state,
            selectedItem: item,
            isItemSelected: true


        }
    }

    if (action.type === RESET_ITEM_SELECTED) {

        return {
            ...state,
            addedItems: [...state.addedItems]

        }
    }

    if (action.type === SET_VIEW) {
        return {
            ...state,
            selectedView: action.viewName

        }
    }

    else {
        return state
    }

}

const getFilterOptions = (filterOption) => {
    let filteredItems = [];

    if (filterOption.length > 0) {
        initState.items.forEach(item => {
            if (item.title && item.title.toLowerCase().includes(filterOption.toLowerCase())) {
                filteredItems.push(item);
            }
        })

    } else {
        filteredItems = initState.items;

    }
    return filteredItems;
};

