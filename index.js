console.log("app is ready for use!!!");
document.getElementById('scriptinject').addEventListener('click',inject,false);

function inject(){
  console.log("injecting scripts");
  chrome.tabs.query(
    {currentWindow: true,active:true},
    function(tabs){
      chrome.tabs.executeScript(null,{file:"test.js"});
    }
  );
}
/*TODO-1
chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse){
    images = JSON.parse(request.imagelist);
    var img = document.getElementById('download');
    img.src = images[0];
  }
);
*/
