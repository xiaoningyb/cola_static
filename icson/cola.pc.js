/**
 * cola web version
 * @return {[type]} [description]
 */
var timeFlag=1;
var cola={
	'domain':'http://weixin.yixun.com/coladev',
	'lotteryId':1224,
	'eventId':17091
};
cola.codeMapping={
		'101':'请求失败',
		'102':'OAuth错误',
		'103':'您的QQ号还未绑定',
		'104':'易迅登录认证失败',
		'105':'OAuth登录认证失败',
		'110':'该瓶盖码已被使用过',
		'201':'未知错误',
		'301':'未登录，请登录',
		'10001':'CMEM调用错误',
		'10002':'该用户不存在',
		'20001':'您已经预约过啦',
		'20002':'可乐币扣除失败，请检查余额是否足够',
		'20003':'可乐币退回失败',
		'20004':'添加用户到参与列表失败',
		'20005':'添加抢购名单错误',
		'20006':'添加预约名单错误',
		'30001':'参与秒杀日期错误',
		'30002':'秒杀商品索引有误',
		'30003':'没有参与该次秒杀',
		'30004':'json数据解析错误',
};
cola.code2error=function(errorCode){
	return typeof cola.codeMapping[errorCode]=='undefined'?'未知错误:'+errorCode:cola.codeMapping[errorCode];
};
cola.getCookie=function(name){
	var r = new RegExp("(^|;|\\s+)" + name + "=([^;]*)(;|$)");
	var m = document.cookie.match(r);
	return (!m ? "": unescape(m[2]));
};
cola.getPincodeCount=function(callback){
	var url=cola.domain+'/colacoinquery?callback=?';
	$.getJSON(url,function(rp){
		if(typeof callback == 'function'){
			callback(rp);
		}
	});
};

cola.storePincode=function(pincode,callback){
	var url=cola.domain+'/colacoinadd?callback=?';
	var params={'pincode':pincode};
	$.getJSON(url,params,function(rp){
		if(typeof callback == 'function'){
			callback(rp);
		}
	});
};

/**
 * 检测pincode格式
 * @param  {[type]} pincode [description]
 * @return {[type]}         [description]
 */
cola.checkPincode=function(pincode){
	var reg=new RegExp('^[a-zA-Z0-9]{13}$');
	return reg.test(pincode);
};

/**
 * 对网站的的弹出层进行一下简单的封装
 * @type {Object}
 */
cola.msgbox={
	_mb:null,
	/**
	 * [show description]
	 * @param  {[type]} okFun    [description]
	 * @param  {[type]} closeFun [description]
	 * @param  {[type]} options  [description]
	 * @param  {[type]} type     1:info 2:error 3: success 4:custom
	 * @return {[type]}          [description]
	 */
	show:function(okFun,closeFun,options,type){
		var options=options||{};
		var title=options.title||'提示';
		var okText=options.okText||null;
		var closeText=options.closeText||null;
		var contents=options.contents||'';
		var width=options.width||504;
		var height=options.height||174;
		cola.msgbox._mb=G.ui.popup.showMsg(contents,type,okFun,closeFun,closeFun,options.okText,closeText);
		var titleCnt=$('div.layer_global_title >h3');
		var iconCnt=$('div.layer_global_mod');
		titleCnt.text(title);
		if(type==4){
			iconCnt.css({'padding':'0px'}).children('b').remove();
			$('div.wrap_btn').css({'text-align':'center'});
		}
		if(width||height){
			cola.msgbox._mb.resize({width:width,height:height});
		}
		return cola.msgbox._mb;
	},
	resize:function(size){
		cola.msgbox._mb.resize(size);
	},
	close:function(){
		cola.msgbox._mb.close();
	}
};

cola.getDate=function(){
	this._numMap={
		'1':'一',
		'2':'二',
		'3':'三',
		'4':'四',
		'5':'五',
		'6':'六',
		'7':'七',
		'8':'八',
		'9':'九',
		'10':'十',
		'11':'十一',
		'11':'十二'
	};
	this._convertMonth=function(num){
		return typeof this._numMap[num]=='undefined'?'':this._numMap[num];
	};

	var d=new Date();
	var rt={
		'year':d.getFullYear(),
		'month':d.getMonth()+1,
		'cn_month':this._convertMonth(d.getMonth()+1),
		'date':d.getDate(),
		'hour':d.getHours(),
		'minute':d.getMinutes(),
		'second':d.getSeconds()
	};
	return rt;
};

