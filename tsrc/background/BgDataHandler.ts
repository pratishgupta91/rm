class BgDataHandler {
    private m_browserApi : BrowserApi;

    constructor(commandHandler : CommandHandler) {
        this.m_browserApi = new BrowserApi(commandHandler);
    }

    public sendInstance(instanceId : number, instance : InstanceState) : void {
        let data = new BC_InstanceData(Command.RefreshInstanceState);
        data.m_instance = instance;
        this.m_browserApi.sendMessageToContent(instanceId, JSON.stringify(data));
    }

    public sendVideo(instanceId : number, video : Video) : void {
        let data = new BC_VideoPushData(Command.PushNewVideo);
        data.m_video = video;
        this.m_browserApi.sendMessageToContent(instanceId, JSON.stringify(data));
    }

    public sendTabUpdatedCommand(instancId : number) {
        let data = new BaseData(Command.TabUpdated);
        this.m_browserApi.sendMessageToContent(instancId, JSON.stringify(data));
    }

    public sendMinimizeCPCommand(instanceId : number) : void {
        let data = new BaseData(Command.MinimizeCP);
        this.m_browserApi.sendMessageToContent(instanceId, JSON.stringify(data));
    }

    public sendMaximizeCPCommand(instanceId : number) : void {
        let data = new BaseData(Command.MaximizeCP);
        this.m_browserApi.sendMessageToContent(instanceId, JSON.stringify(data));
    }

    public updateTab(instancId : number, url : string) {
        this.m_browserApi.updateTab(instancId, url);
    }

    public subscribeToEvents() {
        this.m_browserApi.subscribeToContentEvents();
        this.m_browserApi.subscribeToTabEvents();
    }

    public createContextenu(options : ConextMenuOption[]) {
        this.m_browserApi.createContextMenu(options);
    }

    public sendErrorMsg(instanceId : number, errorText : string) {
        let errorData = new ErrorData(Command.ErrorMessage, errorText);
        this.m_browserApi.sendMessageToContent(instanceId, JSON.stringify(errorData));
    }

    public sendHelp(instanceId : number, help : Help) {
        let data = new BC_HelpData(Command.ShowHelp, help);
        this.m_browserApi.sendMessageToContent(instanceId, JSON.stringify(data));
    }

    public sendOnVideoSuccessfullyDeleted(instanceId : number, index : number) {
        let data = new CommandAndIndexData(Command.OnVideoSuccessfullyDeleted, index);
        this.m_browserApi.sendMessageToContent(instanceId, JSON.stringify(data));
    }

    public sendShowPlayCE(instanceId : number) : void {
        let data = new BaseData(Command.ShowPlayButton);
        this.m_browserApi.sendMessageToContent(instanceId, JSON.stringify(data));
    }

    public sendShowPauseCE(instanceId : number) : void {
        let data = new BaseData(Command.ShowPauseButton);
        this.m_browserApi.sendMessageToContent(instanceId, JSON.stringify(data));
    }
}