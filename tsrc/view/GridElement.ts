class GridElement extends Elem {
    m_boxCount : number;
    m_commandHandler : CommandHandler;

    constructor(commandHandler : CommandHandler) {
        super(Resources.Grid, ElemTypes.getUL());
        this.m_boxCount = 0;
        this.m_commandHandler = commandHandler;
    }

    addChildIfAny() : any {}

    addVideos(videos : Video[]) {
        videos.forEach(video => {
            let box = new VideoBoxElement(video, this.m_commandHandler);
            box.addChildIfAny();
            this.m_elem.appendChild(box.get());
            box.get().scrollIntoView();
            ++this.m_boxCount;
        });
    }

    removeAllVideos() {
        while(this.m_elem.hasChildNodes()) {
            this.m_elem.removeChild(this.m_elem.lastChild);
        }
    }

    removeVideoAt(index : number) : void {
        let itemToBeDeleted = Utils.getListChildAt(index, Resources.Grid);
        this.m_elem.removeChild(itemToBeDeleted);
    }

    setCurrentElement(index : number) : void {
        if(index != -1) {
            let box = JqueryHelper.getChildAt(index, Resources.Grid);
            box.scrollIntoView();
            box.style.background = "#708090";
        }
    }

    makeListSortable() {
        JqueryHelper.makeListSortable(Resources.Grid, (start : number, end : number) => {
            let data = new CB_DragEndData(Command.DragEnd);
            data.m_startIndex = start;
            data.m_endIndex = end;
            this.m_commandHandler.execute(JSON.stringify(data));
        });
    }

    handleCommand(command : Command, data : any) : void {
    }
}