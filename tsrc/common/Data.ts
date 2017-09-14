class BaseData {
    m_command : Command;
    constructor(command : Command) {
        this.m_command = command;
    }
}

class BaseContentEventData extends BaseData {
    m_instanceId : number;
    m_url : string;

    constructor(command : Command) {
        super(command);
    }
}

class CommandAndIndexData extends BaseData {
    m_index : number;

    constructor(command : Command, index : number) {
        super(command);
        this.m_index = index;
    }  
}

class PageTypeData extends BaseData {
   m_pageType : YTPageType;

    constructor(command : Command, pageType : YTPageType) {
        super(command);
        this.m_pageType = pageType;
    }  
}

class ErrorData extends BaseData {
    m_error : string;

    constructor(command : Command, error : string) {
        super(command);
        this.m_error = error;
    }  
}

class CB_CurrentVideoData extends BaseData {
    m_videoId : number;

    constructor(command : Command) {
        super(command);
    }
}

class CB_DragEndData extends BaseData {
    m_startIndex : number;
    m_endIndex : number;

    constructor(command: Command) {
        super(command);
    }
}

// BC
class BC_VideoPushData extends BaseData {
    m_video : Video;

    constructor(command : Command) {
        super(command);
    }
}

class BC_InstanceData extends BaseData {
    m_instance : InstanceState;

    constructor(command : Command) {
        super(command);
    }
}

class BC_HelpData extends BaseData {
    m_help : Help;

    constructor(command : Command, help : Help) {
        super(command);
        this.m_help = help;
    }
}

class HelpStorageData {
    m_id : string;

    constructor(id : string) {
        this.m_id = id;
    }
}
