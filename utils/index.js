

function existObj(obj){
    let result = {};
    for(let key in obj){
        if(typeof obj[key] === 'undefined' || obj[key] === null ){
            continue;
        }
        result[key] = obj[key]
    }
    return result;
}


function getToken(ctx){
    let token = ctx.header.authorization;
    if(token && token.indexOf('Bearer')> -1){
        token = token.slice('Bearer '.length)
    }
    return token ? token : null;
}



async function parseToken(ctx,app){
    return  app.jwt.verify(getToken(ctx),app.config.jwt.secret)
}

module.exports = exports = {
    existObj,
    getToken,
    parseToken,
}
