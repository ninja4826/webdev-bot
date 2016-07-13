/// <reference path="../typings/index.d.ts" />

declare module 'nestorbot' {
  interface Robot {
    teamId: string;
    botId: string;
    debugMode: boolean;
    
    new(teamId: string, botId: string, debugMode: boolean): Robot;
    
    respondPattern(regex: RegExp, hear: boolean): RegExp;
    hear(regex: RegExp, options: any, callback: (msg: Response, done: Function) => void): void;
    hear(regex: RegExp, callback: (msg: Response, done: Function) => void): void;
    respond(regex: RegExp, options: any, callback: (msg: Response, done: Function) => void): void;
    respond(regex: RegExp, callback: (msg: Response, done: Function) => void): void;
    loadFile(path: string, file: string): void;
    http(url: string, options?: any): any;
    receive(message: Message, done: Function): any;
  }
  
  interface Response {
    robot: Robot;
    message: Message;
    match: any;
    
    new(robot: Robot, message: Message, match: any): Response;
    send(...payload: any[]): boolean;
    reply(...payload: any[]): boolean;
    finish(): void;
  }
  
  interface RichResponse {}
  
  interface Message {
    user: User;
    done: Function;
    
    new(user: User, done: Function): Message;
    
    finish(): void;
  }
  
  interface TextMessage extends Message {
    text: string;
    id: string;
    
    new(user: User, text: string, id: string): TextMessage;
    
    match(regex: RegExp): any;
    toString(): string;
  }
  
  interface User {
    id: string;
    [key: string]: any;
    
    new(id: string, options: any): User;
  }
}