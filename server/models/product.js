const products = [
  {
    id: 1,
    name: "Apple Iphone",
    price: 100,
    image: "<img src='./images/iphone.jpg' width=70/>",
    stock: 10,
  },
  {
    id: 2,
    name: "Samsung",
    price: 120,
    image: "<img src='./images/samsung.jpg' width=40 height=40",
    stock: 6,
  },
  {
    id: 3,
    name: "Oppo",
    price: 180,
    image: "<img src='./images/oppo.jpg' width=40 height=40",
    stock: 4,
  },
  {
    id: 4,
    name: "Nokia",
    price: 180,
    image: "<img src='./images/Nokia.jpg' width=40 height=40",
    stock: 4,
  }
];

module.exports = class Product {
  constructor(id, name, price, image, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.stock = stock;
  }

  static getAll() {
    return products;
  }

  //get single product
  static getProductById(id) {
    const result = products.find((prod) => prod.id === parseInt(id));
    if (result) {
      return result;
    } else {
      throw new Error(`Couldn't find product with id: ${id}`);
    }
  }

  update() {
    const index = products.findIndex((prod) => prod.id == this.id);
    if (index > -1) {
      //new Product(req.params.id, req.body.title, req.body.price, req.body.description).update();
      // products[index] = this;
      const prod = products[index];
      if (this.name) {
        prod.name = this.name;
      }
      if (this.price) {
        prod.price = this.price;
      }
      if (this.image) {
        prod.image = this.image;
      }
      if (this.stock) {
        prod.stock = this.stock;
      }
    } else {
      throw new Error(`Couldn't find product with id: ${id}`);
    }
  }
};
