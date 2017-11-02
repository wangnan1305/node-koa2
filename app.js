const fs = require('fs');
const Koa = require("koa");
const nunjucks = require('nunjucks');
const bodyParser = require("koa-bodyparser");
const controller = require("./controller");
const app = new Koa();
app.use(bodyParser());

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
})

function createEnv(path, opts) {
    let autoescape = opts.autoescape || true,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false;
    let env = new nunjucks.Environment(
        new nunjucks.FileSystemLoader('views', {
            noCache: noCache,
            watch: watch
        }), {
            autoescape: autoescape,
            throwOnUndefined: throwOnUndefined
        }
    );
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv('views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
})

let s = env.render('index.html', { name: '<script>alert("小明")</script>' });

console.log(s)
app.use(controller())

app.listen(8300);
console.log('app started at port 8300...');
