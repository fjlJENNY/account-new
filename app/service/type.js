'use strict'

const Service = require('egg').Service;

class TypeService extends Service{
   async typeList(){
        const { ctx ,app } = this;
        const sql = `select * from type`;
        try{
            const result = await app.mysql.query(sql)
            return result;
        }catch(e){
            return e;
        }
    }

    // 2 是支出， 1是收入
    async  addType({name,type = 2 , userId = 0}){
        const { ctx , app } = this;
        try{
            const result = await app.mysql.insert('type',{ name , type , user_id: userId})
            return result;
        }catch(e){
             throw e;
        }
    }

    // 通过名称查询
    async findTypeByName({name}){
       const { ctx , app } = this;
       try{
           const sql = `select name from type where name = "${name}" limit 0,1`
           const result = await app.mysql.query(sql)

           return {
               exist : result.length ? true : false
           };
       }catch(e){
            throw e
       }
    }

    async findTypeById({id}){
        const { ctx , app } = this;
        try{
            const sql = `select * from type where id = "${id}"`
            const result = await app.mysql.query(sql)
            return {
                exist : result.length ? true : false
            };
        }catch(e){
            throw e
        }
    }

    async findTypeByIdAndName({id, name }){
        const { ctx , app } = this;
        try{
            const sql = `select * from type where id = "${id}"  and name = "${name}"`
            const result = await app.mysql.query(sql)
            return {
                exist : result.length ? true : false
            };
        }catch(e){
            throw e
        }
    }

    async editType({
                id,
                name, // 标签名称
                type = 2, // 标签类型
                 userId = 0
             }){
        const {ctx , app} = this;
        // const sql = `Update type SET `
        try{
            const result = await app.mysql.update('type',{
                name,type
            },{
                where: {id , user_id: userId} // TODO 如果是管理员修改 , userId 如何存在
            })
            return result;
        }catch(e){
            return e;
        }
    }

   async delType(id){
       const {ctx , app} = this;
       try{
           const result =   await app.mysql.delete('type',{id})
           return result
       }catch(e){
           throw e;
       }
    }
}

module.exports = TypeService;
