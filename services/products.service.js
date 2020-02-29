module.exports = {
  // имя сервиса
  name: "products",

  actions: {
    // определение действия, которое вернёт список доступных товаров
    listProducts(ctx) {
      //console.log(ctx.options.parentCtx.params.req.query);
      return [
        { name: ctx.params.name, price: ctx.params.price},
        { name: "Apples", price: 5 },
        { name: "Oranges", price: 3 },
        { name: "Bananas", price: 2 }
      ];
    }
  }
};