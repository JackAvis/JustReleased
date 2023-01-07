

<div align="center">

<h3 align="center">JustReleased</h3>

<p align="center">

JustReleased is an API made to give useful information about movies and video games that have or are about to release!

<a href="https://github.com/github_username/repo_name">View Demo</a>


<!-- TABLE OF CONTENTS -->

<details>

<summary>Table of Contents</summary>

<ol>

<li>

<a href="#about-the-project">About The Project</a>

<ul>

<li><a href="#built-with">Built With</a></li>

</ul>

</li>

<li>

<a href="#getting-started">Getting Started</a>

<ul>

<li><a href="#prerequisites">Prerequisites</a></li>

<li><a href="#installation">Installation</a></li>

</ul>

</li>

<li><a href="#usage">Usage</a></li>

<li><a href="#roadmap">Roadmap</a></li>

<li><a href="#contributing">Contributing</a></li>

<li><a href="#license">License</a></li>

<li><a href="#contact">Contact</a></li>

<li><a href="#acknowledgments">Acknowledgments</a></li>

</ol>

</details>

<!-- ABOUT THE PROJECT -->

##  About The Project

I created JustReleased to learn more about hosting backend applications, specifically through a Linux vps, Express.js and using Postgres. The API is hosted on an ubuntu droplet with DigitalOcean.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

###  Built With:

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![DigitalOcean](https://img.shields.io/badge/DigitalOcean-%230167ff.svg?style=for-the-badge&logo=digitalOcean&logoColor=white)

![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
<p align="right">(<a href="#readme-top">back to top</a>)</p>


##  Usage

<p align="left">Simply visit <a href=http://67.207.92.253:5000/>the base URL</a> to get started!</p>

Visit the [API Documentation](https://example.com) for more information on the available endpoints.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

##  Examples

GET - All events
```javascript
axios.get(`http://67.207.92.253:5000/events`)
	.then(res  => {
		const  data  =  res.data;
		console.log(data);
})
```
GET - Events by Type
```javascript
// movie = 'mv' 
// videogame = 'vg'
axios.get(`http://67.207.92.253:5000/events/type/:type`)
	.then(res  => {
		const  data  =  res.data;
		console.log(data);
})
```

Visit the [API Documentation](https://example.com) for more information on the available endpoints.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
