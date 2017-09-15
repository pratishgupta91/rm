class ContentHeuristics {
     
    GenerateElements(rootElem : HTMLElement) {

        // step 1 : Find content root
        let root = this.FindContentRoot(rootElem);


    }

    FindContentRoot(root : HTMLElement) : HTMLElement | undefined {
        
        // Step1 : Find heading and heading RT
        let collection = this.FindElements(root, ElemTypes.H1);
        collection.concat(this.FindElements(root, ElemTypes.h1));

        // Store the tree of first h1 heading
        if(collection.length == 0){
            return undefined;
        }

        let headingElem = collection[0 /*firstHeading*/];
        let headingRT = this.GetReverseTree(headingElem);

        // Step2 : Find paragraph and paragraph RT
        let paras = this.FindParagraphs(root);

        if(paras.length == 0) {
            return undefined;
        }

        let lca = -1;
        let lcaElem;

        for(let i = 0; i < paras.length; i++) {
            let rt = this.GetReverseTree(paras[i]);

            let curMax = 0;
            for(let j = 0; j < rt.length && j < headingRT.length; j++) {
                if(rt[j] == headingRT[j]) {
                    ++curMax;
                }
                else {
                    if(curMax > lca) {
                        lca = curMax;
                    }
                    break;
                }
            }
        }

        if(lca != -1) {
            return headingRT[lca];
        }

        return undefined;
        
    }

    FindParagraphs(root : HTMLElement) : HTMLElement[] {
        let paras = this.FindElements(root, ElemTypes.P);
        paras.concat(this.FindElements(root, ElemTypes.p));

        let sanitizedPara = new Array<HTMLElement>();
        if(paras.length > 0) {
            for(let i = 0; i < paras.length; i++) {
                if(this.IsParagraph(paras[i])) {
                    sanitizedPara.push(paras[i]);
                }
            }
        }

        return sanitizedPara;
    } 

    IsParagraph(elem : HTMLElement) : boolean {
        let content = elem.innerText;

        // Should contain atleast one sentence
        if(content.split(".").length == 1) {
            return false;
        }
        return true;
    }

    FindElements(root : HTMLElement, elemType : ElemTypes) : HTMLElement[] {
        let collection = new Array<HTMLElement>();

        let paragraph = [];
        let arr = [];
        let cur;
        arr.push(root);

        while(arr.length > 0) {

            cur = arr[0] as HTMLElement;
            if(cur.nodeName == elemType) {
                collection.push(cur);
            }

            arr.splice(0, 1);          
            for(let i = 0; i < cur.childElementCount; i++) {
                arr.push(cur.children.item(i));
            }

        }
        
        return collection;
    }

    GetReverseTree(curElem : HTMLElement) : HTMLElement[] {
        let collection = new Array<HTMLElement>();
        collection.push(curElem);

        while(curElem.parentElement) {
            collection.splice(0, 0, curElem.parentElement);
            curElem = curElem.parentElement;
        }

        return collection;
    }
}