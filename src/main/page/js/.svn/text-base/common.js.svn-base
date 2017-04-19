//全局命名空间；
var Ntprm = {};

Ntprm.Pagecontroller = {};

Ntprm.logindata = {};

Ntprm.common = {
	"converDate":function(s){
		if(arguments.length == 1){
			var ds = new Date(s);
			var year = ds.getFullYear(),
				month = ds.getMonth()+1,
				day = ds.getDate(),
				hours = ds.getHours(),
				minutes = ds.getMinutes(),
				second = ds.getSeconds();
			if(month < 10){
				month = "0"+month;
			}
			if(day < 10){
				day = "0"+day;
			}
			if(hours < 10){
				hours = "0"+hours;
			}
			if(minutes < 10){
				minutes = "0"+minutes;
			}
			if(second < 10){
				second = "0"+second;
			}
			return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+second;	
		} else {
			return null;
		}
	},
	checkverifiy : function(cb){
		var iscodetrue = false;
		require(['alert'],function(layer){
			layer.Alert({
				title:"输入验证码",
				htmlstr:'<div class="prm-form checkverifiyform"><div class="prm-form-group"><div class="form-group-content"><input type="text" id="checkverifiy" name="code" placeholder="请输入验证码" ></div><div class="inputstatue"><span>请输入验证码</span></div></div><div class="prm-form-group"><img id="checkverifiyimg" src="/prm/login/getVerifiyCode" alt="验证码"></div></div>',
				confirm: function(){
					var inputval = document.getElementById("checkverifiy").value;
					if(!iscodetrue){
						require(["alert"],function(layer){
							layer.Tip("您输入的验证码有误，请从新输入！","danger");
						});
						return iscodetrue;
					}
					cb && cb(inputval);
					return iscodetrue;
				},
				cancel: function(){
					return true;
				},
				ready: function(){
					var img = document.getElementById("checkverifiyimg");
					img.onclick = function(){
						var t = +new Date();
						img.setAttribute("src","/prm/login/getVerifiyCode?t=" + t);
					}

					var inputbox = document.getElementById("checkverifiy");

					inputbox.onkeyup = function(){
						var inputval = inputbox.value;

						if(inputval && inputval.length==4){
							var postData = {"code": inputval};

							var xhr = new XMLHttpRequest();

							xhr.open("POST", "/prm/login/checkVerifiyCode", true);
							xhr.setRequestHeader("Content-type","application/json;charset=UTF-8");
							xhr.onreadystatechange = function(){
								var XMLHttpReq = xhr;
								if (XMLHttpReq.readyState == 4) {
									if (XMLHttpReq.status == 200) {
										var text = XMLHttpReq.responseText;

										var data = JSON.parse(text);
										var prmgroup = inputbox.parentNode.parentNode;
										if(data.code == "0000"){
											require(["global"],function(global){
												global.removeClass(prmgroup,"error");
												global.addClass(prmgroup,"success");
											});
											iscodetrue = true;
										}else{
											require(["global"],function(global){
												global.addClass(prmgroup,"error");
												global.removeClass(prmgroup,"success");
											});
											iscodetrue = false;
										}
									}
								}
							};
							xhr.send(angular.toJson(postData));
						}else{
							require(["global"],function(global){
								var prmgroup = inputbox.parentNode.parentNode;
								global.removeClass(prmgroup,"error");
								global.removeClass(prmgroup,"success");
								iscodetrue = false;
							});
						}
					}
				}
			})
		});
	}
	
};

(function(){
	require(["global"],function(global){
		var browser=navigator.appName
		var b_version=navigator.appVersion
		var version=b_version.split(";");
		var trim_Version=version[1].replace(/[ ]/g,"");
		if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0"){
			var wrapper = global.getElementsByClassName("wrapper",document);
			global.addClass(wrapper[0],"ie8");
		}
	})
})();


