class Tab {
    private m_url : string;
    private m_instanceId : number;

    constructor(instanceId : number, url: string) {
        this.m_instanceId = instanceId;
        this.m_url = url;
    }

    getUrl() : string {
        return this.m_url;
    }

    getInstanceId() : number {
        return this.m_instanceId;
    }
}