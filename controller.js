const fs = require("fs");

function addController(router , dir){
    let files = fs.readdirSync(__dirname + dir);
    let js_files = files.filter((f) => {
        return f.endsWith(".js");
    });
    for(let f of js_files){
        let mapping = require(__dirname + dir + f);
        addMapping(router,mapping);
    }
}

function addMapping(router,mapping){
    for(let url in mapping){
        if(url.startsWith('get ')){
            let path = url.substring(4);
            router.get(path, mapping[url])
        }else if(url.startsWith('post ')){
            let path = url.substring(5);
            router.post(path,mapping[url])
        }else {
            console.log(`invalid URL: ${url}`)
        }
    }
}

module.exports = function (dir){
    let controller_dir = dir || '/controllers/', router = require("koa-router")();
    addController(router,controller_dir);
    return router.routes()
}
