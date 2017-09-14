class InstanceState {
    private m_queue : Video[];
    private m_url : string;
    private m_isPanelMinimized : boolean;
    private m_currentVideoIndex : number;
    private m_pageType : YTPageType;
    
    constructor(url : string) {
        this.m_queue = [];
        this.m_url = url;
        this.m_isPanelMinimized = false;
        this.m_currentVideoIndex = -1;
        this.m_pageType = YTPageType.Other;
    }

    pushVideo(video : Video) : PushVideoReturnType {
        for(let i = 0; i < this.m_queue.length; i++) {
            let vid = this.m_queue[i];
            if(video.GetURL() == vid.GetURL()) {
                return PushVideoReturnType.Duplicate;
            }
        }

        this.m_queue.push(video);
        return PushVideoReturnType.Added;
    }

    getAllVideos() : Video[] {
        return this.m_queue;
    }

    popVideo() : boolean {
        if(this.m_queue.length > 0) {
            this.m_queue.splice(0 /*index*/, 1);
            return true;
        }
        return false;
    }

    topVideo() : Video | undefined {
        if(this.m_queue.length > 0) {
            return this.m_queue[0];
        }
        return undefined;
    }

    getNextVideo() : Video | undefined {
        if(this.m_currentVideoIndex == -1) {
            if(this.m_queue.length > 0){
                this.m_currentVideoIndex = this.m_queue[0].getId();
                return this.m_queue[0];
            }
        }
        else {
            let curIdx = 0;
            for(let i = 0; i < this.m_queue.length; i++) {
                let video = this.m_queue[i];
                if(video.getId() == this.m_currentVideoIndex) {
                    curIdx = i;
                    break;
                }
            }
            ++curIdx;

            if(curIdx < this.m_queue.length) {
                this.m_currentVideoIndex = this.m_queue[curIdx].getId();
                return this.m_queue[curIdx];
            }
        }
        return undefined;
    }

    getPrevVideo() : Video | undefined {
        if(this.m_currentVideoIndex == -1) {
            return undefined;
        }
        else {
            let curIdx = 0;
            for(let i = 0; i < this.m_queue.length; i++) {
                let video = this.m_queue[i];
                if(video.getId() == this.m_currentVideoIndex) {
                    curIdx = i;
                    break;
                }
            }
            --curIdx;

            if(curIdx >= 0) {
                this.m_currentVideoIndex = this.m_queue[curIdx].getId();
                return this.m_queue[curIdx];
            }
        }
        return undefined;
    }

    // Index represents the index in the queue and not videoId
    getVideoAt(index : number) : Video | undefined {
        if((index < 0) || (index > (this.m_queue.length - 1))) {
            return undefined;
        }
        this.m_currentVideoIndex = this.m_queue[index].getId();
        return this.m_queue[index];
    }

    // Index represents the index in the queue and not videoId
    deleteVideoAt(index : number) : boolean {
        if((index < 0) || (index > (this.m_queue.length - 1))) {
            return false;
        }

        let curIdx = -1;
        for(let i = 0; i < this.m_queue.length; i++) {
            let video = this.m_queue[i];
            if(video.getId() == this.m_currentVideoIndex) {
                curIdx = i;
                break;
            }
        }

        if(curIdx == index) {
           return false;
        }
        
        this.m_queue.splice(index, 1);
        return true;
    }

    toggleCPMinimizeState() : void {
        this.m_isPanelMinimized = !this.m_isPanelMinimized;
    }

    isCPMinimized() : boolean {
        return this.m_isPanelMinimized;
    }

    setCurrentUrl(url : string) : void {
        this.m_url = url;
    }

    getCurrentUrl() : string {
        return this.m_url;
    }

    setPageType(pageType : YTPageType) : void {
        this.m_pageType = pageType;
    }

    getPageType() : YTPageType {
        return this.m_pageType;
    }

    handleDragEnd(start : number, end : number) : void {
        let video = this.m_queue[start];
        this.m_queue.splice(start, 1);
        this.m_queue.splice(end, 0, video);
    }
}

class Instances {
    m_instances : InstanceState[];

    constructor() {
        this.m_instances = [];
    }

    addInstance(instanceId : number, url : string) : InstanceState {
        if(this.m_instances[instanceId] == null)
        {
            let instance = new InstanceState(url);
            this.m_instances[instanceId] = instance;
            return instance;
        }
    }

    getInstance(instanceId : number) : InstanceState | undefined {
        return this.m_instances[instanceId];
    }

    deleteInstance(instanceId : number) : void {
        this.m_instances[instanceId] = null;
    }
}