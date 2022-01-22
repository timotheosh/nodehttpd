/*
 * nodehttpd
 * A simple web server written in NodeJS without any 3rd party modules.
 */

import * as httpd from 'http';
import { template, container, unorderedList, navbar } from './lib/html.mjs';

// Array to dictionary
const arrayToDict = (array, data = {}) => {
  let newArray = [...array]
  let key = newArray.shift();
  if (key != undefined) {
    data[key] = newArray.shift();
  }
  if (newArray.length === 0) {
    return data;
  } else {
    return arrayToDict(newArray, data);
  }
};

/*
 * Site config including the pages for navigation.
 */
const pageData = {
  title: "nodehttpd",
  pages: [
    { name: "Info", path: "/info" },
    { name: "About", path: "/about" }
  ]
}

/*
 * The Error page
 */
const errorPage = (req, res, status) => {
  res.writeHead(status);
  res.end(`<h1>${status}: Something went wrong!</h1>`);
}

/*
 * Home page for the server.
 */
const root = (req, res) => {
  let data = {};
  data['title'] = pageData.title;
  data['body'] = [
    container([`<h1 style="text-align: center;color: blue;">${data.title}</h1>`]),
    ...navbar(pageData)
  ].join("")
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(template(data));
}

/*
 * The info page showing different variables from the request object.
 */
const info = (req, res) => {
  let headers = arrayToDict(req.rawHeaders);
  let data = {};
  data['title'] = "Info";
  data['body'] = [
    container([`<h1>${data.title}</h1>`]),
    ...navbar(pageData),
    container([
      unorderedList({
        "method": req.method,
        ...headers,
        "url": req.url
      })
    ])
  ].join("");
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(template(data));
}

/*
 * The router
 */
const requestListener = (req, res) => {
  return new Promise(resolve => {
    switch (req.url) {
      case "/":
        root(req, res);
        break;
      case "/info":
        info(req, res);
        break;
      default:
        errorPage(req, res, 404);
        break;
    }
  });
}

const server = httpd.createServer();
server.on('request', async (req, res) => {
  await requestListener(req, res);
});
server.listen(3000);
