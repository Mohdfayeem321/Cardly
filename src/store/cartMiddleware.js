import { add, remove, increaseQuantity, decreaseQuantity, setQuantity } from './cartSlice';

const cartMiddleware = store => next => action => {
    // Call the next middleware or the reducer
    const result = next(action);

    // Check if the action is related to cart operations
    if (action.type === add.type || action.type === remove.type || action.type === increaseQuantity.type || action.type === decreaseQuantity.type || action.type === setQuantity.type) {
        // Get the current cart state from the Redux store
        const cartState = store.getState().cart;

        // Update the local storage with the cart data
        localStorage.setItem('cart', JSON.stringify(cartState));
    };

    // Check if the cart is empty in Redux but not in local storage
    if (store.getState().cart.length === 0) {
        const localStorageCart = JSON.parse(localStorage.getItem('cart'));
        if (Array.isArray(localStorageCart) && localStorageCart.length > 0) {
            // Dispatch an action to add each cart product from local storage to Redux
            localStorageCart.forEach(product => {
                store.dispatch(add(product));
            });
        }
    }

    return result;
};

export default cartMiddleware;
