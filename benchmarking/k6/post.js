import http from 'k6/http';
import { sleep } from 'k6';


export default function () {

  var payload = {
    courseObj: {
      course_id: (20000000 + parseInt(__VU + '9' + Date.now().toString().slice(-2) + '9' + __ITER)), //generates data that is guaranteed t
      recent_views: 2520322,
      description: "fake record posted by k6",
      learner_career_outcomes: {
        direction: 0.69,
        benefit: 0.46,
        promo: 0.75
      },
      metadata: {
        hours: "147",
        subtitles: "Portuguese (European)"
      },
      what_you_will_learn: [
        "Repellendus consequuntur quis repudiandae voluptatem aut nam eos fuga. Quisquam voluptas pariatur debitis et."
      ],
      skills_you_will_gain: [
        "quia cum consectetur"
      ]
    }
  }

  http.post('http://localhost:3002/api/about', JSON.stringify(payload), { headers: { 'Content-Type': 'application/json' } });
  sleep(1);
}