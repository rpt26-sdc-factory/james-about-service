import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('http://localhost:3002/api/about/' + Math.floor(Math.random() * 1000000) + 9000000);
  sleep(1);
}