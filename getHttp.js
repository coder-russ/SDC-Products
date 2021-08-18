import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  stages: [
    { duration: '30s', target: 300 },
    { duration: '1m30s', target: 500 },
    { duration: '20s', target: 100 },
  ],
  // vus: 500,
  // duration: '10s',
};
export default function () {
  const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
  const randomProductId = random(900009, 1000011);
  http.get(`http://localhost:3000/products/${randomProductId}/styles`);
  sleep(1);
}
