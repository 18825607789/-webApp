// 引入后台ajax模块
// const ajax = require('superagent')
// 引入假数据文件
const data = require('./mockdata.json')
// const self = data.self
// const friends = data.friend
const cricle = data.cricleMsg
module.exports = {
  devServer: {
    before: function (app) {
      // app.get('/api/self', (req, res) => {
      //     res.json({ data: self })
      // })
      // app.get('/api/friends', (req, res) => {
      //     res.json({ data: friends })
      // })
      app.get('/api/cricle', (req, res) => {
        res.json({ data: cricle })
      })
      // app.get('/api/robot', (req, res) => {
      //   // 当请求http://localhost:8080/api/robot?id=123&msg=hello
      //   // req.query = {id: 123,msg: 'hello'}
      //   let info = req.query.msg
      //   let userid = req.query.id
      //   let key = '92588a6a48fc47d6814a2de7b42d89a6'
      //   // 后台网络请求其他服务器的数据
      //   ajax.post('http://www.tuling123.com/openapi/api')
      //     .send({ info, userid, key })
      //     .end((err, data) => {
      //       if (err) {
      //         console.log(err)
      //       }
      //       res.json({
      //         data: data.text
      //       })
      //     })
      // })
    }
  }
}