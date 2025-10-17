import { User } from './types';

const API_URL = 'http://localhost:3000/api/users';

export const api = {
  async getUsers(): Promise<User[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },

  async updateUser(id: number, user: Omit<User, 'id'>): Promise<User> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  },

  async deleteUser(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete user');
  }
};