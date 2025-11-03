import { apiClient } from './axiosConfig';
import { User } from '../app/payments/columns';

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await apiClient.get('/users?limit=208');
    return response.data.users;
  } catch (error) {
    console.error('Fetch users error:', error);
    throw new Error('Unable to fetch users');
  }
}

export async function addUser(user: Omit<User, 'id'>): Promise<User> {
  try {
    const response = await apiClient.post('/users/add', user);
    return response.data;
  } catch (error) {
    console.error('Add user error:', error);
    throw new Error('Unable to add user');
  }
}

export async function updateUser(id: number, user: Partial<User>): Promise<User> {
  try {
    const response = await apiClient.put(`/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.error('Update user error:', error);
    throw new Error('Unable to update user');
  }
}

export async function deleteUser(id: number): Promise<void> {
  try {
    await apiClient.delete(`/users/${id}`);
  } catch (error) {
    console.error('Delete user error:', error);
    throw new Error('Unable to delete user');
  }
}
