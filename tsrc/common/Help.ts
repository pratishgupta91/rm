class Help {
    m_text : string;
    m_x : number;
    m_id : number;
    m_tipX : number;
    m_isTip : boolean;

    constructor(text : string, id : number, x : number, tipX : number, isTip : boolean) {
        this.m_text = text;
        this.m_id = id;
        this.m_x = x;
        this.m_tipX = tipX;
        this.m_isTip = isTip;
    }

    getText() : string {
        return this.m_text;
    }

    getX() : number {
        return this.m_x;
    }

    getTipX() : number {
        return this.m_tipX;
    }

    getId() : number {
        return this.m_id;
    }

    getIsTip() : boolean {
        return this.m_isTip;
    }
}


class HelpManager {
    m_helps : Help[];

    constructor() {
        this.m_helps = new Array();
        this.m_helps.push(new Help(HelpText.HelpText1, 0, 5, 0, false));
        this.m_helps.push(new Help(HelpText.HelpText2, 1, 500, 155, true));
        this.m_helps.push(new Help(HelpText.HelpText3, 2, 5, 80, true));
    }

    getHelpAt(id : number) : Help | undefined {
        for(let i = 0; i < this.m_helps.length; i++) {
            if(id == this.m_helps[i].getId()) {
                return this.m_helps[i];
            }
        }

        return undefined;
    }

    getMaxId() : number {
        return (this.m_helps.length - 1);
    }
}