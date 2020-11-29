package com.revature.servlethelper;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.revature.models.User;
import com.revature.services.UserServices;
import com.revature.services.UserServicesImpl;

public class AuthorizationHelper {

	private static UserServices userService = new UserServicesImpl();

	public static void signin(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {

		resp.setContentType("application/json");
		PrintWriter pw = resp.getWriter();

		try {

			JsonParser jsonParser = new JsonParser();
			JsonElement root = jsonParser.parse(new InputStreamReader((InputStream) req.getInputStream()));
			JsonObject jsonobj = root.getAsJsonObject();

			String username = jsonobj.get("username").getAsString();
			String password = jsonobj.get("password").getAsString();

			User user = userService.getUser(username, password);

			if (user != null) {

				HttpSession session = req.getSession();
				session.setAttribute("userId", user.getUserId());

				Gson gson = new Gson();
				String json = gson.toJson(user);			

				pw = resp.getWriter();
				pw.write(json);

			} else {
				String loginStatus = "{\"loginStatus\" : \"fail\"}";
				pw.write(loginStatus);
			}

		} catch (Exception e) {
			String loginStatus = "{\"loginStatus\" : \"fail\"}";
			pw.write(loginStatus);
		}

	}

	public static void signout(HttpServletRequest req, HttpServletResponse resp) throws IOException {

		resp.setContentType("application/json");
		PrintWriter pw = resp.getWriter();

		try {

			JsonParser jsonParser = new JsonParser();
			JsonElement root = jsonParser.parse(new InputStreamReader((InputStream) req.getInputStream()));

			JsonObject rootobj = root.getAsJsonObject();
			String userId = rootobj.get("userId").getAsString();

			HttpSession session = req.getSession();
			if (session.getAttribute("userId") == null || !session.getAttribute("userId").equals(userId)
					|| !req.getMethod().equals("POST")) {

				String loginStatus = "{\"signout\" : \"fail\"}";
				pw.write(loginStatus);
				
			} else {

				session.removeAttribute("userId");
				session.invalidate();

				String loginStatus = "{\"signout\" : \"success\"}";
				pw.write(loginStatus);
			}

		} catch (Exception e) {
			String loginStatus = "{\"loginStatus\" : \"fail\"}";
			pw.write(loginStatus);
		}

	}

}
