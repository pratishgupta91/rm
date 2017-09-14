class VideoBoxElement extends Elem{
    private m_video : Video;
    private m_cpElement : VideoBoxCPElement;
    private m_titleElement : Elem;
    private m_imgElement : Elem;

    constructor(video: Video, commandHandler : CommandHandler) {
        super(Resources.VideoBox, ElemTypes.getLI());
        this.m_video = video;

        this.m_imgElement = this.createImageElement();
        this.m_titleElement = this.createTitleElement();
        this.m_cpElement = new VideoBoxCPElement(commandHandler);

        this.m_elem.onmouseenter = (e : MouseEvent) => {
            this.m_imgElement.get().style.opacity = "0.6";
            this.m_titleElement.get().style.opacity = "0.6";
            this.m_cpElement.get().style.display = "block";
        }

         this.m_elem.onmouseleave = (e : MouseEvent) => {
            this.m_imgElement.get().style.opacity = "1";
            this.m_titleElement.get().style.opacity = "1";
            this.m_cpElement.get().style.display = "none";
        }
    }

    addChildIfAny() {
        // Add image and title
        this.m_elem.appendChild(this.m_imgElement.get());
        this.m_elem.appendChild(this.m_titleElement.get());
        this.m_elem.appendChild(this.m_cpElement.get());
        this.m_cpElement.addChildIfAny();
    }

    private createImageElement() : Elem {
        let thumbnailImage  = new Elem(Resources.VideoBoxImage, ElemTypes.getImg());
        thumbnailImage.get().setAttribute(Attributes.src, this.m_video.GetThumbnail());
        return thumbnailImage;
    }

    private createTitleElement() : Elem {
        let titleElement = new Elem(Resources.VideoBoxTitle, ElemTypes.getDiv());
        titleElement.get().innerHTML = this.m_video.GetTitle();
        return titleElement;
    }
}
