// awesome.middleware.js
module.exports = {
    name: "Awesome",

    localAction(next, action) {
        return function(ctx) {
            console.log(`My middleware is called before the ${ctx.action.name} action executed.`);
            return next(ctx);
        }
    }
};