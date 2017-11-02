const fn_login = async (ctx, next) => {
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    
    if (name === 'wangnan' && password === '123456') {
        ctx.render('login-ok.html',{
            title:'login success',
            name:name
        })
    } else {
        ctx.render('login-fail.html',{
            title:'login failed'
        })
    }
}

module.exports = {
    'post /login': fn_login
}