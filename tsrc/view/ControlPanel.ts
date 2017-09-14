class ControlPanel extends Elem {

    private m_commandHandler : CommandHandler;
    private m_playControl : ToggleControlElement;
    private m_prevControl : ControlElement;
    private m_nextControl : ControlElement;
    private m_minimizeControl : ToggleControlElement;
    private m_isMinimized : boolean;
    
    constructor(commandHandler : CommandHandler) {
        super(Resources.ControlPanel, ElemTypes.getDiv());
        this.m_commandHandler = commandHandler;
        this.m_isMinimized = false;
        
        // Play Control
        this.m_playControl = ControlElementFactory.createToggleControlElement(Resources.PlayControl,
            StringResourses.VideoBoxCPPlayIconPath, StringResourses.VideoBoxCPPauseIconPath, (e) => {
                e.stopPropagation();
                if(this.m_playControl.getIsFirstActive()) {
                    this.m_commandHandler.execute(JSON.stringify(new BaseData(Command.PlayControlOnClick)));
                }
                else {
                    this.m_commandHandler.execute(JSON.stringify(new BaseData(Command.PauseControlOnClick)));
                }
            }
        );

        // NextPlayControl
        this.m_nextControl = ControlElementFactory.createControlElement2(Resources.NextPlayControl, "../img/next.png", (e) => {
            e.stopPropagation();
            this.m_commandHandler.execute(JSON.stringify(new BaseData(Command.PlayNextControlOnClick)));
        });

        // PrevPlayControl
        this.m_prevControl = ControlElementFactory.createControlElement2(Resources.PrevPlayControl, "../img/prev.png", (e) => {
            e.stopPropagation();
            this.m_commandHandler.execute(JSON.stringify(new BaseData(Command.PlayPrevControlOnClick)));
        });

        // MinimizeControl
        this.m_minimizeControl = ControlElementFactory.createToggleControlElement(Resources.MinimizeControl,
            StringResourses.CPDownArrowPath, StringResourses.CPUpArrowPath, (e) => {
                e.stopPropagation();
                this.m_commandHandler.execute(JSON.stringify(new BaseData(Command.MinimizeContolOnClick)));
            }
        );

        this.m_elem.onclick = (e) => {
            let data = new BaseData(Command.MinimizeContolOnClick);
            this.m_commandHandler.execute(JSON.stringify(data));
        }
    }

    addChildIfAny() : any {
        this.m_elem.appendChild(this.m_playControl.get());
        this.m_elem.appendChild(this.m_nextControl.get());
        this.m_elem.appendChild(this.m_prevControl.get());
        this.m_elem.appendChild(this.m_minimizeControl.get());
    }

    createControl(icon : string, className : string, clickHandler : (e : MouseEvent) => void) : ControlElement {
        let control  = new ControlElement(className);
        control.setIcon(icon);
        control.setClickHandler(clickHandler);
        return control;
    }

    handleCommand(command : Command, data : any) {
        if((command == Command.MinimizeCP && this.m_minimizeControl.getIsFirstActive() == true) ||
            (command == Command.MaximizeCP && this.m_minimizeControl.getIsFirstActive() == false)) {
                this.m_minimizeControl.toggle();
        }

        if((command == Command.ShowPauseButton && this.m_playControl.getIsFirstActive() == true) ||
            (command == Command.ShowPlayButton && this.m_playControl.getIsFirstActive() == false)) {
                this.m_playControl.toggle();
        }
    }

    isMinimized() : boolean {
        return this.m_isMinimized;
    }

    setMinimized(isMinimized : boolean) {
        this.m_isMinimized = isMinimized;
    }
}