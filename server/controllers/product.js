const DB = require('../utils/db.js');

module.exports = {
  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM product;")
  },
  detail: async ctx => {
    productID = + ctx.params.id

    if(!isNaN(productID)) {
    ctx.state.data = (await DB.query("SELECT * FROM product where product.id = ?",[productID]))[0]
    }else{
      ctx.state.data = {}
    }
  }
}