var diffDOM = require("diff-dom");

$(document).ready(() => {
  const TICK_SIZE = 1000;
  var timer = 0;
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
    loadActiveSlides(() => { transition(0); setInterval(loop, TICK_SIZE); });
  }

  function loadActiveSlides(callback) {
    $.getJSON("active_slides", (data) => {
      var $temp = $('<div>').attr('id', 'slides');

      // Load all data into an element in-memory
      $.each(data, (i, slide) => {
        if (slide.content_type == 'ImageContent') {
          var element = 
            "<div class=\"slide\" data-duration=\"" + slide.display_time + "\">" + 
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
      timer = $(slideElements[i]).data('duration') * 1000;
      if(callback) { callback() };
    });
  }

  function loop() {
    timer = timer - TICK_SIZE;
    if(timer <= 0) {
      i++;
      if (i >= slideElements.length) { i = 0; }
      transition(i);
    }
  }

  function progress(time) {
    $(".progress-bar").css('width', '0%');
    $(".progress-bar").stop().animate({width: '100%'}, {easing: 'linear', duration: time});
  }

  function transition(i) {
    // Fade in new slide, fade out current slide
    $(".progress-bar").css('width', '0%');
    $('.visible').removeClass('visible');
    $(slideElements[i]).addClass('visible');

    // Reload slides every time
    // we arrive at the first slide.
    if (i == 0) {
      loadActiveSlides();
    } 

    timer = $(slideElements[i]).data('duration') * 1000;
    progress(timer);
  }
});
