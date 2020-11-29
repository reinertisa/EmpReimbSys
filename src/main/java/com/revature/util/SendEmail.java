package com.revature.util;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import java.util.Properties;

import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.revature.models.Reimbursement;

public class SendEmail {
	
	public static boolean sendEmail(Reimbursement reimb, String toEmail, String status) {
		
		final String username = "isa_delibas";
		final String password = "bhkoicusfkeekonw";
		String fromEmail = "isa_delibas@yahoo.com";
		
		Properties properties = new Properties();

		properties.put("mail.smtp.auth", "true");
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.smtp.host", "smtp.mail.yahoo.com");
		properties.put("mail.smtp.port", "587");
		
		Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});
		
		MimeMessage msg = new MimeMessage(session);
		try {
			msg.setFrom(new InternetAddress(fromEmail));
		
			msg.addRecipient(Message.RecipientType.TO, new InternetAddress(toEmail));

			
			String html = "<html>\r\n"
					+ "<head>\r\n"
					+ "<style>\r\n"
					+ "table, th, td {\r\n"
					+ "  border: 2px solid green;\r\n"
					+ "}\r\n"
					+ "</style>\r\n"
					+ "</head>\r\n"
					+ "<body>\r\n"
					+ "\r\n"
					+ "<h2>Reimbursement Report</h2>\r\n"
					+ "\r\n"
					+ "<table style=\"width:400px\">\r\n"
					+ "\r\n"
					+ "  <tr>\r\n"
					+ "    <td>Status</td>\r\n"
					+ "    <td>" + status + "</td>\r\n"
					+ "  </tr>\r\n"
					+ "  <tr>\r\n"
					+ "    <td>Reimbursement Id</td>\r\n"
					+ "    <td>" + reimb.getReimbId() + "</td>\r\n"
					+ "  </tr>\r\n"
					+ "  <tr>\r\n"
					+ "  <tr>\r\n"
					+ "    <td>Cost</td>\r\n"
					+ "    <td>" + reimb.getReimbAmount() + "</td>\r\n"
					+ "  </tr>\r\n"
					+ "  <tr>\r\n"
					+ "    <td>Description</td>\r\n"
					+ "    <td>" + reimb.getReimbDescription() + "</td>\r\n"
					+ "  </tr>\r\n"
					+ "  <tr>\r\n"
					+ "    <td>Type</td>\r\n"
					+ "    <td>" + reimb.getReimbType().getType() + "</td>\r\n"
					+ "  </tr>\r\n"
					+ "</table>\r\n"
					+ "\r\n"
					+ "</body>\r\n"
					+ "</html>";


			if(status.equals("Approved")) {
				msg.setSubject("Your reimbursement request approved!");		
				msg.setContent(html, "text/html;charset=UTF-8");				
			} else {
				msg.setSubject("Your reimbursement request approved!");		
				msg.setContent(html, "text/html;charset=UTF-8");
			}

			Transport.send(msg);
			System.out.println("Email sent successfully");
			return true;
		} catch (MessagingException e) {
			System.out.println("Email not send");
		} 
		
		return false;
	}

}
