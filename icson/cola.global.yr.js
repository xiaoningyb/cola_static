var domain='http://weixin.yixun.com/coladev';
function getCookie(name){
		var r = new RegExp("(^|;|\\s+)" + name + "=([^;]*)(;|$)");
		var m = document.cookie.match(r);
		return (!m ? "": unescape(m[2]));
}

function isLogin(isJump){
	if(typeof isJump == 'undefined'){
		isJump=true;
	}
	var islogin=$.trim(getCookie('uid'))===''?false:true;
	if(isJump&&!islogin){
		alert('请您登录，继续后续操作');
		var url='https://base.yixun.com/login.html?url='+encodeURIComponent(window.location);
		window.location=url;
	}
	return islogin;
}

var colaGlobal=function(){
	var self=this;

	this.showFooter=function(){
		var html=[];
		html.push('<!-- 精选品牌活动 开始 -->');
		html.push('<div class="act_hot">');
		html.push('<div class="act_hot_hd"><h3>精选品牌热门活动</h3></div>');
		html.push('<div class="act_hot_bd">');
		html.push('<ul class="clear">');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/240x120" alt="图片名称" /></a></li>');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/240x120" alt="图片名称" /></a></li>');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/240x120" alt="图片名称" /></a></li>');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/240x120" alt="图片名称" /></a></li>');
		html.push('</ul>');
		html.push('</div>');
		html.push('</div>');
		html.push('<!-- 精选品牌活动 结束 -->');
		html.push('<!-- 感谢合作方提供部分秒杀及兑换商品 开始 -->');
		html.push('<div class="act_hzf">');
		html.push('<div class="act_hzf_hd"><h3>感谢合作方提供部分秒杀及兑换商品</h3></div>');
		html.push('<div class="act_hzf_bd">');
		html.push('<ul class="clear">');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/120x60" alt="图片名称" /></a></li>');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/120x60" alt="图片名称" /></a></li>');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/120x60" alt="图片名称" /></a></li>');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/120x60" alt="图片名称" /></a></li>');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/120x60" alt="图片名称" /></a></li>');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/120x60" alt="图片名称" /></a></li>');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/120x60" alt="图片名称" /></a></li>');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/120x60" alt="图片名称" /></a></li>');
		html.push('</ul>');
		html.push('</div>');
		html.push('</div>');
		html.push('<!-- 感谢合作方提供部分秒杀及兑换商品 结束 -->');
		html.push('<!-- 微博分享 开始 -->');
		html.push('<div class="act_sns f_tx1">');
		html.push('<div class="act_sns_hd"><h3>腾讯微博</h3></div>');
		html.push('<div class="act_sns_bd">');
		html.push('<div class="act_sns_col1"><iframe id="zhuanfa_frame" style="border:none;width:500px;height:260px"></iframe></div>');
		html.push('<div class="act_sns_col2">');
		html.push('<div class="act_wb">');
		html.push('<div class="act_wb_form">');
		html.push('<textarea  class="act_wb_tat input_text"></textarea>');
		html.push('<p class="act_wb_chk clear"><span><i id="ntotal">0</i>/140</span><label><input id="chk_share" type="checkbox" />同时分享到腾讯微博</label></p>');
		html.push('</div>');
		html.push('<p class="act_wb_btn clear"><a href="javascript:;" class="abtn_wb tencent_weibo_bt">分享到腾讯微博</a><a href="javascript:;" id="bt_sina" class="abtn_wb abtn_wb1">分享到新浪微博</a></p>');
		html.push('</div>');
		html.push('</div>');
		html.push('</div>');
		html.push('</div>');
		html.push('<!-- 微博分享 结束 -->');
		html.push('<!-- 活动规则 开始 -->');
		html.push('<div class="act_rule f_tx1">');
		html.push('<div class="act_rule_hd"><h3>活动规则</h3></div>');
		html.push('<div class="act_rule_bd">');
		html.push('<ul>');
		html.push('<li>一、活动时间：</li>');
		html.push('<li>2014年3月3日至2014年5月31日；</li>');
		html.push('<li>二、参与方式：</li>');
		html.push('<li>活动期间，凭“午后畅爽秒大奖”可口可乐公司促销产品瓶盖内的13位瓶盖码，登录易迅网活动页3pm.yixun.com，或关注可口可乐官方微信，即可参与活动；</li>');
		html.push('<li>三、秒杀参与指引：</li>');
		html.push('<li>1. 秒杀时间：活动期间，每天下午3点开启，24点结束。</li>');
		html.push('<li>2. 入场资格：活动期间，每天0点至24点间，可用1个瓶盖码兑换当天秒杀场的秒杀资格。秒杀资格兑换仅限当天场次，其他日期场次的秒杀资格不能提前兑换。</li>');
		html.push('<li>3. 秒杀商品：任意秒杀商品，均为先到先得，秒完即止。包括：每天300台可口可乐定制版0元三星手机，爆款3折起秒杀商品及易迅精选商品；具体秒杀商品及数量以当天实际活动为准。0元三星手机、爆款3折起秒杀商品、部分易迅精选商品，每个id限购1件。</li>');
		html.push('<li>4. 易迅网5元优惠券：用瓶盖码兑换秒杀资格时，可同时获赠一张易迅网5元优惠券。优惠券仅限本人使用，有效期为领取之日起90天内，易迅网全网通用（虚拟及特价商品除外），详细使用说明请查看优惠券介绍。（点击后打开新页面：http://st.yixun.com/help/1-4-coupon.htm）</li>');
		html.push('<li>5. 瓶盖码存储：多余的瓶盖码可先在活动页面进行存储，兑换秒杀资格时可以直接消耗已存储的瓶盖码。</li>');
		html.push('<li>6. 页面内商品售完即作下架及更新处理，最新商品信息请用户及时刷新活动页面。</li>');
		html.push('<li>7. 此促销活动只针对普通消费者，渠道经销商不享受优惠，一经发现活动主办方有权取消购买资格。</li>');
		html.push('<li>8. 由于活动期间会短时间生成大量订单，所以部分订单配送可能会有所延缓，敬请谅解。</li>');
		html.push('<li>9. 活动主办方拥有法律允许范围内的最终解释权。</li>');
		html.push('<li>更多活动说明请点击查看详情</li>');
		html.push('</ul>');
		html.push('<p><a id="rules_more" href="javascript:;" class="lk_0">查看详情&gt;</a></p>');
		html.push('</div>');
		html.push('</div>');
		html.push('<!-- 活动规则 结束 -->');
		html.push('<!-- 二维码 -->');
		html.push('<div class="act_ma">');
		html.push('<a href="#">关闭</a>');
		html.push('</div>');
		return html.join('');
	};

	this.showWeibo=function(){
		var self=this;
		this.maxlen=140;
		var options={
			showFrame : "#zhuanfa_frame",
			submitBtn : ".tencent_weibo_bt" ,
			adsTitle : "可口可乐午后畅爽",
			adsContent : "困乏的下午3点，你在刷眼皮？刷朋友圈？还是刷微博？刷不出人生high点，不如来瓶可乐激爽一下！现在开始搜集可口可乐瓶盖码，每天下午3点，300台0元三星手机等你秒！3月3日上易迅网3pm.yixun.com，惊喜正式开启！",
			adsPic : "",
			adsUrl : "http://www.yixun.com"
		};

		this._initTencentWeibo(options);
		this.refreshNumber($('.input_text'),$('#ntotal'),self.maxlen);
		$('#bt_sina').click(function(){
			self._sinaWeibo($(".input_text").val(),options.adsUrl,options.adsPic);
			if($('#chk_share').get(0).checked){
				self._tencentWeibo(options.adsContent,options.adsUrl,options.adsPic);
			}
		});

		$('.input_text').keyup(function(){
			self.refreshNumber($(this),$('#ntotal'),self.maxlen);
		});
	};

	this.refreshNumber=function(contentObj,showObj,maxlen){
		var oval=contentObj.val();
		var len=oval.length;
		if(len>maxlen){
			contentObj.val(oval.substr(0,maxlen));
			len=maxlen;
		}
		showObj.text(len);
	};

	//新浪微博分享
	this._sinaWeibo=function(title,url,pic){
		var params={'title':encodeURIComponent(title),'url':encodeURIComponent(url),'pic':encodeURIComponent(pic)};
		var _url="http://v.t.sina.com.cn/share/share.php?"+$.param(params);
		window.open(_url,'_blank');
	};

	this._tencentWeibo=function(title,url,pic){
		var params={
			'title':title,
			'url':encodeURIComponent(url),
			'pic':encodeURIComponent(pic),
			'appkey':801148568,
			'site':'www.yixun.com'
		};
		var _url = 'http://v.t.qq.com/share/share.php?'+$.param(params);
		window.open(_url, '', 'width=600,height=300,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,location=no,resizable=no,status=no');
	};

	//腾讯微博分享
	this._initTencentWeibo=function(options){
		var self=this;
		var o=options;
		var fullAdsContent = "#" + o.adsTitle + "# " + o.adsContent;
		$(".input_text").val(fullAdsContent + " ");
		var frameUrl = "http://wall.v.t.qq.com/index.php?c=wall&a=index&t=" + encodeURIComponent(o.adsTitle) + "&ak=801138415&w=0&h=320&o=3&s=4&cs=545454_FFFFFF_CDFF9C_FFFFFF_007500_333333";
		$(o.showFrame).attr("src", frameUrl);
		$(o.submitBtn).click(function(){
			self._tencentWeibo($(".input_text").val(),o.adsUrl,o.adsPic);
		});
	};

	//获取用户当前可乐币数量
	this.getPincodeCount=function(){
		self.intervalFunction();
		setInterval(self.intervalFunction,30000);
		
	};

	this.intervalFunction=function(){
		cola.getPincodeCount(function(rp){
			if(rp.errno==0){
				$('#my_pincode').html(rp.data.colacoin);
			}
			else{
				console.log('get pincode errno:'+rp.errno);
			}
		});
	};

	//瓶盖码存储
	this.storePincode=function(){
		var self=this;
		$('#store_pincode').click(function(){
			if(!cola.isLogin()){
				return false;
			}
			var html=[];
			html.push('<div class="pop_cj">');
			html.push('<p class="pop_cj_int"><input id="pincode" type="text" maxlength=13 placeholder="请在此输入可乐瓶盖内的13位瓶盖码" class="c_tx3"></p>');
			html.push('<p class="pop_cj_tip" style="display:none"><span class="c_tx1"></span></p>');
			html.push('</div>');
			var options={
				'title':'存储瓶盖码',
				'contents':html.join(''),
				'okText':'确定',
				'closeText':'取消'
			};
			cola.msgbox.show(function(){
				var pincode=$.trim($('#pincode').val());
				var tip=$('span.c_tx1');
				if(cola.checkPincode(pincode)){
					cola.storePincode(pincode,function(rp){
						if(rp.errno==110){
							tip.text('该瓶盖码已被使用').parent('p').show();
						}
						else{
							self.getPincodeCount();
							cola.msgbox.close();
						}
					})
				}
				else{
					tip.text('瓶盖码格式有误！').parent('p').show();
				}
				return false;
			},null,options,4);
		});
	};

	this.showRules=function(){
		var html=[];
		html.push('<div class="mod_pop_bd" style="font-weight:normal;font-size:12px">');
		html.push('<p>一、<strong>活动时间</strong>：2014年3月3日至2014年5月31日；</p>');
		html.push('<br>');
		html.push('<p>二、<strong>参与方式</strong>：活动期间，凭“午后畅爽秒大奖”可口可乐公司促销产品瓶盖内的13位瓶盖码，登录易迅网活动页，或关注可口可乐官方微信，即可参与活动；</p>');
		html.push('<br>');
		html.push('<p>三、<strong>3点秒杀</strong>：</p>');
		html.push('<p>');
		html.push('1.每天下午3点开启一场秒杀，需用1个瓶盖码预约秒杀进场资格，方可参与秒杀场内任意商品的抢购。每件秒杀商品每人限购一件，先到先得；');
		html.push('</p>');
		html.push('<p>');
		html.push('2.每天兑换得到的秒杀资格，仅可用于当天的秒杀场。每天300台可口可乐定制版三星手机参与0元秒杀；');
		html.push('</p>');
		html.push('<p>');
		html.push('3.用瓶盖码兑换秒杀资格时，可获取一张易迅网5元优惠券。优惠券的仅限本人使用，有效期为领取之日起90天内，易迅网全网通用（虚拟及特价商品除外），详细使用说明请&nbsp;<a class="lk_0" href="http://st.yixun.com/help/1-4-coupon.htm" target="_blank">查看优惠券介绍</a>');
		html.push('</p>');
		html.push('<br>');
		html.push('<p>');
		html.push('四、<strong>3点兑换</strong>：');
		html.push('</p>');
		html.push('<p>');
		html.push('1.使用规定数量的瓶盖码即可参与虚拟或实物礼品的兑换；');
		html.push('</p>');
		html.push('<p>');
		html.push('2.兑换实物礼品的用户请在本活动页面输入收货地址。我们将在您兑换成功后的30个工作日内安排发货。收货地址只能输入一次，输入后无法更改，请确保输入正确；');
		html.push('</p>');
		html.push('<p>');
		html.push('3.虚拟礼品会在兑换成功后的30分钟内发放到活动帐号，请在我的活动记录中查看礼品兑换编码，并凭编码到以下对应网址进行礼品领取：');
		html.push('</p>');
		html.push('<p>');
		html.push('***游戏：***链接 +展开');
		html.push('</p>');
		html.push('<p>');
		html.push('4.每件礼品每人每天均有兑换次数限制，具体限制次数详见各礼品兑换说明；');
		html.push('</p>');
		html.push('<br>');
		html.push('<p>');
		html.push('五、<strong>幸运抽奖</strong>：');
		html.push('</p>');
		html.push('<p>');
		html.push('1.凭1个瓶盖码可参与1次抽奖；');
		html.push('</p>');
		html.push('<p>');
		html.push('2.每个用户每天最多可参与10次抽奖；');
		html.push('</p>');
		html.push('<p>');
		html.push('3.虚拟或实物奖品的发放请参见“3点兑换”中关于虚拟和实物礼品发放的说明。');
		html.push('</p>');
		html.push('</div>');
		var options={
				'title':'活动规则',
				'contents':html.join(''),
				'okText':'关闭',
				'width':700,
				'height':720
			};
		$('#rules_more').click(function(){
			cola.msgbox.show(null,null,options,4);
		});
	};

	this.run=function(){
		$('#pg_footer').html(this.showFooter());
		this.getPincodeCount();
		this.storePincode();
		this.showWeibo();
		this.showRules();
	};

	this.run();
};

$(document).ready(function(){
	new colaGlobal();
});
