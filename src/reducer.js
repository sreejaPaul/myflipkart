export const initialState = {
    basket: [],
    filteredBasket: [],
    saveForLaterBasket:[],
};

// Selector
export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
            };
        case 'FILTER_BASKET':
            return{
                ...state,
                filteredBasket: action.item,
            };
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex((item) => item.id === action.id);
            let newBasket = [...state.basket];
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(`Can't remove product (id : ${action.id} as it is not in the baslet`);
            }
            return {
                ...state,
                basket: newBasket
            };
        case 'REMOVE_FULL_ITEM':
            const filterBasket = state.basket.filter((item)=>item.id !== action.id);
            const filterArr = state.filteredBasket.filter((item)=>item.id !== action.id);
            filterArr.sort((a, b) => {
                return a.id - b.id;
            });
            console.log(filterArr)
            console.log(action.id)
            return{
                ...state,
                basket: filterBasket,
                filteredBasket: filterArr
            };
        case 'SAVE_FOR_LATER':
            const haveToSave = state.filteredBasket.filter((item)=>item.id===action.id);
            const filterBasketForSave = state.basket.filter((item)=>item.id !== action.id);
            const filterArrForSave = state.filteredBasket.filter((item)=>item.id !== action.id);
            filterArrForSave.sort((a, b) => {
                return a.id - b.id;
            });
            return {
                ...state,
                basket: filterBasketForSave,
                filteredBasket: filterArrForSave,
                saveForLaterBasket: [...state.saveForLaterBasket, haveToSave]
            }
        case 'MOVE_BACK_TO_CART':
            const afterRemoveSave = state.saveForLaterBasket.filter((item)=>item[0].id!==action.id);
            const removedItem = state.saveForLaterBasket.filter((item)=>item[0].id===action.id);
            const newFilter = [...state.filteredBasket, ...removedItem[0]];
            newFilter.sort((a, b) => {
                return a.id - b.id;
            });
            const newBasketAfterRemove = [...state.basket,...removedItem[0]];
            console.log("basket")
            console.log(newBasketAfterRemove)
            console.log("filter")
            console.log(newFilter)
            console.log(removedItem[0])
            return{
                ...state,
                basket: newBasketAfterRemove,
                filteredBasket: newFilter,
                saveForLaterBasket: afterRemoveSave
            }
        default:
            return state;
    }
};

export default reducer;