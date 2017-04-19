/*--------------------------------------------------------------------------
    Author：zhengls
    date：2016-4-20

    使用方法：
    prmLayer.Alert({
        id: "123",
        title:"我是一个标题",
        htmlstr:"123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>",
        confirm: function(a){
            console.log(a);
            alert("您按了确定按钮！");
        },
        confirmtxt:"我是确定按钮",
        cancel: function(a){
            console.log(a);
            alert("您按了取消按钮！");
        },
        canceltxt:"我是取消按钮",
        ready: function(){
            alert("弹框加载完成！");
        },
        close: function(a){
            console.log(a);
            alert("您按了关闭按钮按钮！");
        }
    });
    prmLayer.Tip("我是内容！","success");
    prmLayer.Tip("我是内容！","danger");
    prmLayer.Tip("我是内容！","success");
--------------------------------------------------------------------------*/
define(["global"],function (global) {
    return (function (global) {
        var doc = document;

        var body = doc.getElementsByTagName("body")[0];
        var zhezhao = document.getElementById("prm-zhezhao");
        if(!zhezhao){
            zhezhao = doc.createElement("div");
            zhezhao.id = "prm-zhezhao";
            body.appendChild(zhezhao);
        }

        var showLog = function (msg) {
            try {
                console.log(msg);
            } catch (e) {
            }
        };

        alertArr = [];
        zIndex = 999;

        //检查页面中是否有已经打开的弹窗，如果有，必须保证新的弹出框在最高的那个上面
        var alertboxarr = global.getElementsByClassName("prmAlert",document);

        for(var i= 0,len=alertboxarr.length;i<len;i++){
            if(alertboxarr[i].style.display=="block"){
                if(alertboxarr[i].style.zIndex>zIndex){
                    zIndex = alertboxarr[i].style.zIndex;
                }
            }
        }




        var tip = function (msg, status) {
            var html = "";
            var statusname = status || "info";
            var tipBox = doc.getElementById("prmTip");

            if (tipBox) {

                tipBox.className = "prm_global_tip_" + statusname;
                var p = tipBox.getElementsByTagName("p");
                p[0].innerHTML = '<i class="icon"></i>' + msg;
                tipBox.style.display = "block";
            } else {

                tipBox = doc.createElement("div");
                tipBox.id = "prmTip";
                tipBox.className = 'prm_global_tip_' + statusname;

                html += '<div class="bd">';
                html += '<p class="msg"><i class="icon"></i>' + msg + '</p>';
                html += '</div>';

                tipBox.innerHTML = html;
                body.appendChild(tipBox);
                tipBox.style.display = "block";
            }

            window.setTimeout(function () {
                tipBox.style.display = "none";
            }, 3000);
        };

        var alert = function (data) {
            var json1 = {};

            if (arguments.length > 1) {
                json1["htmlstr"] = arguments[0];
                json1["title"] = arguments[1];
                json1["confirm"] = arguments[2];
                json1["cancel"] = arguments[3];
                json1["confirmtxt"] = arguments[4];
                json1["canceltxt"] = arguments[5];
            }
            else {
                json1 = arguments[0];
            }

            var json = json1;
            json.id = json1.id ? json1.id : 0;
            json.zhezhao = json1.zhezhao ? json1.zhezhao : true;

            if (!json.htmlstr) {
                showLog("弹出框内容不能为空！");
                return;
            }

            if (!json.title) {
                showLog("弹出框标题不能为空！");
                return;
            }

            //自定义按钮字体，如果没有定义，则使用确定和取消
            var txt1 = json.confirmtxt ? json.confirmtxt : "确定";
            var txt2 = json.canceltxt ? json.canceltxt : "取消";

            var html = '', t, prmalertbox;

            //如果传的参数中包含id说明这个弹出框是常驻类型的，点击关闭后不从文档中删掉
            if (json.id === 0) {
                t = +new Date;
            }
            else {
                t = json.id;

                prmalertbox = doc.getElementById('prmAlert' + t);
                if (prmalertbox) {
                    prmalertbox.style.display = "block";
                    if (json.zhezhao) {
                        //zhezhao = doc.getElementById("prm-zhezhao");
                        zhezhao.style.display = "block";
                        zhezhao.style.zIndex = zIndex;
                    }
                    return;
                }
            }

            //生成弹出框的框架
            html += '<div class="hd">';
            html += '<h4>' + json.title + '</h4>';
            html += '<span class="close">×</span>';
            html += '</div>';
            html += '<div class="box">';
            html += '<div class="bd">';
            html += json.htmlstr;
            html += '</div>';
            html += '<div class="fd">';

            //设置确认按钮的文字
            if (json.confirm) {
                html += '<a href="javascript:;" class="btn btn-confirm">' + txt1 + '</a>';
            }
            //设置取消按钮的文字
            if (json.cancel) {
                html += '<a href="javascript:;" class="btn btn-cancel">' + txt2 + '</a>';
            }
            html += '</div>';
            html += '</div>';

            //把弹出框添加到document中
            var alertbox = document.createElement('div');
            alertbox.id = 'prmAlert' + t;
            alertbox.className = "prmAlert";

            //如果有id，说明是常驻的，加上相关属性
            if (json.id === 0) {
                alertbox.setAttribute("data-stay", "no");
            } else {
                alertbox.setAttribute("data-stay", "yes");
            }
            alertbox.innerHTML = html;
            //把弹出框添加到document中
            var body = document.getElementsByTagName("body")[0];
            body.appendChild(alertbox);
            //弹出层要往上移
            zIndex += 5;
            //如果有id只要提高一层，如果是其他弹出框则提高一百层
            if (json.id === 0) {
                var addzindex = 1;
            }
            else {
                var addzindex = 100;
            }

            //把弹出层显示出来
            doc.getElementById('prmAlert' + t).style.display = "block";
            doc.getElementById('prmAlert' + t).style.zIndex = zIndex + addzindex;


            //如果要遮罩层，就把遮罩显示出来
            if (json.zhezhao) {
                zhezhao.style.display = "block";
                zhezhao.style.zIndex = zIndex;
            }


            //绑定"确认","取消","关闭"按钮事件
            var confirmbtn = global.getElementsByClassName("btn-confirm",doc.getElementById('prmAlert' + t));
            global.addEventHandler(confirmbtn[0],"click",function(){
                var result = json.confirm && json.confirm(doc.getElementById('prmAlert' + t));
                if (result !== false) hideAlert();
            });
            var closebtn = global.getElementsByClassName("close",doc.getElementById('prmAlert' + t));
            global.addEventHandler(closebtn[0],"click",function(){
                var result = json.close && json.close(doc.getElementById('prmAlert' + t));
                if (result !== false) hideAlert();
            });
            var cancelbtn = global.getElementsByClassName("btn-cancel",doc.getElementById('prmAlert' + t));
            global.addEventHandler(cancelbtn[0],"click",function(){
                var result = json.cancel && json.cancel(doc.getElementById('prmAlert' + t));
                if (result !== false) hideAlert();
            });

            //如果有定义ready事件，执行一下；
            json.ready && json.ready(doc.getElementById('chwAlert' + t));

            //隐藏或者删除弹出框的方法
            function hideAlert() {
                if (json.id === 0) {
                    doc.getElementById('prmAlert' + t).remove();
                } else {
                    doc.getElementById('prmAlert' + t).style.display = "none";
                }
                var prmalertarr = global.getElementsByClassName("prmAlert", doc);
                var stayNo = [];
                var topzindex =0;
                for (var i = 0, len = prmalertarr.length; i < len; i++) {

                    if (prmalertarr[i].style.display="block") {
                        if(prmalertarr[i].style.zIndex > topzindex){
                            topzindex = prmalertarr[i].style.zIndex;
                        }
                        stayNo.push(prmalertarr[i]);
                    }
                }

                console.log(stayNo);

                if (stayNo.length < 1) {
                    if (json.zhezhao) {
                        doc.getElementById("prm-zhezhao").style.display = "none";
                    }
                }
                else {
                    if (json.zhezhao) {
                        zIndex = topzindex -1;
                        doc.getElementById("prm-zhezhao").style.zIndex = zIndex;
                    }
                }

            }
        };

        return {
            Alert: alert,
            Tip: tip
        }
    })(global);
});