(function () {

    var interfaceUrl = {
        addAccountLog: "/prm/account/addAccountLog",
        updateAccountLog: "/prm/account/updateAccountLog",
        getAccountLog: "/prm/account/getAccountLog",
        deleteAccountLog: "/prm/account/deleteAccountLog",
        getAccountInfo: "/prm/account/getAccountInfo"
    };

    function advancePayment($scope, $document, $http, process) {

        $scope.name = "预付款管理";
        $document[0].title = "PRM-预付款管理";

        $scope.search = {}
        $scope.search.alerthidden = true;

        // 姓名列表隐藏
        $scope.advance = {};
        $scope.advance.nameList = false;
        // 是否有手机号码
        $scope.havemobile = false;

        $scope.alert = {};

        var initData = {
            "userId": null,
            "userName": null,
            "logType":1
        };

        //转换时间格式
        $scope.toData = function (s) {
            return Ntprm.common.converDate(s);
        };

        $scope.searchClick = function () {
            initData.userId = $scope.searchbox.id;
            initData.userName = $scope.searchbox.mobile || $scope.searchbox.realName;
            initTable(1);
        }


        var data = [];
        //table信息初始化
        var initTable = function (currNO) {
            initData.userFlag = 1;
            initData.currNO = currNO;
            $http.post(interfaceUrl.getAccountLog, initData)
                .success(function (data) {
                    if (data.code == "0000") {
                        $scope.table.table = data.result.viewList;
                        var l = data.result.totalNO;
                        if (l % 10 != 0) {
                            $scope.table.totalpage = parseInt(l / 10) + 1;
                        } else {
                            $scope.table.totalpage = l / 10;
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
        $scope.table.firstpage = function () {
            $scope.table.now = 1;
            initTable($scope.table.now);
        }

        //上一页
        $scope.table.prepage = function () {
            if ($scope.table.now > 1) {
                $scope.table.now -= 1;
                initTable($scope.table.now);
            }
            else {
                require(["alert"], function (layer) {
                    layer.Tip("已经是第一页了！");
                });
            }
        };

        //下一页
        $scope.table.nextpage = function () {
            if ($scope.table.now < $scope.table.totalpage) {
                $scope.table.now += 1;
                initTable($scope.table.now);
            }
            else {
                require(["alert"], function (layer) {
                    layer.Tip("已经是最后一页了！");
                });
            }
        };


        //最后一页
        $scope.table.lastpage = function () {
            $scope.table.now = $scope.table.totalpage;
            initTable($scope.table.now);
        };


        //新增、修改框是否隐藏
        $scope.table.alerthidden = true;

        //postdata 接口数据
        var postData = {};

        //type为0时修改数据，type为1时为保存数据。
        $scope.table.type = null;
        $scope.table.showalert = function (type, tr) {

            $scope.table.type = type;
            $scope.table.alerthidden = false;
            if (type == 0) {
            	$scope.alert.isReadonly = true;
                $scope.alert.closeAssociation = true;
            	$scope.subBtnVal = "修改";
                $scope.prmAlertTitle = "修改预付款管理记录";
                $scope.alert.id = tr.userId;
                $scope.alert.realName = tr.userName;
                $scope.alert.mobile = tr.mobile;
                $scope.amount = tr.amount;
                $scope.addAmount = tr.addAmount;
                $scope.alert.accountId = tr.accountId;
                $scope.alert.accLogId = tr.accLogId;
                postData.userId = tr.userId;
                $scope.havemobile = false;
                $scope.checkedMobile = "";
            }
            else {
            	$scope.alert.isReadonly = false;
                $scope.alert.closeAssociation = false;
            	$scope.subBtnVal = "添加";
                $scope.prmAlertTitle = "添加预付款管理记录";
                $scope.alert.id = null;
                $scope.alert.realName = "";
                $scope.amount = "";
                $scope.addAmount = "";
                $scope.havemobile = false;
                $scope.checkedMobile = "";
            }
        };

        //添加用户按钮
        $scope.gotoAddCustomer = function () {
            process.advancePayment = "add";
            window.location.href = "index.html#/customer";
        }

        //关闭弹出框
        $scope.table.closealert = function () {
            $scope.table.alerthidden = true;
            $scope.advance.ishave = false;
            $scope.alert.mobile = false;
            
        };

        //删除数据
        $scope.table.deletedata = function (tr) {
            var pu = {};
            pu.logType = 1;
            pu.accLogId = tr.accLogId;
            pu.accountId = tr.accountId;

            if (confirm("删除了不能恢复，您确定还要删除该记录么？")) {
                $http.post(interfaceUrl.deleteAccountLog, pu)
                    .success(function (data) {
                        if (data.code == "0000") {
                            require(['alert'], function (layer) {
                                layer.Tip("操作成功", "success");
                            });
                            initTable(1);
                        } else {
                            require(['alert'], function (layer) {
                                layer.Tip(data.msg, "danger");
                            });
                        }
                    });
            }

        };

        //更新数据，包括修改和新增，当type为0的时候是修改，为1的时候是新增
        $scope.table.update = function () {
            updataFunc($scope.table.type);
        };

        var updataFunc = function (type) {
            postData.type = 1;
            postData.amount = $scope.amount;
            postData.addAmount = $scope.addAmount;
            postData.userId = $scope.alert.id;
            postData.tsp = new Date().getTime();
            if(!/^([1-9]\d*|0)(\.\d{1,2})?$/.test(postData.amount)){
            	require(['alert'], function (layer) {
                    layer.Tip("预付款金额输入错误", "danger");
                });
                return;
            }
            
            
            if(!/^([1-9]\d?|0)(\.\d{1,2})?$/.test(postData.addAmount)){
            	require(['alert'], function (layer) {
                    layer.Tip("退款折让率输入错误", "danger");
                });
                return;
            }
            
            var postUrl = "";
            if (type == 0) {
                postData.id = $scope.alert.accLogId;
                postData.accountId = $scope.alert.accountId;
                postUrl = interfaceUrl.updateAccountLog;
            } else if (type == 1) {
                postUrl = interfaceUrl.addAccountLog;
            }
            if (postUrl != "") {
                $http.post(postUrl, postData)
                    .success(function (data) {
                        console.log(data.msg);
                        if (data.code == "0000") {
                            if (type == 1) {
                                initTable(1);
                            } else if (type == 0) {
                                initTable($scope.table.now);
                            }
                            require(['alert'], function (layer) {
                                layer.Tip("提交成功", "success");
                                return;
                            });
                            $scope.advance.ishave = false;
                            $scope.table.alerthidden = true;
                        } else {
                            require(['alert'], function (layer) {
                                layer.Tip(data.msg, "danger");
                                return;
                            });
                        }
                        $scope.alert = {};
                        $scope.amount = "";
                        $scope.addAmount = "";
                    });
            }
        };

    }

    Ntprm.Pagecontroller.advancePayment = advancePayment;

})();