
module.exports = [
  {
    in: "set alarm in 10 seconds",
    out: "What would you like to call your alarm?"
  },
  {
    in: "test",
    out: "What time would you like to set the alarm for?"
  },
  {
    in: "10 pm",
    out: "Creating alarm named \"test\" for 5/7/2018 10:00am"
  },
  {
    in: "delete alarm named test",
    out: "Deleted the 'test' alarm." // the message sent by the bot after a few seconds
  }
];