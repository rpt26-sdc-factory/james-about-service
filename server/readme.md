# Extended API Endpoints

## Create
 - returns a status code of 201 if successfully created
 - returns a status code of 400 if course id is not unique
 - returns a status code of 500 if database encounters an error

##### POST /api/about
```
samplePost = {
  "courseObj": {
    "course_id": NUMBER,
    ///etc...
  }
}
```

## Read
  - returns a status code of 200 if document is found
  - returns a status code of 404 if document is not found

##### GET /api/about/:id
```
{
  "_id": "abe92qrTW9gan3g9Hbsu4nfGadHkfb943auJwgab9aden",
  "course_id": 1,
  "recent_views": 6676565,
  "description": "Machine learning is the science of getting computers to act without being explicitly programmed. In the past decade, machine learning has given us self-driving cars, practical speech recognition, effective web search, and a vastly improved understanding of the human genome. Machine learning is so pervasive today that you probably use it dozens of times a day without knowing it. Many researchers also think it is the best way to make progress towards human-level AI. In this class, you will learn about the most effective machine learning techniques, and gain practice implementing them and getting them to work for yourself. More importantly, you'll learn about not only the theoretical underpinnings of learning, but also gain the practical know-how needed to quickly and powerfully apply these techniques to new problems. Finally, you'll learn about some of Silicon Valley's best practices in innovation as it pertains to machine learning and AI. \n\nThis course provides a broad introduction to machine learning, datamining, and statistical pattern recognition. Topics include: (i) Supervised learning (parametric/non-parametric algorithms, support vector machines, kernels, neural networks). (ii) Unsupervised learning (clustering, dimensionality reduction, recommender systems, deep learning). (iii) Best practices in machine learning (bias/variance theory; innovation process in machine learning and AI). The course will also draw from numerous case studies and applications, so that you'll also learn how to apply learning algorithms to building smart robots (perception, control), text understanding (web search, anti-spam), computer vision, medical informatics, audio, database mining, and other areas.",
  "learner_career_outcomes": [
    {
      "icon": "fa-map-signs",
      "pct": 0.33,
      "outcome": "started a new career after completing these courses"
    },
    {
      "icon": "fa-briefcase",
      "pct": 0.32,
      "outcome": "got a tangible career benefit from this course"
    },
    {
      "icon": "fa-money",
      "pct": 0.12,
      "outcome": "got a pay increase or promotion"
    }
  ],
  "metadata": [
    {
      "icon": "certificate",
      "title": "Shareable Certificate",
      "subtitle": "Earn a Certificate upon completion"
    },
    {
      "icon": "globe",
      "title": "100% online",
      "subtitle": "Start instantly and learn at your own schedule"
    },
    {
      "icon": "calendar",
      "title": "Flexible deadlines",
      "subtitle": "Reset deadlines in accordance to your schedule"
    },
    {
      "icon": "clock",
      "title": "Approx. 60 hours to complete",
      "subtitle": ""
    },
    {
      "icon": "speechbubble",
      "title": "English",
      "subtitle": "Subtitles: Arabic, French, Portuguese (European), Chinese (Simplified), Italian, Vietnamese, German, Russian, English, Hebrew, Spanish, Hindi, Japanese"
    }
  ],
  "what_you_will_learn": [
    "Identify a subset of data needed from a column or set of columns and write a SQL query to limit to those results.",
    "U​se SQL commands to filter, sort, and summarize data.",
    "Create an analysis table from multiple queries using the UNION operator.",
    "Manipulate strings, dates, & numeric data using functions to integrate data from different sources into fields with the correct format for analysis."
  ],
  "skills_you_will_gain": [
    "Logistic Regression",
    "Artificial Neural Network",
    "Machine Learning (ML) Algorithms",
    "Machine Learning"
  ]
}
```
##### GET /api/about/:id/concise
```
{
  "course_id": "2",
  "description": "Dolores et libero incidunt. Quae occaecati sit enim. Unde nemo temporibus sit sunt. Facere non autem. Laboriosam perferendis minima.\n \rVoluptas quasi ratione quaerat et iure voluptatem non. Ex qui facilis qui incidunt in ut veniam. Culpa voluptatem temporibus minus amet qui necessitatibus sed est. Aut nihil qui exercitationem. Doloribus esse nihil.\n \rSed aspernatur non est necessitatibus enim quisquam. At blanditiis error quidem laborum et. Est cupiditate est asperiores eius eos eum. Quae nam debitis sint repudiandae.\n \rExercitationem aspernatur exercitationem in sit. Voluptatem ut sint. Voluptatem dolor sit excepturi perferendis modi. Omnis dolores facilis amet nihil omnis et velit. Quaerat quis praesentium corrupti sunt deleniti eligendi dicta omnis.",
  "learner_career_outcomes": {
    "benefit": 0.6000000238418579,
    "direction": 0.05999999865889549,
    "promo": 0.6899999976158142
  },
  "metadata": {
    "hours": "165",
    "subtitles": ""
  },
  "recent_views": 60934477,
  "skills_you_will_gain": [
    "laudantium illum",
    "amet commodi porro",
    "est eius",
    "provident eveniet illo"
  ],
  "what_you_will_learn": [
    "Doloribus nihil et fugiat officia. Aspernatur eveniet et.",
    "Quos aut molestiae dolores. Nostrum praesentium quis exercitationem aut enim.",
    "Optio reiciendis nihil rem sint ut ducimus sint. Accusamus accusantium et.",
    "Eligendi ut officiis et enim earum explicabo qui aut. Enim rerum est qui eius harum dolores tempore."
  ]
}
```

## Update
  - returns a status code of 204 if record is successfully updated.
  - returns a status code of 404 if record does not exist to update

##### PUT /api/about/:id
```
  :id //ID of course to update
  body.courseObj //Server overwrites properties of selected course with properties of this object. Does not delete unincluded properties.
```


## Delete
  - returns a status code of 202 if successfully deleted
  - returns a status code of 404 if record not found to delete
  - returns a status code of 500 if database encounters an error

##### DELETE /api/about/:id
```
  :id //ID of course to delete
```