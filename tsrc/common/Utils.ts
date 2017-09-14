class Utils {
    static getPageType(url : string) : YTPageType {
        if(url.indexOf(YTPageConstants.Watch) !== -1) {
            return YTPageType.VideoPage;
        }
        if(url.indexOf(YTPageConstants.Channel) !== -1) {
            return YTPageType.ChannelPage;
        }
        return YTPageType.Other;
    }

    static getCommandType(data : any) : Command {
        let obj = JSON.parse(data);
        return obj.m_command;
    }

    static getInstanceId(data : any) : number {
        let obj = JSON.parse(data);
        return obj.m_instanceId;
    }

    static getURL(data : any) : string {
        let obj = JSON.parse(data);
        return obj.m_url;
    }

    static getVideoData(data : any) : Video {
        let obj = JSON.parse(data);
        let video = new Video(obj.m_video.m_url, obj.m_video.m_title, obj.m_video.m_thumbnail, obj.m_video.m_id);
        return video;
    }

    static parseVideos(data : any) : Video[] {
        let vids = new Array();
        let obj = JSON.parse(data).m_instance;
        for(let i = 0; i < obj.m_queue.length; i++) {   
            vids.push(new Video(
                obj.m_queue[i].m_url, 
                obj.m_queue[i].m_title,
                obj.m_queue[i].m_thumbnail,
                obj.m_queue[i].m_id));
        }
        return vids;
    }

    static parseVideoIndex(data : any) : number {
        let vids = new Array();
        let obj = JSON.parse(data).m_instance;
        let videoId = obj.m_currentVideoIndex;
        
        for(let i = 0; i < obj.m_queue.length; i++) {  
            if(obj.m_queue[i].m_id == videoId) {
                return i;
            } 
        }
        return -1;
    }

    static parseCPMinimizeState(data : any) : Command {
        let obj = JSON.parse(data).m_instance;
        let isPanelMinimized = obj.m_isPanelMinimized;
        if(isPanelMinimized == true) {
            return Command.MinimizeCP;
        }
        return Command.MaximizeCP;
    }

    static parseDragEnd(data : any) : CB_DragEndData {
        let obj = JSON.parse(data);
        let dragData = new CB_DragEndData(obj.m_command);
        dragData.m_startIndex = obj.m_startIndex;
        dragData.m_endIndex = obj.m_endIndex;
        return dragData;
    }

    static parseIndex(data : any) : number {
        let obj = JSON.parse(data);
        return obj.m_index;
    }

    static parseError(data : any) : string {
        let obj = JSON.parse(data);
        return obj.m_error;
    }

    static parsePageType(data : any) : YTPageType {
        let obj = JSON.parse(data);
        return obj.m_pageType;
    }
    
    static parseHelp(data : any) : Help {
        let obj = JSON.parse(data);
        let helpObj = obj.m_help;
        let help = new Help(helpObj.m_text, helpObj.m_id, helpObj.m_x, helpObj.m_tipX, helpObj.m_isTip);
        return help;
    }

    static httpGet(url : string, callback : (content : string) => void) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
               callback(xmlHttp.responseText);
            }
        }

        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    }
    
    static getVideoFromGoogleApi(url : string, id : number, callback : (video : Video) => void) {
        let parts = url.split('=');
        if(parts.length > 0) {
            //let URL = "https://www.googleapis.com/youtube/v3/videos?";
            //URL += "id=" + parts[1];
            //URL += "&key=AIzaSyACxBa1tJ3jVkRH_c_rHS_JAFLPEpIQebs";
            //URL += "&part=snippet,contentDetails,statistics,status";
            let videoId = parts[1].split('&')[0];
            let thumbnailUrl = "https://i.ytimg.com/vi/" + videoId + "/default.jpg";
            var video = new Video(url, "", thumbnailUrl, id);
            callback(video);
        }
        // this.httpGet(URL, (content : string) => {
        //     var jsonVideo = JSON.parse(content);
        //     console.log(jsonVideo.items[0].snippet.thumbnails.default.url);
        //     var video = new Video(url, jsonVideo.items[0].snippet.title, jsonVideo.items[0].snippet.thumbnails.default.url, id);
        //     callback(video);
        // });
    }

    static printLog(text : string, isEnabled : boolean) {
        if(isEnabled == true) {
            console.log(text);
        }
    } 

    static getParent(parentClassName : string, child : HTMLElement) : HTMLElement | undefined {
        let parentElem = child.parentElement;
        while(parentElem) {
            if(parentElem.className == parentClassName) {
                return parentElem;
            }

            parentElem = parentElem.parentElement;
        }

        return undefined;
    }

    static getListChildAt(index : number, listClassName : string) : HTMLElement {
        let list = document.getElementsByClassName(listClassName)[0];
        return list.children.item(index) as HTMLElement;
    }

    static getItemIndexInList(item : HTMLElement, listClassName : string) : number {
        let list = document.getElementsByClassName(listClassName)[0];

        for(let i = 0; i < list.children.length; i++) {
            if(list.children[i] == item) {
                return i;
            }
        }

        return -1;
    }

    static getBrowser() : BrowserType {
        // if(window.chrome) {
        //     return BrowserType.Chrome;
        // }
        return BrowserType.Edge;
    }
 }