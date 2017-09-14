class JqueryHelper {
    static animateVertically(delta : number, speed : number, className : string) : void {
        className = '.' + className;
        let deltaInString = "+=" + delta;
        let elem = $(className);
        elem.animate({bottom: deltaInString}, speed);
    }

    static getChildAt(index : number, parentClassName : string) : HTMLElement {
        let parentElem = $("." + parentClassName);
        let child = parentElem.children().eq(index);
        return child.get(0);
    }

    static makeListSortable(className : string, callback : (start : number, end : number) => void) : void {
        let elem = $("." + className);
        elem.sortable(
            {
                revert : true,
                axis : 'x',
                start: function(event, ui) {
                    if(!elem.hasClass('disable-hover')) {
                        elem.addClass('disable-hover')
                    }

                    var start_pos = ui.item.index();
                    ui.item.data('start_pos', start_pos);
                },
                update: function (event, ui) {
                        var start_pos = ui.item.data('start_pos');
                        var end_pos = ui.item.index();
                        callback(start_pos, end_pos);
                }, 
                stop : function (event, ui) {
                        elem.removeClass('disable-hover');
                }
            }
        );

        elem.disableSelection();
    }
}