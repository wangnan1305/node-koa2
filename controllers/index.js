const fn_index = async (ctx, next) => {
    ctx.response.body = `<h2>Login</h2>
    <form action="/login" method="post">
        <p>Name: <input type="text" name="name" value=""></p>
        <p>Password: <input type="password" name="password"></p>
        <p><input type="submit" value="Sumbit"></p>
    </form>`;
}

const fn_login = async (ctx, next) => {
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    
    if (name === 'wangnan' && password === '123456') {
        ctx.response.body = `<h1>Welocome ${name}</h1>`;
        console.log(`signin success with name: ${name}, password: ${password}`);
    } else {
        ctx.response.body = `
            <h1>Login Failed</h1>
            <p><a href="/">Try Again</a></p>`;
        console.log(`signin failed with name: ${name}, password: ${password}`);
    }
}

module.exports = {
    'get /': fn_index,
    'post /login': fn_login
}