function timingCalc(endtime) {
  "use strict";

  var utcNow = new Date(),
    utcEndtime = new Date(endtime),
    timeTotal = utcEndtime - utcNow,
    timeSeconds = Math.floor((timeTotal / 1000) % 60),
    timeMinutes = Math.floor((timeTotal / 1000 / 60) % 60),
    timeHours = Math.floor((timeTotal / (1000 * 60 * 60)) % 24),
    timeDays = Math.floor(timeTotal / (1000 * 60 * 60 * 24));

  return {
    total: timeTotal,
    seconds: timeSeconds,
    minutes: timeMinutes,
    hours: timeHours,
    days: timeDays,
  };
}

function animateCounter(selector, targetValue) {
  var $element = $(selector);
  var currentValue = parseInt($element.text(), 10);

  if (currentValue === targetValue) {
    return;
  }

  $element.addClass("counter-animate");
  $element.text(targetValue);

  setTimeout(function () {
    $element.addClass("show");
  }, 10);

  setTimeout(function () {
    $element.removeClass("counter-animate show");
  }, 500);
}

function startCalc(endtime) {
  var timeTotal = timingCalc(endtime);

  animateCounter(".days", timeTotal.days);
  animateCounter(".hours", timeTotal.hours);
  animateCounter(".minutes", timeTotal.minutes);
  animateCounter(".seconds", timeTotal.seconds);

  if (timeTotal.total <= 0) {
    clearInterval(timingNow);
  }
}

// Convert the UTC deadline to Indian Standard Time (IST)
var utcDeadline = new Date(Date.parse("21 Sep 2023 09:30:00 UTC"));
var istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
var istDeadline = new Date(utcDeadline.getTime() + istOffset);

var timingNow = setInterval(function () {
  startCalc(istDeadline);
}, 1000);
