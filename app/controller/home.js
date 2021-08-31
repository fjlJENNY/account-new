'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const {id} = ctx.query;
    ctx.body = id;
  }


  async user(){
    const {ctx} = this;
    const {id} = ctx.params;
    ctx.body = id;
  }


  // app/controller/home.js
  // post 请求
  async add(){
    const {ctx} = this;
    const {title} = ctx.request.body;

    console.log(title);

    ctx.body = {title};
  }
}

module.exports = HomeController;
