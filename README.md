

<div align="Center">

##  JustReleased
<p align="left">

JustReleased is an API made to give useful information about movies and video games that have or are about to release!

<a href="https://github.com/github_username/repo_name"></a>
<!-- TABLE OF CONTENTS -->

<details>

<summary align="left">Table of Contents</summary>

<ol>

<li align="left">

<a href="#about-the-project">About The Project</a>

<ul>

<li align="left"><a href="#built-with">Built With</a></li>

</ul>

</li>


<li align="left"><a href="#usage">Usage</a></li>

<li align="left"><a href="#examples">Examples</a></li>




</ol>

</details>

<!-- ABOUT THE PROJECT -->

##  About The Project
<p align="left">
I created JustReleased to learn more about hosting backend applications, specifically through a Linux vps, Express.js and using Postgres. The API is hosted on an ubuntu droplet with DigitalOcean.
<p/>

###  Built With:
<div align="left">
	
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![DigitalOcean](https://img.shields.io/badge/DigitalOcean-%230167ff.svg?style=for-the-badge&logo=digitalOcean&logoColor=white)

![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
<div />

##  Usage

<p align="left">Simply visit <a href=http://67.207.92.253:5000/>the base URL</a> to get started!</p>

Visit the [API Documentation](https://example.com) for more information on the available endpoints.


## API Documentation

### GET 

#### All Releases

`GET /releases/`

### Release by ID

`GET /releases/:id/`

#### Releases by Type

`GET /releases/:type/`



##  Examples

GET - All releases
```javascript
axios.get(`http://67.207.92.253:5000/releases`)
	.then(res  => {
		const  data  =  res.data;
		console.log(data);
})
```
GET - Releases by type
```javascript
// releases types:
// movie = 'mv' 
// videogame = 'vg'
axios.get(`http://67.207.92.253:5000/releases/type/:type`)
	.then(res  => {
		const  data  =  res.data;
		console.log(data);
})
```

Visit the [API Documentation](https://example.com) for more information on the available endpoints.

<p align="right">(<a href="#justreleased">back to top</a>)</p>
