function timeSince(datetime) {
  var milisec_diff = Math.abs(new Date() - new Date(datetime)),
    diff = new Date(milisec_diff),
    days = (milisec_diff / 3600e3 / 24) | 0,
    hours = diff.getUTCHours(),
    respvalue = '';
  if (days) respvalue += days + ' day(s), ';
  if (hours) respvalue += hours + ' hour(s) and ';
  respvalue += diff.getUTCMinutes() + ' minute(s) ago.';
  return respvalue;
}

export default timeSince;
