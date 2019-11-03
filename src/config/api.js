import { create } from 'apisauce';
import AsyncStorage from '@react-native-community/async-storage';

const api = create({
  baseURL: 'http://localhost:3333/',
});

api.addAsyncRequestTransform(request => async () => {
  const token = await AsyncStorage.getItem('@rnFaculdade:token');

  if (token) request.headers.Authorization = `Bearer ${token}`;
});

api.addResponseTransform(response => {
  if (!response.ok) throw response;
});

export default api;
