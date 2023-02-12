class cartShopping {
  constructor() {
      this.products = [];
  }

  add(item) {
      this.products.push(item);
  }

  remove(item) {
      this.products = this.products.filter((i) => i !== item);
  }

  get total() {
      return this.products.reduce((total, item) => total + item.price, 0);
  }
}

export default cartShopping;