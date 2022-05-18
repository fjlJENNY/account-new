module.exports = exports = {
    existObj : (obj) => {
        let result = {};
        for(let key in obj){
            if(typeof obj[key] === 'undefined' || obj[key] === null ){
                continue;
            }
            result[key] = obj[key]
        }
        return result;
    }
}
