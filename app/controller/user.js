// controller/user.js
'use strict';

const Controller = require('egg').Controller;

const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png';

class UserController extends Controller{
  async getUserByName(){
    const {ctx} = this;
    const {name} = ctx.request.query;
    const userInfo = await  ctx.service.user.getUserByName(name);
    if(userInfo && userInfo.id){
      ctx.body = {
        code:200,
        data: {...userInfo},
        msg:'成功',
      }
    }else {
      ctx.body = {
        code:500,
        msg:"获取失败",
        data:null,
      }
    }
  }

  // post
  // {username , password}
  async login(){
    const {ctx,app} = this;
    const {username,password} = ctx.request.body;
    const userInfo = await ctx.service.user.getUserByName(username);
    if(!userInfo || !userInfo.id){
      ctx.body = {
        code : 500,
        msg: "账号不存在",
        data:null,
      };
      return null;
    }

    if(userInfo && userInfo.password != password){
      ctx.body = {
        code : 500,
        msg: "账号密码错误",
        data:null,
      };
      return  null;
    }


    const token = app.jwt.sign({
      id:userInfo.id,
      username:userInfo.username,
      exp: Math.floor(Date.now() / 1000 + 24 * 60 * 60),
    },app.config.jwt.secret);

    ctx.body = {
      code:200,
      msg:"登录成功",
      data:{
        token:token,
      }
    }
  }

  // post
  // json{token}
  async test(){
    const {ctx , app} = this;
    try{
    const token = ctx.request.header.authorization;
      const decode = app.jwt.verify(token,app.config.jwt.secret);
      ctx.body = {
        code : 200,
        msg: "获取成功",
        data:{
          ...decode
        }
      }
    }catch (e) {
      ctx.body = {
        code : 500,
        msg: "获取失败，token有问题",
        data: null,
      }
    }

  }


  async register(){
    const {ctx} = this;
    const {username , password} = ctx.request.body;
    if(!username || !password ){
      ctx.body = {
        code : 500,
        msg:"账号密码不能为空",
        data:null,
      };
      return null;
    }
    const userInfo = await ctx.service.user.getUserByName(username);

    if(userInfo && userInfo.id){
      ctx.body = {
        code : 500,
        msg:"账户名已被注册，请重新输入",
        data:null,
      };
      return null;
    }

    const result = await ctx.service.user.register({
      username:username,
      password:password,
      signature:"ONE PIECE",
      avatar: defaultAvatar,
    });

    if(result){
      ctx.body = {
        code:200,
        msg:"注册成功",
        data:null,
      }
    }else{
      ctx.body = {
        code : 500,
        msg : "注册失败",
        data : null,
      }
    }
  }
}

module.exports = UserController;
