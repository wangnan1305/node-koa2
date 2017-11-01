const fs = require('fs');
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const controller = require("./controller");
const app = new Koa();
app.use(bodyParser());

app.use(async (ctx,next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
})

app.use(controller())

app.listen(8300);
console.log('app started at port 8300...');