/**
 * 从服务器端获取距离活动的开始时间
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
cola.getLeaveTime=function(callback){
	var url=cola.domain+'/time';
	var settings={
		url:url,
		type:'GET',
		async:false,
		dataType: 'jsonp',
		jsonp: "callback",
		jsonpCallback:'timeCallback',
		success:function(rp){
			if(rp.errno==0){
				if($.isFunction(callback)){
					callback(rp);
				}
			}
			else{
				var options = {"okText" : "确定", "contents" : "time initialize failed!"};
				cola.msgbox.show(null, null, options, 1); 
			}
		}
	};
	$.ajax(settings);
};

/**
 * 倒计时初始化
 * @return {[type]} [description]
 */
cola.initTimer=function(callback){
		var self=this;
		cola.getLeaveTime(function(rp){
			if(rp.data<0){
				timeFlag=-1;
			}
			var timeLeave=Math.abs(rp.data);
			var intervalID=setInterval(function(){
				timeLeave--;
				self._showTimer(timeLeave);
				if(timeLeave<=0){
					clearInterval(intervalID);
				}
			}, 1000);
		});
		this._showTimer=function(sec){
			var seconds='00';
			var minute='00';
			var hour='00';
			if(sec>0){
				seconds=sec%60;
				if(seconds<10){
						seconds='0'+seconds;
				}
				minute=Math.floor((sec%3600)/60);
				if(minute<10){
						minute='0'+minute;
				}
				hour=Math.floor(sec/3600);
				if(hour<10){
					hour='0'+hour;
				}
			}

			if(typeof callback == 'function'){
				var params={
					'flag':timeFlag,
					'hour':hour,
					'minute':minute,
					'seconds':seconds,
					'leaveSec':sec
				};
				callback(params);
			}
			
		};
};

/**
 * 兑换商品初始化
 */
cola.InitGift=function(){
	this.getGiftList=function(callback,groupId){
		var url=cola.domain+'/exchangequery?callback=?';
		var params={};
		if(typeof groupId != 'undefined'){
			params.type=groupId;
		}
		$.getJSON(url,params,function(rp){
			if(rp.errno==0){
				callback(rp);
			}
			else{
				cola.msgbox.show(null,null,{'okText':'确定','contents':'数据读取失败，请刷新页面重试'},1);
			}
		});
	};

	this.exchangeGift=function(prdId,typeId,pname,callback){
		var url=cola.domain+'/exchangetrade?callback=?';
		var params={'productId':prdId};
		$.getJSON(url,params,function(rp){
			callback(typeId,pname,rp);
		});
	};

	this.getGiftInfo=function(prdId,callback){
		var url=cola.domain+'/exchangedetail?callback=?';
		var params={'productId':prdId};
		$.getJSON(url,params,function(rp){
			if(typeof callback == 'function'){
				callback(rp);
			}
		});
	};

	this.addUserAddress=function(strAddress,callback){
		var url=cola.domain+'/setaddr?addr=' + encodeURI(strAddress) + '&callback=?';
		$.getJSON(url,function(rp){
			if(rp.errno==0){
				if(typeof callback == 'function'){
					callback(rp);
				}
			}
			else{
				var options = {"okText" : "确定", "contents" : cola.code2error(rp.errno)};
				cola.msgbox.show(null, null, options, 1); 
			}
		});
	};
	return this;
};

/**
 * 获取用户兑换、抽奖地址
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
cola.getUserGiftAddress=function(callback){
	var url=cola.domain+'/getaddr?callback=?';
	$.getJSON(url,function(rp){
		if(typeof callback == 'function'){
			callback(rp);
		}
	});
};

/**
 * 对地址确认组件的封装
 * @param  {[type]} options [description]
 * @return {[type]}       [description]
 */
