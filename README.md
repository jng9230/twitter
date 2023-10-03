<!-- ### To start:
- for `/backend` and `/frontend/`:
    - `npm i` to install all files
    - `npm start` -->

# Twitter Clone

### Features, Screenshots
- login with Google, or email/pass.
![login](./imgs/login.png?raw=true "login")
- profile page
![profile](./imgs/profile1.png?raw=true "profile")
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
