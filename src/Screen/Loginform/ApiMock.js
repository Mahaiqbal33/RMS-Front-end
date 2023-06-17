import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onPost('/api/login').reply(200, {
  token: 'your-access-token',
  user: {
    username: 'Maha-iqbal',
    password: ' Maha123'
  }
});

export default axios;
