// src/middleware/localStorageMiddleware.js

const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action); // به اکشن بعدی در chain مراجعه می‌کند

    // تأمین وجود cart در state
    const cartState = store.getState().cart;

    // به‌روزرسانی localStorage
    localStorage.setItem('cart', JSON.stringify({ cart: cartState.cart, cartTotal: cartState.cartTotal , totalAfterDiscount:cartState?.totalAfterDiscount ,cartId : cartState?.cartId }));

    return result;
};

export default localStorageMiddleware;