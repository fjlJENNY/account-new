'use strict'

const Controller = require('egg').Controller;

class TypeController extends Controller{
    async addType(){
        const { ctx , app } = this;
        const { name , type} = ctx.request.body;
        try{
            const uniqueResult = await ctx.service.type.findTypeByName({name});

            if(uniqueResult.exist){
                ctx.body = {
                    code : 200,
                    msg: '请求成功',
                    data: {
                        msg:`已存在field:${name}`
                    },
                }
                return ;
            }


            const result = await ctx.service.type.addType({name,type});
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

    async editType(){
        const { ctx , app } = this;
        const { id ,name,type } = ctx.request.body;
        try{
            const result = await ctx.service.type.editType({id,name,type});
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

    async typeList(){
        const { ctx, app } = this;

        try{
            const result = await ctx.service.type.typeList();
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

    async delType(){
        const {ctx , app } = this;
        const { id } = ctx.request.query;
        try{

            const uniqueResult = await ctx.service.type.findTypeById({id});

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


            const result = await ctx.service.type.delType({id});
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

module.exports = TypeController
