function watermark(){
  watermarkCanvas.width = 1152;
  watermarkCanvas.height = 768;

  watermarkContext.font = "bold 30px Arial";
  watermarkContext.fillStyle = "rgba(255,255,255,0.5)";
  watermarkContext.textBaseline = 'middle';
  watermarkContext.textAlign = 'center';
  watermarkContext.fillText(WMContentValue,250,50);
  if(WMContentValue){
    context.drawImage(watermarkCanvas,0,0);
  }
}
