import * as httpd from 'http';

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

const requestListener = (req, res) => {
  let headers = arrayToDict(req.rawHeaders);
  console.log(headers);
  res.writeHead(200,
    { "Content-Type": "text/html" });
  res.write("<h1>Testing!</h1>");
  res.write("<ul>");
  res.write(`<li><b>method</b>: ${req.method}</li>`);
  res.write(`<li><b>host</b>: ${headers.Host}</li>`);
  res.write(`<li><b>user-agent</b>: ${headers['User-Agent']}</li>`);
  res.write(`<li><b>url</b>: ${req.url}</li>`);
  res.write("</ul>");
  res.end();
}

const server = httpd.createServer(requestListener);
server.listen(3000);
