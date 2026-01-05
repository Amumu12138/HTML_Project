package com.paojiao.sdk3.common.util;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Properties;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Address;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;

/**
 * 邮件工具类
 * 
 * @author lvkun
 * @version 1.0, 2013-6-21
 */
public final class EmailSender {
	/**
	 * 邮件字符编码
	 */
	private static final String EMAIL_ENCODING = "utf-8";

	/**
	 * 收件人邮箱
	 */
	private Set<String> to = new HashSet<String>();

	/**
	 * 发件人邮箱
	 */
	private String from;

	/**
	 * 邮箱主机服务器
	 */
	private String host;

	/**
	 * 发件人邮箱密码
	 */
	private String password;

	/**
	 * 邮件主题
	 */
	private String subject;

	/**
	 * 邮件正文
	 */
	private String content;

	/**
	 * 附件
	 */
	private Set<File> attachment = new HashSet<File>();

	public Set<String> getTo() {
		return to;
	}

	public void setTo(Set<String> to) {
		this.to = to;
	}

	/**
	 * 邮箱验证器
	 */
	private Validator validator;

	public EmailSender() {
		this.validator = new Validator();
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public void setContent(String content) {
		this.content = content;
	}

	/**
	 * 添加收件人邮箱
	 * 
	 * @param email
	 */
	public void addTo(String email) {
		if (validator.validate(email)) {
			this.to.add(email);
		}
	}

	public String getSubject() {
		return subject;
	}

	public String getContent() {
		return content;
	}

	/**
	 * 邮箱验证器
	 * 
	 * @author lvkun
	 * @version 1.0, 2013-6-21
	 */
	private class Validator {
		private static final String REGEX = "^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$";

		private Pattern pattern = Pattern.compile(REGEX);

		public boolean validate(String email) {
			if (email == null)
				return false;
			Matcher matcher = pattern.matcher(email);

			return matcher.matches();
		}
	}

	/**
	 * 添加附件
	 * 
	 * @param pathname
	 */
	public void addAttachment(String pathname) {
		File file = new File(pathname);
		if (file.exists()) {
			this.attachment.add(file);
		}
	}

	/**
	 * 发送邮件
	 * 
	 * @return
	 */
	public boolean send() {
		// 验证是否有收件人
		if (to == null || to.isEmpty()) {
			return false;
		}

		// 设置邮件属性
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.host", host);
		props.put("mail.smtp.user", from);
		props.put("mail.smtp.password", password);

		// 鉴权发件人信息
		PopupAuthenticator auth = new PopupAuthenticator();
		auth.auth(from, password);

		// 构造多部件对象
		Multipart multipart = new MimeMultipart();

		// 将附件文件添加到多部件
		Iterator<File> iterator = attachment.iterator();
		while (iterator.hasNext()) {
			MimeBodyPart mbpFile = new MimeBodyPart();
			File file = iterator.next();
			FileDataSource fds = new FileDataSource(file);
			try {
				mbpFile.setDataHandler(new DataHandler(fds));

				// 防止中文乱码
				String filename = transferChinese(fds.getName());
				mbpFile.setFileName(filename);

				multipart.addBodyPart(mbpFile);
			} catch (MessagingException e) {
				e.printStackTrace();
			}
		}

		// 获取发邮会话
		Session session = Session.getDefaultInstance(props, auth);
		MimeMessage message = new MimeMessage(session);
		MimeBodyPart mimeBodyPart = new MimeBodyPart();
		try {
			mimeBodyPart.setContent(content, "text/plain;charset=utf-8");
			multipart.addBodyPart(mimeBodyPart);
			message.setSubject(subject, EMAIL_ENCODING);
			message.setSentDate(new Date());
			message.setFrom(new InternetAddress(from));

			Iterator<String> inerator = to.iterator();
			while (inerator.hasNext()) {
				Address recipient = new InternetAddress(inerator.next());
				message.addRecipient(Message.RecipientType.TO, recipient);
			}

			message.setContent(multipart);
			message.saveChanges();

			Transport transport = session.getTransport("smtp");
			transport.connect(host, from, password);
			transport.sendMessage(message, message.getAllRecipients());
			transport.close();

			return true;
		} catch (MessagingException e) {
			System.out.println("邮件发送失败，收件地址：" + to);
			e.printStackTrace();

			return false;
		}
	}

	/**
	 * 中文编码，防止乱码现象
	 * 
	 * @param str
	 * @return
	 */
	private String transferChinese(String str) {
		String text = str;
		try {
			text = MimeUtility.encodeText(text, EMAIL_ENCODING, "B");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		return text;
	}

	/**
	 * 发件人邮箱鉴权
	 * 
	 * @author lvkun
	 * @version 1.0, 2013-6-21
	 */
	private class PopupAuthenticator extends Authenticator {
		private String username;

		private String password;

		private PopupAuthenticator() {

		}

		private PasswordAuthentication auth(String user, String pass) {
			this.username = user;
			this.password = pass;

			return getPasswordAuthentication();
		}

		protected PasswordAuthentication getPasswordAuthentication() {
			return new PasswordAuthentication(username, password);
		}
	}

	public static void main(String[] args) {
		EmailSender emailSender = new EmailSender();
		emailSender.host = "smtp.163.com";

		// emailSender.subject = "主题";
		// emailSender.content = "内容";
		// emailSender.from = "1192286293@qq.com";
		// emailSender.password = "long.xin@alice";
		// Set<String> to = new HashSet<String>();
		// to.add("569141948@qq.com");
		// emailSender.to = to;

		emailSender.subject = "主题";
		emailSender.content = "内容";
		emailSender.from = "m18682012116_1@163.com";
		emailSender.password = "pj2017";
		Set<String> to = new HashSet<String>();
		to.add("wangdeyu@paojiao.cn");
		emailSender.to = to;

		emailSender.send();
	}
	public static void sendEmail(String subject, Set<String> to, String content) {
		try {
			// to="wangdeyu@paojiao.cn,luochenghui@paojiao.cn,haofei@paojiao.cn";
			EmailSender emailSender = new EmailSender();
			// emailSender.setHost("smtp.qq.com");
			// emailSender.setFrom("notify@paojiao.cn");
			// emailSender.setPassword("BSArquF8wl83PhrBsiZc");
			emailSender.setHost("smtp.163.com");
			emailSender.setFrom("m18682012116_1@163.com");
			emailSender.setPassword("pj2017");
			emailSender.setSubject(subject);
			emailSender.setContent(content);
			for (String i : to) {
				Set<String> thisto = new HashSet<String>();
				String regex = "\\w+(\\.\\w)*@\\w+(\\.\\w{2,3}){1,3}";
				i = i.trim();
				if (i.matches(regex)) {
					thisto.add(i);
					emailSender.setTo(thisto);
					emailSender.send();
					try {
						Thread.sleep(1000);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}