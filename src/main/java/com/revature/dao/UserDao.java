package com.revature.dao;

import java.util.List;

import com.revature.models.User;

public interface UserDao {

	public boolean addUser(User user);
	
	public List<User> getAllUsers();
	
	public User getUser(String username, String password);
	
	public User getUser(int userId);
	
	public boolean updateUser(User user);
	
	public String getEmail(int reimbId);

}
