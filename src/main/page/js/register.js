(function(){

    var interfaceUrl = {
        register: "/prm/register/reg",
        sendMsg: "/prm/sms/sendMsg",
        checkUserIsExist: "/prm/register/checkUserIsExist",
		isExistUser:"/prm/auth/isExistUser"
        
    };
	
	angular.module('prmView', [
	    'angular-md5', // you may also use 'ngMd5' or 'gdi2290.md5'
	    'controllers'
	]);

	var mywebapp = angular.module('controllers', []);

	mywebapp.controller("formPost",['$scope','$http','$document','md5','$timeout',function($scope,$http,$document,md5,$timeout){

		$scope.getcodebtntext = "获取验证码";
		
		//联动块隐藏
		$scope.isShowPro = false;
		$scope.isShowCity = false;
		$scope.isChoicePC = false;
		
		
		$scope.isDanger = false;
		$scope.isSucc = false;
		
		//省模块 切换
		$scope.toggleProvince = function($event){
			$scope.isShowPro = !$scope.isShowPro;
			$scope.isShowCity = false;
			$event.stopPropagation();
		}
		
		//获取省的数据
		$http.get("/prm/page/tools/areaJson/province.html")
		 .then(function(response){
		 	$scope.provinceJson = response.data;
		 });
		
		// 省li点击事件 并加载城市数据
		$scope.choicePro = function(proId,proName){
			$document[0].getElementById("province").innerHTML = proName;
			$scope.inputPro = proName;
			$scope.isShowPro = false;
            $scope.inputCity = "";
			//加载城市数据
			$http.get("/prm/page/tools/areaJson/city/ct_"+proId+".html")
				.then(function(result){
					$scope.cityJson = result.data;
				});
		}
		
		//城市模块切换
		$scope.toggleCity = function($event){
			$scope.isShowCity = !$scope.isShowCity;
			$scope.isShowPro = false;
			$event.stopPropagation();
		}
		
		
		//城市li点击事件
		$scope.choiceCity = function(cityName){
			if(cityName && typeof cityName != "undefined"){
				$document[0].getElementById("city").innerHTML = cityName;
				$scope.inputCity = cityName;
				$scope.isShowCity = false;
				$scope.isChoicePC = true;
			} else {
				$scope.isChoicePC = false;
			}
		}
		
		// 点击空白隐藏省市弹框
		$scope.hideLD = function(){
			$scope.isShowPro = false;
			$scope.isShowCity = false;
		}
		
		$scope.checkPwd1  = function(){
			var p1 = $scope.npwd,
				p2 = $scope.opwd || null;
			if(p2 != null){
				if(p1 == p2){
					$scope.isSucc = true;
					$scope.isDanger = false;
				} else {
					$scope.isDanger = true;
					$scope.isSucc = false;
				}
			}
		}
		
		$scope.checkPwd2  = function(){
			var p1 = $scope.npwd,
				p2 = $scope.opwd;
			if(p1 == p2 && p2.length>0){
				$scope.isSucc = true;
				$scope.isDanger = false;
			} else {
				$scope.isDanger = true;
				$scope.isSucc = false;
			}
		}
		
		
		$scope.submitReg = function(){
			var formdata = {
				"mobile": $scope.user,
				"pwd": md5.createHash($scope.npwd),
				"realName": $scope.rname,
				"phoneCode": $scope.code,
				"idCardNo": $scope.personId,
				"area": $scope.inputPro+'-'+$scope.inputCity+'-'+$scope.area
			}
			$http.post(interfaceUrl.register,formdata)
				.success(function(data){console.log(data);
					if(data.code == "0000"){
						require(['alert'],function(layer){
							layer.Tip("注册成功","success");
							$timeout(function(){
								window.location.href = "/prm/page/login.html#/jxs";
							},2000);
						});
					} else {
						alert(data.msg);
					}
				});
		};

        //获取验证码
		$scope.getCode = function(){
            if($scope.user){
                var second = 121;
                $scope.getcodebtndisabled = true;

                var counting = function(){
                    second -= 1;
                    if(second < 0){
                        $scope.getcodebtndisabled = false;
                        $scope.getcodebtntext = "获取验证码";
                    }else{
                        $scope.getcodebtntext = second+"s";
                        $timeout(function(){
                            counting();
                        },1000);
                    }
                }

				Ntprm.common.checkverifiy(function(code){
					counting();

					$http.post(interfaceUrl.sendMsg,{
						sendType: 1,
						phoneNO: $scope.user,
						code: code
					}).success(function(data){
						require(["alert"],function(layer){
							if(data.code === "0000"){
								layer.Tip("发送验证码成功","success");
							}else{
								layer.Tip("发送验证码失败，请稍后再试！","danger");
							}
						});
					});
				});

            }else{
                $scope.showusertip = true;
            }
		};
	}]);

	mywebapp.directive('ngBlur', function(){
        return function(scope, element, attr){
            element.bind("blur",function(){
                scope.$apply(function (){
                    scope.$eval(attr.ngBlur);
                });

                event.preventDefault();
            });
        }
    });

	//手机号码验证
	mywebapp.directive('mobileNumber',function(){
		var phone = /^1[3|4|5|7|8]\d{9}$/;
		return {
			require: 'ngModel',
			link: function(scope, element, viewValue, ctrl) {
				ctrl.$parsers.push(function(viewValue) {

					if(viewValue && isNaN(viewValue)){
						var str="";
						for(var i= 0,len=viewValue.length;i<len;i++){
							if(!isNaN(viewValue[i])){
								str+=viewValue[i];
							}
						}
						viewValue = str;
						element[0].value = viewValue;

					}
					if (phone.test(viewValue)) {
						ctrl.$setValidity('mobileNumber', true);
					} else {
						ctrl.$setValidity('mobileNumber', false);
					}
					return viewValue;


				});
			}
		};
	});

	mywebapp.directive('censorMobile',function($http,$timeout){
		var dosearch;
		return {
			require: 'ngModel',
			link: function(scope, element, attrs, ctrl) {
				var statue = attrs.censorMobile;

				ctrl.$formatters.push(function(viewValue){
					if (statue == "manually") {
						if(viewValue){
							if(scope.censorMobileIsClose==true){
								ctrl.$setValidity('censorMobile', true);
								ctrl.$setValidity('mobileNumber', true);
							}
						}else{
							ctrl.$setValidity('mobileNumber', false);
						}
					}
					return viewValue;
				})


				ctrl.$parsers.push(function(viewValue){
					if(viewValue && !isNaN(viewValue)){
						if(dosearch){
							$timeout.cancel(dosearch);
						}
						dosearch = $timeout(function() {

							$http.post(interfaceUrl.isExistUser, {
								mobile: viewValue
							}).success(function (data) {
								if (data.code == "0000") {
									ctrl.$setValidity('censorMobile', true);
								} else if (data.code == "00301") {
									ctrl.$setValidity('censorMobile', false);
								}
								else {
									ctrl.$setValidity('censorMobile', true);
									require(['alert'], function (layer) {
										layer.Tip(data.msg);
									})
								}
							});
						},800);

					}
					return viewValue;
				});

			}
		}

	});



	mywebapp.directive('personid',function(){
		var personid = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;

		return {
			require: 'ngModel',
			link: function(scope, element, attrs, ctrl) {
				ctrl.$parsers.push(function(viewValue) {

					if (personid.test(viewValue)) {
						ctrl.$setValidity('personid', true);
						return viewValue;
					} else {
						ctrl.$setValidity('personid', false);
						return viewValue;
					}
				});
			}
		};
	});

	mywebapp.directive('censorPersonid',function($http){
		
		return {
			require: 'ngModel',
			link: function(scope, element, attrs, ctrl) {
				ctrl.$parsers.push(function(viewValue) {
					if (viewValue && viewValue.length>=15) {
						$http.post(interfaceUrl.isExistUser,{
							idCardNo: viewValue
						}).success(function(data){
							if(data.code == "0000"){
								ctrl.$setValidity('censorPersonid', true);
							} else if(data.code == "00301") {
								ctrl.$setValidity('censorPersonid', false);
							}
							else{
								ctrl.$setValidity('censorPersonid', true);
							}
						});
					}
					return viewValue;
				});
			}
		};
	});

	mywebapp.directive('chinese',function($http){
		function isChinese(temp)
		{
			var re=/[^\u4e00-\u9fa5]/;
			if(re.test(temp)) return false;
			return true;
		}

		return {
			require: 'ngModel',
			link: function(scope, element, attrs, ctrl) {
				ctrl.$parsers.push(function(viewValue) {

					if (isChinese(viewValue)) {
						ctrl.$setValidity('chinese', true);
						return viewValue;
					} else {
						ctrl.$setValidity('chinese', false);
						return viewValue;
					}
				});
			}
		};
	});
	

}());
