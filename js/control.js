//控制变量
var mulRange = document.getElementById('mulrange');
var sizerange = document.getElementById('sizerange');
var file = document.getElementById('file');
//参数变量
var parameter = document.getElementById('parameter');
var size = document.getElementById('size');

var isWaterMark = false
    ,isMagnifier = false
    ,isPixel = false;

//放大镜控制
var magnbtn = document.getElementById('magnbtn');
var magnifier = document.getElementById('magnifier');

magnbtn.onclick = function(){
  if(isMagnifier == false){
    magnifier.style.height = "150px";
    // magnifier.style.display = 'block';
    magnbtn.innerHTML = "关闭放大镜";
    isMagnifier = true;
    offContext.drawImage(image,0,0,offCanvas.width,offCanvas.height);
  }else{
    magnifier.style.height = "0";
    // magnifier.style.display = 'none';
    magnbtn.innerHTML = "开启放大镜";
    isMagnifier = false;
  }
}

//滤镜控制
var pixelbtn = document.getElementById('pixelbtn');
var pixels = document.getElementById('pixels');

pixelbtn.onclick = function(){
  if(isPixel == false){
    // pixels.style.display = "block";
    pixels.style.height = "200px";
    pixelbtn.innerHTML = "关闭滤镜";
    isPixel = true;
  }else{
    // pixels.style.display = "none";
    pixels.style.height = "0";
    pixelbtn.innerHTML = "开启滤镜";
    isPixel = false;
  }
}

//水印控制
var watermarkbtn = document.getElementById('watermarkbtn');
var watermarkdel = document.getElementById('watermarkdel');
var watermark = document.getElementById('watermark');
var WMContent = document.getElementById('WMContent');

var radioValue,WMContentValue;
WMContent.onchange = function(){
  WMContentValue = WMContent.value;
  console.log(WMContentValue);
}
watermarkdel.onclick = function(){
  if(curentpixel.innerHTML == "1"){
    greyEffect();
  }
  if(curentpixel.innerHTML == "2"){
    retroEffect();
  }
  if(curentpixel.innerHTML == "3"){
    blackAndWhiteEffect();
  }
  if(curentpixel.innerHTML == "4"){
    AntiColorEffect();
  }
  if(curentpixel.innerHTML == "5"){
    blurEffect();
  }
  if(curentpixel.innerHTML == "6"){
    mosaicEffect();
  }
  if(curentpixel.innerHTML == "0"){
    restore();
  }
}
watermarkbtn.onclick = function(){

  var waterMarkRadio = document.getElementsByName('position');
  for(var i = 0; i < waterMarkRadio.length; i++){
    if(waterMarkRadio[i].checked){
      radioValue = waterMarkRadio[i].value;
    }
  }
  WMContentValue = WMContent.value;
  if(!radioValue){
    alert('请选择水印位置！');
    return;
  }
  if(!WMContent.value){
    alert('请填写水印内容！');
    return;
  }

  //绘制水印
  if(curentpixel.innerHTML == "1"){
    greyEffect();
    watermark();
  }
  if(curentpixel.innerHTML == "2"){
    retroEffect();
    watermark();
  }
  if(curentpixel.innerHTML == "3"){
    blackAndWhiteEffect();
    watermark();
  }
  if(curentpixel.innerHTML == "4"){
    AntiColorEffect();
    watermark();
  }
  if(curentpixel.innerHTML == "5"){
    blurEffect();
    watermark();
  }
  if(curentpixel.innerHTML == "6"){
    mosaicEffect();
    watermark();
  }
  if(curentpixel.innerHTML == "0"){
    restore();
    watermark();
  }

}