cola.initAddressForm=function(options){
	var self=this;
	this._render=function(ops){
		var html=[];
		html.push('<div class="mod_pop_con">');
		html.push('<h4>'+ops.title+'</h4>');
		html.push('<p style="font-weight:normal">'+ops.content+'</p>');
		html.push('</div>');
		html.push('<div class="pop_dh_dz">');
		html.push('<table>');
		html.push('<tbody><tr>');
		html.push('<th>选择地区</th>');
		html.push('<td><div class="pop_dh_pc">');
		html.push('<select id="pro"><option>省</option></select>');
		html.push('<select id="city"><option>市</option></select></div>');
		html.push('<div class="pop_dh_street"><select id="region"><option>县/区</option></select></div>');
		html.push('</td>');
		html.push('</tr>');
		html.push('<tr>');
		html.push('<th>详细地址</th><td><textarea name="address" placeholder="街道地址"></textarea></td>');
		html.push('</tr>');
		html.push('<tr>');
		html.push('<th>收货人</th><td><input name="username" type="text" class="pop_dh_dz_int4" placeholder="名字"></td>');
		html.push('</tr>');
		html.push('<tr>');
		html.push('<th>手机</th><td><input name="mobile" type="text" class="pop_dh_dz_int4" placeholder="手机号码"></td>');
		html.push('</tr>');
		html.push('<tr id="msg_tip" style="display:none"><th>&nbsp;</th><td><p class="pop_dh_tip"><span class="c_tx1">手机和固定电话请至少填写一项</span></p></td></tr>');
		html.push('</tbody></table>');
		html.push('</div>');
		options={
			'okText':'确认地址',
			'width':650,
			'height':452,
			'contents':html.join('')
		};
		cola.msgbox.show(function(){
			//保存地址
			self._doSubmit();
			return false;
		},null,options,3);
		self._bindEvent();
	};

	this._bindEvent=function(){
		var sf=this;
		this._buildOptions=function(obj,data,field){
			var selectedIndex=selectedIndex||0;
			var opts=obj.get(0).options;
			opts.length=1;
			if(data.length){
				for(var i in data){
					var row=data[i];
					var value=row[field.kg]+(typeof field.ky !='undefined'?('_'+row[field.ky]):'');
					opts.add(new Option(row[field.v],value));
				}
			}
		};

		var ryx=new regionYX();
		var data=ryx.getProvinceList();
		var pro=$('#pro');
		var city=$('#city');
		var region=$('#region');
		this._buildOptions(pro,data,{kg:'g_pid',v:'g_pname'});

		pro.change(function(){
			city.get(0).options.length=1;
			region.get(0).options.length=1;
			var pid=$(this).val();
			var data=ryx.getCityListByPid(pid);
			sf._buildOptions(city,data,{kg:'g_cid',v:'g_cname'});
		});

		city.change(function(){
			region.get(0).options.length=1;
			var cid=$(this).val();
			var data=ryx.getDistrictListByCid(cid);
			sf._buildOptions(region,data,{kg:'g_did',v:'g_dname'});
		});
	};

	this._doSubmit=function(){
		var jqusername=$('input[name="username"]');
		var username=$.trim(jqusername.val());
		var jqmobile=$('input[name="mobile"]');
		var mobile=$.trim(jqmobile.val());
		var jqaddress=$('textarea[name="address"]');
		var address=$.trim(jqaddress.val());
		var jqpro=$('#pro');
		var pro=jqpro.children('option:selected').text();
		var jqcity=$('#city');
		var city=jqcity.children('option:selected').text();
		var jqregion=$('#region');
		var region=jqregion.children('option:selected').text();

		if(jqpro.get(0).selectedIndex==0){
			self._setMsgTip('请选择省份');
			jqpro.focus();
			return false;
		}
		else if(jqcity.get(0).selectedIndex==0){
			self._setMsgTip('请选择城市');
			jqcity.focus();
			return false;
		}
		else if(jqregion.get(0).selectedIndex==0){
			self._setMsgTip('请选择地区');
			jqregion.focus();
			return false;
		}
		else if(address==''){
			self._setMsgTip('请填写街道信息');
			jqaddress.focus();
			return false;
		}else if(username==''){
			self._setMsgTip('用户名不能为空');
			jqusername.focus();
			return false;
		}
		else if(mobile==''){
			self._setMsgTip('手机号码不能为空');
			jqmobile.focus();
			return false;
		}
		var result=[];
		result.push(pro+city+region+address+'</br>'+username+'，'+mobile);
		cola.InitGift().addUserAddress(result.join(''),function(rp){
			if(rp.errno==0){
				cola.msgbox.show(null,null, {'contents':'地址确认成功！','okText':'关闭'}, 3);
			}
			else{
				self._setMsgTip('系统错误，请重试！');
			}
		});
	};

	this._setMsgTip=function(msg){
		if(!!msg){
			$('#msg_tip').show().find('td>p>span').text(msg);
		}
		else{
			$('#msg_tip').hide();
		}
    };

	this.run=function(){
		self._render(options);
		self._bindEvent();
	};

	return this;
};

cola.initLottery=function(){

	this.getLotteryList=function(callback){
		var url=cola.domain+'/lotteryquery?component_id='+cola.lotteryId+'&callback=?';
		$.getJSON(url,function(rp){
			if(typeof callback == 'function'){
				callback(rp);
			}
		});
	};

	this.getLottery=function(callback){
		var url=cola.domain+'/lottery?component_id='+cola.lotteryId+'&verify_code=1&callback=?';
		$.getJSON(url,function(rp){
			if(typeof callback == 'function'){
				callback(rp);
			}
		});
	};

	this.getRecentList=function(callback){
		var url=cola.domain+'/lotteryhistory?callback=?'
		var params={
			'record_number':10,
			'component_id':cola.lotteryId,
			'verify_code':-1
		}		
		$.getJSON(url,params,function(rp){
			if(typeof callback == 'function'){
				callback(rp);
			}
		});
	};

	return this;
};

