var barCount = 60;
var initialDateStr = new Date().toUTCString();

var barData = new Array(barCount);
var lineData = new Array(barCount);

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function randomBar(target, index, date, lastClose) {
  var open = +randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
  var close = +randomNumber(open * 0.95, open * 1.05).toFixed(2);
  var high = +randomNumber(Math.max(open, close), Math.max(open, close) * 1.1).toFixed(2);
  var low = +randomNumber(Math.min(open, close) * 0.9, Math.min(open, close)).toFixed(2);

  if (!target[index]) {
    target[index] = {};
  }

  Object.assign(target[index], {
    x: date.valueOf(),
    o: open,
    h: high,
    l: low,
    c: close
  });

}

function getRandomData(dateStr) {
  var date = luxon.DateTime.fromRFC2822(dateStr);

  for (let i = 0; i < barData.length;) {
    date = date.plus({days: 1});
    if (date.weekday <= 5) {
      randomBar(barData, i, date, i === 0 ? 30 : barData[i - 1].c);
      lineData[i] = {x: barData[i].x, y: barData[i].c};
      i++;
    }
  }
}
