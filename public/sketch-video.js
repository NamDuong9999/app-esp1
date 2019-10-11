var video;
var c;
var id =null;
var socket = io.connect("https://esp-app1.herokuapp.com/")
socket.on('myId',function(myid){
id = myid; 
});

socket.on('user',function(usr){
    $('img').remove();

    $.each(usr,function(index,val){
        // Nếu val khác với ID
        if(val != id){
            $('body').append('<img id='+val+'>');
        }
    });
});

socket.on('updateUser',function(data){
    $('#'+ data.id).attr('src',data.capture);
});

function setup(){
    c =createCanvas(320, 240);
    video = createCapture(VIDEO);
    video.size(320,240);
    video.hide();
}

function draw(){
// Màu hình ảnh
//  tint(255, 0, 100);
//  Hàm thứ 1: Mở 1 video mới từ vị trí 0,0  
 image(video,0,0,320,240);
//hàm thứ 2 : 0,0,chiều rộng video,chiều cao video
// image(video,0,0,mouseX,mouseY);


// vẽ
// if(mouseIsPressed){
//     ports.push({x:mouseX,y:mouseY});
// }

// $.each(points,function(index,p){
//     ellipse(p.x, p.y, 5, 5);
// });

// Gữi dữ liệu hình ảnh đến server
if(frameRate() > 55 && id != null){
    socket.emit('updateUser',{id:id ,capture:c.canvas.toDataURL()});
}
}





