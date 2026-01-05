package com.paojiao.sdk3.controller;

import java.net.URLDecoder;
import java.util.Date;
import java.util.HashMap;

import java.util.Map;


import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Before;
import com.jfinal.aop.Inject;
import com.jfinal.kit.JsonKit;
import com.paojiao.sdk3.common.PjConstants;
import com.paojiao.sdk3.common.StatusType;
import com.paojiao.sdk3.common.util.UcUtil;
import com.paojiao.sdk3.common.util.UrlEncoderUtils;
import com.paojiao.sdk3.controller.thirdsdk.HttpAgent;
import com.paojiao.sdk3.controller.thirdsdk.SDKVerifyResult;
import com.paojiao.sdk3.controller.thirdsdk.yinlian.AESUtils;
import com.paojiao.sdk3.handler.StatHandler;
import com.paojiao.sdk3.interceptor.DomainInterceptor;
import com.paojiao.sdk3.model.PjCpGame;
import com.paojiao.sdk3.model.PjMemberBinding;
import com.paojiao.sdk3.model.PjMemberUser;
import com.paojiao.sdk3.model.PjThirdSdkChannel;
import com.paojiao.sdk3.model.PjThirdSdkChannelGame;
import com.paojiao.sdk3.model.StatNewUser;
import com.paojiao.sdk3.model.pojo.LoginEntity;
import com.paojiao.sdk3.service.PjCpGameService;
import com.paojiao.sdk3.service.PjMemberBindingService;
import com.paojiao.sdk3.service.PjMemberUserIdcardService;
import com.paojiao.sdk3.service.PjMemberUserService;
import com.paojiao.sdk3.service.PjThirdSdkChannelGameService;
import com.paojiao.sdk3.service.PjThirdSdkChannelService;
import com.paojiao.sdk3.service.PjThirdSdkOrderService;
import com.paojiao.sdk3.service.StatNewUserService;

/**
 * @Description:银联游戏登录-需要先对用户信息进行验证然后再打开游戏(把进入游戏的地址返回给渠道)
 * @author tqy
 * @date 2020年6月3日
 */
@Before(DomainInterceptor.class)
public class YinLianLoginController extends BaseController {
	
	@Inject
	private PjMemberUserService userService;
	@Inject
	private PjThirdSdkOrderService orderService;
	@Inject
	private PjMemberUserIdcardService userIdcardService;
	@Inject
	private PjThirdSdkChannelGameService channelGameService;
	@Inject
	private PjCpGameService gameService;
	@Inject
	private PjThirdSdkChannelService channelService;
	@Inject
	private StatNewUserService statNewUserService;
	@Inject
	private PjMemberBindingService bindService;
	@Inject
	private StatHandler statHandler;
	
	private PjThirdSdkChannel sdkChannel;
	private PjThirdSdkChannelGame channelGame;
	private PjCpGame game;
	private PjMemberBinding buser;
	
	private static Logger log = Logger.getLogger(YinLianLoginController.class);

