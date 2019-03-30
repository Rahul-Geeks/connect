import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, observable } from 'rxjs';

import * as  io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = "http://localhost:5000";
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public sendMail(mail) {
    this.socket.emit("new-mail", mail);
  }

  public getMail() {
    console.log("In service of getting mail");
    return Observable.create((observer) => {
      this.socket.on("new-mail", (mail => {
        observer.next(mail);
      }));
    });
  }

  public sendMsg(array, name) {
    let obj = {
      "array": array,
      "name": name
    }
    this.socket.emit("new-message", obj);
  }

  public sendMsgToOne(array, userId) {
    let obj = {
      "array": array,
      "userId": userId
    }
    this.socket.emit("message-to-one", obj);
  }

  public sendTypingStatus(status) {
    return this.socket.emit("typing", status);
  }

  public sendToServer(userId) {
    this.socket.emit("join", userId);
  }

  public getMsgs = () => {
    return Observable.create((observer) => {
      this.socket.on("new-message", (array) => {
        observer.next(array);
      });
    });
  }

  public getTypingStatus = () => {
    return Observable.create((observer) => {
      this.socket.on("typing", (typingStatus) => {
        observer.next(typingStatus);
      });
    });
  }

  // public getMessageFromOne = () => {
  //   return Observable.create((observer) => {
  //     console.log("In Get_message_from_one");
  //     this.socket.on("message-to-one", (data) => {
  //       observer.next(data);
  //     })
  //   });
  // }

  public getMessageFromOne = () => {
    return Observable.create((observer) => {
      console.log("In Get_message_from_one");
      this.socket.on("my-message", (data) => {
        observer.next(data);
      })
    });
  }

  ngOnInit() {
  }
}