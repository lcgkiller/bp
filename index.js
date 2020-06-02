const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const config = require('./config/key');
const { User } = require("./models/User");

// application/x-www-form-urlencode 데이터를 분석해서 가져올 수 있게끔 함
app.use(bodyParser.urlencoded({extended : true}));
// application/json 타입의 데이터를 분석해서 가져올 수 있게끔 함
app.use(bodyParser.json());



const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(()=>console.log('MongoDB Connected'))
.catch(err=>console.log(err))


app.get('/', (req, res) => res.send('Hello ㅋㅋ 	ㅋㅋ!!!!'))

// 클라에서 post하는 정보들을 가져와 DB에 넣음
app.post('/register', (req, res) => {
    const user = new User
    user.save((err, userInfo)=>{
        if(err) return res.json({success : false, err})
        return res.status(200).json({
            success : true
        })
    })
})



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))