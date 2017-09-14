
var bg = new Background();

// var qMgr;
// init();

// function init() {
//     qMgr = new QueueManager();
// }

// function httpGet(theUrl, callback)
// {
//     if (window.XMLHttpRequest)
//     {// code for IE7+, Firefox, Chrome, Opera, Safari
//         xmlhttp=new XMLHttpRequest();
//     }
//     else
//     {// code for IE6, IE5
//         xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     xmlhttp.onreadystatechange=function()
//     {
//         if (xmlhttp.readyState==4 && xmlhttp.status==200)
//         {
//             callback(xmlhttp.responseText);
//         }
//     }
//     xmlhttp.open("GET", theUrl, true );
//     xmlhttp.send();
// }

// function genericOnClick(info, tab) {
//     console.log("item " + info.menuItemId + " was clicked");
//     console.log("info: " + JSON.stringify(info));
//     console.log("tab: " + JSON.stringify(tab));

//     var linkURL = info.linkUrl;
//     var parts = linkURL.split('=');

//     var URL = "https://www.googleapis.com/youtube/v3/videos?";
//     URL += "id=" + parts[1];
//     URL += "&key=AIzaSyACxBa1tJ3jVkRH_c_rHS_JAFLPEpIQebs";
//     URL += "&part=snippet,contentDetails,statistics,status";
//     console.log(URL);

//     httpGet(URL, function(content) {
//         //alert(content);
//         var jsonVideo = JSON.parse(content);
//         var video = new Video(linkURL, jsonVideo.items[0].snippet.title, jsonVideo.items[0].snippet.thumbnails.default.url, tab.id);
//         qMgr.push(video);
//         var videos = qMgr.getAll(tab.id);
//         if(videos.length > 0) {
//           chrome.tabs.sendMessage(tab.id, {"videos" : videos});
//         }
//     });
// }

// chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
//     var videos = qMgr.getAll(tabId);
//     if(videos.length > 0) {
//       chrome.tabs.sendMessage(tab.id, {"videos" : videos});
//     }
// });

// // Listening to video end event
// chrome.runtime.onMessage.addListener(function(request, sender) {
//     if(request.operation == 'ended') {
//         console.log("ENDED event captured in background")

//         var url = sender.tab.url;
//         var tabId = sender.tab.id;

//         console.log(url);
//         console.log(tabId);

//         var video = qMgr.top(tabId);
//         if(video) {
//             qMgr.pop(tabId);
//             chrome.tabs.update(tabId, {'url' : video.m_url});
//         }
//     }
// });

// // Create one test item for each context type.
// var contexts = ["link"];
// for (var i = 0; i < contexts.length; i++) {
//     var context = contexts[i];
//     //var title = "Test '" + context + "' menu item";
//     var title = "Add video to queue";
//     var id = chrome.contextMenus.create({
//         "title": title,
//         "contexts": [context],
//         "onclick": genericOnClick
//     });
//     console.log("'" + context + "' item:" + id);
// }
