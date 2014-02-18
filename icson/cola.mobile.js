/**
 * cola mobile version
 * @type {Object}
 */
var cola={};
//var domain=location.protocol+'//'+location.host+'/'+(/weixin\.yixun\.com/.test(location.host.toString())?'coladev':'cola');
var domain = "";
var lotteryId = 0;
var actId = 0;
var tmp_url = window.location.href;
if(/coladev/.test(tmp_url)){
	domain = "http://weixin.yixun.com/coladev";
	lotteryId=1224;
	actId=19038;
}else if(/colabeta/.test(tmp_url)){
	domain = "http://weixin.yixun.com/colabeta";
	lotteryId=83;
	actId=5346;
}else{
	domain = "http://3pm.yixun.com";
	lotteryId=1224;
	actId=19038;
}
var timeFlag=1;
var COOKIE_N_PRDID='cola_prdid';
var COOKIE_N_ADRID='cola_addrid';
var codeMapping={
	101	: "服务器繁忙，请稍后再试",
	102	: "认证失败",
	103	: "绑定QQ号失败",
	104	: "易迅登录失败",
	105	: "认证登录失败",
	106	: "服务器繁忙，请稍后再试",
	201	: "参数错误",
	202	: "未登录，请先登录",
	301	: "未登录，请先登录",


	1001 : "瓶盖码格式错误",
	1002 : "瓶盖码长度错误",
	1003 : "瓶盖码不足",
	1004 : "服务器繁忙，请稍后再试",
	1005 : "服务器繁忙，请稍后再试",
	1006 : "服务器繁忙，请稍后再试",
	1007 : "服务器繁忙，请稍后再试",
	1008 : "瓶盖码无效",
	1009 : "服务器繁忙，请稍后再试",
	1010 : "瓶盖码已被使用过",
	1011 : "服务器繁忙，请稍后再试",
	1012 : "您的访问过于频繁",

	13200 :	"服务器繁忙，请稍后再试",



	10001 : "服务器繁忙，请稍后再试",
	10002 : "没有找到相应的用户信息",

	20001 : "您已预约过本场的秒杀活动",
	20002 : "瓶盖码不足",
	20003 : "服务器繁忙，请稍后再试",
	20004 : "服务器繁忙，请稍后再试",
	20005 : "服务器繁忙，请稍后再试",
	20006 : "服务器繁忙，请稍后再试",
	20007 : "获取优惠卷失败",

	30001 : "参与秒杀日期错误，同本地时间不一致",
	30002 : "秒杀商品ID错误",
	30003 : "您尚未预约本场的秒杀活动",
	30004 : "服务器繁忙，请稍后再试"
};
	
