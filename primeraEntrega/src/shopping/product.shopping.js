class productShopping {
  constructor(title, description, price, thumbnail, code, stock, category) {
    productShopping.validate(title, description, price, code, stock, category);
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail || '';
      this.code = code;
      this.stock = stock;
      this.category = category;
      this.status = true;
  }

  getProduct() {
      return this;
  }

  static validate(title, description, price, code, stock, category) {
      console.log({ title, description, price, code, stock, category });
      if (typeof title !== 'string' || title.trim().length === 0) {
          throw new Error('Titulo invalido');
      }
      if (typeof description !== 'string' || description.trim().length === 0) {
          throw new Error('Descripción invalida');
      }
      if (typeof price !== 'number' || price <= 0) {
          throw new Error('Precio no es un número');
      }
      if (typeof stock !== 'number' || stock <= 0) {
          throw new Error('Ingresa un número');
      }
      if (typeof code !== 'string' || code <= 0) {
          throw new Error('Código de producto invalido');
      }
      if (typeof category !== 'string' || category.trim().length === 0) {
          throw new Error('Categoría invalida');
      }
  }
}

export default productShopping;