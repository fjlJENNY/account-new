// controller/user.js
'use strict';

const Controller = require('egg').Controller;

const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png';

class UserController extends Controller{

  // 查找用户列表
  async userList(){
    const {ctx} = this;
    try{
      const result = await ctx.service.user.userList();
      ctx.body = {
        code : 200,
        data : result,
        msg: "success"
      }
    }catch(e){
      ctx.body = {
        code: 500,
        msg:"获取列表错误",
        data:null
      }
    }
  }


  // 更新
  async updateUser(){
    const {ctx} = this;
    const {id, signature , avatar} = ctx.request.body;
    try{
      const result = await ctx.service.user.updateUser({id,signature,avatar});
      ctx.body = {
        code : 200,
        msg:'更新成功',
        data:null,
      }
    }catch (e) {
      ctx.body = {
        code:500,
        msg: "更新失败",
        data: null,
      }
    }
  }

  // 删除
  // @param id
  async deleteUser(){
    const {ctx} = this;
    const {id} = ctx.request.query;
    try{
      const result = await ctx.service.user.deleteUser(id);
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
  /*登录
  * */
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
      id: userInfo.id,
      username:userInfo.username,
      exp: Math.floor(Date.now() / 1000 + 24 * 60 * 60),
    }, app.config.jwt.secret);

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
      let token = ctx.request.header.authorization;
      console.log(token);
      if(token){
        token = token.slice('Bearer '.length)
      }
      const decode = app.jwt.verify(token,app.config.jwt.secret);
      console.log(decode)
      ctx.body = {
        code : 200,
        msg: "获取成功",
        data:{
          ...decode
        }
      }
    }catch (e) {
      console.error(e);
      ctx.body = {
        code : 500,
        msg: "获取失败，token有问题",
        data: e,
      }
    }

  }


  // 注册
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
