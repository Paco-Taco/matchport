import { httpErrorHandler } from '@/services/httpErrorHandler';
import axios from 'axios';

export const apiCoreInstance = axios.create({
  baseURL: 'https://forwarder-api.onrender.com',
  timeout: 10000,
});

apiCoreInstance.interceptors.response.use(null, httpErrorHandler);
