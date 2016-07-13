
module.exports = function(robot) {
  robot.respond(/hello world/, function(msg, done) {
    msg.reply("hello back", done);
  });
};
