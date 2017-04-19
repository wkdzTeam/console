define(function() {
    return (function(){
        var global = {};

        //通过class来 获取元素
        global.getElementsByClassName = function (searchClass, node, tag) {
            if(document.getElementsByClassName){
                var nodes = (node || document).getElementsByClassName(searchClass),result = [];
                tag = tag || "*";
                for(var i=0 ;node = nodes[i++];){
                    if(tag !== "*" && node.tagName === tag.toUpperCase()){
                        result.push(node)
                    }else{
                        result.push(node)
                    }
                }
                return result;
            }else{
                node = node || document;
                tag = tag || "*";
                var classes = searchClass.split(" "),
                    elements = (tag === "*" && node.all)? node.all : node.getElementsByTagName(tag),
                    patterns = [],
                    result = [],
                    current,
                    match;
                var i = classes.length;

                while(--i >= 0){
                    patterns.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)"));
                }
                var j = elements.length;

                for(var b=0;b<j;b++){
                    current = elements[b];
                    match = false;
                    for(var k=0, kl=patterns.length; k<kl; k++){
                        match = patterns[k].test(current.className);
                        if (!match) break;
                    }
                    if (match) result.push(current);
                }
                return result;
            }
        };

        global.addClass = function(obj, cls){
            var obj_class = obj.className,//获取 class 内容.
                blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
            added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
            obj.className = added;//替换原来的 class.
        };

        global.removeClass = function(obj, cls){
            var obj_class = ' '+obj.className+' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc        bcd' -> ' abc        bcd '
            obj_class = obj_class.replace(/(\s+)/gi, ' '),//将多余的空字符替换成一个空格. ex) ' abc        bcd ' -> ' abc bcd '
                removed = obj_class.replace(' '+cls+' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
            removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
            obj.className = removed;//替换原来的 class.
        };

        global.hasClass = function(obj, cls){
            var obj_class = obj.className,//获取 class 内容.
                obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.
            x = 0;
            for(x in obj_class_lst) {
                if(obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
                    return true;
                }
            }
            return false;
        };

        global.trim = function(s){
            return s.replace(/(^\s*)|(\s*$)/g, "");
        };

        global.check = {
            isEmail: function(str){
                return(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(global.trim(str)));
            },
            isPhone: function(str){
                return(/(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/.test(global.trim(str)));
            },
            isUsername: function(str){
                return(/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(global.trim(str)));
            },
            isUrl: function(str){
                return(/^[\u4e00-\u9fa5A-Za-z0-9_]+$/.test(global.trim(str)));
            },
            isQQ: function(str){
                return(/[1-9][0-9]{4,}/.test(global.trim(str)));
            },
            isIDcard: function(str){
                return(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(global.trim(str)));
            }
        };

        global.addEventHandler = function(oTarget, sEventType, fnHandler) {
            if (oTarget.addEventListener) {
                oTarget.addEventListener(sEventType, fnHandler, false);
            } else if (oTarget.attachEvent) {
                oTarget.attachEvent("on" + sEventType, fnHandler);
            } else {
                oTarget["on" + sEventType] = fnHandler;
            }
        };


        return global;
    })();
})