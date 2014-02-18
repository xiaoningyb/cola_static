/**
 * cola web version
 * @return {[type]} [description]
 */
var timeFlag=1;
var cola={
	'domain':'http://weixin.yixun.com/coladev',
	'lotteryId':1224,
	'eventId':19038
};
cola.codeMapping={
	101	: "��������æ�����Ժ�����",
	102	: "��֤ʧ��",
	103	: "��QQ��ʧ��",
	104	: "��Ѹ��¼ʧ��",
	105	: "��֤��¼ʧ��",
	106	: "��������æ�����Ժ�����",
	201	: "��������",
	202	: "δ��¼�����ȵ�¼",
	301	: "δ��¼�����ȵ�¼",


	1001 : "ƿ�����ʽ����",
	1002 : "ƿ���볤�ȴ���",
	1003 : "ƿ���벻��",
	1004 : "��������æ�����Ժ�����",
	1005 : "��������æ�����Ժ�����",
	1006 : "��������æ�����Ժ�����",
	1007 : "��������æ�����Ժ�����",
	1008 : "ƿ������Ч",
	1009 : "��������æ�����Ժ�����",
	1010 : "ƿ�����ѱ�ʹ�ù�",
	1011 : "��������æ�����Ժ�����",
	1012 : "���ķ��ʹ���Ƶ��",

	13200 :	"��������æ�����Ժ�����",



	10001 : "��������æ�����Ժ�����",
	10002 : "û���ҵ���Ӧ���û���Ϣ",

	20001 : "����ԤԼ����������ɱ�",
	20002 : "ƿ���벻��",
	20003 : "��������æ�����Ժ�����",
	20004 : "��������æ�����Ժ�����",
	20005 : "��������æ�����Ժ�����",
	20006 : "��������æ�����Ժ�����",
	20007 : "��ȡ�Żݾ�ʧ��",

	30001 : "������ɱ���ڴ���ͬ����ʱ�䲻һ��",
	30002 : "��ɱ��ƷID����",
	30003 : "����δԤԼ��������ɱ�",
	30004 : "��������æ�����Ժ�����"
};	
cola.getDefaultErrmsg=function(errno){
	var errmsg  = "��������æ�����Ժ�����";
	if( typeof errno != 'undefined' ){
		errmsg = "������[" + errno + "]";
		if( typeof codeMapping[errno] != 'undefined' ){
			errmsg = errmsg + ":" + codeMapping[errno];
		}
	}
	return errmsg;
}
cola.showDefaultError=function(errno){
	cola.msgbox.showinfo(null, null, "ȷ��", cola.getDefaultErrmsg(errno), "����");
};
cola.code2error=function(errorCode){
	return typeof cola.codeMapping[errorCode]=='undefined'?'δ֪����:'+errorCode:cola.codeMapping[errorCode];
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
	var params={'pincode':pincode.toUpperCase()};
	$.getJSON(url,params,function(rp){
		if(typeof callback == 'function'){
			callback(rp);
		}
	});
};

/**
 * ���pincode��ʽ
 * @param  {[type]} pincode [description]
 * @return {[type]}         [description]
 */
cola.checkPincode=function(pincode){
	var reg=new RegExp('^[a-zA-Z0-9]{13}$');
	return reg.test(pincode);
};

