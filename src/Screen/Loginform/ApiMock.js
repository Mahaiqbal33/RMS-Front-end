import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onPost('/api/login').reply((res) => {
  const { username, password } = JSON.parse(res.data);

  if (username === 'Maha' && password === 'Maha1234') {
    return [200, {
      token: 'your-access-token',
      user: {
        username: 'Maha',
        password: 'Maha1234'
      }
    }];
  } else {
    return [401, { error: 'Invalid credentials' }];
  }
});

export default axios;
