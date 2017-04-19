(function(){
	function transaction($scope,$http,$document,prmuserinfo){
		
		$scope.name = "交易明细";
        $document[0].title = "PRM-交易明细";
        
        $scope.t1 = "农户";
        $scope.t2 = "经销商";
        
		$scope.trans={};
		//预付款表格部分
        $scope.table = {};
        
        function setUserInfo(){
            if(!prmuserinfo.info){
                $timeout(function(){
                    setUserInfo();
                },1000);
                return;
            }
            $scope.userInfo = {
                type: prmuserinfo.info.type
            }
            if(prmuserinfo.info.type == 1){
            	$scope.myType = false;
            } else {
            	$scope.myType = true;
            }
        }

        setUserInfo();
        
        
		var initData = {
			"userId":null,
			"userName":null,
			"userFlag":1
		};
		$scope.ExcelUrl =  '/prm/account/exportAccountLog?userFlag='+initData.userFlag+'&userId='+initData.userId+'&userName='+initData.userName;
		
		$scope.togglejn = function(){
			$scope.t1=($scope.t1 == "农户"?"经销商":"农户");
			$scope.t2=($scope.t2 == "农户"?"经销商":"农户");
			initData.userFlag=(initData.userFlag == 1?2:1);
			$scope.ExcelUrl =  '/prm/account/exportAccountLog?userFlag='+initData.userFlag+'&userId='+initData.userId+'&userName='+initData.userName;
			initTable(1);
		}
		
		//转换时间格式
		$scope.toData = function(s){
			return Ntprm.common.converDate(s);
		}
		
		 $scope.searchClick = function () {
            initData.userId = $scope.searchbox.id;
            initData.userName = $scope.searchbox.realName;
            initTable(1);
        }
		
		//table信息初始化
		var initTable = function(currNO){
			initData.currNO = currNO;
			$http.post("/prm/account/getAccountLog",initData)
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
		
		//到处EXCEL
		
		/*$scope.exportE = function(){
			delete initData.currNO;
			$http.post('/prm/account/exportAccountLog',initData)*/
				/*.success(function(data){
					if(data.code == "0000"){
						require(["alert"],function(layer){
		                    layer.Tip("正在下载","success");
		                });
					} else {
						require(["alert"],function(layer){
		                    layer.Tip(data.msg,"danger");
		                });
					}
				});
			var postUrl = '/prm/account/exportAccountLog?userFlag='+initData.userFlag+'&userId='+initData.userId+'&userName='+initData.userName;
			$http.get(postUrl)
			 .then(function(data){
			 	if(data.code == "0000"){
					require(["alert"],function(layer){
	                    layer.Tip("正在下载","success");
	                });
				} else {
					require(["alert"],function(layer){
	                    layer.Tip(data.msg,"danger");
	                });
				}
			 });	
				
		}*/
		
		
		
		
	}
	Ntprm.Pagecontroller.transaction = transaction;
}());
