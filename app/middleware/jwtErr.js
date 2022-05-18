
const whiteRoute = [

    '/api/user/register',
    '/api/user/login',

];

module.exports = exports = (secret) => {
    return async function (ctx, next){
        console.log('ctx ::: ',ctx.url)
        let token = ctx.header.authorization;
        const app = ctx.app;
        if(token && token.indexOf('Bearer') > -1){
            token = token.slice("Bearer ".length)
        }
        console.log(token)
        if(token){
            try{
                const decode = app.jwt.verify(token,secret)
                await next();
            }catch(e){
                console.error("error:: " , e)
                ctx.status = 200;
                ctx.body = {
                    msg:'token已过期，请重新登录',
                    code:401
                }
                return
            }
        }else{
            ctx.status = 200;
            ctx.body = {
                msg:'token不存在',
                code:401
            }

            return
        }


    }
};
