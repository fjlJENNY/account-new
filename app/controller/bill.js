'use strict'

const Controller = require('egg').Controller;


class BillController extends Controller{
    async addBill(){
        const { ctx , app } = this;
        const {
            payType,
            amount,
            typeId,
            typeName,
            remark,
            userId,
        } = ctx.request.body;
        try{
            const uniqueResult = await ctx.service.type.findTypeByIdAndName({id:typeId,name:typeName});

            if(!uniqueResult.exist){
                ctx.body = {
                    code : 200,
                    msg: '请求成功',
                    data: {
                        msg:`不存在相关的 typeName 和 typeId`
                    },
                }
                return ;
            }

            const result = await ctx.service.bill.addBill({
                payType,
                amount,
                typeId,
                typeName,
                remark,
                userId,
            });
            console.log(result)
            ctx.body = {
                code : 200,
                msg: '添加成功',
                data: null,
            }
        }catch(e){
            ctx.body = {
                code : 500,
                msg: '添加失败',
                data: e,
            }
        }
    }

    async editBill(){
        const { ctx , app } = this;
        const { id ,
            payType,
            amount,
            typeId,
            typeName,
            remark, } = ctx.request.body;
        try{
            const result = await ctx.service.bill.editBill({id,
                payType,
                amount,
                typeId,
                typeName,
                remark,});
            console.log(result)

            if(result.affectedRows === 1){
                ctx.body = {
                    code : 200,
                    msg: '修改成功',
                    data: null,
                }
            }else{
                ctx.body = {
                    code : 200,
                    msg: '请求成功',
                    data: {
                        msg: `不存在id:${id}`
                    },
                }
            }

        }catch(e){
            ctx.body = {
                code : 500,
                msg: '修改失败',
                data: null,
            }
        }
    }

    async billList(){
        const { ctx, app } = this;

        try{
            const result = await ctx.service.bill.billList();
            console.log('请求成功 :: ',result)
            ctx.body = {
                code : 200,
                msg: '成功',
                data: result,
            }
        }catch(e){
            ctx.body = {
                code : 500,
                msg: '失败',
                data: null,
            }
        }
    }

    async delBill(){
        const {ctx , app } = this;
        const { id } = ctx.request.query;
        try{

            const uniqueResult = await ctx.service.bill.findBillById({id});

            if(!uniqueResult.exist){
                ctx.body = {
                    code : 200,
                    msg: '请求成功',
                    data: {
                        msg:`不存在id:${id}`
                    },
                }
                return ;
            }


            const result = await ctx.service.bill.delBill({id});
            console.log('删除成功 :: ',result)
            ctx.body = {
                code : 200,
                msg: '删除成功',
                data: null,
            }
        }catch(e){
            ctx.body = {
                code : 500,
                msg: '删除失败',
                data: null,
            }
        }
    }
}

module.exports = BillController
