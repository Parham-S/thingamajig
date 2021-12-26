import axios from 'axios';

class AuthService {
  async login(formData) {
    const res = await axios.post('/api/v1/users/signin', formData);
    sessionStorage.setItem('token', res.data.token);
    return res.data;
  }

  logout() {
    sessionStorage.removeItem('token');
  }

  async signup(formData) {
    const res = await axios.post('/api/v1/users/signup', formData);
    sessionStorage.setItem('token', res.data.token);
    return res.data;
  }

  async getCurrentUser() {
    const token = sessionStorage.getItem('token');
    if (!token) {
      // do something. throw an error?
      return null;
    }
    const headers = { Authorization: `Bearer ${token}` };
    const res = await axios.get('/api/v1/users/current', { headers });
    return res.data;
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  setToken(token) {
    return sessionStorage.setItem('token', token);
  }
}

export default new AuthService();
