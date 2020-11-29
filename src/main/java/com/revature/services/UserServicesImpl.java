package com.revature.services;

import java.util.List;

import com.revature.dao.UserDao;
import com.revature.dao.UserDaoImpl;
import com.revature.models.User;

public class UserServicesImpl implements UserServices{

	private static UserDao userDao = new UserDaoImpl();
	
	@Override
	public String addUser(User user) {
		
		if(userDao.addUser(user)) {
			return "success";
		} else {
			return "failed";
		}
	}

	@Override
	public List<User> getAllUsers() {
		
		return userDao.getAllUsers();
	
	}

	@Override
	public User getUser(String username, String password) {
		
		return userDao.getUser(username, password);
	
	}
	
	@Override
	public User getUser(int userId) {

		return userDao.getUser(userId);
	}
	

	@Override
	public String getRole(int userId) {
		
		User user = userDao.getUser(userId);
		
		return user.getRole().getRole();
		
	}

	@Override
	public String updateUser(int userId, String username, String password, String confirmPassword, String firstName,
			String lastName, String email) {
		
		//  we will validate all user input here..
		User user = new User(userId, username, password, firstName, lastName, email);
		System.out.println(user);
		
		
		if(userDao.updateUser(user)) {
			return "success";
		} else {
			return "process failed";
		}		
	}

	@Override
	public String getEmail(int reimbId) {
		return userDao.getEmail(reimbId);
	}


	
	

}
