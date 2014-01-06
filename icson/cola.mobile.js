/**
 * cola mobile version
 * @type {Object}
 */
var cola={};
var domain=location.protocol+'//'+location.host+'/'+(/weixin\.yixun\.com/.test(location.host.toString())?'coladev':'cola');
var timeFlag=1;
var COOKIE_N_PRDID='cola_prdid';
var COOKIE_N_ADRID='cola_addrid';
var codeMapping={
		'101':'请求失败',
		'102':'OAuth错误',
		'103':'您的QQ号还未绑定',
		'104':'易迅登录认证失败',
		'105':'OAuth登录认证失败',
		'110':'该瓶盖码已被使用过',
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
			else{
				var str='距离秒杀'+(timeFlag>0?'开始':'结束')+':'+hour+"时"+minute+"分"+seconds+"秒";
				$('#timer').text(str);
			}
			
		};
};




/**
 * 兑换商品初始化
 */
cola.InitGift=function(){
	this._getGiftList=function(){

	};

	this._bindEvent=function(){

	};

	this._exchangeGift=function(){
		var url=domain+'/exchange/trade?';
		var params={'product':prdId};
		$.getJSON(url,params,function(rp){

		});
	};
};

/**
 * 秒杀初始化
 * @return {[type]} [description]
 */
cola.initSk=function(){
	var self=this;
	this.getSkList=function(){
		var url=domain+'/seckillquery?callback=?&date=20131213';
		$.getJSON(url,function(rp){
			if(rp.errno==0){
				var data=rp.data;
				for(var i in data){
					self._getPrdInfo(data[i].idx, data[i].activeid, data[i].pid);
				}

			}
			else{
				alert('data loaded error!');
			}
		});
	};
	
	this._getPrdInfo=function(idx,actId,prdId){
		var self=this;
		var url='http://d.qiang.yixun.com/qiangitem/GetDetail?&activeid='+actId+'&itemId='+prdId+'&_time='+Math.random();
		$.getScript(url,function(){
			if(pageInfo.errCode===0){
				var prdInfo={};
				var itemInfo=pageInfo.itemInfo;
				prdInfo.prdId=prdId;
				prdInfo.actId=actId;
				prdInfo.title=itemInfo.title;
				var m=itemInfo.p_char_id.match(/^(\d+)\-(\d+)\-(\d+)$/);
				prdInfo.pic='http://img1.icson.com/product/pic200/'+m[1]+'/'+m[2]+'/'+itemInfo.p_char_id+'.jpg';
				prdInfo.url=itemInfo.originItemUrl;
				prdInfo.stock=itemInfo.stock;
				prdInfo.stockAll=itemInfo.stockAll;
				prdInfo.price=itemInfo.qiangPrice;
				prdInfo.yixunprice=itemInfo.yixunPrice;
				self._showProduct(idx,prdInfo);
			}
		});
	};
	
	this._showProduct=function(idx,data){
	    var skId='sk_'+idx+'_bt';
		var html=[];
        html.push('<a href="#" class="ms_goods1_img">');
        html.push('<img src="'+data.pic+'" alt="">');
        if(idx==0) {
        	html.push('<span class="ms_goods1_tips1">0元秒</span></a>');
        }
        else {
        	html.push('<span class="ms_goods1_tips2">3折秒</span></a>');
        }
                
		html.push('<div class="ms_goods1_info">');
        html.push('<a class="ms_goods1_name" href="#">'+data.title+'</a>');
        html.push('<div class="ms_goods1_price"><span class="price">&yen;'+data.price
        		  +'</span> <del class="old_price">&yen;'+data.yixunprice+'</del></div>');
        html.push('<div class="ms_goods1_kc">');
        html.push('<span class="ms_goods1_kc_txt">库存</span>');
        html.push('<span class="ms_goods1_kc_show"><span style="width:'+(data.stock*100/data.stockAll)+'%"></span></span></div>')
        html.push('<div class="ms_goods1_opt">');
        if(timeFlag>0){
        	html.push('<a class="ms_btn_qiang" id="'+skId+'" href="javascript:;">3点开抢</a>');
        }
        else {
        	html.push('<a class="ms_btn_qiang" id="'+skId+'" href="javascript:;">立即秒杀</a>');
        }
        html.push('</div></div>');
        $('.ms_goods1').eq(idx).html(html.join(''));
		var self=this;
		$('#'+skId).click(function(){
			if(timeFlag>0){
				alert('请耐心等待，秒杀将于今日15:00准时开始哦!');
				return false
			};
			var url='seckillorder?prdId='+data.prdId;
			self._doSk(data.prdId,url);
			return false;
		});
	};

	this._doSk=function(prdId,url){
		if(cola.isLogin()){
			cola.checkSubscribe(function(status){
				if(status==0){
					alert('您还没有预约秒杀资格');
					return false;
				}
				window.location=url;
			});
		}
	};

	this.getSkList();
};


