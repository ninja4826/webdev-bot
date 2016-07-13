/// <reference path="custom_typings.d.ts" />
import { Robot } from 'nestorbot';

export class WebDev {
  constructor(robot: Robot) {
    robot.respond(/hello world/, (msg, done) => {
      msg.reply("hello back", done);
    });
  }
}