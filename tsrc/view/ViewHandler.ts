interface ViewHandler {

    // Video handler
    addVideos(videos : Video[]) : void;
    removeAllVideos() : void;

    // Control handlers
}

class BaseViewHandler implements ViewHandler {
    private m_ribbonElem : RibbonElement;
    
    constructor(commandHandler : CommandHandler) {
        this.m_ribbonElem = new RibbonElement(commandHandler);
        this.m_ribbonElem.addChildIfAny();
        document.body.appendChild(this.m_ribbonElem.get());
        this.m_ribbonElem.makeGridSortable();
    }

    handleCommand(command : Command, data : any) : void {
        this.m_ribbonElem.handleCommand(command, data);
    }
    
    addVideos(videos : Video[]) : void {
        this.handleCommand(Command.MaximizeCP, null);
        this.m_ribbonElem.getGridElement().addVideos(videos);
    }

    removeAllVideos() : void {
        this.m_ribbonElem.getGridElement().removeAllVideos();
    }

    removeVideoAt(index : number) : void {
        this.m_ribbonElem.getGridElement().removeVideoAt(index);
    }

    setCurrentVideo(index : number) : void {
        this.m_ribbonElem.getGridElement().setCurrentElement(index);
    }

    displayError(errorText : string, duration : number) {
        this.m_ribbonElem.displayError(errorText, duration);
    }

    displayHelp(help : Help) {
        this.m_ribbonElem.displayHelp(help);
    }
}