/**
 * 超级抢购初始化
 * @return {[type]} [description]
 */
cola.initSuperBuy=function(callback){
	var self=this;
	var url='';
	var settings={
        dataType:'script',
        scriptCharset:'gbk',
        success:function(){
			if(typeof callback == 'function'){
				callback(GoodsInfo_51buy.pblock[0].list);
			}
			else{
				console.log(GoodsInfo_51buy.pblock[0].list);
			}
		}

    };
    $.ajax('http://event.yixun.com/event/17091_info.js',settings);
};

/**
 *  用户抽奖初始化
 * @param  {[type]} callbackRender 奖项展现回调方法
 * @param  {[type]} callbackShow   抽奖时的展现
 * @return {[type]}                [description]
 */
cola.initLottery=function(callbackRender,callbackShow){
	var self=this;
	(function(){
		var url=domain+'/lotteryquery?component_id=1224&callback=?';
		$.getJSON(url,function(rp){
			if(rp.errno==0){
				if(typeof callbackRender == 'function'){
					callbackRender(rp.award_list);
					self.runLottery();
				}
				
			}
		});
	})();
	
	this.runLottery=function(){
		$('#bt_lottery').click(function(){
			var url=domain+'/lottery?component_id=1224&verify_code=1&callback=?';
			$.getJSON(url,function(rp){
				callbackShow(rp);
			});
		});
		
	};
};


/**
 * 获取三折商品列表
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
cola.getDiscountList=function(callback){
	var settings={
		url: 'http://event.yixun.com/event/17091_info.js',
		dataType: 'script',
		scriptCharset: 'gbk',
		success:function(){
			if(typeof callback == 'function'){
				callback.apply(this,GoodsInfo_51buy.pblock[0].list);
			}
		}
	};
	$.ajax(settings);
};

/**
 * 获取用户送货地址
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
cola.getUserAddress=function(callback){
	var url='http://d.qiang.yixun.com/orderconfirm/getuserrecvaddress';
	$.getScript(url,function(){
		if(_addressInfo.errCode==0){
			if($.isFunction(callback)){
				callback(_addressInfo.data.list);
			}
		}
		else{
			alert('地址信息拉取失败');
		}
	});
};

/**
 * 用户存储可乐币
 * @param  {[type]} pincode [description]
 * @return {[type]}         [description]
 */
cola.storePincode=function(pincode){
	var url=domain+'/colacoinadd?callback=?';
	var params={'pincode':pincode};
	$.getJSON(url,params,function(rp){
		if(rp.errno==0){

		}
		else{
			console.log('error:'+rp.errno);
		}
	});
};

/**
 * 获取可乐币数量
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
cola.getPincodeCount=function(callback){
	var url=domain+'/colacoinquery?callback=?';
	$.getJSON(url,function(rp){
		if(rp.errno==0){
			if(typeof callback == 'function'){
				callback.apply(this,rp.data.colacoin);
			}
		}
		else{
			console.log('error:'+rp.errno);
		}
	});
};

/**
 * 获取商品详细信息---下单页使用
 * @param  {[type]}   prdId    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
cola.getProductInfo=function(prdId,callback){
	var url='http://d.qiang.yixun.com/qiangitem/GetDetail?&activeid=0&itemId='+prdId+'&_time='+Math.random();
	$.getScript(url,function(){
		if(pageInfo.errCode===0){
			var prdInfo={};
			var itemInfo=pageInfo.itemInfo;
			prdInfo.activeId=itemInfo.activeId;
			prdInfo.prdId=prdId;
			prdInfo.title=itemInfo.title;
			var m=itemInfo.p_char_id.match(/^(\d+)\-(\d+)\-(\d+)$/);
			prdInfo.pic='http://img1.icson.com/product/pic160/'+m[1]+'/'+m[2]+'/'+itemInfo.p_char_id+'.jpg';
			prdInfo.url=itemInfo.originItemUrl;
			prdInfo.stock=itemInfo.stock;
			prdInfo.stockAll=itemInfo.stockAll;
			prdInfo.price=itemInfo.qiangPrice;
			if($.isFunction(callback)){
				callback(prdInfo);
			}
		}
	});
};

/**
 * [storePincode description]
 * @param  {[type]} pincode [description]
 * @return {[type]}         [description]
 */
cola.storePincode=function(pincode){
	var url=domain+'/cola/colacoinadd?callback=?';
	var params={'pincode':pincode};
	$.getJSON(url,params,function(rp){
		if(rp.errno==0){
			cola.getPincodeCount();
		}
		else{
			alert(cola.code2error(rp.errno));
		}
	});
};

/**
 * 查询用户可用的可乐币数量
 * @return {[type]} [description]
 */
