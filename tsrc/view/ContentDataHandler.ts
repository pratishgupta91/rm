class ContentDataHandler {
    private m_browserApi : BrowserApi;

    constructor(commandHandler : CommandHandler) {
        this.m_browserApi = new BrowserApi(commandHandler);
    }

    public addNewInstance(callback : (response : any) => void) : void {
        let data = new BaseData(Command.AddNewInstance);
        this.m_browserApi.sendMessageToBackgroundPage(JSON.stringify(data), callback);
    }

    public videoEnded(callback : (response : any) => void) : void {
        let data = new BaseData(Command.GetNextVideo);
        this.m_browserApi.sendMessageToBackgroundPage(JSON.stringify(data), callback);
    }

    public dragEnded(data : any, callback : (response : any) => void) : void {
        this.m_browserApi.sendMessageToBackgroundPage(data, callback);
    }

    // Send toggle minimize control to background when minimize control is clicked
    public toggleMinimizeControl(callback : (response : any) => void) : void {
        let data = new BaseData(Command.MinimizeContolOnClick);
        this.m_browserApi.sendMessageToBackgroundPage(JSON.stringify(data), callback);
    }

    public subscribeToEvents() {
        this.m_browserApi.subscribeToBackgroundEvents();
    }

    public playNextVideo(callback : (response : any) => void) : void {
        let data = new BaseData(Command.GetNextVideo);
        this.m_browserApi.sendMessageToBackgroundPage(JSON.stringify(data), callback);
    }

    public playPrevVideo(callback : (response : any) => void) : void {
        let data = new BaseData(Command.GetPrevVideo);
        this.m_browserApi.sendMessageToBackgroundPage(JSON.stringify(data), callback);
    }

    public playVideoAtIndex(data : any, callback : (response : any) => void) {
        let obj = JSON.parse(data);
        this.m_browserApi.sendMessageToBackgroundPage(JSON.stringify(new CommandAndIndexData(Command.GetVideoAt, obj.m_index)), callback);
    }

    public deleteVideoAtIndex(data : any, callback : (response : any) => void) {
        let obj = JSON.parse(data);
        this.m_browserApi.sendMessageToBackgroundPage(JSON.stringify(new CommandAndIndexData(Command.DeleteVideoAt, obj.m_index)), callback);
    }

    public setPagetype(pageType : YTPageType,  callback : (response : any) => void) {
        let data = new PageTypeData(Command.SetPageType, pageType);
        this.m_browserApi.sendMessageToBackgroundPage(JSON.stringify(data), callback);
    }

    public getNextHelp(callback : (response : any) => void) {
        let data = new BaseData(Command.GetNextHelp);
        this.m_browserApi.sendMessageToBackgroundPage(JSON.stringify(data), callback);
    }

    public getCurrentHelp(callback : (response : any) => void) {
        let data = new BaseData(Command.GetCurrentHelp);
        this.m_browserApi.sendMessageToBackgroundPage(JSON.stringify(data), callback);
    }
}