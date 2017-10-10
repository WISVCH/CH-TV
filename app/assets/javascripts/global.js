let Admin = require('./admin');
let TV = require('./tv');

let $slides = $('#slides');

$(document).ready(() => {
  if ($slides.length > 0) {
    new TV().run($slides);
  } else {
    new Admin().run();
  }
});
