class HelpElement extends Elem {
    m_cross : ControlElement;
    m_textElement : Elem;
    m_nextElem : Elem;
    m_tip : Elem;
    //m_help : Help;

    constructor(commandHandler : CommandHandler) {
        super(Resources.HelpBox, ElemTypes.getDiv());
        this.m_cross = ControlElementFactory.createControlElement(Resources.HBCross);
        this.m_textElement = new Elem(Resources.HBText, ElemTypes.getDiv());
        this.m_nextElem = new Elem(Resources.HBNext, ElemTypes.getButton());
        this.m_tip = new Elem(Resources.HBUpArrow, ElemTypes.getDiv());

        this.m_nextElem.get().onclick = (e : MouseEvent) => {
            let data = new BaseData(Command.NextHelpOnClick);
            commandHandler.execute(JSON.stringify(data));
        }
    }

    init(help : Help) {
        if(help) {
            this.m_textElement.get().innerHTML = help.getText();
            this.m_elem.style.left = help.getX() + "px";
            this.m_tip.get().style.left = help.getTipX() + "px";
            this.m_tip.get().style.visibility = (help.getIsTip()) ? "visible" : "hidden";
            this.m_nextElem.get().innerHTML = "NEXT";
        }
    }

    addChildIfAny() : void {
        this.get().appendChild(this.m_cross.get());
        this.get().appendChild(this.m_textElement.get());
        this.get().appendChild(this.m_nextElem.get());
        this.get().appendChild(this.m_tip.get());
    }
}