/**
 * ����վ�ĵĵ��������һ�¼򵥵ķ�װ
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
		var title=options.title||'��ʾ';
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
		'1':'һ',
		'2':'��',
		'3':'��',
		'4':'��',
		'5':'��',
		'6':'��',
		'7':'��',
		'8':'��',
		'9':'��',
		'10':'ʮ',
		'11':'ʮһ',
		'11':'ʮ��'
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
 * �ӷ������˻�ȡ�����Ŀ�ʼʱ��
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
				var options = {"okText" : "ȷ��", "contents" : "time initialize failed!"};
				cola.msgbox.show(null, null, options, 1); 
			}
		}
	};
	$.ajax(settings);
};

/**
 * ����ʱ��ʼ��
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
 * �һ���Ʒ��ʼ��
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
				cola.msgbox.show(null,null,{'okText':'ȷ��','contents':'���ݶ�ȡʧ�ܣ���ˢ��ҳ������'},1);
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
				var options = {"okText" : "ȷ��", "contents" : cola.code2error(rp.errno)};
				cola.msgbox.show(null, null, options, 1); 
			}
		});
	};
	return this;
};

/**
 * ��ȡ�û��һ����齱��ַ
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
 * �Ե�ַȷ������ķ�װ
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
		html.push('<th>ѡ�����</th>');
		html.push('<td><div class="pop_dh_pc">');
		html.push('<select id="pro"><option>ʡ</option></select>');
		html.push('<select id="city"><option>��</option></select></div>');
		html.push('<div class="pop_dh_street"><select id="region"><option>��/��</option></select></div>');
		html.push('</td>');
		html.push('</tr>');
		html.push('<tr>');
		html.push('<th>��ϸ��ַ</th><td><textarea name="address" placeholder="�ֵ���ַ"></textarea></td>');
		html.push('</tr>');
		html.push('<tr>');
		html.push('<th>�ջ���</th><td><input name="username" type="text" class="pop_dh_dz_int4" placeholder="����"></td>');
		html.push('</tr>');
		html.push('<tr>');
		html.push('<th>�ֻ�</th><td><input name="mobile" type="text" class="pop_dh_dz_int4" placeholder="�ֻ�����"></td>');
		html.push('</tr>');
		html.push('<tr id="msg_tip" style="display:none"><th>&nbsp;</th><td><p class="pop_dh_tip"><span class="c_tx1">�ֻ��͹̶��绰��������дһ��</span></p></td></tr>');
		html.push('</tbody></table>');
		html.push('</div>');
		options={
			'okText':'ȷ�ϵ�ַ',
			'width':650,
			'height':452,
			'contents':html.join('')
		};
		cola.msgbox.show(function(){
			//�����ַ
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
			self._setMsgTip('��ѡ��ʡ��');
			jqpro.focus();
			return false;
		}
		else if(jqcity.get(0).selectedIndex==0){
			self._setMsgTip('��ѡ�����');
			jqcity.focus();
			return false;
		}
		else if(jqregion.get(0).selectedIndex==0){
			self._setMsgTip('��ѡ�����');
			jqregion.focus();
			return false;
		}
		else if(address==''){
			self._setMsgTip('����д�ֵ���Ϣ');
			jqaddress.focus();
			return false;
		}else if(username==''){
			self._setMsgTip('�û�������Ϊ��');
			jqusername.focus();
			return false;
		}
		else if(mobile==''){
			self._setMsgTip('�ֻ����벻��Ϊ��');
			jqmobile.focus();
			return false;
		}
		var result=[];
		result.push(pro+city+region+address+'</br>'+username+'��'+mobile);
		cola.InitGift().addUserAddress(result.join(''),function(rp){
			if(rp.errno==0){
				cola.msgbox.show(null,null, {'contents':'��ַȷ�ϳɹ���','okText':'�ر�'}, 3);
			}
			else{
				self._setMsgTip('ϵͳ���������ԣ�');
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
 * ����Ƿ���ɱ�ʸ�ԤԼ
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
 * ��ɱ�ʸ�ԤԼ
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
		cola.msgbox.show(function(){cola.goLogin();},null,{'okText':'ȥ��¼','closeText':'ȡ��','contents':'����û�е�¼�������Ҫʹ��QQ�˺Ų��ܲ���Ŷ��'}, 1);
	}
	return islogin;
};

cola.goLogin=function(){
	var url='https://base.yixun.com/login.html?url='+encodeURIComponent(window.location);
	window.location=url;
};

cola.checkIsLogin=function(loginCallback){
	var url=cola.domain+'/checkqq?callback=?&t='+Math.random();
	$.getJSON(url,function(rp){
		if(rp.errno==0 && typeof loginCallback == 'function'){
			loginCallback();
		}
		else if(rp.errno!=0){
			cola.msgbox.show(function(){cola.goLogin();},null,{'okText':'ȥ��¼','closeText':'ȡ��','contents':'�����Ҫʹ��QQ�˺ŵ�¼���ܲ���Ŷ��'}, 1);
		}
	});
};

/**
 * ����������ʼ��
 * @return {[type]} [description]
 */
