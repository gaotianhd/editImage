var image = new Image();
var image = document.getElementById('img');
var file = document.getElementById('file');
var list = document.getElementById('list');
var isMouseDown = false;
var scale,mr;

window.onload = function(){

  if(!image.src){
    list.style.display = "none";
  }
  file.onchange = function(){
    image.src = window.URL.createObjectURL(file.files[0]);
    WMContent.value = "";
    for(var i = 0; i < waterMarkRadio.length; i++){
      waterMarkRadio[i].checked = false;
    }
    init();
  }
  // canvas.width = 1152;
  // canvas.height = 768;

  // image.src = './img/4.jpeg';
  image.onload = function(){
    list.style.display = "block";
    canvas.width = image.width;
    canvas.height = image.height;
    //初始化
    init();

    //控制放大镜大小
    sizerange.onmousemove = function(){
      mr = sizerange.value;
      size.innerHTML = "当前放大镜大小:" + mr;
    }
    //控制放大镜倍数
    mulRange.onmousemove = function(){

      offCanvas.width = image.width * mulRange.value;
      offCanvas.height = image.height * mulRange.value;
      scale = mulRange.value;
      parameter.innerHTML = "当前放大倍数:" + scale;
      if(isMagnifier){
        offContext.drawImage(image,0,0,offCanvas.width,offCanvas.height);
      }

    }

  }
}

//初始化函数
function init(){
  offCanvas.width = image.width * mulRange.value;
  offCanvas.height = image.height * mulRange.value;

  scale = image.width / canvas.width * mulRange.value;

  mr = sizerange.value;

  parameter.innerHTML = "当前放大倍数:" + scale.toFixed(2);
  size.innerHTML = "当前放大镜大小:" + mr;

  context.drawImage(image,0,0,canvas.width,canvas.height);
  if(isMagnifier){
    offContext.drawImage(image,0,0,offCanvas.width,offCanvas.height);
  }
}

//获得鼠标的当前坐标
function windowCanvas(x,y){
  var bbox = canvas.getBoundingClientRect();
  return {x : x - bbox.left, y : y - bbox.top};
}

//鼠标点击
canvas.onmousedown = function(e){
  e.preventDefault();

  var point = windowCanvas(e.clientX,e.clientY);
  // console.log(point.x,point.y);
  if(isMagnifier){
    isMouseDown = true;
    drawCanvasWithMagnifier(true,point);
  }
}

//鼠标移动
canvas.onmousemove = function(e){
  e.preventDefault();
  if(isMagnifier){
    if(isMouseDown == true){
      var point = windowCanvas(e.clientX,e.clientY);
      // console.log(point.x,point.y);
      drawCanvasWithMagnifier(true,point);
    }
  }
}

//鼠标松开
canvas.onmouseup = function(e){
  e.preventDefault();
  if(isMagnifier){
    isMouseDown = false;
    drawCanvasWithMagnifier(false);
  }
}

//鼠标移出canvas
canvas.onmouseout = function(e){
  e.preventDefault();
  if(isMagnifier){
    isMouseDown = false;
    drawCanvasWithMagnifier(false);
  }
}

//绘制放大镜
function drawCanvasWithMagnifier(isShowMagnifier,point){
  context.clearRect(0,0,canvas.width,canvas.height);
  context.drawImage(image,0,0,canvas.width,canvas.height);
  if( isShowMagnifier == true){
    drawMagnifier(point);
  }
}

function drawMagnifier(point){
  var imageLG_cx = point.x * scale;
  var imageLG_cy = point.y * scale;

  // console.log(imageLG_cx,imageLG_cy);
  // var mr = 200;
  var sx = imageLG_cx - mr;
  var sy = imageLG_cy - mr;

  var dx = point.x - mr;
  var dy = point.y - mr;

  context.save();

  context.lineWidth = 10;
  context.strokeStyle = "#069";

  context.beginPath();
  context.arc(point.x,point.y,mr,0,Math.PI*2);
  context.stroke();

  context.clip();
  context.drawImage(offCanvas,sx,sy,2*mr,2*mr,dx,dy,2*mr,2*mr);
  context.restore();
}
