

class CommandHandler {
    protected m_viewEvent: EventDispatcher<CommandHandler, any>;

    constructor() {
        this.m_viewEvent = new EventDispatcher<CommandHandler, any>();
    }

    // execute different commands
    execute(data : any) : void {
        this.m_viewEvent.dispatch(this, data);
    }

    get getDispatcher(): IEvent<CommandHandler, any> {
        return this.m_viewEvent;
    }
}