/**
 * 检测是否秒杀资格预约
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
cola.checkSubscribe=function(callback,checkLogin){
	var checkLogin=typeof checkLogin == 'undefined'?true:false;
	if(checkLogin){
		if(!cola.isLogin()){
			return false;
		}
	}
	var url=cola.domain+'/SeckillCheck?callback=?';
	$.getJSON(url,function(rp){
		if(typeof callback == 'function'){
			callback(rp);
		}
	});	
};

/**
 * 秒杀资格预约
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
cola.skSubscribe=function(callback){
	if(cola.isLogin()){
		var url=cola.domain+'/SeckillSubscribe?callback=?';
		$.getJSON(url,function(rp){
			if(typeof callback == 'function'){
				callback(rp);
			}
		});
	}
};

cola.isLogin=function(isJump){
	if(typeof isJump == 'undefined'){
		isJump=true;
	}
	var uid=$.trim(cola.getCookie('uid'));
	var islogin=uid===''?false:true;
	if(isJump&&!islogin){
		cola.msgbox.show(function(){cola.goLogin();},null,{'okText':'去登录','closeText':'取消','contents':'您还没有登录，请登录后进行下一步操作！'}, 1);
	}
	return islogin;
};

cola.goLogin=function(){
	var url='https://base.yixun.com/login.html?url='+encodeURIComponent(window.location);
	window.location=url;
};

/**
 * 超级抢购初始化
 * @return {[type]} [description]
 */
cola.initSuperBuy=function(callback){
	var self=this;
	this.getPrdIdx=function(wsid){
		var mappings={
			'1':0,
			'1001':1,
			'2001':2,
			'3001':3,
			'4001':4,
			'5001':5
		};
		return typeof mappings[wsid]=='undefined'?mappings[1]:mappings[wsid];
	};
	var wsid=cola.getCookie('wsid');
	if($.trim(wsid)==''){
		wsid='1';
	}
	var settings={
		url:'http://event.yixun.com/event/'+cola.eventId+'_info.js',
        dataType:'script',
        crossDomain:true,
        scriptCharset:'gbk',
        success:function(){
			if(typeof callback == 'function'){
				var idx=self.getPrdIdx(wsid);
				callback(GoodsInfo_51buy.pblock[idx].list);
			}
			else{
				console.log(GoodsInfo_51buy.pblock);
			}
		}

    };
    $.ajax(settings);
};

/**
 * 秒杀初始化
 * @return {[type]} [description]
 */
cola.initSk=function(callback){
	var self=this;
	this.getSkList=function(callback){
		var url=domain+'/seckillquery?callback=?&date=20140114';
		$.getJSON(url,function(rp){
			if(rp.errno==0){
				var data=rp.data;
				for(var i in data){
					self._getPrdInfo(data[i].idx,data[i].pid,callback);
				}

			}
			else{
				var options = {"okText" : "确定", "contents" : 'data loaded error!'};
				cola.msgbox.show(null, null, options, 1); 
			}
		});
	};
	
	this._getPrdInfo=function(idx,prdId,callback){
		var self=this;
		var url='http://d.qiang.yixun.com/qiangitem/GetDetail?&activeid=0&itemId='+prdId+'&_time='+Math.random();
		$.getScript(url,function(){
			if(pageInfo.errCode===0){
				var prdInfo={};
				var itemInfo=pageInfo.itemInfo;
				prdInfo.prdId=prdId;
				prdInfo.title=itemInfo.title;
				prdInfo.subTitle=itemInfo.subTitle;
				var m=itemInfo.p_char_id.match(/^(\d+)\-(\d+)\-(\d+)$/);
				prdInfo.pic='http://img1.icson.com/product/pic200/'+m[1]+'/'+m[2]+'/'+itemInfo.p_char_id+'.jpg';
				prdInfo.url=itemInfo.originItemUrl;
				prdInfo.stock=itemInfo.stock;
				prdInfo.stockAll=itemInfo.stockAll;
				prdInfo.price=itemInfo.qiangPrice;
			    prdInfo.yixunprice=itemInfo.yixunPrice;
				self._showProduct(idx,prdInfo,callback);
			}
		});
	};

	this._showProduct=function(idx,data,callback){
		if(typeof callback == 'function'){
			callback(idx,data);
		}
	};

	this.getSkList(callback);
};

