const fn_index = async(ctx,next) => {
    ctx.render('index.html',{
       title:'Welcome' 
    })
}

module.exports = {
    'get /': fn_index,
}