cola.getDefaultErrmsg=function(errno){
	var errmsg  = "服务器繁忙，请稍后再试";
	if( typeof errno != 'undefined' ){
		errmsg = "错误码[" + errno + "]";
		if( typeof codeMapping[errno] != 'undefined' ){
			errmsg = errmsg + ":" + codeMapping[errno];
		}
	}
	return errmsg;
}
cola.showDefaultError=function(errno){
	cola.msgbox.showinfo(null, null, "确定", cola.getDefaultErrmsg(errno), "错误");
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
	this.getGiftList=function(callback,groupId){
		var url=domain+'/exchangequery?callback=?';
		var params={};
		if(typeof groupId != 'undefined'){
			params.type=groupId;
		}
		$.getJSON(url,params,function(rp){
			if(rp.errno==0){
				callback(rp);
			}
			else{
				console.log('exchangequery error,errno:'+rp.errno);
			}
		});
	};

	this.exchangeGift=function(prdId,callback){
		var url=domain+'/exchangetrade?callback=?';
		var params={'productId':prdId};
		$.getJSON(url,params,function(rp){
			callback(rp);
		});
	};

	this.getGiftInfo=function(prdId,callback){
		var url=domain+'/exchangedetail?callback=?';
		var params={'productId':prdId};
		$.getJSON(url,params,function(rp){
			if(typeof callback == 'function'){
				callback(rp);
			}
		});
	};

	this.addUserAddress=function(strAddress,callback){
		var url=domain+'/setaddr?addr=' + encodeURI(strAddress) + '&callback=?';
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
 * 秒杀初始化
 * @return {[type]} [description]
 */
cola.initSk=function(){
	var self=this;
	this.getSkList=function(){
		var url=domain+'/seckillquery?callback=?&date=20140114';
		$.getJSON(url,function(rp){
			if(rp.errno==0){
				var data=rp.data;
				for(var i in data){
					self._getPrdInfo(data[i].idx, data[i].activeid, data[i].pid);
				}

			}
			else{
				var options = {"okText" : "确定", "contents" : 'data loaded error!'};
				cola.msgbox.show(null, null, options, 1); 
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
            html.push('<a href="javascript:void(0);" class="ms_goods1_img">');
            html.push('<img src="'+data.pic+'" alt="">');
            if(idx==0) {
        	html.push('<span class="ms_goods1_tips1">0元秒</span>');
            }
            else {
        	//html.push('<span class="ms_goods1_tips2">3折秒</span>');
            }
			html.push('</a>');
            
	    	html.push('<div class="ms_goods1_info">');
            html.push('<a class="ms_goods1_name" href="javascript:void(0);">'+data.title+'</a>');
            html.push('<div class="ms_goods1_price"><span class="price">&yen;'+parseFloat(data.price)
        	      +'</span> <del class="old_price">&yen;'+parseFloat(data.yixunprice)+'</del></div>');
            html.push('<div class="ms_goods1_kc">');
            html.push('<span class="ms_goods1_kc_txt">库存</span>');
            html.push('<span class="ms_goods1_kc_show"><span style="width:'+(data.stock*100/data.stockAll)+'%"></span></span></div>')
            html.push('<div class="ms_goods1_opt">');
            if(timeFlag>0){
				html.push('<a class="ms_btn_qiang" id="'+skId+'" href="javascript:void(0);">下午3点开抢</a>');
            }
            else {
				if(data.stock < 1){
					html.push('<a class="btn btn_disabled" id="'+skId+'" href="javascript:void(0);">已抢光</a>');
				}else{
					html.push('<a class="btn btn_em1" id="'+skId+'" href="javascript:void(0);">立即秒杀</a>');
				}
            }
            html.push('</div></div>');
            $('.ms_goods1').eq(idx).html(html.join(''));
	    var self=this;
	    $('.ms_goods1').eq(idx).find('a').click(function(){
			if(timeFlag>0){
				var options;
				if($("#showLayer").is(":visible")){
					options = {"okText" : "预约", 'closeText' : '关闭', "contents" : "秒杀将于今天下午3点准时开始哦！您可以先预约秒杀资格", 'title' : '提示'};
					cola.msgbox.show(function(){cola.msgbox.close();$("#showLayer").click();}, null, options,3); 				
				}else{
					options = {"okText" : "关闭", "contents" : "秒杀将于今天下午3点准时开始哦！", 'title' : '提示'};
					cola.msgbox.show(null, null, options, 3); 
				}
				
				return false;
			}
			if(data.stock < 1){
				var options = {"okText" : "确定", "contents" : "晚了一步哦！您可以试试其他商品！", 'title' : '抢光了！'};
				cola.msgbox.show(null, null, options, 3); 
				return false;
			}
			if(!cola.checkLoginAndBind()){
				return false;
			}
			var url='seckillorder?prdId='+data.prdId;
			self._doSk(data.prdId,url);
			return false;
	    });
	};	

	this._doSk=function(prdId,url){
		cola.checkSubscribe(function(data){
			if(data.errno == 0){
				if(data.data!=1){
					var options = {"okText" : "预约", 'closeText' : '关闭', "contents" : "您还没有预约秒杀资格!", 'title' : '秒杀失败'};
					cola.msgbox.show(function(){cola.msgbox.close();$("#showLayer").click();}, null, options, 3); 
					return false;
				}
				window.location=url;
			}else{
			
			}
		});
	};

	this.getSkList();
};


/**
 * 秒杀初始化
 * @return {[type]} [description]
 */
cola.initSeckill=function(callback){
	var self=this;
	var url='';
	var settings={
        dataType:'script',
        scriptCharset:'gbk',
        success:function(){
			if(typeof callback == 'function'){
				callback(GoodsInfo_51buy);
			}
			else{
				//console.log(GoodsInfo_51buy);
			}
		}

    };
    $.ajax('http://event.yixun.com/event/' + actId + '_info.js',settings);
};

/**
 *  用户抽奖初始化
 * @return {[type]}                [description]
 */
cola.initLottery=function(){
	/**
	 * 获取奖项列表
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	this.getLotteryList=function(callback){
		var url=domain+'/lotteryquery?component_id='+lotteryId+'&callback=?';
		$.getJSON(url,function(rp){
			if(rp.errno==0){
				if(typeof callback == 'function'){
					callback(rp.award_list);
				}
			}
		});
	};
	
	/**
	 * 抽奖
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	this.getLottery=function(callback){
		var url=domain+'/lottery?component_id='+lotteryId+'&verify_code=1&callback=?';
		$.getJSON(url,function(rp){
			if(typeof callback == 'function'){
				callback(rp);
			}
		});
	};

	/**
	 * 获取用户可用的抽奖次数
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	this.getLeaveTimes=function(callback){
		var url=domain+'/lotteryusernumber?component_id='+lotteryId+'&callback=?';
		$.getJSON(url,function(rp){
			if(typeof callback == 'function'){
				callback(rp);
			}
		});
	};

	return this;
};


/**
 * 获取三折商品列表
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
cola.getDiscountList=function(callback){
	var settings={
		url: 'http://event.yixun.com/event/'+actId+'_info.js',
		dataType: 'script',
		scriptCharset: 'gbk',
		success:function(){
			if(typeof callback == 'function' && GoodsInfo_51buy){
				callback(GoodsInfo_51buy.pblock[0].list);
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
cola.getUserAddress=function(okFun,failFun){
	var url='http://d.qiang.yixun.com/orderconfirm/getuserrecvaddress';
	$.getScript(url,function(){
		if(_addressInfo.errCode==0){
			if($.isFunction(okFun)){
				okFun(_addressInfo.data.list);
			}
		}
		else{
			if(typeof failFun == 'function'){
				failFun();
			}
			else{
				var options = {"okText" : "确定", "contents" : "地址信息拉取失败!"};
				cola.msgbox.show(null, null, options, 1);
			} 
		}
	});
};

/**
 * 获取用户兑换、抽奖地址
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
cola.getUserGiftAddress=function(callback){
	var url=domain+'/getaddr?callback=?';
	$.getJSON(url,function(rp){
		if(typeof callback == 'function'){
			callback(rp);
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
 * @param  {[type]}   pincode  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
cola.storePincode=function(pincode,callback){
	var url=domain+'/cola/colacoinadd?callback=?';
	var params={'pincode':pincode};
	$.getJSON(url,params,function(rp){
		if(typeof callback == 'function'){
			callback(rp);
		}
	});
};

/**
 * 查询用户可用的可乐币数量
 * @return {[type]} [description]
 */
cola.getPincodeCount=function(callback){
	var url=domain+'/colacoinquery?callback=?';
	$.getJSON(url,function(rp){
		if(typeof callback == 'function'){
			callback(rp);
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
cola.getColaCoinsHistory=function(offset,pageSize,callback){
	if(offset<0){
		offset=0;
	}
	var url=domain+'/colacoinhistory?callback=?';
	var params={'offset':offset, 'size' : pageSize};
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
cola.skSubscribe=function(callback){
	var url=domain+'/SeckillSubscribe?callback=?';
	$.getJSON(url,function(rp){
		if(typeof callback == 'function'){
			callback(rp);
		}		
	});
};

/**
 * 检测是否秒杀资格预约
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
cola.checkSubscribe=function(callback){
	var url=domain+'/SeckillCheck?callback=?';
	$.getJSON(url,function(rp){
		if(typeof callback == 'function'){
			callback(rp);
		}
	});	
};


/**
 * QQ号绑定
 * @param  {[type]} qq [description]
 * @return {[type]}    [description]
 */
cola.bindQQ=function(qq, callback){
	var url=domain+'/bind/bind?callback=?';
	var params={'qq':qq};
	$.getJSON(url,params,function(rp){
		if(typeof callback == 'function'){
			callback(rp);
		}		
	});
};

/**
 * [getDate description]
 * @return {[type]} [description]
 */
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
				var options = {"okText" : "确定", "contents" : "time initialize failed!"};
				cola.msgbox.show(null, null, options, 1); 
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
		var options = {"okText" : "确定", "contents" : "请您登录进行下一步操作!"};
		cola.msgbox.show(null, null, options, 1); 
	}
	return isLogin;
};

cola.code2error=function(errorCode){
	return typeof codeMapping[errorCode]=='undefined'?errorCode:codeMapping[errorCode];
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

cola.goback=function(url){
	var url=url||document.referrer;
	window.location=url;
};

cola.isBind=function(){
    var isBind = cola.getCookie("colabind");
    if(isBind == 1) return true;
                  
    return false;
};
        
cola.getMyAccountUrl=function(url)
{
    var s = domain+"/bind";
    return url == "" ? s : s + "?redirect=" + encodeURI(url);
};
        
cola.getToBindUrl=function(url){
    return "https://ssl.ui.ptlogin2.yixun.com/cgi-bin/login?appid=700028403&daid=174&style=8&hln_custompage=0&pt_logo_14=1&pt_open_appid=1&hln_css=http%3A%2F%2Fstatic.gtimg.com/icson/img/app/weixin/logo.png&s_url=http://ecclogin.yixun.com/login/mobileqqlogin?surl=" + encodeURI(domain+"/confirmbind?redirect=" + encodeURI(url));
};

/**
 * 弹出提示层
 * @type {Object}
 */
cola.msgbox={
	/**
	 * [show description]
	 * @param  {[type]} okFun    [description]
	 * @param  {[type]} closeFun [description]
	 * @param  {[type]} options  [description]
	 * @param  int type     1:common 2:success 3:failure 
	 * @return {[type]}          [description]
	 */
	show:function(okFun,closeFun,options,type){
		cola.msgbox._render(options,type);
		cola.msgbox._bindEvent(okFun,closeFun);
	},
	close:function(){
		cola.msgbox._remove();
	},
	showinfo:function(okFun, closeFun, okText, contents, title){
		var options;
		if(title == undefined || title == ''){
			options = {'okText' : okText, 'contents' : contents};
		}else{
			options = {'okText' : okText, 'contents' : contents, 'title' : title};
		}
		cola.msgbox.show(okFun, closeFun, options, 3);
	},
	_msgbox:null,
	_render:function(options,type){
		var options=options||{};
		var type=type||1;
		var container=$('body');
		var tipClass='';
		var btnClass='';
		var html=[];
		if(type==2){
			tipClass='tip_ok';
		}
		else if(type==3){
			tipClass='tip_alert';
		}
		html.push('<div class="tip '+tipClass+'">');
		html.push('<div class="tip_bg"></div>');
		html.push('<div class="tip_bd">');
		if(type!=1){
			options.title=options.title||'提示';
			html.push('<div class="tip_sec tip_tit">');
			html.push('<i class="ico tip_ico"></i>');
			html.push(options.title);
			html.push('</div>');
		}
		html.push('<div class="tip_sec tip_cnt">');
		if(typeof options.contents != 'undefined'){
			html.push(options.contents);
		}
		html.push('</div>');
		if(typeof options.closeText != 'undefined' && typeof options.okText != 'undefined'){
			btnClass='btn_group';
		}
		html.push('<div class="tip_sec tip_action '+btnClass+'">');
		if(typeof options.closeText != 'undefined'){
			html.push('<a class="cola_msgbox_close btn btn_weak" href="javascript:;"><span class="btn_inner">'+options.closeText+'</span></a>');
		}
		if(typeof options.okText != 'undefined'){
			html.push('<a class="cola_msgbox_ok btn btn_em" href="javascript:;"><span class="btn_inner">'+options.okText+'</span></a>');
		}
		html.push('</div>');
		html.push('</div>');
		html.push('</div>');
		cola.msgbox._msgbox=$(html.join(''));
		container.append(cola.msgbox._msgbox);
	},
	_bindEvent:function(okFun,closeFun){
		$('.cola_msgbox_close').click(function(){
			if(typeof closeFun == 'function' ){
				closeFun();
			}
			cola.msgbox._remove();
		});
		$('.cola_msgbox_ok').click(function(){
			if(typeof okFun == 'function' ){
				okFun();
			}
			else{
				cola.msgbox._remove();
			}
		});
	},
	_remove:function(){
		if(cola.msgbox._msgbox!=null){
			cola.msgbox._msgbox.remove();
		}
	}
};

cola.getToBindUrlDefault = function(){
	var redirect = window.location.href;
	return cola.getToBindUrl(redirect);
}


cola.initLoginAndBindDefault = function(){
	if(cola.isBind()){
		return;
	}
	
	var redirect = window.location.href;
	var url = cola.getMyAccountUrl(redirect);
	window.location = url;
};

cola.checkLoginAndBind = function(){
	if(!cola.isBind()){
		var options = {"okText" : "去绑定", "closeText" : "取消", "contents" : "为保证帐号安全及礼品顺利发放，需要先绑定QQ账号，绑定成功后，您将不能再修改QQ号。", 'title' : '提示'};
		cola.msgbox.show(function(){window.location = cola.getToBindUrlDefault();}, null, options, 3); 
		return false;
	}
	return true;
};

cola.getGroup = function(){
	var mappings = {
		'1' : [1, 0],
		'1001' : [3, 2],
		'2001' : [5, 4],
		'3001' : [7, 6],
		'4001' : [9, 8],
		'5001' : [11, 10]
	};
	var wsid = cola.getCookie('wsid');
	if($.trim(wsid) == '' || typeof mappings[wsid] == 'undefined'){
		wsid = '1';
	}
	return mappings[wsid];
}

cola.serviceAreas={
	areaList: {
	    //省份ID:[省份名称,分站ID,默认三级地区ID]
		'2621' : ['上海', '1','2626'],
		'3225' : ['浙江', '1','3227'],
		'1591' : ['江苏', '1','1593'],
		'1' : ['安徽', '1','9'],
		'2130' : ['宁夏', '5001','2132'],
		'2160' : ['青海', '5001','2162'],
		'403' : ['广东', '1001','421'],
		'201' : ['福建', '1001','203'],
		'1718' : ['江西', '3001','1720'],
		'789' : ['海南', '1001','791'],
		'3077' : ['云南', '4001','3079'],
		'556' : ['广西', '1001','601'],
		'2878' : ['新疆', '5001','2880'],
		'2996' : ['西藏', '4001','2998'],
		'131' : ['北京', '2001','3803'],
		'2858' : ['天津', '2001','2860'],
		'814' : ['河北', '2001','816'],
		'1144' : ['河南', '3001','1146'],
		'2329' : ['山东', '2001','2331'],
		'2490' : ['山西', '2001','2492'],
		'1900' : ['辽宁', '2001','1902'],
		'1830' : ['吉林', '2001','1832'],
		'999' : ['黑龙江', '2001','1001'],
		'2212' : ['陕西', '5001','2226'],
		'299' : ['甘肃', '5001','302'],
		'2016' : ['内蒙古', '2001','2018'],
		'1454' : ['湖南', '3001','1456'],
		'693' : ['贵州', '4001','695'],
		'1323' : ['湖北', '3001','4046'],
		'158' : ['重庆', '4001','200'],
		'2652' : ['四川', '4001','2654']
	},
	areasGroupMap:{
		'1':'上海仓服务',
		'1001':'深圳仓服务',
		'2001':'北京仓服务',
		'3001':'武汉仓服务',
		'4001':'重庆仓服务',
		'5001':'西安仓服务'
	},
	getListByGroup:function(){
		var result={};
		for(var i in cola.serviceAreas.areaList){
			var row=cola.serviceAreas.areaList[i];
			var wsid=row[1];
			if(typeof result[wsid] == 'undefined'){
				result[wsid]={'gname':cola.serviceAreas.areasGroupMap[wsid],'list':[]};
			}
			row.push(i);
			result[wsid].list.push(row);
		}
		return result;
	},
	getProName:function(prid){
		var proname='上海';
		var m=prid.match(/^\d+_(\d+)$/);
		if(!!m){
			for(var i in cola.serviceAreas.areaList){
				console.log(i+'===='+m[1]);
				if(i==m[1]){
					proname = cola.serviceAreas.areaList[i][0];
					break;
				}
			}
		}
		return proname;
	}
};