var jquery =require('jsdom');
const express = require('express');
const app     = express();
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views','./views');
const server    = require('http').Server(app);
const io        = require('socket.io')(server);
server.listen(process.env.PORT || 3000);//cổng kết nối

// _________________duong dan_________________________________
//  truy cặp vào đường dẫn http://localhost:3000/
app.get('/',function(req,res){
    res.render('index');

    // res.render('user-media');
})
// _____________SOCKET.IO_____________________________________
// Khai báo biến
var usr =[];// Tạo 1 mảng user

io.sockets.on('connection', getconnection);

 function getconnection(socket){
    console.log('client ID:' + socket.id);
    // File xử lý sketch.js 
    socket.on('mouse',mouse);
    function mouse(data){
        console.log(data);
        socket.broadcast.emit('mouse',data);
        // io.sockets.emit('mousse',data);
    };


    // File xử lý sketch-video.js
    socket.emit('myId',usr.length);//gữi chiều dài của mảng ID
    usr.push(usr.length);//Ép vào mảng
    io.emit('user',usr);//gữi mảng id user

    //nhận hinh anh
    socket.on('updateUser',function(data){
        socket.broadcast.emit('updateUser',data);//gui data ve client
    });
}