	public void yltoken() {
		JSONObject result = new JSONObject();
		//当前对接渠道10172
		this.sdkChannel = channelService.findChannelById(10172);//银联H5-新大话梦缘
		this.channelGame = channelGameService.findGameById(10909);//新大话梦缘
		this.game = gameService.findGameById(channelGame.getGameId());
		if (sdkChannel == null || channelGame == null || game == null) {
			result.put("resCode ", -1);
			result.put("msg", "error");
			this.renderJson(result);
			return;
		}
		String skey = channelGame.getPayKey();//获取渠道的appid做校验
		Map<String, String> map = getParamMap(skey);
		log.info("解密后的请求参数："+JsonKit.toJson(map));
		String appId= map.get("appid");
		//appid校验一致性
		if (!appId.equals(channelGame.getSdkAppId())) {
			result.put("resCode ", -1);
			result.put("msg", "appid error");
			this.renderJson(result);
			return;
		}
		String userId = map.get("userId");//获取渠道用户id
		if (StringUtils.isBlank(userId)) {
			result.put("resCode ", -1);
			result.put("msg", "userId is null");
			this.renderJson(result);
			return;
		}
		String phone = map.get("phone");//获取用户手机号
		/*String secretkey = map.get("secretkey");//用户的secretkey，支付秘钥
		if (StringUtils.isBlank(phone) || StringUtils.isBlank(secretkey)) {
			result.put("resCode ", -1);
			result.put("msg", "phone is null or secretkey is null");
			this.renderJson(result);
			return;
		}*/
		try {
			Map<String, Object> data = new HashMap<String, Object>();
			LoginEntity session;// 玩家在我服务器登录实体
			String appVersion = getPara("appVersion");
			if (StringUtils.isBlank(appVersion)) {
				appVersion = "1.0";
			}
			
			// 根据第三方用户信息判断用户是否已绑定我平台账号
			String bindType = PjConstants.SDK_CODE_H5_SDK3;
			if (PjConstants.SDK_CODE_PJH5.equals(sdkChannel.getSdkCode())){
				bindType = sdkChannel.getSdkCode();
			}
			buser = bindService.getBindingUser(userId,sdkChannel, bindType);
			StatNewUser newUser = new StatNewUser();
			newUser.setGameId(channelGame.getGameId());
			newUser.setUdid(getPara("udid"));
			newUser.setImei(getPara("imei"));
			newUser.setModel(getClientIp());
			newUser.setCreateDate(new Date());
			newUser.setCreateTime(new Date());
			SDKVerifyResult sdkUser = new SDKVerifyResult(true, userId, phone, "","");
			String cid = "smxnh5_zysh_sm_001";
			//String secretKey = "";
			// 未绑定则绑定、登录、返回token
			if (buser == null) {
				//使用手机号获取用户的支付秘钥 post请求且参数放到body中 application/json
				/*String url = "https://testhall.unionpaygame.com/game/getSeckey";
				Map<String, String> param = new HashMap<String, String>();
				param.put("phone", phone);
				try {
					String json = HttpAgent.getInstance().post(url, null, param, "utf-8");
					if (StringUtils.isBlank(json)) {
						log.info("根据手机号获取用户的支付秘钥失败，请求信息：{url: " + url + ", phone: " + phone + "}");
						result.put("resCode ", -1);
						result.put("msg", "get secretkey is null");
						this.renderJson(result);
						return;
					}
					JSONObject ojb = JSONObject.parseObject(json);
					if (ojb == null || StringUtils.isBlank(ojb.getString("secretKey"))) {
						log.info("json is null");
						result.put("resCode ", -1);
						result.put("msg", "error");
						this.renderJson(result);
						return;
					}
					secretKey = ojb.getString("secretKey");
				} catch (Exception ex) {
					log.error("根据手机号获取用户的支付秘钥失败，手机号="+phone, ex);
				}*/
				if (channelGame.getStatus() == 2) {// 封新增:不允许新增用户
					log.error("Game reg forbidden,channelGame:["+ JsonKit.toJson(channelGame)+ "]");
					data.put("resCode",StatusType.CHANNEL_GAME_EXCEPTION);
					return;
				}
				log.info("==========>>【yinlian用户="+userId+"_"+ phone + "】尚未绑定平台账号");
				// 生成平台新用户、游戏新用户
				PjMemberUser user = userService.random(getPara("udid"));
				
				// 绑定到sdk用户			
				user.setCid(cid);
				user.setUdid(getPara("udid"));
				int status = 1;// 默认普通用户
				buser = bindService.bindUser(user,sdkUser,sdkChannel,status,getPara("sdkVersion"),bindType);
				log.info("==========>>[yinlian用户="+sdkUser.getUserID()+"_"+ sdkUser.getUserName() + "]自动绑定平台账号：" + JsonKit.toJson(buser));
				
				newUser.setUid(buser.getUserId().longValue());
				newUser.setCid(cid);
			} else {// 已绑定的第三方用户,重新登录并返回登录token,记录stat_active_user
				Integer state = buser.getStatus();
				log.info("==========>>[yinlian用户="+userId+"_"+ phone + "]已绑定平台账号：" + JsonKit.toJson(buser));
				if (state == 0) {
					data.put("resCode",StatusType.USER_FORBIDDEN);
					return;
				}
				newUser.setUid(buser.getUserId().longValue());
				newUser.setCid(cid);
			}
			
			// 统计新增游戏用户或活跃用户 (非泡椒sdk才需要统计)		
			try{
				statHandler.saveUserStat(newUser);
			}catch(Exception e){
				log.error("统计新增/活跃用户异常", e);
			}
			// 非泡椒sdk，登录.（泡椒SDK用户已登录）.
			// 登录并返回用户信息、token.			
			/*if (!secretKey.equals(secretkey)) {
				result.put("resCode ", -1);
				result.put("msg", "secretkey is error");
				this.renderJson(result);
				return;
			}*/
			session = bindService.updateLoginEntity(buser,appVersion);
			//判断当前游戏是否开启实名认证
			//开启实名认证，调用用户中心接口，查询当前用户实名认证状态
			//未开启实名认证，直接使用渠道返回的实名认证状态
			try {
				Integer realNameAuthStatus = sdkUser.getRealNameAuthStatus();//渠道实名认证状态
				if(realNameAuthStatus == null){//渠道没有实名认证功能
					int realNameAuthentication = channelGame.getRealNameAuthentication();//实名认证开启状态0：未开启，1：开启 2:强制开启(用户无法关闭)
					session.setOpenRealNameAuth(realNameAuthentication);
					if (realNameAuthentication == 1 || realNameAuthentication == 2) {//开启实名认证
						Integer pjstatus = UcUtil.queryRealNameAuth(1, buser.getUserId());
						session.setRealNameAuthStatus(pjstatus);//设置泡椒实名认证状态
					}else{//未开启实名认证
						session.setRealNameAuthStatus(0);//设置泡椒实名认证状态
					}
				}else{//渠道有实名认证功能
					session.setOpenRealNameAuth(0);//关闭泡椒实名认证功能
					session.setRealNameAuthStatus(realNameAuthStatus);//设置渠道实名认证状态
				}
			}catch (Exception e){
				log.error("实名认证查询异常",e);
			}
			data.put("userInfo", session);
			data.put("resCode", StatusType.AUTH_SUCCESS);

			//获取用户信息
			String userInfo = data.get("userInfo").toString();
			log.info("-----userInfo-----参数为：" + userInfo);
            JSONObject jsonObject = JSONObject.parseObject(userInfo);
            String gameUrl = channelGame.getGameUrl();
            String sdkToken = jsonObject.getString("token");
            Integer sdkUid = jsonObject.getInteger("uid");
            String gameCpLogin = gameUrl + "&uid=" + sdkUid + "&sdkToken=" + sdkToken;
            log.info("-----CP------游戏路径为：" + gameCpLogin);
            super.success("OK","00",gameCpLogin);
            return;
		} catch (Exception e) {
			log.error("==========>>token验证异常", e);
			result.put("resCode ", StatusType.AUTH_EXCEPTION);
			result.put("msg", "error");
			this.renderJson(result);
			return;
		}
		
	}
	
	/**
	 * 
	 * @Description:获取解密后的参数
	 * @return
	 */
	private Map<String, String> getParamMap(String sKey) {
		Map<String, String> re = new HashMap<String, String>();
		Map<String, String[]> params = getParaMap();
		log.info("==========>>登录验证参数：" + JsonKit.toJson(params));
		for (Map.Entry<String, String[]> entry : params.entrySet()) {
			String[] val = entry.getValue();
			StringBuffer sval = new StringBuffer();
			for (String i : val) {
				sval.append(i).append(",");
			}
			String strval = sval.toString();
			if (strval.endsWith(","))
				strval = strval.substring(0, strval.length() - 1);
			if (UrlEncoderUtils.hasUrlEncoded(strval)) {
				try {
					strval = URLDecoder.decode(strval, "UTF-8");
				} catch (Exception e) {
					log.error("URLDecoder.decode to utf-8 error:" + strval);
				}
			}
			try {
				re.put(entry.getKey(), AESUtils.Decrypt(strval, sKey));
			} catch (Exception e) {
				log.error("参数解密失败!", e);
			}
		}
		return re;
	}
	
}
