(function(){
	var interfaceUrl = {
        addAccountLog: "/prm/account/addAccountLog",
        updateAccountLog: "/prm/account/updateAccountLog",
        getAccountLog: "/prm/account/getAccountLog",
        deleteAccountLog: "/prm/account/deleteAccountLog",
        getAccountInfo: "/prm/account/getAccountInfo"
    };
	function refund($scope,$http,$document,$timeout,process){
		$scope.refund={};
		$scope.refund.name = "退款管理";
        $document[0].title = "PRM-退款管理";
        
		
		$scope.refund.hidden = true;
		$scope.refund.ishave = false;
		// 姓名列表隐藏
		$scope.refund.nameList = false;
		// 是否有手机号码
		$scope.havemobile = false;
		
		//预付款表格部分
        $scope.table = {};
        $scope.alert = {};
        $scope.refund.isok = false;
        
        $scope.refundT = "请输入申请退款金额";
        //添加用户按钮
        $scope.gotoAddCustomer = function () {
            process.advancePayment = "add";
            window.location.href = "index.html#/customer";
        }
        
        //转换时间格式
		$scope.toData = function(s){
			return Ntprm.common.converDate(s);
		}
        
        //关闭弹框
		$scope.refund.closeRefund = function(){
			$scope.refund.hidden = true;
			$scope.havemobile = false;
            $scope.refund.isok = false;
			$scope.alert = {};
			$scope.refund.amount = "";
			$scope.discountJe = "";
		}

		var initData = {
			"userId":null,
			"userName":null,
			"logType":3
			
		};
		
		$scope.searchNameList = false;

		
		$scope.searchClick = function () {
            initData.userId = $scope.searchbox.id;
            initData.userName = $scope.searchbox.realName;
            initTable(1);
        }
		
		//table信息初始化
		var initTable = function(currNO){
			initData.userFlag = 1;
			initData.currNO = currNO;
			$http.post(interfaceUrl.getAccountLog,initData)
				.success(function(data){
					if(data.code == "0000"){
						$scope.table.table = data.result.viewList;
						var l = data.result.totalNO;
						if(l%10 != 0){
							$scope.table.totalpage = parseInt(l/10)+1;
						} else {
							$scope.table.totalpage = l/10;
						}
						
					}
				});
		}
		initTable(1);
        //翻页
        $scope.table.now = 1;

        //第一页
        $scope.table.firstpage = function(){
            $scope.table.now = 1;
            initTable($scope.table.now);
        }

        //上一页
        $scope.table.prepage = function(){
            if($scope.table.now > 1){
                $scope.table.now -= 1;
                initTable($scope.table.now);
            }
            else{
                require(["alert"],function(layer){
                   layer.Tip("已经是第一页了！");
                });
            }
        };

        //下一页
        $scope.table.nextpage = function(){
            if($scope.table.now < $scope.table.totalpage){
                $scope.table.now += 1;
                initTable($scope.table.now);
            }
            else{
                require(["alert"],function(layer){
                    layer.Tip("已经是最后一页了！");
                });
            }
        };


        //最后一页
        $scope.table.lastpage = function(){
            $scope.table.now = $scope.table.totalpage;
            initTable($scope.table.now);
        };
	    
	    $scope.$watch("alert.id",function(){
	    	if($scope.refund.amount != null || $scope.refund.amount != ""){
	    		$scope.findData();
	    	}
	    });
	    
		//amout做出改变之后800毫秒计算结果
		$scope.showTwoW = function(){
			if($scope.refund.amount == null || $scope.refund.amount == ""){
				return;
			}
			if($scope.t){
                $timeout.cancel($scope.t);
            }
            $scope.t = $timeout(function(){
                $scope.findData();
            },800);
		}
		
		$scope.findData = function(){
			var postData1={};
			postData1.refundAmount = $scope.refund.amount || 0;
			postData1.tsp = new Date().getTime();
			postData1.userId = $scope.alert.id;
			if(postData1.refundAmount && postData1.userId){
				$http.post("/prm/account/countInterest",postData1)
					.success(function(data){
						if(data.code == "0000"){
							$scope.interestCount = data.result.leftAmount;
							$scope.refund.isok = true;
							$scope.discountJe = data.result.interest;
							$scope.sumJe = parseFloat($scope.refund.amount)+parseFloat(data.result.interest);
						}
					});
			}
		}
		
		
		//type为0时修改数据，type为1时为保存数据。
        $scope.table.type = null;
		$scope.sale = {};
		//是否为只读
		$scope.isread = false;
		
        $scope.refund.showAlert = function(type,tr){
            $scope.table.type = type;
            $scope.refund.hidden = false;
			$scope.alert.mobile = false;
			$scope.nimabi = false;
			$scope.interestCount = 0;
			postData = {
				type:3
			};
            if(type == 0){
            	$scope.prmAlertTitle = "修改退款管理记录";
                $scope.refund.userId = tr.userId;
				$scope.refund.accLogId = tr.accLogId;
				$scope.refund.accountId = tr.accountId;
                $scope.alert.realName = tr.userName;
                $scope.refund.amount = Math.abs(tr.amount);
                $scope.alert.mobile = tr.mobile;
                $scope.interestCount = tr.left;
                //折让
                $scope.discountJe = Math.abs(tr.reFundGiveAmount) || 0;
                //退款
                $scope.sumJe = Math.abs(tr.reFundAmount) || 0;
                
                postData.userId = tr.userId;
                postData.id = tr.accLogId;
                postData.accountId = tr.accountId;
            }
            else{
            	$scope.prmAlertTitle = "添加退款管理记录";

                $scope.alert.realName = "";
                $scope.refund.amount = "";
                $scope.discountJe = 0;
                //退款
                $scope.sumJe = 0;
            }
        };   
		
		
		//添加记录提交
		$scope.refund.submit = function(){
			updataFunc($scope.table.type);
        };
        
        var updataFunc = function(type){
        	postData.amount = $scope.refund.amount;
        	postData.tsp = new Date().getTime();
			postData.addAmount = $scope.discountJe;
        	var postUrl = "";
        	if(!/^([1-9]\d*|0)(\.\d{1,5})?$/.test(postData.amount)){
            	require(['alert'], function (layer) {
                    layer.Tip("申请退款金额输入错误", "danger");
                });
                return;
            }
			var sc = parseFloat($scope.interestCount || 0);
			var at = parseFloat($scope.refund.amount || 0);
			if(at > sc){
				require(['alert'],function(layer){
					layer.Tip("输入金额不能大于账户余额","danger");
					return;
				});
				$scope.nimabi = false;
				return;
			}
			
        	if(type == 0){
				postData.userId = $scope.refund.userId;
				postData.id = $scope.refund.accLogId;
				postData.accountId = $scope.refund.accountId;
        		postUrl = interfaceUrl.updateAccountLog;
        	} else if(type == 1){
				postData.userId = $scope.alert.id;
        		postUrl = interfaceUrl.addAccountLog;
        	}
        	if(postUrl != ""){
        		$http.post(postUrl,postData)
				.success(function(data){
					if(data.code == "0000"){
						if(type == 1){
							initTable(1);
						} else if(type == 0){
							initTable($scope.table.now);
						}
						require(['alert'],function(layer){
							layer.Tip("提交成功","success");
							return;
						});
						$scope.refund.ishave = false;
						$scope.refund.hidden = true;
					} else {
						require(['alert'],function(layer){
							layer.Tip(data.msg,"danger");
							return;
						});
					}
					$scope.alert = {};
					$scope.refund.amount = "";
					$scope.discountJe = "";
				});
        	}
        };
        
        
        $scope.refund.delitem = function(tr){
        	var pu = {};
        	pu.logType = 3;
        	pu.accLogId = tr.accLogId;
        	pu.accountId = tr.accountId;

			if(confirm("删除了不能恢复，您确定还要删除该记录么？")){
				$http.post(interfaceUrl.deleteAccountLog, pu)
					.success(function (data) {
						if (data.code == "0000") {
							require(['alert'],function(layer){
								layer.Tip("操作成功","success");
							});
							initTable(1);
						} else {
							require(['alert'],function(layer){
								layer.Tip(data.msg,"danger");
							});
						}
					});
			}
        	
        }
		
	}
	Ntprm.Pagecontroller.refund = refund;
}());
