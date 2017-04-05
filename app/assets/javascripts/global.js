var diffDOM = require("diff-dom");

$(document).ready(() => {
  var i = 0;
  var slideElements;
  var $container = $('#slides');
  var dd = new diffDOM({
    preDiffApply: function (info) {
      // We don't remove the 'visible' class when diffing
      if (info.diff.action === 'modifyAttribute' &&
          info.diff.oldValue === 'slide visible' &&
          info.diff.newValue === 'slide') {
        return true;
      }
    }
  });

  if ($container.length > 0) {
    loadActiveSlides(() => { transition(i) });
  }

  function loadActiveSlides(callback) {
    $.getJSON("active_slides", (data) => {
      var $temp = $('<div>').attr('id', 'slides');

      // Load all data into an element in-memory
      $.each(data, (i, slide) => {
        if (slide.content_type == 'ImageContent') {
          var element = 
            "<div class=\"slide\">" + 
              "<img src=\"" + slide.content.resource_url + "\" />" + 
            "</div>";

          $temp.append(element);
        }
      });

      // Apply dom-diffing so the transition
      // goes as smoothly as possible.
      var diff = dd.diff($container[0], $temp[0]);
      dd.apply($container[0], diff);

      slideElements = $('.slide');
      callback();
    });
  }

  function transition(i) {
    // Fade in new slide, fade out current slide
    $('.visible').removeClass('visible');
    $(slideElements[i]).addClass('visible');

    // Prepare transition to next slide
    i++;
    if (i >= slideElements.length) { i = 0; }

    // Reload slides every time
    // we arrive at the first slide.
    if (i == 0) {
      loadActiveSlides(() => { setTimeout(() => { transition(i) }, 3000) });
    } else {
      setTimeout(() => { transition(i) }, 3000);
    }
  }
});
