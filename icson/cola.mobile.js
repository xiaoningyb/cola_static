/**
 * cola mobile version
 * @type {Object}
 */
var cola={};
var domain=location.protocol+'//'+location.host+'/'+(/weixin\.com/.test(location.host.toString())?'coladev':'cola');
var timeFlag=1;
var COOKIE_N_PRDID='cola_prdid';
var COOKIE_N_ADRID='cola_addrid';
var codeMapping={
		'10002':'您还没有预约秒杀资格',
		'20002':'可乐币扣除失败，请检查余额是否足够'
	};
/**
 * 倒计时初始化
 * @return {[type]} [description]
 */
cola.initTimer=function(){
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
			var str='距离秒杀'+(timeFlag>0?'开始':'结束')+':'+hour+"时"+minute+"分"+seconds+"秒";
			$('#timer').text(str);
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
				self._showProduct(idx,prdInfo);
			}
		});
	};
	
	this._showProduct=function(idx,data){
		var skId='sk_'+idx+'_bt';
		var html=[];
		html.push('<ul>');
		html.push('<li class="prd_img"><img src="'+data.pic+'" width=160 height=160 /></li>');
		html.push('<li class="prd_desc">');
		html.push('	<h5>商品名称：'+data.title+'</h5>');
		html.push('	<h5>价格：'+data.price+'</h5>');
		html.push('	<h5>库存：</h5>');
		if(timeFlag>0){
			html.push('<span>15点开抢</span>');
		}
		else{
			html.push('<span><a id="'+skId+'" href="javascript:;">立即秒杀</a></span>');
		}
		html.push('</li>');
		html.push('</ul>');
		$('div.prd_item').eq(idx).html(html.join(''));
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
				status=1;
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
 * 用户抽奖初始化
 * @return {[type]} [description]
 */
cola.initLottery=function(){
	var self=this;
	this.getLotteryList=function(){
		var url=domain+'/lotteryquery?component_id=245&callback=?';
		$.getJSON(url,function(rp){
			if(rp.errno==0){
				self.lotteryRender(rp.award_list);
				self.runLottery();
			}
		});
	};
	
	this.lotteryRender=function(data){
		if(!$.isEmptyObject(data)){
			//@todo
		}
	};

	this.runLottery=function(){
		var url=domain+'/lottery?component_id=245&verify_code=1&callback=?';
		$.getJSON(url,function(rp){
			if(rp.errno==0){
				
			}
			else{
				alert('get lottery failed');
			}
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
 * 查询用户可用的可乐币数量
 * @return {[type]} [description]
 */
cola.getPincodeCount=function(){
	var url=domain+'/colacoinquery?callback=?';
	$.getJSON(url,function(rp){
		if(rp.errno==0){

		}
		else{
			alert('error:'+rp.errno);
		}
	});
};

/**
 * 获取用户可乐币
 * @return {[type]} [description]
 */
cola.getColaCoinsHistory=function(page,pageSize){
	var offset=(page-1)*pageSize;
	if(offset<0){
		offset=0;
	}
	var url=domain+'/colacoinhistory?callback=?';
	var params={'offset':offset};
	$.getJSON(url,params,function(rp){

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
				alert('秒杀资格预约失败');
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
		rp.errno=0;
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
	var url=domain+'/time?callback=?';
	$.getJSON(url,function(rp){
		if(rp.errno==0){
			if($.isFunction(callback)){
				callback(rp);
			}
		}
		else{
			alert('time initialize failed!');
		}
	});
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






