class VideoBoxCPElement extends Elem {
    m_commandHandler : CommandHandler;
    m_deleteControl : ControlElement;
    m_playControl : ControlElement;
    m_addToPlaylist : ControlElement;
    
    constructor(commandHandler : CommandHandler) {
        super(Resources.VideoBoxCP, ElemTypes.getDiv());
        this.m_commandHandler = commandHandler;

        // Delete Control
        this.m_deleteControl = ControlElementFactory.createControlElement2(Resources.VideoBoxCPDeleteControl,
            StringResourses.VideoBoxCPDeleteIconPath, (e) => {
                e.stopPropagation();
                this.m_commandHandler.execute(JSON.stringify(new CommandAndIndexData(Command.VideoCPDelete, this.findIndexInlist())));
            }
        );

        // Play Control
        this.m_playControl = ControlElementFactory.createControlElement2(Resources.VideoBoxCPPlayControl,
            StringResourses.VideoBoxCPPlayIconPath, (e) => {
                e.stopPropagation();
                this.m_commandHandler.execute(JSON.stringify(new CommandAndIndexData(Command.VideoCPPlay, this.findIndexInlist())));
            }
        );

        // Add to Playlist Control
        this.m_addToPlaylist = ControlElementFactory.createControlElement2(Resources.VideoBoxCPAddToPlaylistControl,
            StringResourses.VideoBoxCPAddToListIconPath, (e) => {
                e.stopPropagation();
                this.m_commandHandler.execute(JSON.stringify(new CommandAndIndexData(Command.VideoCPAddToPlaylist, this.findIndexInlist())));
           }
        );
    }

    addChildIfAny () : void {
        //this.m_elem.appendChild(this.m_addToPlaylist.get());
        this.m_elem.appendChild(this.m_playControl.get());
        this.m_elem.appendChild(this.m_deleteControl.get());
    }

    findIndexInlist() : number {
        let videoItem = Utils.getParent(Resources.VideoBox, this.m_elem);
        return Utils.getItemIndexInList(videoItem, Resources.Grid);
    }
}