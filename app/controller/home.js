'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // const {id} = ctx.query;
    // ctx.body = id;
    await ctx.render('index.html',{
      title:"张三"
    })
  }


  async user(){
    const {ctx} = this;
    const result = await ctx.service.home.user();
    console.log(result);
    ctx.body = result;
  }


  // app/controller/home.js
  // post 请求
  async add(){
    const {ctx} = this;
    const {title} = ctx.request.body;

    console.log(title);

    ctx.body = {title};
  }

  // post 请求
  //
  async addUser(){
    const  {ctx} = this;
    const {name} = ctx.request.body;
    try{
      const result = await ctx.service.home.addUser(name);

        ctx.body = {
          code : 200,
          msg:'添加成功',
          data:null,
        }
    }catch(error){
      ctx.body = {
        code:500,
        msg: "添加失败",
        data: null,
      }
    }
  }

  async updateUser(){
    const {ctx} = this;
    const {id,name} = ctx.request.body;
    try{
      const result = await ctx.service.home.updateUser(id,name);
      ctx.body = {
        code : 200,
        msg:'更新成功',
        data:null,
      }
    }catch (e) {
      ctx.body = {
        code:500,
        msg: "添加失败",
        data: null,
      }
    }
  }

  async deleteUser(){
    const {ctx} = this;
    const {id} = ctx.request.query;
    try{
      const result = await ctx.service.home.deleteUser(id);
      ctx.body = {
        code : 200,
        msg:"删除成功",
        data:null,
      }
    }catch(e){
      ctx.body = {
        code : 500,
        msg:"删除失败",
        data:null,
      }
    }
  }



}

module.exports = HomeController;
