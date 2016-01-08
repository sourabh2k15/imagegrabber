var imgs = [];
var bgs = [];
var img,style;
var hangouts = 0;

console.log("content script at work DND!");

imgs = document.getElementsByTagName("img");
divs = document.getElementsByTagName("div");
// for hangouts the img contains the golden bird
for(var i=0;i<imgs.length;i++){
  if(imgs[i].src.indexOf('bg')>0){ bgs.push(imgs[i].src); hangouts = 1;}
}

// check if it is not in images , means it is a bing page where teh image lies in a div background
if(bgs.length==0){
  hangouts=0;
 for(var i=0;i<divs.length;i++){
   img = divs[i];
   style = img.currentStyle || window.getComputedStyle(img,false);
   var bg = style.backgroundImage.slice(4,-1);
   if(bg.indexOf('1366x768')>0||bg.indexOf('1920x1080')>0||bg.indexOf('1280x1024')>0||bg.indexOf('1280x800')>0||bg.indexOf('1024x768')>0) bgs.push(decodeURI(bg));
 }
}

// if there is an image , create a dynamic download link and click it !
if(bgs.length>0){
   var a = document.createElement('a');
   var name = 'wallpaper.jpg';
   if(hangouts==0){
    var bg = bgs[0].slice(20,-1);
    var names = bgs[0].split('/');
    for(var j=0;j<names.length;j++) if(names[j].indexOf('.jpg')>0) name = names[j];
  }
   console.log(name);
   a.href = hangouts?bgs[0]:bg;
   a.id = 'download';
   a.download = name;
   document.body.appendChild(a);
   document.getElementById('download').click();
}

/*
  //TODO-1 :- display the image in popup window for approval
 chrome.runtime.sendMessage({imagelist:JSON.stringify(bgs)},function(response){
 });
*/


/*
// part of TODO-1
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
  console.log(request);
});
*/
