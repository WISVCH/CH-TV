class Admin {
  run() {
    const $sidebar = $('.sidebar')[0];
    this.scrollToActiveSlide($sidebar);
  }

  scrollToActiveSlide($sidebar) {
    let activeSlide = $('.thumb.active');
    if (activeSlide.length > 0) {
      $sidebar.scrollTop = activeSlide[0].offsetTop;
    }
  }
}

module.exports = Admin;
