(function(){
	var interfaceUrl = {
        addAccountLog: "/prm/account/addAccountLog",
        updateAccountLog: "/prm/account/updateAccountLog",
        getAccountLog: "/prm/account/getAccountLog",
        deleteAccountLog: "/prm/account/deleteAccountLog",
        getAccountInfo: "/prm/account/getAccountInfo"
    };
	function sale($scope,$http,$document,process){
		$scope.name = "销售管理";
        $document[0].title = "PRM-销售管理";
		$scope.sale={};
		$scope.sale.hidden = true;
		
		//预付款表格部分
        $scope.table = {};
		$scope.alert = {};
		
		//转换时间格式
		$scope.toData = function(s){
			return Ntprm.common.converDate(s);
		}
		
		//添加用户按钮
        $scope.gotoAddCustomer = function () {
            process.advancePayment = "add";
            window.location.href = "index.html#/customer";
        }
        
		//关闭弹框
		$scope.sale.closeSale = function(){
			$scope.sale.hidden = true;
			$scope.alert = {};
			$scope.sale.amount = "";
			$scope.sale.addAmount = "";
		}

		var initData = {
			"userId":null,
			"userName":null,
			"logType":2
		};
		
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
		
		var postData = {};
		
		//type为0时修改数据，type为1时为保存数据。
        $scope.table.type = null;
        $scope.table.showAlert = function(type,tr){
            $scope.table.type = type;
            $scope.sale.hidden = false;
            if(type == 0){
            	$scope.prmAlertTitle = "修改销售管理记录";
                $scope.sale.userId = tr.userId;
                $scope.alert.realName = tr.userName;
                $scope.sale.product = tr.product;
				$scope.sale.amount = Math.abs(tr.amount);
				$scope.sale.mobile = tr.mobile;
				$scope.alert.mobile = tr.mobile;
                $scope.sale.addAmount = tr.addAmount;
				$scope.sale.accLogId = tr.accLogId;
				$scope.sale.accountId = tr.accountId;
                postData.userId = $scope.sale.userId;
            }
            else{
            	$scope.prmAlertTitle = "添加销售管理记录";
                $scope.sale.userId = null;
                $scope.alert.realName = "";
                $scope.sale.product = "";
                $scope.sale.amount = "";
				$scope.sale.accLogId = null;
				$scope.sale.accountId = null;
                $scope.sale.addAmount = "";
				$scope.sale.mobile = undefined;
                $scope.havemobile = false;
                $scope.checkedMobile = "";
            }
        };   
		
		
		//添加记录提交
		$scope.sale.submit = function(){
			updataFunc($scope.table.type);
        };
        
        var updataFunc = function(type){
        	postData.type = 2;
        	postData.product = $scope.sale.product || "";
        	postData.amount = $scope.sale.amount;
        	postData.addAmount = $scope.sale.addAmount || 0;
			if($scope.sale.accLogId) postData.id = $scope.sale.accLogId;
			if($scope.sale.accountId) postData.accountId = $scope.sale.accountId;
        	postData.tsp = new Date().getTime();
        	
        	
        	if(!/^([1-9]\d*|0)(\.\d{1,2})?$/.test(postData.amount)){
            	require(['alert'], function (layer) {
                    layer.Tip("采购农资款金额输入错误", "danger");
                });
                return;
            }
            
            
            if(parseFloat(postData.addAmount)<0){
            	require(['alert'], function (layer) {
                    layer.Tip("采购折让金额输入错误", "danger");
                });
                return;
            }
        	
        	var postUrl = "";
        	if(type == 0){
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
							$scope.sale.ishave = false;
							$scope.sale.hidden = true;
	    				} else {
	    					require(['alert'],function(layer){
			                    layer.Tip(data.msg,"danger");
			                    return;
							});
	    				}
						$scope.alert = {};
						$scope.sale.amount = "";
						$scope.sale.addAmount = "";
	    			});
        	}
        };
        
        //删除数据
        $scope.table.delitem = function(tr){
        	var pu = {};
        	pu.logType = 2;
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
	Ntprm.Pagecontroller.sale = sale;
}());
