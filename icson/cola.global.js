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
		alert('������¼��������������');
		var url='https://base.yixun.com/login.html?url='+encodeURIComponent(window.location);
		window.location=url;
	}
	return islogin;
}

var colaGlobal=function(){
	var self=this;
	this.showHeader=function(){
		var html=[];
		html.push('<div class="act_nav_inner">');
		html.push('<a href="#" class="act_nav_lk2">3����ɱ-���ˬ��ɱ</a>');
		html.push('<a href="#" class="act_nav_lk3">3��һ�-���ˬ��ɱ</a>');
		html.push('<a href="#" class="act_nav_lk4">���˳齱-���ˬ��ɱ</a>');
		html.push('<a href="#" class="act_nav_lk5">�ҵĻ��¼&gt;</a>');
		html.push('<a id="store_pincode" href="javascript:;" class="act_nav_lk6">�洢ƿ����</a>');
		html.push('<a href="#" class="act_nav_lk7">��ɿڿ��ֵ�ƿ����&gt;</a>');
		html.push('<p class="act_nav_info">�ҵ�ƿ����<span id="my_pincode">0</span>��</p>');
		html.push('<i class="act_nav_logo"></i>');
		html.push('</div>');
		return html.join('');
	};

	this.showFooter=function(){
		var html=[];
		html.push('<div class="act_relevance">');
		html.push('<div class="act_relevance_inner clear">');
		html.push('<a href="##" class="act_relevance_1"><span class="hide">ȥ������3��0Ԫ��ɱ��</span></a>');
		html.push('<a href="##" class="act_relevance_2" style="float:right"><span class="hide">ȥ���������˴�齱��</span></a>');
		html.push('</div>');
		html.push('</div>');
		html.push('<!-- ��ѡƷ�ƻ ��ʼ -->');
		html.push('<div class="act_hot">');
		html.push('<div class="act_hot_hd"><h3>��ѡƷ�����Ż</h3></div>');
		html.push('<div class="act_hot_bd">');
		html.push('<ul class="clear">');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/240x120" alt="ͼƬ����" /></a></li>');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/240x120" alt="ͼƬ����" /></a></li>');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/240x120" alt="ͼƬ����" /></a></li>');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/240x120" alt="ͼƬ����" /></a></li>');
		html.push('</ul>');
		html.push('</div>');
		html.push('</div>');
		html.push('<!-- ��ѡƷ�ƻ ���� -->');
		html.push('<!-- ��л�������ṩ������ɱ���һ���Ʒ ��ʼ -->');
		html.push('<div class="act_hzf">');
		html.push('<div class="act_hzf_hd"><h3>��л�������ṩ������ɱ���һ���Ʒ</h3></div>');
		html.push('<div class="act_hzf_bd">');
		html.push('<ul class="clear">');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/120x60" alt="ͼƬ����" /></a></li>');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/120x60" alt="ͼƬ����" /></a></li>');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/120x60" alt="ͼƬ����" /></a></li>');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/120x60" alt="ͼƬ����" /></a></li>');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/120x60" alt="ͼƬ����" /></a></li>');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/120x60" alt="ͼƬ����" /></a></li>');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/120x60" alt="ͼƬ����" /></a></li>');
		html.push('<li><a href="#"><img src="http://ecd.oa.com/120x60" alt="ͼƬ����" /></a></li>');
		html.push('</ul>');
		html.push('</div>');
		html.push('</div>');
		html.push('<!-- ��л�������ṩ������ɱ���һ���Ʒ ���� -->');
		html.push('<!-- ΢������ ��ʼ -->');
		html.push('<div class="act_sns f_tx1">');
		html.push('<div class="act_sns_hd"><h3>��Ѷ΢��</h3></div>');
		html.push('<div class="act_sns_bd">');
		html.push('<div class="act_sns_col1"><iframe id="zhuanfa_frame" style="border:none;width:500px;height:260px"></iframe></div>');
		html.push('<div class="act_sns_col2">');
		html.push('<div class="act_wb">');
		html.push('<p class="act_wb_yq"><a href="#" title="���������ƿ����">���������ƿ����</a></p>');
		html.push('<div class="act_wb_form">');
		html.push('<textarea  class="act_wb_tat input_text"></textarea>');
		html.push('<p class="act_wb_chk clear"><span><i id="ntotal">0</i>/80</span><label><input id="chk_share" type="checkbox" />ͬʱ������Ѷ΢��</label></p>');
		html.push('</div>');
		html.push('<p class="act_wb_btn clear"><a href="javascript:;" class="abtn_wb tencent_weibo_bt">������Ѷ΢��</a><a href="javascript:;" id="bt_sina" class="abtn_wb abtn_wb1">��������΢��</a></p>');
		html.push('</div>');
		html.push('</div>');
		html.push('</div>');
		html.push('</div>');
		html.push('<!-- ΢������ ���� -->');
		html.push('<!-- ����� ��ʼ -->');
		html.push('<div class="act_rule f_tx1">');
		html.push('<div class="act_rule_hd"><h3>�����</h3></div>');
		html.push('<div class="act_rule_bd">');
		html.push('<ul>');
		html.push('<li>�ʱ�䣺2014��3��1�� - 2014��5��31��</li>');
		html.push('<li>��ԭ ����ͬ���ü�����ô���������Ƭ 60g ����ζ���Ƭ �������ڻ������ƬԲƬ��Ƭб��Ƭ�����</li>');
		html.push('<li>��ԭ ����ͬ���ü�����ô���������Ƭ 60g ����ζ���Ƭ �������ڻ������ƬԲƬ��Ƭб��Ƭ�����</li>');
		html.push('<li>��ԭ ����ͬ���ü�����ô���������Ƭ 60g ����ζ���Ƭ �������ڻ������ƬԲƬ��Ƭб��Ƭ�����</li>');
		html.push('<li>��ԭ ����ͬ���ü�����ô���������Ƭ 60g ����ζ���Ƭ �������ڻ������ƬԲƬ��Ƭб��Ƭ�����</li>');
		html.push('</ul>');
		html.push('<p><a id="rules_more" href="javascript:;" class="lk_0">�鿴����&gt;</a></p>');
		html.push('</div>');
		html.push('</div>');
		html.push('<!-- ����� ���� -->');
		html.push('<!-- ��ά�� -->');
		html.push('<div class="act_ma">');
		html.push('<a href="#">�ر�</a>');
		html.push('</div>');
		return html.join('');
	};

	this.showWeibo=function(){
		var self=this;
		this.maxlen=80;
		var options={
			showFrame : "#zhuanfa_frame",
			submitBtn : ".tencent_weibo_bt" ,
			adsTitle : "΢���ֿ���ѸԤ��",
			adsContent : "΢��5.0���ˣ���΢���֡���Ҳ������Ⱥ����������ר�����顢����������֧���Żݡ���Ϸ��Ȩ������΢���֡��������Ȩ������������С������ǲ����Ķ����أ�8��5�գ���Ѹ��չ����΢���֡�������Ԥ���������Ż�ȯ�����ת�̳�ipad�ȶ��غ�����ϣ����������أ�",
			adsPic : "",
			adsUrl : "http://www.yixun.com"
		};

		this._initTencentWeibo(options);
		this.refreshNumber($('.input_text'),$('#ntotal'),self.maxlen);
		$('#bt_sina').click(function(){
			self._sinaWeibo(options.adsContent,options.adsUrl,options.adsPic);
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

	//����΢������
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

	//��Ѷ΢������
	this._initTencentWeibo=function(options){
		var self=this;
		var o=options;
		var fullAdsContent = "#" + o.adsTitle + "# " + o.adsContent;
		$(".input_text").val(fullAdsContent + " ");
		var frameUrl = "http://wall.v.t.qq.com/index.php?c=wall&a=index&t=" + encodeURIComponent(o.adsTitle) + "&ak=801138415&w=0&h=320&o=3&s=4&cs=545454_FFFFFF_CDFF9C_FFFFFF_007500_333333";
		$(o.showFrame).attr("src", frameUrl);
		$(o.submitBtn).click(function(){
			self._tencentWeibo(o.adsContent,o.adsUrl,o.adsPic);
		});
	};

	//��ȡ�û���ǰ���ֱ�����
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

	//ƿ����洢
	this.storePincode=function(){
		var self=this;
		$('#store_pincode').click(function(){
			if(!cola.isLogin()){
				return false;
			}
			var html=[];
			html.push('<div class="pop_cj">');
			html.push('<p class="pop_cj_int"><input id="pincode" type="text" maxlength=13 placeholder="���ڴ��������ƿ���ڵ�13λƿ����" class="c_tx3"></p>');
			html.push('<p class="pop_cj_tip" style="display:none"><span class="c_tx1"></span></p>');
			html.push('</div>');
			var options={
				'title':'�洢ƿ����',
				'contents':html.join(''),
				'okText':'ȷ��',
				'closeText':'ȡ��'
			};
			cola.msgbox.show(function(){
				var pincode=$.trim($('#pincode').val());
				var tip=$('span.c_tx1');
				if(cola.checkPincode(pincode)){
					cola.storePincode(pincode,function(rp){
						if(rp.errno==110){
							tip.text('��ƿ�����ѱ�ʹ��').parent('p').show();
						}
						else{
							self.getPincodeCount();
							cola.msgbox.close();
						}
					})
				}
				else{
					tip.text('ƿ�����ʽ����').parent('p').show();
				}
				return false;
			},null,options,4);
		});
	};

	this.showRules=function(){
		var html=[];
		html.push('<div class="mod_pop_bd" style="font-weight:normal;font-size:12px">');
		html.push('<p>һ��<strong>�ʱ��</strong>��2014��3��3����2014��5��31�գ�</p>');
		html.push('<br>');
		html.push('<p>����<strong>���뷽ʽ</strong>����ڼ䣬ƾ�����ˬ��󽱡��ɿڿ��ֹ�˾������Ʒƿ���ڵ�13λƿ���룬��¼��Ѹ���ҳ�����ע�ɿڿ��ֹٷ�΢�ţ����ɲ�����</p>');
		html.push('<br>');
		html.push('<p>����<strong>3����ɱ</strong>��</p>');
		html.push('<p>');
		html.push('1.ÿ������3�㿪��һ����ɱ������1��ƿ����ԤԼ��ɱ�����ʸ񣬷��ɲ�����ɱ����������Ʒ��������ÿ����ɱ��Ʒÿ���޹�һ�����ȵ��ȵã�');
		html.push('</p>');
		html.push('<p>');
		html.push('2.ÿ��һ��õ�����ɱ�ʸ񣬽������ڵ������ɱ����ÿ��300̨�ɿڿ��ֶ��ư������ֻ�����0Ԫ��ɱ��');
		html.push('</p>');
		html.push('<p>');
		html.push('3.��ƿ����һ���ɱ�ʸ�ʱ���ɻ�ȡһ����Ѹ��5Ԫ�Ż�ȯ���Ż�ȯ�Ľ��ޱ���ʹ�ã���Ч��Ϊ��ȡ֮����90���ڣ���Ѹ��ȫ��ͨ�ã����⼰�ؼ���Ʒ���⣩����ϸʹ��˵����&nbsp;<a class="lk_0" href="http://st.yixun.com/help/1-4-coupon.htm" target="_blank">�鿴�Ż�ȯ����</a>');
		html.push('</p>');
		html.push('<br>');
		html.push('<p>');
		html.push('�ġ�<strong>3��һ�</strong>��');
		html.push('</p>');
		html.push('<p>');
		html.push('1.ʹ�ù涨������ƿ���뼴�ɲ��������ʵ����Ʒ�Ķһ���');
		html.push('</p>');
		html.push('<p>');
		html.push('2.�һ�ʵ����Ʒ���û����ڱ��ҳ�������ջ���ַ�����ǽ������һ��ɹ����30���������ڰ��ŷ������ջ���ַֻ������һ�Σ�������޷����ģ���ȷ��������ȷ��');
		html.push('</p>');
		html.push('<p>');
		html.push('3.������Ʒ���ڶһ��ɹ����30�����ڷ��ŵ���ʺţ������ҵĻ��¼�в鿴��Ʒ�һ����룬��ƾ���뵽���¶�Ӧ��ַ������Ʒ��ȡ��');
		html.push('</p>');
		html.push('<p>');
		html.push('***��Ϸ��***���� +չ��');
		html.push('</p>');
		html.push('<p>');
		html.push('4.ÿ����Ʒÿ��ÿ����жһ��������ƣ��������ƴ����������Ʒ�һ�˵����');
		html.push('</p>');
		html.push('<br>');
		html.push('<p>');
		html.push('�塢<strong>���˳齱</strong>��');
		html.push('</p>');
		html.push('<p>');
		html.push('1.ƾ1��ƿ����ɲ���1�γ齱��');
		html.push('</p>');
		html.push('<p>');
		html.push('2.ÿ���û�ÿ�����ɲ���10�γ齱��');
		html.push('</p>');
		html.push('<p>');
		html.push('3.�����ʵ�ｱƷ�ķ�����μ���3��һ����й��������ʵ����Ʒ���ŵ�˵����');
		html.push('</p>');
		html.push('</div>');
		var options={
				'title':'�����',
				'contents':html.join(''),
				'okText':'�ر�',
				'width':700,
				'height':720
			};
		$('#rules_more').click(function(){
			cola.msgbox.show(null,null,options,4);
		});
	};

	this.smartNav=function(){
		$(window).scroll(function(event) {
			if($(this).scrollTop()>=160){
				$('#pg_header').addClass('act_nav_fixed');
			}
			else{
				$('#pg_header').removeClass('act_nav_fixed');
			}
		});
	};

	this.run=function(){
		$('#pg_header').html(this.showHeader());
		$('#pg_footer').html(this.showFooter());
		this.smartNav();
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
