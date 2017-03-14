// var image = new Image();

//灰度
function greyEffect(){
  context.drawImage(image,0,0,canvas.width,canvas.height);
  var imageData = context.getImageData(0,0,canvas.width,canvas.height);
  var pixelData = imageData.data;
  for(var i = 0; i < canvas.width * canvas.height; i++){
    var r = pixelData[4*i+0];
    var g = pixelData[4*i+1];
    var b = pixelData[4*i+2];

    var grey = r*0.3+g*0.59+b*0.11;

    pixelData[4*i+0] = grey;
    pixelData[4*i+0] = grey;
    pixelData[4*i+0] = grey;
    // pixelData[4*i+3] = 0;
  }
  context.putImageData(imageData,0,0,0,0,canvas.width,canvas.height);
  curentpixel.innerHTML = "1";
  // watermark();
}
//复古
function retroEffect(){
  context.drawImage(image,0,0,canvas.width,canvas.height);
  var imageData = context.getImageData(0,0,canvas.width,canvas.height);
  var pixelData = imageData.data;
  for(var i = 0; i < canvas.width * canvas.height; i++){
    var r = pixelData[4*i+0];
    var g = pixelData[4*i+1];
    var b = pixelData[4*i+2];

    var grey = r*0.393+g*0.769+b*0.189;

    pixelData[4*i+0] = grey;
    pixelData[4*i+0] = grey;
    pixelData[4*i+0] = grey;
    // pixelData[4*i+3] = 0;
  }
  context.putImageData(imageData,0,0,0,0,canvas.width,canvas.height);
  curentpixel.innerHTML = "2";
  // watermark();
}
//黑白
function blackAndWhiteEffect(){
  context.drawImage(image,0,0,canvas.width,canvas.height);
  var imageData = context.getImageData(0,0,canvas.width,canvas.height);
  var pixelData = imageData.data;
  for(var i = 0; i < canvas.width * canvas.height; i++){
    var r = pixelData[4*i+0];
    var g = pixelData[4*i+1];
    var b = pixelData[4*i+2];

    var grey = r*0.3+g*0.59+b*0.11;
    if(grey > 255 / 2){
      v = 255;
    }else{
      v = 0;
    }

    pixelData[4*i+0] = v;
    pixelData[4*i+1] = v;
    pixelData[4*i+2] = v;
    // pixelData[4*i+3] = 0;
  }
  context.putImageData(imageData,0,0,0,0,canvas.width,canvas.height);
  curentpixel.innerHTML = "3";
  // watermark();
}
//反色
function AntiColorEffect(){
  context.drawImage(image,0,0,canvas.width,canvas.height);
  var imageData = context.getImageData(0,0,canvas.width,canvas.height);
  var pixelData = imageData.data;
  for(var i = 0; i < canvas.width * canvas.height; i++){
    var r = pixelData[4*i+0];
    var g = pixelData[4*i+1];
    var b = pixelData[4*i+2];

    pixelData[4*i+0] = 255 - r;
    pixelData[4*i+1] = 255 - g;
    pixelData[4*i+2] = 255 - b;
    // pixelData[4*i+3] = 0;
  }
  context.putImageData(imageData,0,0,0,0,canvas.width,canvas.height);
  curentpixel.innerHTML = "4";
  // watermark();
}
//模糊
function blurEffect(){
  context.drawImage(image,0,0,canvas.width,canvas.height);
  var temImageData = context.getImageData(0,0,canvas.width,canvas.height);
  var temPixelData = temImageData.data;

  var imageData = context.getImageData(0,0,canvas.width,canvas.height);
  var pixelData = imageData.data;

  var blurR = 3;
  var totalnum = (2*blurR + 1)*(2*blurR + 1);
  for(var i = blurR; i < canvas.height - blurR; i++){
    for(var j = blurR; j < canvas.width - blurR; j++){

      var totalr = 0,totalg = 0,totalb = 0;
      for(var dx = -blurR; dx <= blurR; dx++){
        for(var dy = -blurR; dy <= blurR; dy++){
          var x = i + dx;
          var y = j + dy;

          var p = x * canvas.width + y;
          totalr += temPixelData[4*p+0];
          totalg += temPixelData[4*p+1];
          totalb += temPixelData[4*p+2];
        }
      }
      var p = i*canvas.width + j;

      pixelData[p*4+0] = totalr / totalnum;
      pixelData[p*4+1] = totalg / totalnum;
      pixelData[p*4+2] = totalb / totalnum;
    }
  }

  context.putImageData(imageData,0,0,0,0,canvas.width,canvas.height);
  curentpixel.innerHTML = "5";
  // watermark();
}
//马赛克
function mosaicEffect(){
  context.drawImage(image,0,0,canvas.width,canvas.height);
  var temImageData = context.getImageData(0,0,canvas.width,canvas.height);
  var temPixelData = temImageData.data;

  var imageData = context.getImageData(0,0,canvas.width,canvas.height);
  var pixelData = imageData.data;

  var size = 16;
  var totalnum = size*size;
  for(var i = 0; i < canvas.height; i+=size){
    for(var j = 0; j < canvas.width; j+=size){

      var totalr = 0,totalg = 0,totalb = 0;
      for(var dx = 0; dx <= size; dx++){
        for(var dy = 0; dy <= size; dy++){
          var x = i + dx;
          var y = j + dy;

          var p = x * canvas.width + y;
          totalr += temPixelData[4*p+0];
          totalg += temPixelData[4*p+1];
          totalb += temPixelData[4*p+2];
        }
      }
      var p = i*canvas.width + j;

      var resr = totalr / totalnum;
      var resg = totalg / totalnum;
      var resb = totalb / totalnum;

      for(var dx = 0; dx <= size; dx++){
        for(var dy = 0; dy <= size; dy++){
          var x = i + dx;
          var y = j + dy;

          var p = x * canvas.width + y;
          pixelData[4*p+0] = resr;
          pixelData[4*p+1] = resg;
          pixelData[4*p+2] = resb;
        }
      }
    }
  }
  context.putImageData(imageData,0,0,0,0,canvas.width,canvas.height);
  curentpixel.innerHTML = "6";
  // watermark();
}

//还原
function restore(){
  context.drawImage(image,0,0,canvas.width,canvas.height);
  curentpixel.innerHTML = "0";
  // watermark();
}
