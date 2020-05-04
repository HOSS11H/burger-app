import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-8e0f4.firebaseio.com/',
});

export default instance;