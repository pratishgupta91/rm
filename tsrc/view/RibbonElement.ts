class RibbonElement extends Elem {
    m_controlPanel : ControlPanel;
    m_gridElement : GridElement;
    m_errorPanel : Elem;
    m_helpElement : HelpElement;

    constructor(commandHandler : CommandHandler) {
        super(Resources.Container, ElemTypes.getDiv());
        this.m_controlPanel = this.createControlPanelElement(commandHandler);
        this.m_gridElement = this.createGridElement(commandHandler);
        this.m_errorPanel = this.createErrorPanelElement();
        this.m_helpElement = this.createHelpElement(commandHandler);
    }

    addChildIfAny() : any { 
        this.m_elem.appendChild(this.m_controlPanel.get());
        this.m_elem.appendChild(this.m_errorPanel.get());
        this.m_elem.appendChild(this.m_gridElement.get());
    }

    // Must be called after realize
    getGridElement() : GridElement {
        return this.m_gridElement;
    }

    getControlPanel() : ControlPanel {
        return this.m_controlPanel;
    }

    displayHelp(help : Help) {
        if(help) {
            this.m_elem.appendChild(this.m_helpElement.get());
            this.m_helpElement.init(help);
        }
        else {
            this.m_elem.removeChild(this.m_helpElement.get());
        }
    }

    displayError(errorText : string, duration : number) {
        this.m_errorPanel.get().innerHTML = errorText;
        $(this.m_errorPanel.get()).animate({"opacity" : "1"}, 300);
        
        setTimeout(() => {
            $(this.m_errorPanel.get()).animate({"opacity" : "0"}, 400, () => {
                 this.m_errorPanel.get().innerHTML = "";
            });
        }, duration);
    }

    private createControlPanelElement(commandHandler : CommandHandler): ControlPanel {
        let controlPanel = new ControlPanel(commandHandler);
        controlPanel.addChildIfAny();
        return controlPanel;
    }

    private createGridElement(commandHandler : CommandHandler) : GridElement {
        let grid = new GridElement(commandHandler);
        grid.addChildIfAny();
        return grid;
    }

    private createHelpElement(commandHandler : CommandHandler) : HelpElement {
        let helpElement = new HelpElement(commandHandler);
        helpElement.addChildIfAny();
        return helpElement;
    }

    private createErrorPanelElement() : Elem {
        return new Elem(Resources.ErrorPanel, ElemTypes.getDiv());
    }

    public makeGridSortable() {
        this.m_gridElement.makeListSortable();
    }
    
    handleCommand(command : Command, data : any) : void {
        this.getControlPanel().handleCommand(command, data);
        this.getGridElement().handleCommand(command, data);
        
        switch(command) {
            case Command.MinimizeCP: {
                let gridHeight = this.m_gridElement.get().clientHeight;
                if(!this.m_controlPanel.isMinimized()) {
                    JqueryHelper.animateVertically(-gridHeight, 100, Resources.Container);
                    this.m_controlPanel.setMinimized(true);
                }
                break;
            }
            case Command.MaximizeCP: {
                let gridHeight = this.m_gridElement.get().clientHeight;
                if(this.m_controlPanel.isMinimized()) {
                    JqueryHelper.animateVertically(gridHeight, 100, Resources.Container);
                    this.m_controlPanel.setMinimized(false);
                }
                break;
            }
        }
    }
}
