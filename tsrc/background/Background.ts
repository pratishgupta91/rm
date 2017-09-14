class Background {
    m_instances : Instances;
    m_helpManager : HelpManager;
    m_dataHandler : BgDataHandler;
    m_videoId : number;

    constructor() {
        this.m_videoId = 0;
        this.m_instances = new Instances();
        let commandHandler = new CommandHandler();
        this.m_dataHandler = new BgDataHandler(commandHandler);
        this.m_dataHandler.subscribeToEvents();
        this.m_helpManager = new HelpManager();

        this.initializeContextMenu();

        commandHandler.getDispatcher.subscribe((sender : CommandHandler, data : any) => {
            let command = Utils.getCommandType(data);
            let senderId = Utils.getInstanceId(data);
            let instance = this.m_instances.getInstance(senderId);
            
            switch(command) {
                
                case Command.AddNewInstance : {
                    Utils.printLog("AddNewInstance", true);
                    
                    if(instance == null) {
                        let url = Utils.getURL(data);
                        instance = this.m_instances.addInstance(senderId, url);
                    }

                    this.m_dataHandler.sendTabUpdatedCommand(senderId);
                    this.m_dataHandler.sendInstance(senderId, instance);
                    break;
                }

                case Command.GetNextVideo : {
                    if(instance != null) {
                        let video = instance.getNextVideo();
                        if(video) {
                            this.m_dataHandler.updateTab(senderId, video.GetURL());
                        }
                        else {
                            this.m_dataHandler.sendErrorMsg(senderId, ErrorMessage.NoVideoError);
                        }
                    }
                    break;
                }

                case Command.GetPrevVideo : {
                    if(instance != null) {
                        let video = instance.getPrevVideo();
                        if(video) {
                            this.m_dataHandler.updateTab(senderId, video.GetURL());
                        }
                        else {
                            this.m_dataHandler.sendErrorMsg(senderId, ErrorMessage.NoVideoError);
                        }
                    }
                    break;
                }

                case Command.GetVideoAt : {
                    if(instance != null) {
                        let index = Utils.parseIndex(data);
                        let video = instance.getVideoAt(index);
                        if(video) {
                            this.m_dataHandler.updateTab(senderId, video.GetURL());
                        }
                    }
                    break;
                }

                case Command.DeleteVideoAt : {
                    if(instance != null) {
                        let index = Utils.parseIndex(data);
                        if(instance.deleteVideoAt(index)) {
                            this.m_dataHandler.sendOnVideoSuccessfullyDeleted(senderId, index);
                        }
                        else {
                            this.m_dataHandler.sendErrorMsg(senderId, ErrorMessage.DeleteVideoError);
                        }
                    }
                    break;
                }

                case Command.MinimizeContolOnClick : {
                    if(instance != null) {
                        instance.toggleCPMinimizeState();
                        if(instance.isCPMinimized() == true) {
                            this.m_dataHandler.sendMinimizeCPCommand(senderId);
                        }
                        else {
                            this.m_dataHandler.sendMaximizeCPCommand(senderId);    
                        }
                    }
                    break;
                }

                case Command.DragEnd : {
                    let dragData = Utils.parseDragEnd(data);
                    instance.handleDragEnd(dragData.m_startIndex, dragData.m_endIndex);
                    break;
                }
                // Send to UI


                // Tab updated command comes when tab gets updated. Whenever this command comes,
                // send all videos to content
                case Command.TabUpdated : {
                    let url = Utils.getURL(data);
                    if(instance != null) {
                        if(instance.getCurrentUrl() != url) {
                           instance.setCurrentUrl(url);
                            this.m_dataHandler.sendTabUpdatedCommand(senderId);
                            this.m_dataHandler.sendInstance(senderId, instance);
                        }
                    }
                    break;
                }

                case Command.ContextMenuOnClick : {
                    let url = Utils.getURL(data);
                    Utils.getVideoFromGoogleApi(url, this.m_videoId, (video : Video) => {
                        let retType = instance.pushVideo(video);
                        if(retType == PushVideoReturnType.Added) {
                            this.m_dataHandler.sendVideo(senderId, video);
                        }
                        else {
                            this.m_dataHandler.sendErrorMsg(senderId, ErrorMessage.DuplicateVideoError);
                        }
                    });

                    ++this.m_videoId;
                    break;
                }

                case Command.SetPageType: {
                    let pageType = Utils.parsePageType(data);
                    if(instance == null) {
                        let url = Utils.getURL(data);
                        instance = this.m_instances.addInstance(senderId, url);
                    }

                    instance.setPageType(pageType);
                    if(instance.getPageType() == YTPageType.VideoPage) {
                        this.m_dataHandler.sendShowPauseCE(senderId);
                    }
                    else {
                        this.m_dataHandler.sendShowPlayCE(senderId);
                    }
                    break;
                }

                case Command.GetNextHelp: {
                    StorageDataHandler.retrieveData(StorageKeys.HelpIdKey, (data : any) => {
                        let helpId = (data && data.m_id) ? data.m_id : null;
                        if(helpId)
                        {
                            helpId = Number(helpId) + 1;
                            
                            let help = this.m_helpManager.getHelpAt(helpId);
                            if(help) {
                                this.m_dataHandler.sendHelp(senderId, help);
                            }

                            if(helpId <= (this.m_helpManager.getMaxId() + 1) && helpId >= 0) {
                                let helpStorageData = new HelpStorageData(helpId.toString());
                                Api.storeLocalData(JSON.stringify(helpStorageData));
                            }
                        }
                    });
                    break;
                }

                case Command.GetCurrentHelp: {
                    StorageDataHandler.retrieveData(StorageKeys.HelpIdKey, (data : any) => {
                        let helpId = (data && data.m_id) ? Number(data.m_id) : 0;
                        let help = this.m_helpManager.getHelpAt(helpId);
                        if(help) {
                            let helpStorageData = new HelpStorageData(helpId.toString());
                            Api.storeLocalData(JSON.stringify(helpStorageData));
                            this.m_dataHandler.sendHelp(senderId, help);
                        }
                    });
                    break;
                }
            }
        });
    }

    initializeContextMenu() {
        let contexts = new Array();
        let targetUrls = new Array();
        targetUrls.push(StringResourses.TargetUrlMatch);
        contexts.push(new ConextMenuOption(Constants.ContextMenuOptionSting, StringResourses.Link, targetUrls));
        this.m_dataHandler.createContextenu(contexts);
    }
}