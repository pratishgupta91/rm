class BrowserApi {
    private m_commandHandler : CommandHandler;
    private m_browserType : BrowserType;

    constructor(cmdHandler : CommandHandler) {
        this.m_commandHandler = cmdHandler;
    }

    updateTab(instanceId : number, url : string) {
        Api.updateTab(instanceId, url);
    }

    sendMessageToBackgroundPage(data : any, callback : (response : any) => void) : void {
        Api.sendMessage(data, callback);
    }

    subscribeToBackgroundEvents() : void {
        Api.addMessageListener((data : any, sender : any) => {
            this.m_commandHandler.execute(data);
        });
    }

    sendMessageToContent(instanceId : number, data : any) {
        Api.sendMessageToTab(instanceId, data);
    }

    subscribeToContentEvents() : void {
        Api.addMessageListener((data : any, sender : any) => {
            let parsedData = JSON.parse(data);
            parsedData.m_instanceId = sender.tab.id;
            parsedData.m_url = sender.tab.url;
            this.m_commandHandler.execute(JSON.stringify(parsedData));
        });
    }

    subscribeToTabEvents() : void {
        Api.addTabUpdatedListener((tab : Tab) => {
            let data = new BaseContentEventData(Command.TabUpdated);
            data.m_instanceId = tab.getInstanceId();
            data.m_url = tab.getUrl();
            this.m_commandHandler.execute(JSON.stringify(data));
        });
    }

    createContextMenu(contexts : ConextMenuOption[]) {
        Api.createContextMenu(contexts, (data : any) => {
            this.m_commandHandler.execute(data);
        });
    }
}