export const state = () => ({
    cart: [],
    cartLength: 0
});

export const actions = {
    addProductToCart({ state, commit}, product) {
        // check if the product existing in cart or not
        const cartProduct = state.cart.find(prod => prod._id === product._id);

        // if not
        if(!cartProduct) {
            // add to cart
            commit("pushProductToCart", product);
        } else {
            // yes then update quanitty
            commit("incrementProductQty", cartProduct)
        }

        // increase cart array length
        commit("incrementCartLength")
    }
}


export const mutations = {
    pushProductToCart(state, product) {
        product.quantity  = 1;
        state.cart.push(product);
    },
    incrementProductQty(state, product) {
        product.quantity++; // increase quanity

        // cancel duplicate products
        let indexOfProduct = state.cart.indexOf(product);
        state.cart.splice(indexOfProduct, 1, product);
    },
    incrementCartLength(state, product) {
        state.cartLength = 0;
        if (state.cart.length > 0) {
            state.cart.map(product => {
                state.cartLength += product.quantity;
            });
        };
    },
    /**
     * 1. Find the product in the cart
     * 2. Change the quantity of the product
     * 3. Update the length of the cart
     * 4. Reaplce the old product with the updated product
     */
    changeQty(state, { product, qty }) {
        let cartProduct = state.cart.find(prod => prod._id === product._id); 
        cartProduct.quantity = qty;

        // will fix
        state.cartLength = 0;
        if (state.cart.length > 0) {
            state.cart.map(product => {
                state.cartLength += product.quantity;
            });
        };

        let indexOfProduct = state.cart.indexOf(cartProduct);
        state.cart.splice(indexOfProduct, 1, cartProduct);
    },
    /**
     * 1. Remove the product quantity from the cart length
     * 2. Get the index of the product that we want to delete
     * 3. Remove that product by using splice
     */
    removeProduct(state, product) {
        state.cartLength -= product.quantity;
        let indexOfProduct = state.cart.indexOf(product);
        state.cart.splice(indexOfProduct, 1);
    }
}

export const getters = {
    getCartLength(state) {
        return state.cartLength;
    },
    getCart(state) {
        console.log(state.cart);
        return state.cart;
    },
    getCartTotalPrice(state) {
        let total = 0;
        state.cart.map(product => {
            total += product.price * product.quantity
        });
        return total;
    }
}