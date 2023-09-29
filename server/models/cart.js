const Product = require('../models/product');



const carts = [
  
]



module.exports = class Cart {

    constructor(id, userId, productId, quantity, status) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.status = status
    }

    static getByUserId(userId) {
    
        return carts.filter(cart => cart.userId == userId && cart.status == 1);
    }


    save() {
        const product = Product.getProductById(this.productId);
        if(product.stock === 0){
      
        }else{
            const index = carts.findIndex(cart => cart.userId == this.userId && cart.productId == this.productId && cart.status == 1);

        if (index > 0 && product.stock == carts[index].quantity) {

        } else {
            if (index < 0) {
                this.id = 10;
                this.quantity = 1;
                this.status = 1;
                carts.push(this);
            } else {
                carts[index].quantity++;

            }
            return this;
        }
    }
        
    }

    delete() {
        const index = carts.findIndex(cart => cart.userId == this.userId && cart.productId == this.productId && cart.status == 1);
        if (carts[index].quantity > 1) { carts[index].quantity--; }
        else if (carts[index].quantity == 1) {
            carts.splice(index, 1);
        } else {
            throw new Error(`Couldn't find the product`);
        }
    }
    static placeOrder(userId) {
        let userCarts = carts.filter(c => c.userId == userId && c.status == 1);

        let soledIds = userCarts.map(crt => parseInt(crt.productId));
        let soledquantities = userCarts.map(crt => crt.quantity);

        const SoledProducts = Product.getAll().filter(product => {
            return soledIds.includes(product.id);
        });

        for (let i = 0; i < SoledProducts.length; i++) {
            SoledProducts[i].stock -= soledquantities[i];
            if(SoledProducts[i].stock < 0)
                SoledProducts[i].stock = 0;

        }


        for (let i = 0; i < userCarts.length; i++) {
            userCarts[i].status = 0;
        }


    }

    addToCart() { }
    removeFromCart() { }
    checkout(userId) { }

}