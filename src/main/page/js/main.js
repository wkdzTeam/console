(function(angular){

    //接口
    var interfaceUrl = {
        loginOut: "/prm/auth/loginOut",
        islogin: "/prm/auth/isLogin",
        checkUserIsExist: "/prm/register/checkUserIsExist",
        isExistUser: "/prm/auth/isExistUser"
    };

    angular.module('prmView', [
        'angular-md5', // you may also use 'ngMd5' or 'gdi2290.md5'
        'controllers'
    ]);

    //页面路由
    var mywebapp = angular.module('controllers',[], function($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
            templateUrl: './template/advancePayment.html',
            controller: Ntprm.Pagecontroller.advancePayment
        });

        $routeProvider.when('/advancePayment', {
            templateUrl: './template/advancePayment.html',
            controller: Ntprm.Pagecontroller.advancePayment
        });

        $routeProvider.when('/sale', {
            templateUrl: './template/sale.html',
            controller: Ntprm.Pagecontroller.sale
        });

        $routeProvider.when('/refund', {
            templateUrl: './template/refund.html',
            controller: Ntprm.Pagecontroller.refund
        });

        $routeProvider.when('/transaction', {
            templateUrl: './template/transaction.html',
            controller: Ntprm.Pagecontroller.transaction
        });

        $routeProvider.when('/customer', {
            templateUrl: './template/customer.html',
            controller: Ntprm.Pagecontroller.customer
        });

        $routeProvider.when('/personal', {
            templateUrl: './template/personal.html',
            controller: Ntprm.Pagecontroller.personal
        });

        $routeProvider.otherwise({
            redirectTo: "/advancePayment"
        });

        // use the HTML5 History API
        //$locationProvider.html5Mode(true);
    });

    mywebapp.factory("process",function(){
        return {
            advancePayment: null,
            sale: null,
            refund: null,
            transaction: null,
            customer: null,
            personal: null
        };
    });

    mywebapp.factory("prmuserinfo",function(){
        return {
            info: null
        };
    });

    //登录模块，及页面判断是否已经登录
    mywebapp.controller("toolBar",['$scope','$http','prmuserinfo',function($scope,$http,prmuserinfo){
        //判断是否登录
        $http.post(interfaceUrl.islogin).success(function(data){

            if(data.code === "00302"){
                window.location.href = "/prm/page/login.html";
            } else if(data.code === "0000"){
                prmuserinfo.info = data.result;
            }
        });

        $scope.loginOut = function(){

            $http.post(interfaceUrl.loginOut).success(function(data){
                if(data.code === "0000"){
                    if(prmuserinfo.info.type==1){
                        window.location.href = "/prm/page/ls";
                    }else{
                        window.location.href = "/prm/page/jxs";
                    }

                }
            });
        }
    }]);


    //侧边栏切换效果
    mywebapp.controller("mainNav",function($scope,$location){

        $scope.navurl = [
            {"name":"预付款管理","className":"active","url":"advancePayment"},
            {"name":"销售管理","className":"","url":"sale"},
            {"name":"退款管理","className":"","url":"refund"},
            {"name":"交易明细","className":"","url":"transaction"},
            {"name":"客户管理","className":"","url":"customer"},
            {"name":"个人信息","className":"","url":"personal"}
        ];

        $scope.liclick = function(index){

            angular.forEach($scope.navurl,function(value,key){
                if(key === index){
                    value.className = "active";
                }else{
                    value.className = "";
                }
            });

        };

        var pageName = $location.path().replace("/","");

        if(pageName==""){
            for(var i= 0,len=$scope.navurl.length;i<len;i++){
                $scope.navurl[i].className = "";
            }
            $scope.navurl[0].className = "active";
            return;
        }
        for(var i= 0,len=$scope.navurl.length;i<len;i++){
            if($scope.navurl[i].url === pageName){
                $scope.navurl[i].className = "active";
            }else{
                $scope.navurl[i].className = "";
            }
        }

    });

    //手机号码验证
    mywebapp.directive('mobileNumber',function(){
        var phone = /^1[3|4|5|7|8]\d{9}$/;
        return {
            require: 'ngModel',
            link: function(scope, element, viewValue, ctrl) {
                ctrl.$parsers.push(function(viewValue) {

                    if(isNaN(viewValue) && viewValue){
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

    //给input加上censorMobile的属性，就能够检查手机是否存在了，如果censorMobile的值是“manually”时，如果父级有scope.censorMobileIsClose且值为true，初始化的时候默认检查结果为真；
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
                });


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

    //给input加上censorPersonid的属性，就能够检查身份证是否存在了，如果censorPersonid的值是“manually”时，如果父级有scope.censorPersonidIsClose且值为true，初始化的时候默认检查结果为真；
    mywebapp.directive('censorPersonid',function($http,$timeout){
        var dosearch;

        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                var statue = attrs.censorPersonid;

                ctrl.$formatters.push(function(viewValue){
                    if (statue == "manually") {
                        if(viewValue){
                            if(scope.censorPersonidIsClose==true){
                                ctrl.$setValidity('censorPersonid', true);
                                ctrl.$setValidity('personid', true);
                            }
                        }else{
                            ctrl.$setValidity('personid', false);
                        }
                    }
                    return viewValue;
                });


                ctrl.$parsers.push(function(viewValue) {
                    if(dosearch){
                        $timeout.cancel(dosearch);
                    }
                    dosearch = $timeout(function() {
                        if (viewValue) {
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
                    },800);
                    return viewValue;
                });
            }
        };
    });

    mywebapp.directive('nousername',function($timeout,$http){
        var dosearch;
        return{
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl){
                ctrl.$parsers.push(function(viewValue){
                    if(dosearch){
                        $timeout.cancel(dosearch);
                    }
                    dosearch = $timeout(function(){
                        $http.post(interfaceUrl.isExistUser,{
                            username: viewValue
                        }).success(function(data){
                            console.log(data);
                            if(data.code=="0000"){
                                ctrl.$setValidity('nousername', true);
                            }else{
                                ctrl.$setValidity('nousername', false);
                                
                                require(['alert'], function (layer) {
				                    layer.Tip("账号名称已被注册", "danger");
				                });
                            }
                        })
                        
                    },1000);
                    return viewValue;
                });
            }
        }
    });

    mywebapp.directive('chinese',function(){
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



    //失去焦点事件
    mywebapp.directive('ngBlur', function(){
        return function(scope, element, attr){
            element.bind("blur",function(){
                scope.$apply(function (){
                    scope.$eval(attr.ngBlur);
                });

                return false;
            });
        }
    });
    //获得焦点
    mywebapp.directive('ngFocus', function(){
        return function(scope, element, attr){
            element.bind("focus",function(){
                scope.$apply(function (){
                    scope.$eval(attr.ngFocus);
                });

                return false;
            });
        }
    });

    //敲回车事件
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

    //查询客户信息控件
    //使用方法：
    //<div class="customersearchbox" search-customer customer="alert"  searchtype="all"></div>
    //customer会和搜索的结果进行双向绑定
    // customer里的属性有[realName,mobile,id,idcardno,roleid,province,city,area,pid,type];
    // searchtype为all时查询所有的用户，为my的时候查询我名下的用户
    mywebapp.directive('searchCustomer',['$http','prmuserinfo',function($http,prmuserinfo){
        return {
            restrict: 'AE',
            template: '<input class="prm-form-control" type="text" ng-readonly="customer.isReadonly" placeholder="输入用户真实姓名" ng-focus="focusevent()" ng-change="changeEvent()" ng-keydown="pressevent($event)" ng-blur="lostfocus()" ng-model="customer.realName" /><div ng-class="{customerlistbox:true,hidden:!customerlist.length}"><ul><li ng-class="{active:active===$index}" ng-repeat="customer in customerlist" ng-click="choicecustomer(customer)">{{customer.realName}}&nbsp;&nbsp;{{customer.mobile}}</li></ul></div>',
            scope:{
                customer: '='
            },
            controller: function($scope,$timeout){
                $scope.customerlist = [];
                $scope.customer={};
                $scope.old="";
                $scope.active = null;

                $scope.search = function(){
                    if($scope.customer && $scope.customer.realName){
                        if($scope.customer.closeAssociation){//关闭联想功能
                            return;
                        }

                        //如果输入的名字没有变化，而且已经查出了结果，那就不要请求了
                        if($scope.old == $scope.customer.realName && $scope.customer.mobile){
                            return;
                        }
                        $scope.customer.mobile = "";
                        var postdata;
                        if($scope.searchUrl == '/prm/auth/getUserByCondition'){
                            postdata = {
                                "userName":$scope.customer.realName,
                                "type": prmuserinfo.info.type
                            };
                        }else{
                            postdata = {"userName":$scope.customer.realName}
                        }
                        $http.post($scope.searchUrl,postdata)
                        .success(function(data){
                            if(data.code == '0000'){
                                $scope.old = $scope.customer.realName;
                                if(data.result.length){
                                    $scope.customerlist = data.result;
                                    $scope.active = 0;
                                }else{
                                    $scope.customerlist.length = 0;
                                    $scope.customer = {};
                                    $scope.customer.realName = $scope.old;
                                    $scope.customer.mobile = null;
                                }
                            }
                        });
                    }
                };

                $scope.lostfocus = function(){
                    $timeout(function(){
                        $scope.customerlist.length = 0;
                        $scope.active = null;
                    },220);
                };

                $scope.focusevent = function(){
                    if($scope.customer.realName && $scope.customer.realName.length>0){
                        $scope.search();
                    }
                };

                $scope.changeEvent = function(){
                    if(!$scope.customer.closeAssociation){
                       // $scope.customer = undefined;
                        $scope.customer.mobile = undefined;
	                    $scope.customer.id = undefined;
	                    $scope.customer.idcardno = undefined;
	                    $scope.customer.roleid = undefined;
	                    $scope.customer.province = undefined;
	                    $scope.customer.city = undefined;
	                    $scope.customer.area = undefined;
	                    $scope.customer.pid = undefined;
	                    $scope.customer.type = undefined;
                    }
                    if($scope.customer && $scope.old != $scope.customer.realName){
                        $scope.old = "";
                        $scope.customerlist.length = 0;
                    }
                    if($scope.t){
                        $timeout.cancel($scope.t);
                    }

                    $scope.t = $timeout(function(){
                        $scope.search();
                    },800);
                };

                $scope.choicecustomer = function(customer){
                    $scope.customer.realName = customer.realName;
                    $scope.customer.mobile = customer.mobile;
                    $scope.customer.id = customer.id;
                    $scope.customer.idcardno = customer.idCardNo;
                    $scope.customer.roleid = customer.roleId;
                    $scope.customer.province = returnAddress(customer.area,0);
                    $scope.customer.city = returnAddress(customer.area,1);
                    $scope.customer.area = returnAddress(customer.area,2);
                    $scope.customer.pid = customer.idCardNo;
                    $scope.customer.type = customer.type;
                    $scope.customerlist.length = 0;
                };


                $scope.pressevent = function(keyEvent){
                    var keycode;//兼容ie8，ie8里为keycode；
                    if(keyEvent.which){
                        keycode = keyEvent.which;
                    }else if(keyEvent.keyCode){
                        keycode = keyEvent.keyCode;
                    }

                    if($scope.customerlist.length>0 && (keycode==38 || keycode == 40 || keycode == 13)){
                        if($scope.active==null){
                            $scope.active = 0;
                        }else{
                            if(keycode==38){
                                if($scope.active>0){
                                    $scope.active -= 1;
                                }else if($scope.active==0){
                                    $scope.active = $scope.customerlist.length-1;
                                }
                            }
                            else if(keycode==40){
                                if($scope.active<$scope.customerlist.length-1){
                                    $scope.active += 1;
                                }else if($scope.active=$scope.customerlist.length-1){
                                    $scope.active = 0;
                                }
                            }
                            else if(keycode==13){
                                $scope.choicecustomer($scope.customerlist[$scope.active]);
                                $scope.active = null;
                            }
                            if($scope.active >= 2){
                                $scope.customerlistbox.scrollTop = 34 * ($scope.active-2);
                            }else{
                                $scope.customerlistbox.scrollTop = 0;
                            }
                        }
                    }else if(keycode == 13 && ($scope.old != $scope.customer.realName || !$scope.customer.mobile)){
                        if(!$scope.customer.closeAssociation && $scope.old != $scope.customer.realName){
                            return;
                        }
                        $scope.search();
                        $timeout.cancel($scope.t);
                    }
                    return false;
                }

                var returnAddress = function(a,t){
                    var d = (a || "").split('-');
                    if(d[t]){
                        return d[t];
                    } else {
                        return null;
                    }
                }

            },
            link: function($scope, element, attrs){
                if(attrs.searchtype && attrs.searchtype == "all"){
                    $scope.searchUrl = '/prm/auth/getUserByCondition';
                }
                else{
                    $scope.searchUrl = '/prm/auth/getMyUsers';
                }
                var customerlistbox = element.parent().find("div")[1];
                $scope.customerlistbox = customerlistbox;

            }
        }
    }]);


    ////翻页控件
    //mywebapp.directive('pagination',function(){
    //    return {
    //        restrict: 'AE',
    //        template: '<div class="paging-btn"><a href="javascript:void(0)" ng-click="table.firstpage()">首页</a><a href="javascript:void(0)" ng-click="table.prepage()">上一页</a><a href="javascript:void(0)" ng-click="table.nextpage()">下一页</a><a href="javascript:void(0)" ng-click="table.lastpage()">尾页</a></div>',
    //        scope: {
    //
    //        },
    //        controller: function($scope){
    //            $scope.datalist = [];
    //
    //            $scope.table={};
    //            $scope.table.now = 1;
    //
    //            $scope.table.firstpage = function(){
    //                $scope.table.now = 1;
    //                initTable($scope.table.now);
    //            };
    //
    //            $scope.table.prepage = function(){
    //                if ($scope.table.now > 1) {
    //                    $scope.table.now -= 1;
    //                    initTable($scope.table.now);
    //                }
    //                else {
    //                    require(["alert"], function (layer) {
    //                        layer.Tip("已经是第一页了！");
    //                    });
    //                }
    //            };
    //
    //            $scope.table.nextpage = function(){
    //                if ($scope.table.now < $scope.table.totalpage) {
    //                    $scope.table.now += 1;
    //                    initTable($scope.table.now);
    //                }
    //                else {
    //                    require(["alert"], function (layer) {
    //                        layer.Tip("已经是最后一页了！");
    //                    });
    //                }
    //            };
    //
    //            $scope.table.lastpage = function(){
    //                $scope.table.now = $scope.table.totalpage;
    //                initTable($scope.table.now);
    //            };
    //
    //        }
    //
    //    }
    //})

})(angular);