cola.getPincodeCount=function(){
	var url=domain+'/cola/colacoinquery?callback=?';
	$.getJSON(url,function(rp){
		if(rp.errno==0){
			$('#pincode_count').html(rp.data.colacoin);
		}
		else{
			console.log('get pincode errno:'+rp.errno);
		}
	});
};

/**
 * 用户可乐币
 * @param  {[type]}   page     [description]
 * @param  {[type]}   pageSize [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
cola.getColaCoinsHistory=function(page,pageSize,callback){
	var offset=(page-1)*pageSize;
	if(offset<0){
		offset=0;
	}
	var url=domain+'/colacoinhistory?callback=?';
	var params={'offset':offset};
	$.getJSON(url,params,function(rp){
		if(typeof callback == 'function'){
			callback(rp);
		}
	});
};

/**
 * 秒杀资格预约
 * @return {[type]} [description]
 */
cola.skSubscribe=function(){
	if(cola.isLogin()){
		var url=domain+'/SeckillSubscribe?callback=?';
		$.getJSON(url,function(rp){
			if(rp.errno==0){
				alert('恭喜您预约成功');
			}
			else if(rp.errno==20001){
				alert('您已经预约过啦');
			}
			else{
				alert('秒杀资格预约失败'+rp.errno);
			}
		});
	}
};

/**
 * 检测是否秒杀资格预约
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
cola.checkSubscribe=function(callback){
	var url=domain+'/SeckillCheck?callback=?';
	$.getJSON(url,function(rp){
		if(rp.errno==0){
			if($.isFunction(callback)){
				callback(rp.data);
			}
		}
		else{
			alert(cola.code2error(rp.errno));
		}
	});	
};


/**
 * QQ号绑定
 * @param  {[type]} qq [description]
 * @return {[type]}    [description]
 */
cola.bindQQ=function(qq){
	var url=domain+'/bind/bind?callback=?';
	var params={'qq':qq};
	$.getJSON(url,params,function(rp){

	});
};



/**
 * 从服务器端获取距离活动的开始时间
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
cola.getLeaveTime=function(callback){
	var url=domain+'/time';
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
				alert('time initialize failed!');
			}
		}
	};
	$.ajax(settings);
};

/**
 * 获取cookie
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
cola.getCookie=function(name){
	var r = new RegExp("(^|;|\\s+)" + name + "=([^;]*)(;|$)");
	var m = document.cookie.match(r);
	return (!m ? "": unescape(m[2]));
};

cola.setCookie=function(name, value, path, expire, domain) {
	var s = name + "=" + escape(value)
		+ "; path=" + ( path || '/' ) // 默认根目录
		+ (domain ? ("; domain=" + domain) : ''); 
	if (expire > 0) {
		var d = new Date();
		d.setTime(d.getTime() + expire * 1000);
		s += ";expires=" + d.toGMTString();
	}
	document.cookie = s;
};

/**
 * 检测用户是否登录
 * @return {Boolean} [description]
 */
cola.isLogin=function(){
	var isLogin=$.trim(cola.getCookie('uid')) === ''?false:true;
	isLogin=true;
	if(!isLogin){
		alert('请您登录进行下一步操作');
	}
	return isLogin;
};

cola.code2error=function(errorCode){
	return codeMapping[errorCode];
};

/**
 * 获取url参数
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
cola.getParam=function(name){
	var reg=new RegExp(name+'=([^&]*)');
	var m=location.href.match(reg);
	return !m?'':m[1];
};

/**
 * 列表页的加载
 * @return {[type]} [description]
 */
cola.listLazyLoad=function(){
	$("img.lazy").lazyload();
};


/**
 * [doPost description]
 * @param  {[type]}   url      [description]
 * @param  {[type]}   data     [description]
 * @param  {Function} callback [description]
 * @param  {[type]}   charset  [description]
 * @return {[type]}            [description]
 * 需要接收端进行配合
 * document.domain="yixun.com";
 * frameElement.callback({"errno":3});
 */
cola.doPost=function(url,data,callback,charset){
	charset=charset||'utf-8';
	cola.doPost.pIndex=(cola.doPost.pIndex||0)+1;
	var iframe=$('<iframe name="iframe_'+cola.doPost.pIndex+'" src="about:blank" style="display:none" width="0" height="0" scrolling="no" allowtransparency="true" frameborder="0"></iframe>').appendTo($(document.body));
	var inputs=[];
	$.each(data,function(k,v){
		inputs.push('<input type="hidden" name="'+k+'" value="'+v+'"/>');
	});
	var form=$('<form method="post" action="'+url+'" accept-charset="'+charset+'" target="iframe_'+cola.doPost.pIndex+'">'+inputs.join('')+'</form>').appendTo($(document.body));
	iframe[0].callback=function(o){
		if(typeof callback == 'function') callback(o);
		$(this).src='about:blank';
		form.remove();
		$(this).remove();
		iframe=form=null;
	};
	form.submit();
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





