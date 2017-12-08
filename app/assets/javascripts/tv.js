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
          var element = '';
          if (slide.content_type == 'ImageContent') {
            element =
              `<div class="slide" data-duration="${slide.display_time}" data-type="${slide.content_type}">
                 <img src="${slide.content.resource_url}" />
              </div>`;
          } else if(slide.content_type == 'VideoContent') {
            element =
              `<div class="slide" data-duration="${slide.display_time}" data-type="${slide.content_type}">
                <video src="${slide.content.resource_url}" muted />
              </div>`;
          }
          this.$container.append(element);
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

  setVideoState(slide, state) {
    let videoElement = $(slide).find('video')[0];
    if (videoElement === undefined) { return }
    if (state == 'play') {
      videoElement.play();
    } else if (state == 'stop') {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  }

  transition(i) {
    let currentSlide = $('.visible')[0];
    let nextSlide = slideElements[i];

    $(currentSlide).removeClass('visible');
    $(nextSlide).addClass('visible');

    this.setVideoState(currentSlide, 'stop');
    this.setVideoState(nextSlide, 'play');

    $(".progress-bar").css('width', '0%');

    timer = $(nextSlide).data('duration') * 1000;
    this.progress(timer);
  }
}

module.exports = TV;
