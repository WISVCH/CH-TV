const TICK_SIZE = 1000;
let timer = 0;
let i = 0;
let slideElements;

class TV {
  run($container) {
    this.$container = $container;
    this.loadSlides(() => {
      this.transition(0);
      setInterval(() => { this.loop() }, TICK_SIZE);
    });
  }

  loadSlides(callback) {
    let $tempDOM;
    $.getJSON("active_slides", (data) => {
      $tempDOM = $('<div>').attr('id', 'slides');

      this.$container.empty();

      if (data.length > 0) {
        // Load all data into an element in-memory
        $.each(data, (i, slide) => {
          if (slide.content_type == 'ImageContent') {
            var element =
              "<div class=\"slide\" data-duration=\"" + slide.display_time + "\">" +
                "<img src=\"" + slide.content.resource_url + "\" />" +
              "</div>";

            this.$container.append(element);
          }
        });

        slideElements = $('.slide');
        timer = $(slideElements[i]).data('duration') * 1000;
        if(callback) { callback() };
      } else {
        // No slides found, try again
        let tryAgainSeconds = 5;
        this.$container.html(`No slides found. Fetching every ${tryAgainSeconds} seconds.`);
        timer = tryAgainSeconds * 1000;
      }
    });
  }

  loop() {
    timer = timer - TICK_SIZE;
    if(timer <= 0) {
      i++;
      if (i >= slideElements.length) {
        i = 0;
        this.loadSlides(() => { setTimeout(() => this.transition(0), 0); });
      } else {
        this.transition(i);
      }
    }
  }

  progress(time) {
    $(".progress-bar").stop().animate({width: '100%'}, {easing: 'linear', duration: time});
  }

  transition(i) {
    $(".progress-bar").css('width', '0%');
    $('.visible').removeClass('visible');
    $(slideElements[i]).addClass('visible');

    timer = $(slideElements[i]).data('duration') * 1000;
    this.progress(timer);
  }
}

module.exports = TV;
