- [Haguide poc with tauri desktop app](#haguide-poc-with-tauri-desktop-app)
- [Live Demo](#live-demo)
  * [Authors](#authors)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
  * [Running Tests](#running-tests)
  * [Deployment](#deployment)
  * [Demo](#demo)
  * [Usage/Examples](#usage-examples)
  * [API Reference](#api-reference)
      - [Get the](#get-the)
      - [Get item](#get-item)
      - [add(num1, num2)](#add-num1--num2-)
- [development process](#development-process)
- [Choosing the library for the graphs](#choosing-the-library-for-the-graphs)
  * [The first thing me and Ali used was canvasJS which is number 5 on the free tools list](#the-first-thing-me-and-ali-used-was-canvasjs-which-is-number-5-on-the-free-tools-list)
  * [the second thing Dolev and Ali tried was MuPlot because we saw this comparison they did on the readme page](#the-second-thing-dolev-and-ali-tried-was-muplot-because-we-saw-this-comparison-they-did-on-the-readme-page)
- [Getting Started with Create React App](#getting-started-with-create-react-app)
  * [Available Scripts](#available-scripts)
    + [`npm start`](#-npm-start-)
    + [`npm test`](#-npm-test-)
    + [`npm run build`](#-npm-run-build-)
    + [`npm run eject`](#-npm-run-eject-)
  * [Learn More](#learn-more)
    + [Code Splitting](#code-splitting)
    + [Analyzing the Bundle Size](#analyzing-the-bundle-size)
    + [Making a Progressive Web App](#making-a-progressive-web-app)
    + [Advanced Configuration](#advanced-configuration)
    + [Deployment](#deployment-1)
    + [`npm run build` fails to minify](#-npm-run-build--fails-to-minify)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


# Haguide poc with tauri desktop app

this is the POC of the graph, used for makeing sure we can use muPlot for our product


# Live Demo

[Live Demo](https://neuro-omega-react.vercel.app/)

https://neuro-omega-react.vercel.app/ 

## Authors

- [@Dolev Dublon](https://www.github.com/dolev146)
- [@Ali Hilo](https://www.github.com/a.hilo)

# Getting Started

clone the project 

```bash
    git clone https://github.com/dolev146/haguide-poc-tauri.git
```

make sure you have nodejs --version 18 installed on your system, and start the development server with npm start in the terminal.

# Project Structure 
```
src:
├───data
│   ├───Icons
│   └───images
├───pages
│   ├───contexts
│   ├───GraphsPage
│   │   ├───LFPChannels
│   │   ├───NRMS
│   │   ├───PSD
│   │   ├───RawChannels
│   │   └───SPKChannels
│   ├───LoginPage
│   ├───PreparationPage
│   │   ├───BrainSettings
│   │   │   └───ElectrodesSettings
│   │   └───DisorderSettings
│   └───SharedComponents
└───styles
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```
## Deployment

To deploy this project run

```bash
  npm run deploy
```


## Demo

Insert gif or link to demo



## Usage/Examples

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```

## API Reference

we are using tcp socket connections with web sockets io or something like that into the nodejs server

#### Get the

```http
  GET /api/datapoint
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.



# development process 

starting with the initial requirements

![image](https://user-images.githubusercontent.com/62290677/230029128-51958b45-a60c-402b-86ca-f4baefc4b490.png)

implementing CSS  Grid in order to divide the page into 3 parts: header main content and footer.

for more information about Grid CSS watch this [YouTube video](https://youtu.be/EiNiSFIPIQE?t=531) 

and view the [line in the code](https://github.com/dolev146/hagauide_poc/blob/1fad9b831079cb056599f14f33be8ac0349a9eb7/src/App.js#L15) that are influenced by the CSS Grid.

![image](https://user-images.githubusercontent.com/62290677/231475895-f05bbf7e-89c5-42e1-8b2a-a9b1d40a7515.png)

divided into 4 columns

![image](https://user-images.githubusercontent.com/62290677/231482585-bdec6cff-7388-4e4a-be2f-c8d15646c8db.png)



1. header 
2. main content
3. footer


implemented the Login Page with the same logic :

![image](https://user-images.githubusercontent.com/62290677/231480417-5ae9b71a-de50-4991-8208-b0c05008f743.png)

1 - 5 are columns that divide the CSS grid into 1f each,
6. is just a margin-top of 40vh [see relevant code](https://github.com/dolev146/hagauide_poc/blob/1fad9b831079cb056599f14f33be8ac0349a9eb7/src/pages/LoginPage/LoginPageComponent.jsx#L26) to control the margin







# Choosing the library for the graphs

Challenges: 

implementing the front-end graphs (finding the correct way that can render many data points on the screen)
getting the data from the server and rendering it accordingly to the graphs (how to manipulate the data I already have and slice it to add the new data accordingly )

making the software works offline. (technology name is PWA - progressive web app)
need to sit inside a frame of application - Oleg

implementing the UI according to KerenUIUX designer specifications in ReactJS (managing the state, need to explore more information about CSS and React concepts)

understanding how the communication will be established with the server (need to learn how to make a TCP full-duplex sockets connection and understand how the data will flow from the server to us)

Questions for Team voting:
how much data do we really need for the graph to give a good user experience?
I need to make an appointment with Loay and understand how they implemented the graphs. 

2 million points is a lot of points, and even with C language it takes a lot of time, we need to Normalize the data because the human eye can't make a difference with this huge set of data.
refresh rate vs data points.

what tool do we want to use for plotting the graph?

RoadMaps:
plotting the graph with 10 points
adding data to the graph in real-time
testing in a large set of data
deciding how the data should be transferred (JSON format)
implementing the design of Keren








I want to document what are the concerns and what is the thinking process and as well as the development process so that anybody can view it review my actions and advise me:
implementing 40 graphs with a 44hz refresh rate, and drawing them on the screen
specific numbers: 1 graph need to contain information of 5 seconds, and need to refresh in real-time, at least at 30fps. 

I need to know the sampling rate that will be transferred to us.
But if I remember correctly from Ali we need to at least be able to draw 2 million data points a second. for testing the performance but! I want to talk to Keren and understand if there is a way to reduce the amount of data we need to show and still give a good user experience.

16GB ram pc its a lot of load so we want to consider Normalizing the data and rendering fewer points.

my first action in trying to implement this was searching on Google for the right tool for the job.

found lots of tools, I want to name a few:

free tools
| Library   | Ease of use | Engine             |
|-----------|-------------|--------------------|
| MuPlot    | Easy        | JavaScript         |
| Chartsjs  | Easy        | JavaScript         |
| D3        | Moderate    | WebAssembly/OpenGL |
| Webgl-plot| Moderate    | WebAssembly/OpenGL |
| CanvasJS  | Easy        | JavaScript         |
| KeyLines  | -           | JavaScript         |

Writing a program in languages such as C/C++, C#, and Rust other and compiling it into WebAssembly to achieve near-native results.

maybe make a meeting with Eric 

send a mail to cheng and propose a meeting with Eric to understand the data flow to the charts

tools that cost 1000$ a year for a license:
Scicharts - used in the AlphaRS system
LightingChart - said on the website it used in the medical industry tried to contact them, but didn't respond to them






## The first thing me and Ali used was canvasJS which is number 5 on the free tools list
because we saw this link
https://canvasjs.com/javascript-charts/performance-demo-chart/ 
and this performance view shows that it can render 50,000 points in 100ms
![image](https://user-images.githubusercontent.com/62290677/231573419-2ee582d0-2565-45f4-adc1-e15fda20ed6d.png)

link : 

## the second thing Dolev and Ali tried was MuPlot because we saw this comparison they did on the readme page

link: 





------------------------------------------------------------------

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
