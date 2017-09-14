class Api {
    private m_browserType : BrowserType;
    
    static updateTab(instanceId : number, url : string) {
        if(Utils.getBrowser() == BrowserType.Chrome) {
             chrome.tabs.update(instanceId, {'url' : url});
        }
        if(Utils.getBrowser() == BrowserType.Edge) {
             browser.tabs.update(instanceId, {'url' : url});
        }
    }

    static sendMessage(data : any, callback : (response : any) => void) : void {
        if(Utils.getBrowser() == BrowserType.Chrome) {
            chrome.runtime.sendMessage(data, callback);
        }
        if(Utils.getBrowser() == BrowserType.Edge) {
            browser.runtime.sendMessage(data, callback);
        }
    }

    static sendMessageToTab(instanceId : number, data : any) {
        if(Utils.getBrowser() == BrowserType.Chrome) {
            chrome.tabs.sendMessage(instanceId, data);
        }
        if(Utils.getBrowser() == BrowserType.Edge) {
            browser.tabs.sendMessage(instanceId, data);
        }
    }

    static addMessageListener(callback : (data : any, sender : any) => void) {
        if(Utils.getBrowser() == BrowserType.Chrome) {
            chrome.runtime.onMessage.addListener((data : any, sender : any, sendResponse : (response : any) => void) : void => {
                callback(data, sender);
            });
        }
        if(Utils.getBrowser() == BrowserType.Edge) {
            browser.runtime.onMessage.addListener((data : any, sender : any, sendResponse : (response : any) => void) : void => {
                callback(data, sender);
            });
        }
    }

    static addTabUpdatedListener(callback : (tab : Tab) => void) : void{
        if(Utils.getBrowser() == BrowserType.Chrome) {
            chrome.tabs.onUpdated.addListener((tabId : number, changeInfo : chrome.tabs.TabChangeInfo, tab : chrome.tabs.Tab) : void => {
                let tabInternal = new Tab(tab.id, tab.url);
                callback(tabInternal);
            });
        }
        if(Utils.getBrowser() == BrowserType.Edge) {
            browser.tabs.onUpdated.addListener((tabId : number, changeInfo : browser.tabs.TabChangeInfo, tab : browser.tabs.Tab) : void => {
                let tabInternal = new Tab(tab.id, tab.url);
                callback(tabInternal);
            });
        }
    }

    static createContextMenu(contexts : ConextMenuOption[], callback : (data : any) => void) {
        if(Utils.getBrowser() == BrowserType.Chrome) {
            let that = this;
            contexts.forEach(ctx => {
                chrome.contextMenus.create({
                    title : ctx.getTitle(), 
                    contexts : [ctx.getContext()],
                    onclick : (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) => {
                        let data = new BaseContentEventData(Command.ContextMenuOnClick);
                        data.m_instanceId = tab.id;
                        data.m_url = info.linkUrl;
                        callback(JSON.stringify(data));
                    },
                    targetUrlPatterns : ctx.getTergetUrls()
                });
            });
        }
        if(Utils.getBrowser() == BrowserType.Edge) {
            let that = this;
            contexts.forEach(ctx => {
                browser.contextMenus.create({
                    title : ctx.getTitle(), 
                    contexts : [ctx.getContext()],
                    onclick : (info: browser.contextMenus.OnClickData, tab: browser.tabs.Tab) => {
                        let data = new BaseContentEventData(Command.ContextMenuOnClick);
                        data.m_instanceId = tab.id;
                        data.m_url = info.linkUrl;
                        callback(JSON.stringify(data));
                    },
                    targetUrlPatterns : ctx.getTergetUrls()
                });
            });
        }
        
    }

    static getResourceURL(path: string)  : string {
        if(Utils.getBrowser() == BrowserType.Chrome) {
            return chrome.extension.getURL(path);
        }
        if(Utils.getBrowser() == BrowserType.Edge) {
            return browser.extension.getURL(path);
        }
    }

    static storeLocalData(data : any) : void {
        if(Utils.getBrowser() == BrowserType.Chrome) {
            chrome.storage.local.set(JSON.parse(data));
        }
        if(Utils.getBrowser() == BrowserType.Edge) {
            browser.storage.local.set(JSON.parse(data));
        }
    }

    static retrieveLocalData(keyData : string, callback : (data : any) => void) : any {
        if(Utils.getBrowser() == BrowserType.Chrome) {
            chrome.storage.local.get(keyData as string, (items: {[key: string]: any}) => {
                callback(items);
            });
        }
        if(Utils.getBrowser() == BrowserType.Edge) {
            browser.storage.local.get(keyData as string, (items: {[key: string]: any}) => {
                callback(items);
            });
        }
    }
}