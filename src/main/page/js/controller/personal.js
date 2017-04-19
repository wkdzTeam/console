(function(){

    var interfaceUrl = {
        getAccountInfo: "/prm/account/getAccountInfo",
        changePwd: "/prm/auth/changePwd",
        updateUser:"/prm/auth/updateUser",
        loginOut: "/prm/auth/loginOut",
    }

    function personal($scope,$document,$http,md5,prmuserinfo,$timeout){
        $scope.name = "个人信息";
        $document[0].title = "PRM-个人信息";

        $http.post(interfaceUrl.getAccountInfo,{
            userFlag: 1
        }).success(function(data){
            if(data.code == "0000" && data.result != null){
                $scope.farmer = {
                    total: Math.abs(data.result.totalAmount),       //预付款总金额
                    sold: Math.abs(data.result.saleAmount),        //已经出售农资金额
                    surplus: data.result.leftAmount,     //剩余农资金额
                    retreat: Math.abs(data.result.refundAmount)      //已退款金额
                };
            }
        });

        $http.post(interfaceUrl.getAccountInfo,{
            userFlag: 2
        }).success(function(data){
            if(data.code == "0000" && data.result != null){
                $scope.distributor = {
                    total: Math.abs(data.result.totalAmount) || 0,               
                    soldTotal: Math.abs(data.result.saleAmount) || 0,         
                    soldDiscount: Math.abs(data.result.rebateAmount) || 0,        
                    surplusTotal: Math.abs(data.result.refundAmount) || 0,      
                    surplusDiscount: Math.abs(data.result.interestAmount) || 0,   
                    retreat: data.result.leftAmount || 0           
                };
            } 
        });




        function setUserInfo(){
            if(!prmuserinfo.info){
                $timeout(function(){
                    setUserInfo();
                },1000);
                return;
            }
            $scope.userInfo = {
                name: prmuserinfo.info.name,
                realName:prmuserinfo.info.realName,
                mobile: prmuserinfo.info.phone,
                personID: prmuserinfo.info.idCardNO,
                type: prmuserinfo.info.type,
                id:prmuserinfo.info.id
            }
        }

        setUserInfo();


		//只读状态
		$scope.isread = false;

        //修改密码
        $scope.Pwd = {};
        $scope.Pwd.hidden = true;

        //打开修改密码窗口
        $scope.Pwd.modifyPwd = function(){
        	$scope.Pwd.oldPwd = "";
            $scope.Pwd.newPwd1 = "";
            $scope.Pwd.newPwd2 = "";
            $scope.Pwd.hidden = false;
        };

        //关闭修改密码窗口
        $scope.Pwd.closePwd = function(){
            $scope.Pwd.hidden = true;
        };
        
        //修改密码按钮
        $scope.Pwd.newPwdUp = function () {
            require(['global','alert'],function(global,layer){
                if($scope.Pwd.newPwd1 != $scope.Pwd.newPwd2){
                    layer.Tip("两次输入的密码不一致","danger");
                    return;
                }
            });
            
            var data = {
                oldPwd: md5.createHash($scope.Pwd.oldPwd),
                newPwd1: md5.createHash($scope.Pwd.newPwd1),
                newPwd2: md5.createHash($scope.Pwd.newPwd2)
            }
            $http.post(interfaceUrl.changePwd,data).success(function(data){
            	if(data.code == "0000"){
            		require(['global','alert'],function(global,layer){
            			layer.Tip("提交成功，请重新登录","success");
            		});
            		
            		$timeout(function(){
			            $http.post(interfaceUrl.loginOut).success(function(data){
			                if(data.code === "0000"){
			                    if(prmuserinfo.info.type==1){
			                        window.location.href = "/prm/page/jxs";
			                    }else{
			                        window.location.href = "/prm/page/ls";
			                    }
			
			                }
			            });},2000
		        	);
		        	
            	} else {
            		require(['global','alert'],function(global,layer){
            			layer.Tip(data.msg,"danger");
            		});
            	}
            });
            
        };




        //修改个人信息
        $scope.User = {};
        $scope.User.hidden = true;


        //修改个人信息窗口
        $scope.User.modifyInfoBtn = function(){
        	$scope.isread = true;
        	//$scope.User.username
        	$scope.User.mobile = $scope.userInfo.mobile;
        	$scope.User.personID = $scope.userInfo.personID;
        	$scope.User.username = $scope.userInfo.name;
            $scope.User.hidden = false;
        };

        //关闭修改个人信息窗口
        $scope.User.closeInfoBtn = function(){
            $scope.User.hidden = true;
            $scope.isread = false;
        	$scope.User.mobile = "";
        	$scope.User.personID = "";
        };

        $scope.User.userInfoUp = function(){
            /*require(['global','alert'],function(global,layer){
                if (!global.check.isPhone($scope.User.mobile)) {
                    layer.Tip("手机号码格式不正确","danger");
                    return;
                }

                if (!global.check.isIDcard($scope.User.personID)) {
                    layer.Tip("身份证格式不正确","danger");
                    return;
                }

                var data = {
                    username: $scope.User.username,
                    mobile: $scope.User.mobile,
                    personID: $scope.User.personID
                }
            });*/
            
            var pdata = {
            	"id":$scope.userInfo.id,
                "name": $scope.User.username
            }
            
            
            console.log($scope.User.username);
            
            $http.post(interfaceUrl.updateUser,pdata)
            .success(function(data){
            	if(data.code == "0000"){
            		require(['global','alert'],function(global,layer){
		            	layer.Tip("提交成功，请重新登录","success");
                    	return;
		            });
		            $timeout(function(){
			            $http.post(interfaceUrl.loginOut).success(function(data){
			                if(data.code === "0000"){
			                    if(prmuserinfo.info.type==1){
			                        window.location.href = "/prm/page/jxs";
			                    }else{
			                        window.location.href = "/prm/page/ls";
			                    }
			
			                }
			            });},2000
		        	);
		        	//location.reload();
            	} else {
            		require(['global','alert'],function(global,layer){
		            	layer.Tip(data.msg,"danger");
                    	return;
		            });
            	}
            });
            
        };






    }

    Ntprm.Pagecontroller.personal = personal;

})();