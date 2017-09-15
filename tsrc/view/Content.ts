class ContentClass {

    constructor() {
        //alert("hola");
        let body = document.body;
        //this.LOT(body);
        let ch = new ContentHeuristics();
        ch.GenerateElements(document.body);

    }

    // public LOT(root : HTMLElement) : void {
    //     let paragraph = [];
    //     let arr = [];
    //     let cur;
    //     arr.push(root);

    //     while(arr.length > 0) {

    //         cur = arr[0] as HTMLElement;
    //         //console.log(cur.nodeName);
    //         if(cur.nodeName == "p" || cur.nodeName == "P") {
    //             console.log(cur);
    //             paragraph.push(cur);
    //         }

    //         arr.splice(0, 1);          
    //         for(let i = 0; i < cur.childElementCount; i++) {
    //             arr.push(cur.children.item(i));

    //         }

    //     }

    //     while(root.hasChildNodes()) {
    //         root.removeChild(root.lastChild);
    //     }

    //     root.classList.add("rm-content")

    //     for(let i = 0; i < paragraph.length; i++) {
    //         paragraph[i].classList.add("rm-para")
    //         root.appendChild(paragraph[i]);
    //     }
    // }

}