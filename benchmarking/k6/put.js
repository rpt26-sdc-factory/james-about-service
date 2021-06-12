import http from 'k6/http';
import { sleep } from 'k6';

export default function () {

  var payload = {
    courseObj: {
      recent_views: Math.floor(Math.random() * 1500000) + 60000,
      description: "This is a new, even better replacement example course description (provided by k6 stresstesting!), and I stand By its quality. Really good stuff even.",
      metadata: {
        hours: Math.floor(Math.random() * 100) + 5
      }
    }
  }

  http.put('http://localhost:3002/api/about/' + (Math.floor(Math.random() * 1000000) + 9000000), payload);
  sleep(1);
}