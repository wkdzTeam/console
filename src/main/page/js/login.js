(function(){

    var interfaceUrl = {
        login: "/prm/auth/login",
        islogin: "/prm/auth/isLogin",
        checkVerifiyCode: "/prm/login/checkVerifiyCode",
        sendMsg: "/prm/sms/sendMsg",
        findPwd: "/prm/register/findPwd"
    };

    angular.module('prmView', [
        'angular-md5', // you may also use 'ngMd5' or 'gdi2290.md5'
        'controllers'
    ]);

    var mywebapp = angular.module("controllers", []);

    mywebapp.controller("formPost", ['$scope', '$http', '$document','md5', '$location', function ($scope, $http, $document, md5, $location) {

        if($location.path()=="/jxs"){
            $scope.showregister = true;
        }else{
            $scope.showregister = false;
        }

        //判断是否登录
        $http.post(interfaceUrl.islogin).success(function(data){

            if(data.code === "0000"){
                window.location.href = "/prm/page/index.html#/personal";
            }
        });

        //验证码状态
        $scope.iscodesuccess = "";
        //登录事件
        $scope.login = function () {
            if(!$scope.loginForm.$valid || $scope.iscodesuccess === "error"){
                return;
            }
            var formdata = {
                "userName": $scope.inputEmail,
                "pwd": md5.createHash($scope.inputPassword),
                "code": $scope.code
            };

            
            $http.post(interfaceUrl.login, formdata)
                .success(function (data) {
                    if(data.code=="0000"){
                        window.location.href = "/prm/page/index.html#/personal";
                    }else{
                        require(['alert'],function(layer){
                            layer.Tip(data.msg,"danger");
                        });
                    }
                });

        };
        //更换验证码
        $scope.changecodeimg = function () {
            var t = +new Date();
            $document[0].getElementById("codeimg").src = "/prm/login/getVerifiyCode?t=" + t;
            $scope.code="";
        };
        //验证验证码
        $scope.checkcode = function () {
            if ($scope.code && $scope.code.length == 4) {
                $http.post(interfaceUrl.checkVerifiyCode, {
                    code: $scope.code
                }).success(function (data) {
                    if (data.code === "0000") {
                        $scope.iscodesuccess = "success";
                    } else {
                        $scope.iscodesuccess = "error";
                    }
                })
            } else {
                $scope.iscodesuccess = "";
            }
        }
        $scope.forgetPwd = function(){
            document.getElementById("prmAlert001").style.display = "block";
            document.getElementById("prm-zhezhao").style.display = "block";
        }
    }]);


    mywebapp.controller("foundPwd",['$scope','$http','$timeout', 'md5', function($scope, $http, $timeout,md5){
        $scope.getcodebtntext = "获取验证码";
        $scope.issame = false;

        $scope.$watch('newPwd2',function(){
            if($scope.newPwd1 === $scope.newPwd2){
                $scope.issame = true;
            }else{
                $scope.issame = false;
            }
        });

        //获取验证码
        $scope.getCode = function(){
            if($scope.mobile){

                var second = 61;
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
                        sendType: 2,
                        phoneNO: $scope.mobile,
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
        }


        //提交密码修改
        $scope.changePwd = function(){
            if($scope.issame){
                var data = $scope;

                $http.post(interfaceUrl.findPwd,{
                    mobile: $scope.mobile,
                    phoneCode: $scope.phoneCode,
                    newPwd1: md5.createHash($scope.newPwd1),
                    newPwd2: md5.createHash($scope.newPwd2)
                }).success(function(data){
                    require(['alert'],function(layer){
                        if(data.code == "0000"){
                            layer.Tip("修改密码成功","success");
                        }else{
                            layer.Tip("修改密码失败","danger");
                        }
                        document.getElementById("prmAlert001").style.display = "none";
                    });
                });
                document.getElementById("prm-zhezhao").style.display = "none";
            }
        }

        $scope.giveup = function(){
            document.getElementById("prmAlert001").style.display = "none";
            document.getElementById("prm-zhezhao").style.display = "none";
        }
    }]);


    mywebapp.directive('mobileNumber',function(){
        var phome = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.push(function(viewValue) {
                    if (phome.test(viewValue)) {
                        ctrl.$setValidity('mobileNumber', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('mobileNumber', false);
                        return viewValue;
                    }
                });
            }
        };
    });

    mywebapp.directive('myEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown", function (event) {
                var keycode;//兼容ie8,
                if(event.which){
                    keycode = event.which;
                }else if(event.keyCode){
                    keycode = event.keyCode;
                }

                if(keycode === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.myEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });

})();