cola.initSuperBuy=function(spCallback,skCallback){
	var self=this;
	this.getGroupIdx=function(wsid){
		var mappings={
			'1':[1,0],
			'1001':[3,2],
			'2001':[5,4],
			'3001':[7,6],
			'4001':[9,8],
			'5001':[11,10]
		};
		return typeof mappings[wsid]=='undefined'?mappings[1]:mappings[wsid];
	};
	var wsid=cola.getCookie('wsid');
	if($.trim(wsid)==''){
		wsid='1';
	}
	var arrIdx=self.getGroupIdx(wsid);
	cola.getEventData(function(data){
		if(typeof skCallback == 'function'){
			cola.initSk(data.pblock[arrIdx[1]].list,skCallback);
		}
		if(typeof spCallback == 'function'){
			spCallback(data.pblock[arrIdx[0]].list);
		}
	});

	/*if(typeof window.event_data != 'undefined'){
		if(typeof skCallback == 'function'){
			cola.initSk(window.event_data.pblock[arrIdx[1]].list,skCallback);
		}
		if(typeof spCallback == 'function'){
			spCallback(window.event_data.pblock[arrIdx[0]].list);
		}
		return;
	}

	var settings={
		url:'http://event.yixun.com/event/'+cola.eventId+'_info.js',
        dataType:'script',
        crossDomain:true,
        scriptCharset:'gbk',
        success:function(){
        	window.event_data=GoodsInfo_51buy;
			//��ʼ��0Ԫ��ɱ��Ʒ
			if(typeof skCallback == 'function'){
				var dataList=GoodsInfo_51buy.pblock[arrIdx[1]].list;
				cola.initSk(dataList,skCallback);
			}
			//��������
			if(typeof spCallback == 'function'){
				spCallback(GoodsInfo_51buy.pblock[arrIdx[0]].list);
			}
		}

    };
    $.ajax(settings);*/
};

/**
 * get event source data
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
cola.getEventData=function(callback){
	if(typeof window.event_data != 'undefined' && typeof callback =='function'){
		callback(window.event_data);
		return;
	}
	var settings={
		url:'http://event.yixun.com/event/'+cola.eventId+'_info.js',
        dataType:'script',
        crossDomain:true,
        scriptCharset:'gbk',
        success:function(){
        	window.event_data=GoodsInfo_51buy;
			if(typeof callback == 'function'){
				callback(GoodsInfo_51buy);
			}
		}
    };
    $.ajax(settings);
};

/**
 * ��ɱ��ʼ��
 * @return {[type]} [description]
 */
cola.initSk=function(initData,callback){
	var self=this;
	this.getSkList=function(callback){
		// console.log(initData);
		for(var i in initData){
			if(i>3) break;
			self._getPrdInfo(i,initData[i],callback);
		}
	};
	
	this._getPrdInfo=function(idx,bPrdInfo,callback){
		var self=this;
		var prdId=bPrdInfo.product_id;
		var url='http://d.qiang.yixun.com/qiangitem/GetDetail?&activeid=0&itemId='+prdId+'&_time='+Math.random();
		$.getScript(url,function(){
			if(pageInfo.errCode===0){
				var prdInfo={};
				var itemInfo=pageInfo.itemInfo;
				prdInfo.prdId=prdId;
				prdInfo.title=itemInfo.title;
				prdInfo.subTitle=itemInfo.subTitle;
				prdInfo.desc=bPrdInfo.desc;
				prdInfo.pic=bPrdInfo.pic300;
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

/**
 * ��ȡurl����
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
cola.getParam=function(name){
	var reg=new RegExp(name+'=([^&]*)');
	var m=location.href.match(reg);
	return !m?'':m[1];
};

