var tzArray = moment.tz.names(),
    createdDate = Date(),
    d = new Date(createdDate),
    dyear = d.getFullYear(),
    dmonth = d.getMonth(),
    dday = d.getDay(),
    dhours = d.getHours(),
    dminutes = d.getMinutes();
    dminutes = (dminutes > 9) ? dminutes : "0"+dminutes;

  // Create options from tzArray?
  // Create search from city?
  // https://maps.googleapis.com/maps/api/timezone/json?location=lg,lat&timestamp=UNIXTimestamp&key=