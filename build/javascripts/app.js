(function() {

  window.addEventListener('load', function() {
    var first_updown, get_updown, last_date, offset_time, rotation, showcase;
    rotation = 0;
    first_updown = null;
    last_date = new Date();
    showcase = document.getElementById("showcase");
    offset_time = function() {
      var now_date, _last_date;
      now_date = new Date();
      _last_date = last_date;
      last_date = now_date;
      return now_date - _last_date;
    };
    get_updown = function(acc) {
      var updown, xz, y;
      y = acc.y;
      xz = Math.sqrt(Math.pow(acc.x, 2) + Math.pow(acc.z, 2));
      if (acc.z < 0) {
        xz = -xz;
      }
      updown = Math.atan2(xz, y) / Math.PI * 180;
      if (updown > 90) {
        updown -= 360;
      }
      return updown;
    };
    return window.addEventListener('devicemotion', function(e) {
      var updown;
      rotation += e.rotationRate.beta * (offset_time()) * 0.001;
      updown = get_updown(e.accelerationIncludingGravity);
      if (!first_updown) {
        first_updown = updown;
      }
      updown -= first_updown;
      return showcase.setAttribute("style", [["-webkit-transform:rotateX(", -updown, "deg)", "rotateY(", -rotation, "deg)"].join("")].join(";"));
    });
  });

}).call(this);
