(function(){
	function customer($scope,$http,$document,process,$timeout,prmuserinfo){
		angular.forEach(process,function(value,key){
			if(value =="add"){
				$scope.returnUrl = "index.html#/"+key;
				process[key] = null;
			}
		});

		if($scope.returnUrl){
			require(['alert'],function(layer){
				layer.Tip("稍等，即将帮你打开添加用户面版！","success");
			});
			$timeout(function(){
				$scope.customer.showAlert(1);
			},2000);
		}
		
		
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
            	$scope.islsd = true;
            	$scope.isnh = false;
            } else {
            	$scope.islsd = false;
            	$scope.isnh = true;
            }
        }

        setUserInfo();
		
		
		
		$scope.name = "客户管理";
        $document[0].title = "PRM-客户管理";
		
		//默认联动块隐藏
		$scope.isShowPro = false;
		$scope.isShowCity = false;
		//默认可以显示 联动块
		$scope.cusShow = true;
		//默认只读模式为false
		$scope.isread = false;
		//默认弹框隐藏
		$scope.customer = {};
		$scope.alert = {};
		$scope.customer.hidden = true;
		

		//电话号码监控
		$scope.$watch("alert.id",function(nv,ov){
			if(nv || ov){
				if(nv != undefined){
					//变灰
					$scope.cusShow = false;
	            	$scope.isread = true;
					$scope.censorMobileIsClose = true;
					$scope.censorPersonidIsClose = true;
				}else{
					$scope.cusShow = true;
	            	$scope.isread = false;
				}
			}
		});

		
		
		//弹框提示语
		$scope.popTips = false;
		
		
		//转换时间格式
		$scope.toData = function(s){
			return Ntprm.common.converDate(s);
		}
		
		//省模块 切换
		$scope.toggleProvince = function(){
			$scope.isShowPro = !$scope.isShowPro;
			$scope.isShowCity = false;
		}
		
		//获取省的数据
		$http.get("/prm/page/tools/areaJson/province.html")
		 .then(function(response){
		 	$scope.provinceJson = response.data;
		 });
		
		// 省li点击事件 并加载城市数据
		$scope.choicePro = function(proId,proName){
			$document[0].getElementById("province").innerHTML = proName;
			$scope.alert.province = proName;
			$scope.isShowPro = false;
            $scope.alert.city = "";
			//加载城市数据
			$http.get("/prm/page/tools/areaJson/city/ct_"+proId+".html")
				.then(function(result){
					$scope.cityJson = result.data;
				});
		}
		
		//城市模块切换
		$scope.toggleCity = function(){
			$scope.isShowCity = !$scope.isShowCity;
			$scope.isShowPro = false;
		}
		
		
		//城市li点击事件
		$scope.choiceCity = function(cityName){
			if(cityName && typeof cityName != "undefined"){
				$document[0].getElementById("city").innerHTML = cityName;
				$scope.alert.city = cityName;
				$scope.isShowCity = false;
			}	
		}
		
		//头部搜索
		var initData = {
			"userName":null
		};
		
		$scope.searchClick = function () {
            initData.userName = $scope.searchbox.realName;
            initTable(1);
        }
		
		//table信息初始化
		var initTable = function(currNO){
			initData.currNO = currNO;
			$http.post('/prm/auth/getMyUsers',initData)
				.success(function(data){
					if(data.code == "0000"){
						$scope.table.table = data.result;
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
        //预付款表格部分
        $scope.table = {};
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
		
		
		//添加时 客户 模糊匹配
		var postData = {};
		
		
		//未做判断的 函数 返回省市详细地址
		var returnAddress = function(a,t){
			var d = (a || "").split('-');
			if(t == 0){
				return d[0];
			} else if(t == 1){
				return d[1];
			} else if( t == 2){
				return d[2];
			} else {
				return null;
			}
		}
		
		$scope.returnAddress = function(a,t){
			return returnAddress(a,t);
		}
		
		//关闭弹框
		$scope.customer.closeCustomer = function(){
			$scope.customer.hidden = true;
			$scope.isread = false;
			$scope.cusShow = true;
			$scope.popTips = false;
		}
		
		//type为0时修改数据，type为1时为保存数据。
        $scope.table.type = null;
        
        $scope.customer.showAlert = function(type,tr){
        	postData = {};
            $scope.table.type = type;
            $scope.customer.hidden = false;
			$scope.popTips = true;
			
			$scope.cusShow = true;
	        $scope.isread = false;
			$scope.alert.closeAssociation = true;
            if(type == 0){
            	$scope.popTipsHtml = "手机号码只有本人可以修改";
            	$scope.prmAlertTitle = "修改客户信息";
                $scope.alert.id = tr.id;
                $scope.alert.userName = tr.name;
				$scope.alert.realName = tr.realName;
                $scope.alert.type = tr.type;
                
                $scope.alert.mobile = tr.mobile;
                $scope.alert.idcardno = tr.idCardNo;
                
                //省市
                $scope.alert.province = returnAddress(tr.area,0);
                $scope.alert.city = returnAddress(tr.area,1);
                $scope.alert.area = returnAddress(tr.area,2);
                
                postData.id = $scope.customer.id;
                $scope.customer.nameList = false;
                $scope.checkedMobile = "";

				//变灰
				$scope.cusShow = false;
				$scope.isread = true;
				$scope.censorMobileIsClose = true;
				$scope.censorPersonidIsClose = true;
            }
            else{
            	$scope.prmAlertTitle = "添加客户信息";
            	$scope.popTipsHtml = "温馨提示：请确保手机号无误,提交后不能修改.";
				$scope.alert.id = null;
				$scope.censorMobileIsClose = false;
				$scope.censorPersonidIsClose = false;
                
                $scope.alert.realName = "";

                $scope.alert.type = "";
                $scope.alert.mobile = "";
                $scope.alert.idcardno = "";
				$scope.alert.userName = ""
                
                //省市
                $scope.alert.province = "";
                $scope.alert.city = "";
                $scope.alert.area = "";
            }
        };
        
        //省市
        //$scope.alert.province = returnAddress($scope.alert.area,0);
        //$scope.alert.city = returnAddress($scope.alert.area,1);
        //$scope.customer.area = returnAddress($scope.alert.area,2);

		
		
		//添加记录提交
		$scope.customer.submit = function(){
			updataFunc($scope.table.type);
        };
        
        var updataFunc = function(type){
			postData.realName = $scope.alert.realName;
        	postData.idCardNo = $scope.alert.idcardno;
			postData.mobile = $scope.alert.mobile;
			if($scope.alert.id){
				postData.id = $scope.alert.id;
			}
        	//用户类型
        	postData.type = $scope.alert.type;
        	postData.area = $scope.alert.province+"-"+$scope.alert.city+"-"+$scope.alert.area;
        	
        	var postUrl = "";
        	if(type == 0){
				postData.id = $scope.alert.id;
        		postUrl = "/prm/auth/updateUser";
        	} else if(type == 1){
				postData.name = $scope.alert.name;
        		postUrl = "/prm/auth/addUser";
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
								if($scope.returnUrl){
									layer.Tip("提交成功,即将为您跳转到添加预付款页面！","success");
									$timeout(function(){
										window.location.href = $scope.returnUrl;
									},1500);
								}
								else{
									layer.Tip("提交成功","success");
								}
			                    return;
							});
							$scope.customer.ishave = false;
							$scope.customer.hidden = true;
							initTable(1);
	    				} else {
	    					require(['alert'],function(layer){
			                    layer.Tip(data.msg,"danger");
			                    return;
							});
	    				}
	    			});
        	}
        };
		
		$scope.table.delitem = function(tr){
			
        	var pu = {};
        	pu.id = tr.id;

			if(confirm("删除了不能恢复，您确定还要删除该记录么？")){
				$http.post("/prm/auth/deleteUserById", pu)
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
	Ntprm.Pagecontroller.customer = customer;
}());
