import React, { useState, useEffect } from 'react';
import { User } from './types';
import { api } from './api';
import './App.css';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (error) {
      showMessage('Failed to load users', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await api.updateUser(editingUser.id, formData);
        showMessage('User updated successfully', 'success');
      } else {
        await api.createUser(formData);
        showMessage('User created successfully', 'success');
      }
      resetForm();
      loadUsers();
    } catch (error) {
      showMessage((error as Error).message, 'error');
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.deleteUser(id);
      showMessage('User deleted successfully', 'success');
      loadUsers();
    } catch (error) {
      showMessage((error as Error).message, 'error');
    }
  };

  const resetForm = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '' });
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="app">
      <h1>User Management CRUD</h1>
      
      {message && <div className={`message ${message.type}`}>{message.text}</div>}
      
      <div>
        <h2>{editingUser ? 'Update User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <button type="submit">{editingUser ? 'Update User' : 'Add User'}</button>
          {editingUser && <button type="button" onClick={resetForm}>Cancel</button>}
        </form>
      </div>
      
      <div>
        <h2>Users</h2>
        <button onClick={loadUsers}>Refresh</button>
        <div className="users-list">
          {users.map(user => (
            <div key={user.id} className="user-item">
              <strong>{user.name}</strong> - {user.email}
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;