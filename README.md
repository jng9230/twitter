Twitter clone made with the MERN stack.

<!-- ### To start:
- for `/backend` and `/frontend/`:
    - `npm i` to install all files
    - `npm start` -->

# Twitter Clone

### Features, Screenshots
- login with Google, or email/pass.
![login](./imgs/login.png?raw=true "login")
- profile page
![profile](./imgs/profile.png?raw=true "profile")
- timeline for followed users and recommendations on who to follow
![timeline](./imgs/timeline.png?raw=true "timeline")
- make tweets
![makeTweet](./imgs/makeTweet.png?raw=true "makeTweet")
- view, reply, and like tweets
![tweetchain](./imgs/tweetchain.png?raw=true "tweetchain")

### Motivation
Twitter's been in the news quite a bit recently, from firing large swaths of its staff
to catastrophically changing many of its old features. The former change was brought out
by Musk's idea that Twitter simply didn't need that much staff to run what is at its core
a forum. So I thought to myself, how hard can it be to make Twitter?

Here, I used the MERN stack for its wide popularity and ease of use. 
- M: MongoDB, a NoSQL database that uses JSON-like documents to store its data. I used
Mongoose on top of this to allow for database schemas, leading to more control over 
data types.
- E: ExpressJS. Backend framework for REST APIs, along with PassportJS to handle
authentication with both Google and local email/password logins.
- R: React. Yep. With Tailwind CSS, because I've found with refactoring other projects
that my CSS tends towards a utility class kind of style, which is exactly what Tailwind
accomplishes.
- N: NodeJS. Server environment.
### Final Thoughts
- This project could've gone so much further, but hey, that's what a multi-billion dollar 
application does. Twitter is, in fact, kinda hard. I didn't even get to touch on tweet/timeline/follower 
curating (better recommendations). I'm sure there's a boatload of papers and algos behind that.

- I didn't quite comprehend the nesting of tweets until
I was nearly done coding up the React component for it, leading to a refactor midway that I
could've avoided if I inspected the site at first. Measure twice, cut once!

- MongoDB/noSQL might not be the greatest idea for highly relational data like tweets 
and users. Replying to a tweet makes a relationship between the reply and the original
tweet, and storing that relationhip (which can nest infinitely) can get quite difficult to read
and work with when it's just stored as an attribute in the JSON document. An intermediary table in 
a SQL-like language would've managed this a lot better, I think.

- I should've spent more time scoping out this project. Midway through, I thought it'd be a good
idea to add in some caching. Tweets, after all, are loaded over and over again with minimal
changes, leading to a read heavy workload. Something like Redis would've been great, but finding
a way to put it between the Express router and Mongo database wouldn't be ideal when Mongo
itself indexes a lot of the stuff anyways. For a project like this, Mongo is fast enough,
but it would have been interesting to try out Redis. Maybe in a future project. 

- Env files! Using one for dev/test/prod and changing between each of them
using the command line made each phase of development much easier.