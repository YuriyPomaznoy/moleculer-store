module.exports = {
  name: "WithMiddl",
  
  actions: {
    helloMiddleware(ctx) {
      return `Hello Middleware from ${ctx.params.myname}`;
    }
  }
}