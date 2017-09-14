class Video {
    m_url : string;
    m_title : string;
    m_thumbnail : string;
    m_id : number;

    constructor(url : string, title : string, thumbnail : string, id : number) {
        this.m_url = url;
        this.m_title = title;
        this.m_thumbnail = thumbnail;
        this.m_id = id;
    }

    public GetURL() : string {
        return this.m_url;
    }

    public GetTitle() : string {
      return this.m_title;
    }

    public GetThumbnail() : string {
        return this.m_thumbnail;
    }

    public getId() : number {
        return this.m_id;
    }
}
