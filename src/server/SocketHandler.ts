import { Server } from "socket.io";
import http from 'http';
import UserModel, { } from "../models/user.model";
import moment from "moment";
const goldPriceUpdateRoom = "gold_price_update_room";
const goldCandleRoom = "gold_candle_room";
import jwt from "jsonwebtoken";

interface DecodedPayload {
  domain: string;
}

class SocketIO {
  private io: Server;


  constructor(server: http.Server) {
    this.io = new Server(server);
    this.middlewares()
    this.setupWebSocket();
  }


  private middlewares(): void {
    this.io.use(async (socket, next) => {
      try {
        console.log("socket.handshake.query => ", socket.handshake.query);
        next();
      } catch (e: any) {
        next(new Error(e?.message + " - contact- admin@goldpriceupdate.com"));
      }
    });
  }


  private setupWebSocket(): void {
    this.io.on('connection', (socket) => {
      console.log("user connect => " + socket.id);


      

      socket.on('disconnect', () => {
        // remove socket.id from onlineClient array using splice
        // onlineClient.splice(onlineClient.indexOf(socket.id), 1);
        console.log("user disconnect => " + socket.id);
      })

      // Add WebSocket event handlers here

      socket.use(([event, ...args], next) => {
        // do something with the packet (logging, authorization, rate limiting...)
        // do not forget to call next() at the end
        next();
      });

    });
  }


}

export default SocketIO;
