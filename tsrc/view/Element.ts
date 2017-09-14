
class Elem {
    protected m_elem : HTMLElement;
    
    constructor(className : string, type : string) {
        this.m_elem = document.createElement(type) as HTMLElement;
        if(className.length > 0) {
            this.m_elem.className = className;
        }
    }

    get() {
        return this.m_elem;
    }

    addChildIfAny() : any {}
}