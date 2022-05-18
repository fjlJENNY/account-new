'use strict'

const Service = require('egg').Service;
const dayjs = require('dayjs')

// 账单 service
class BillService extends Service{

    async billList(userId){
        const { ctx ,app } = this;
        let sql ;
        if(userId){
            sql = `select * from bill where user_id = ${userId}`;
        }else{
            sql = `select * from bill`;
        }
        try{
            const result = await app.mysql.query(sql)
            return result;
        }catch(e){
            return e;
        }
    }

    // 2 是支出， 1是收入
    async  addBill({amount , typeId , typeName , remark = '', payType = 2 , userId = 0}){
        const { ctx , app } = this;
        try{
            const date = dayjs().format("YYYY-MM-DD HH:mm:ss")
            const result = await app.mysql.insert('bill',{ pay_type : payType , amount , user_id: userId , date , type_id : typeId , type_name : typeName, remark })
            return result;
        }catch(e){
            throw e;
        }
    }

    // 通过名称查询
    async findBillByName({name}){
        const { ctx , app } = this;
        try{
            const sql = `select name from bill where name = "${name}" limit 0,1`
            const result = await app.mysql.query(sql)

            return {
                exist : result.length ? true : false
            };
        }catch(e){
            throw e
        }
    }

    async findBillById({id}){
        const { ctx , app } = this;
        try{
            const sql = `select * from bill where id = "${id}"`
            const result = await app.mysql.query(sql)
            return {
                exist : result.length ? true : false
            };
        }catch(e){
            throw e
        }
    }

    async editBill({
                       id,
                       payType,
                       amount,
                       typeId,
                       typeName,
                       remark,
                       userId,
                   }){
        const {ctx , app} = this;
        // const sql = `Update bill SET `
        try{
            const date = dayjs().format("YYYY-MM-DD HH:mm:ss")
            const result = await app.mysql.update('bill',{
                pay_type : payType ,
                amount ,
                date ,
                type_id : typeId ,
                type_name : typeName,
                remark
            },{
                where: { id  , user_id : userId } // TODO 如果是管理员修改 , userId 如何存在
            })
            return result;
        }catch(e){
            throw e;
        }
    }

    async delBill({id,userId}){
        const {ctx , app} = this;
        try{
            const result =   await app.mysql.delete('bill',{id , user_id: userId })
            return result
        }catch(e){
            throw e;
        }
    }

    async detailBill({id , userId }){
        const {ctx , app} = this;
        try{
            const sql = `select * from bill where id = ${id} and user_id = ${userId}`
            const result =   await app.mysql.query(sql)
            return result
        }catch(e){
            throw e;
        }
    }
}

module.exports = BillService;
