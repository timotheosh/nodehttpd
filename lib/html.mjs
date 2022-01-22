/*
 * Link to Bootstrap CSS stylesheet.
 */
const bootstrapCss = [
  '<link rel="stylesheet" ',
  'href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" ',
  'integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" ',
  'crossorigin="anonymous"> ',
  '<meta name="viewport" content="width=device-width, initial-scale=1" />'
].join("");

/*
 * Simple function that produces the title.
 */
const title = (title) => (`<title>${title}</title>`)

/*
 * Produces the HTML <head></head>
 */
const header = (theTitle) => {
  return `<head>${bootstrapCss}\n${title(theTitle)}\n</head>\n`;
}

/*
 * Generates the HTML page from our template.
 */
const template = (data) => {
  return `<!doctype html>\n<html lang="en">\n${header(data.title)}<body>\n${data.body}\n</body>\n</html>`;
}

/*
 * Produces a simple unordered list from a dictionary.
 */
const unorderedList = (data) => {
  let list = [];
  Object.entries(data).forEach(([key, value]) => {
    list.push(`     <li><b>${key}</b>: ${value}</li>\n`);
  });
  return [
    "   <ul>\n",
    ...list,
    "   </ul>\n"
  ].join("");
}

/*
 * Bootstrap container
 */
const container = (body) => {
  return `<div class="container">\n${body}\n</div>\n`;
}

/*
 * Bootstrap navigation menu.
 * data = {
 *   "title": "site name",
 *   "pages": [
 *     {"name": "Info", "path: "/info"},
 *     {"name": "About", "path": "/about"}
 *   ]
 * }
 */
const navbar = (data) => {
  let pages = data.pages.map(page => {
    return `      <li><a href="${page.path}">${page.name}</a></li>\n`;
  });
  let body = [
    '<nav class="navbar navbar -default ">\n',
    '  <div class="container-fluid">\n',
    '    <div class="navbar-header">\n',
    `      <a class="navbar-brand" href="#">${data.title}</a>\n`,
    '    </div>\n',
    '    <ul class="nav navbar-nav">\n',
    '      <li class= "active" > <a href="/">Home</a></li>\n',
    ...pages,
    '    </ul>\n',
    '  </div>\n',
    '</nav>\n'
  ];
  return body;
}

export { template, container, unorderedList, navbar }
