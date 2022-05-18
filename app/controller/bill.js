'use strict'

const Controller = require('egg').Controller;

const {parseToken} = require("../../utils/index")


// TODO , bill List , 请求列表
// TODO , 文件上传 , 密码修改  https://juejin.cn/book/6966551262766563328/section/6967227990732193799
// TODO , 签名修改

class BillController extends Controller{
    async addBill(){
        const { ctx , app } = this;
        const {
            payType,
            amount,
            typeId,
            typeName,
            remark,
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

            const record = await parseToken(ctx,app);
            console.log('record ::: ',record)
            const userId = record.id;
            console.log('userId ' , userId)

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
            console.log(e)
            ctx.body = {
                code : 500,
                msg: '添加失败',
                data: e,
            }
        }
    }

    // 获取单个Bill
    async detailBill(){
        const { ctx , app } = this;
        const { id } = ctx.request.query
        try{


            const record = await parseToken(ctx,app)
            const userId = record.id;

            const result = await ctx.service.bill.detailBill({id,userId});


            ctx.body = {
                code : 200,
                msg: '请求成功',
                data: result.length ? result[0] : null
            }

        }catch(e){
            ctx.body = {
                code : 500,
                msg: '系统错误',
                data: null,
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
            remark,
        } = ctx.request.body;
        try{

            const record = await parseToken(ctx,app)
            const userId = record.id;


            const result = await ctx.service.bill.editBill({id,
                payType,
                amount,
                typeId,
                typeName,
                remark,
                userId
            });


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
            const record = await parseToken(ctx,app)
            const userId = record.id;

            const result = await ctx.service.bill.billList(userId);

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


            const record = await parseToken(ctx,app)
            const userId = record.id;

            const result = await ctx.service.bill.delBill({id , userId});

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
