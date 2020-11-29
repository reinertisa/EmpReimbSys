package com.revature.services;

import java.util.List;

import com.revature.models.User;

public interface UserServices {
	
	public String addUser(User user);	
	
	public List<User> getAllUsers();
	public User getUser(String username, String password);
	public User getUser(int userId);
	public String getRole(int userId);

	public String updateUser(int userId, String username, String password, String confirmPassword, String firstName,
			String lastName, String email);
	
	public String getEmail(int reimbId);
}
