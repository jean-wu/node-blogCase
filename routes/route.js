var express = require('express')
var router = express.Router()
var User = require('../models/user.js')
var md5 = require('blueimp-md5')
router.get('/', function (req, res) {
    res.render('index.html',{
        user:req.session.user
    })
})
router.get('/login', function (req, res) {
    res.render('login.html')
})
router.post('/login', function (req, res) {
   var body=req.body
   User.findOne({
       email:body.email,
       password:md5(md5(body.password))
   },function(err,user){
    if(err){
        res.status(500).json({
            err_code:500,
            message:err.message
        })
    }
    if(!user){
        return res.status(200).json({
            err_code:1,
            message:"密码或邮箱错误"
        })
    }
    req.session.user=user
    res.status(200).json({
        err_code:0,
        message:"ok"
    })
   })
})
router.get('/register', function (req, res) {
    res.render('register.html')
})
router.post('/register', function (req, res) {
    var body = req.body
    User.findOne({
        //条件或查询
        $or: [
            { email: body.email },
            { nickname: body.nickname }
        ]
    },
        function (err, data) {
            if (err) {
                return res.status(500).json({ err_code: 500, message: '服务端错误' })
            }
            if (data) {
                //ajax指定的datatype的是json,服务端就要发json
                //express提供了一个方法json(),接受对象作为参数，它会自动
                //将对象转换为字符串再发送给浏览器
                return res.status(200).json({ err_code: 1, message: '邮箱或昵称已存在' })
            }
            //对密码2次进行加密
            body.password = md5(md5(body.password))
            new User(body).save(function (err, user) {
                if (err) {
                    return res.status(500).json({ 
                        err_code: 500, message: '服务端错误' 
                    })
                }
                //创建session，保存用户数据
                req.session.user=user
                res.status(200).json({
                    err_code: 0,
                    message: 'ok'
                })
            })
        })
})

router.get('/logout', function (req, res) {
    req.session.user=null
    res.redirect('/')
})
module.exports = router