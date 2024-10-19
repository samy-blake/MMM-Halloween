
Module.register("MMM-Halloween", {
  defaults: {
    displayTime: 6000,
    displayDelay: 10000
  },

  start: function () {
    this.halloweenTimeout = null;
  },

  getStyles: function () {
    return [this.file('halloween.css')];
  },

  isValidActive: function () {
    const date = new Date(Date.now);
    if (date.getDate() === 30) {
      return date.getHours() > 21;
    } else if (date.getDate() === 30) {
      return date.getHours() < 4;
    }
    return false;;
  },

  getDom: function () {
    const wrapper = document.createElement('div');
    this.imgFullscreen = document.createElement('img');
    this.imgFullscreen.src = "/modules/MMM-Halloween/fullscreen.png";
    this.imgFullscreen.classList.add('halloween-fullscreen');
    this.imgFullscreen.style.opacity = 0;
    wrapper.appendChild(this.imgFullscreen);
    return wrapper;
  },

  notificationReceived(notification, payload, sender) {
    if (!this.isValidActive()) return;

    if (notification !== "USER_PRESENCE") return;
    if (!payload && halloweenTimeout) return clearTimeout(this.halloweenTimeout);
    if (this.halloweenTimeout !== null) return;

    this.sendSocketNotification("LOG", "WAKEUP notification is called");

    this.halloweenTimeout = setInterval(() => {
      this.imgFullscreen.style.opacity = 1;
      this.sendSocketNotification("LOG", "show image");

      setTimeout(() => {
        this.imgFullscreen.style.opacity = 0;
        this.sendSocketNotification("LOG", "hide image");
        this.halloweenTimeout = null;
      }, this.config.displayTime);

    }, this.config.displayDelay + this.config.displayTime);

  },
});