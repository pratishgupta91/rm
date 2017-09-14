class Attributes {
    static src = "src";
    static opacity = "opacity";
}

class ConextMenuOption {
    private m_title : string;
    private m_context : string;
    private m_targetUrlMatch : string[];

    constructor(title : string, context : string, targetUrlMatch : string[]) {
        this.m_context = context;
        this.m_title = title;
        this.m_targetUrlMatch = targetUrlMatch;
    }

    getTitle() : string {
        return this.m_title;
    }

    getContext() : string {
        return this.m_context;
    }

    getTergetUrls() : string[] {
        return this.m_targetUrlMatch;
    }

}

enum BrowserType {
    Chrome,
    Edge
}

class ElemTypes {
    static div   = "div";
    static img   = "img";
    static ul    = "ul";
    static li    = "li";
    static video = "video";
    static button = "button";

    static getDiv() : string { return ElemTypes.div; }
    static getImg() : string { return ElemTypes.img; }
    static getUL() : string { return ElemTypes.ul; }
    static getLI() : string { return ElemTypes.li; }
    static getVideo() : string { return ElemTypes.video; }
    static getButton() : string { return ElemTypes.button; }
}

class Constants {
    static VideoBoxWidth = 140;
    static VideoBoxHeight = 140;
    static VideoBoxDragStartOpacity = "0.4";
    static VideoBoxDragEndOpacity = "1.0";
    static ContextMenuOptionSting = "Add To Queue";
}

enum AnimationDirection {
    Up,
    Down,
    Left,
    Right
}

enum Command {
    None = 0,
    PlayControlOnClick,
    PauseControlOnClick,
    PlayPrevControlOnClick,
    PlayNextControlOnClick,
    EnablePlay,
    DisablePlay,
    ResumeQueue,
    RefreshInstanceState,
    PushNewVideo,
    GetNextVideo,
    GetPrevVideo,
    GetVideoAt,
    DeleteVideoAt,
    OnVideoSuccessfullyDeleted,
    AddNewInstance,
    TabUpdated,
    ContextMenuOnClick,
    MinimizeContolOnClick,
    MinimizeCP,
    MaximizeCP,
    DragEnd,
    VideoCPDelete,
    VideoCPPlay,
    VideoCPAddToPlaylist,
    ErrorMessage,
    SetPageType,
    ShowPlayButton,
    ShowPauseButton,
    ShowHelp,
    GetNextHelp,
    GetCurrentHelp,
    NextHelpOnClick
}

enum YTPageType {
    VideoPage,
    ChannelPage,
    HomePage,
    Other
}

class YTPageConstants {
    static Watch = "watch";
    static Channel = "channel";
}

enum DataType {
    Videos,
    Video,
    Command
}

class StringResourses {
    static Link = "link";
    static TargetUrlMatch = "*://*.youtube.com/watch*";
    static VideoBoxCPPlayIconPath = "../img/play.png";
    static VideoBoxCPPauseIconPath = "../img/pause.png";
    static VideoBoxCPDeleteIconPath = "../img/delete.png";
    static VideoBoxCPAddToListIconPath = "../img/add_to_playlist.png";
    static CPDownArrowPath = "../img/down.png";
    static CPUpArrowPath = "../img/up.png";
}

class ErrorMessage {
    static DeleteVideoError = "Unable to delete video";
    static NoVideoError = "Add videos to the queue";
    static DuplicateVideoError = "Video already present in the queue";
}

enum PushVideoReturnType {
    Added,
    Duplicate,
    Other
}

class StorageKeys {
    static HelpIdKey = "m_id";
}

class HelpText {
    static HelpText1 = "WELCOME. GET STARTED BY QUEUING A VIDEO. PERFORM RIGHT CLICK ON ANY VIDEO AND SELECT ADD TO QUEUE.";
    static HelpText2 = "CLICK ON BLACK PANEL TO MINIMIZE. YOU CAN ADD VIDEOS EVEN WHEN THE PANEL IN MINIMIZED.";
    static HelpText3 = "CLICK ON MEDIA CONTROL BUTTONS TO PLAY OR PAUSE A VIDEO.";
}