class ControlElement extends Elem {

    constructor(className : string) {
        super(className, ElemTypes.getImg());
    }

    public setIcon(path : string) {
        this.m_elem.setAttribute(Attributes.src, Api.getResourceURL(path));
    }

    public disable() {
    }

    public enable() {

    }

    public setClickHandler(callback : (e: MouseEvent) => void) {
        this.m_elem.onclick = callback;
    }

    addChildIfAny() {}
}

class ToggleControlElement extends ControlElement {
    m_isFirstActive : boolean;
    m_icon1 : string;
    m_icon2 : string;

    constructor(className : string, icon1 : string, icon2 : string) {
        super(className);
        this.m_icon1 = icon1;
        this.m_icon2 = icon2;
        this.setFirstAsActive();
    }

    getIsFirstActive() : boolean {
        return this.m_isFirstActive;
    }

    public toggle() : void {
        if(this.getIsFirstActive()) {
            this.setSecondAsActive();
        }
        else {
            this.setFirstAsActive();
        }
    }

    public setFirstAsActive() {
        this.setIcon(this.m_icon1);
        this.m_isFirstActive = true;
    }

    public setSecondAsActive() {
        this.setIcon(this.m_icon2);
        this.m_isFirstActive = false;
    }
}

class ControlElementFactory {
    static createControlElement(className : string) : ControlElement {
        return new ControlElement(className);
    }

    static createControlElement2(className : string, icon : string, clickHandler : (e: MouseEvent) => void) : ControlElement {
        let elem = new ControlElement(className);
        elem.setIcon(icon);
        elem.setClickHandler(clickHandler);
        return elem;
    }

    static createToggleControlElement(className : string, icon1 : string, icon2 : string, clickHandler : (e: MouseEvent) => void) : ToggleControlElement {
        let elem = new ToggleControlElement(className, icon1, icon2);
        elem.setClickHandler(clickHandler);
        return elem;
    }
}