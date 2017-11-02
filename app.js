const fs = require('fs');
const Koa = require("koa");
const nunjucks = require('nunjucks');
const bodyParser = require("koa-bodyparser");
const controller = require("./controller");
const template = require("./template");
const app = new Koa();
const isProduction = process.env.NODE_ENV === 'production';

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
})
if(!isProduction){
    let staticFiles = require("./static-files");
    app.use(staticFiles('/static/', __dirname + '/static'));
}
console.log('isProduction='+isProduction+'process.env.NODE_ENV'+process.env.NODE_ENV);

app.use(bodyParser());

app.use(template('views',{
    noCache:!isProduction,
    watch:!isProduction
}));

app.use(controller())

app.listen(8300);
console.log('app started at port 8300...');
