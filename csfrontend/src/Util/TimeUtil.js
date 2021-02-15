import moment from "moment";

export const toDateString = (isoStr) => {
  var curr = moment(isoStr);
  return curr.format("DD/MM/YYYY")
};
export const toDateTimeString = (isoStr) => {
  var curr = moment(isoStr);
  return curr.format("DD/MM/YYYY hh:mm")
};

export const timeFromDateISO = (isoStr) => {
  var old = moment(isoStr);
  var now = moment(new Date());
  var duration = moment.duration(now.diff(old));

  var seconds = duration.asSeconds();
  if (seconds < 60) return stringfy(seconds, "s")

  var minutes = duration.asMinutes();
  if (minutes < 60) return stringfy(minutes, "m")

  var hours = duration.asHours();
  if (hours < 24) return stringfy(hours, "h")

  var days = duration.asDays();
  if (days < 31) return stringfy(days, "d")

  var weeks = duration.asWeeks();
  return stringfy(weeks, "w")

};

export const getTimeFromIso = (isoStr) => {
  var curr = moment(isoStr).add(2, 'hours');
  return curr.format("h:mm")
}

export const intifiy = (isoStr) => {
  var old = moment(isoStr);
  var now = moment(new Date());
  var duration = moment.duration(now.diff(old));
  var seconds = duration.asSeconds();
  return seconds
}

const stringfy = (num, char) => {
    return `${num.toFixed(0)}${char}`
}
