const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

// url: 类似 '/static/'
// dir: 类似 __dirname + '/static'
function staticFiles(url,dir){
    return async (ctx,next) => {
        let filePath = ctx.request.path;
        if(filePath.startsWith(url)){
            let fp = dir + filePath.substring(url.length);
            if(await fs.exists(fp)){
                // ctx.response.type = mime.getType(fp)
                ctx.response.type = mime.getType(filePath);
                ctx.response.body = await fs.readFile(fp);
            }else{
                ctx.response.status = 404;
            }
        }else{
            await next()
        }
    }
}