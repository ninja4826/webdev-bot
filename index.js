var WebDev = require('./lib').WebDev;

module.exports = function(robot) {
  // robot.respond(/hello world/, function(msg, done) {
  //   msg.reply("hello back", done);
  // });
  console.log(WebDev);
  var webDev = new WebDev(robot);
};