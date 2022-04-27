Redis is a popular in-memory data structure store that is widely used in many applications, either as cache, complex data structure, or store application data itself.

In this assignment, your task is to build a simple, stripped-down version of Redis named Ledis (for light-weight Redis). Your Ledis app can run entirely on a single web page, meaning you do not need a webserver/backend.

You need to implement these functionalities:

- Data structures: String, Set
- Special features: Expire, snapshots
- A simple web CLI (similar to redis-cli)

## **Commands**

Your Ledis should be able to handle the following. Note that these are modeled after Redis commands, so feel free to refer to Redis manual when you have questions.

### **String**

- `SET key value`: set a string value, always overwriting what is saved under key
- `GET key`: get a string value at key

### **Set**

Set is an unordered collection of unique string values (duplicates not allowed).

- `SADD key value1 [value2...]`: add values to set stored at key
- `SREM key value1 [value2...]`: remove values from set. (Bonus: Show values are not removed (not exist) from set)
- `SMEMBERS` *key*: return an array of all members of a set
- `SINTER [key1] [key2] [key3] ...`: *(bonus)* set intersection among all set stored in specified keys. Return array of members of the result set. Ex: a: [1, 2, 3, 4], b: [2, 3, 4, 5], c: [3, 4, 5, 6]. The result of `SINTER a b c` is [3, 4]

### **Data Expiration**

- `KEYS`: List all available keys
- `DEL key`: delete a key
- `EXPIRE key seconds`: set a timeout on a key, *seconds* is a positive integer (by default a key has no expiration). Return the number of seconds if the timeout is set
- `TTL key`: query the time remaining of a key. Return a message if key does not have timeout.

### **Snapshot (bonus)**

- *SAVE*: save the current state in a snapshot
    - key1: ‘a’
    - key2: 1 2 3 4 5
- *RESTORE*: restore from the last snapshot,
    - 

### **Error Handling**

When an error happens, simply return “ERROR”, together with the cause of the error if possible. Example: *“ERROR: Key not found”*

## **Web CLI**

Please build a simple web-based CLI interface that allows users to enter commands and displays the result (this is just an example, you could build a different UI):

[https://lh4.googleusercontent.com/P5C_2U9fQ-fBdOUu_ZD8shvsS8I7Nq9KA0nnBY4dGRJrPm9mGhE6jSnV_HZy5r0lqHileH8MKmNhupVcbdQtOklFv5WC5c021qLTmX4CCa7Dzb2lhfG6lQOw-Wwves6qJAF8cRKW](https://lh4.googleusercontent.com/P5C_2U9fQ-fBdOUu_ZD8shvsS8I7Nq9KA0nnBY4dGRJrPm9mGhE6jSnV_HZy5r0lqHileH8MKmNhupVcbdQtOklFv5WC5c021qLTmX4CCa7Dzb2lhfG6lQOw-Wwves6qJAF8cRKW)

## **Notes**

- You are required to implement the core logic by yourself, without the help of any other database systems (PostgreSQL, MySQL, Redis itself, etc).
- I recommend using FE frameworks like Vue, React, Svelte,...to implement Ledis UI. Because our command palette will use Vue so it’s great if you have experience with these UI frameworks.
- You’re not allowed to seek other people’s help with the assignment. You’re allowed to consult Google and we can help you clarify the requirements. You’re allowed to pick any existing frameworks or libraries to help you with certain tasks.

## **Submissions**

Please describe your design, your thought process, and your implementations, also discuss any challenges or interesting points (related to your project and/or Redis) along the way.

### **Please submit:**

- (important) A short writeup describing your submission
- The project source code on Github
- (optional) A deployed site (deployed on Heroku or some temporary server) for us to review. Don’t invest in the deployment process or good servers, we will only manually take a look without running any load/performance testing.

### **Questions**

Create new issue in your repo and answers these questions

- JS: What’re differents between `==` and `===`?
  - `==`: parse the values into the same before compare the values.
  -  `===`: DO NOT parse the values into same types only return true if they are same type and equal in values.
- How to enforce your colleagues using Eslint?
- compare `npm` vs `yarn`. What will you use in your project?
  - speed: `npm` < `yarn`.
  - security: `npm` < `yarn`. `yarn` will check each installation, `npm` will notify but package still run.
  - `yarn` doesn't work with Node.js versions older than version 5.
  - `npm` and `yarn` both easy to push a package.
