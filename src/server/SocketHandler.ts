import { Server } from "socket.io";
import http from 'http';
import UserModel, { SUBSCRUPTION_TYPE } from "../models/user.model";
import moment from "moment";
const goldPriceUpdateRoom = "gold_price_update_room";
const goldCandleRoom = "gold_candle_room";
import jwt from "jsonwebtoken";
import { log } from "console";

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

        // JUW0FexuguFLpsMNIdveXckJJwSraF61       appPackage: com.app.royalbengalgold

        const key: any = socket.handshake.query.secret_key;

        const royalBengalGoldKey = 'JUW0FexuguFLpsMNIdveXckJJwSraF69';
        const karnaphuliJewellersKey = 'JUW0FexuguFLpsMNIdveXckJJwSraF61';
        const primeJewellery = '89d6b376d3a99465146514945239fa8e635c99235571f4a042d7be225f41acec'
        const keyList = ['admin_secret_key',primeJewellery]
        // const keyList = ['admin_secret_key','JUW0Fexugupr443rimejewellery33IdveXckJJwSraF44','JUW0FexuguFLpsMNIdveXckJJwSraF69']

        if (!keyList.includes(key)) {
          const appPackage = socket.handshake.query.appPackage;
          const domain = socket.handshake.query.domain;
          let token: any = socket.handshake.query.token || "";
          const type_platform = socket.handshake.query.type;

          console.log("secret_key => " + key, appPackage, domain, token);
          // com.app.royalbengalgold


          if(key===royalBengalGoldKey){
            if(appPackage==='com.app.royalbengalgold'){
              return next()
            }else{
              return next(new Error('invalid key name'));
            }
          }


          if(key===karnaphuliJewellersKey){
            if(appPackage){
              if(appPackage==='com.app.karnaphuli'){
                return next()
              }else{
                return next(new Error('invalid key name'));
              }
            }
          }



          if (!token) {
            return next(new Error('unauthorized'));
          }

          const decoded = jwt.verify(token, "package-validation-key") as DecodedPayload;
          // if (decoded.domain !== domain) {
          //   return next(new Error('unauthorized domain'));
          // }

          if (!key) {
            return next(new Error('secret_key error'));
          }

          console.log("decoded => ", decoded);


          const user = await UserModel.findOne({
            apiSecretKey: key
          })


          console.log({ user });


          if (!user) {
            return next(new Error('invalid key. check your account kindly wrong key'));
          }





          const todayDate = moment().format('YYYY-MM-DD HH:mm:ss')
          const exparationDate = moment(user.exparationDate).format('YYYY-MM-DD HH:mm:ss')

          console.log("user.exparationDate => ", exparationDate);
          console.log("todayDate => ", todayDate);


       

          if (todayDate > exparationDate) {
            return next(new Error('expired key. please upgrade || contact- admin@goldpriceupdate.com'));
          }

          console.log("have exparationDate",user.subscriptionType);

          if (user.subscriptionType === SUBSCRUPTION_TYPE.FREE) {
            next()
          } else {



            if(key===karnaphuliJewellersKey){
              if(domain){
                if(domain==='localhost' || domain===user.domain){
                  return next()
                }else{
                  return next(new Error('invalid domain name'));
                }
              }
            }



            if(type_platform === 'app'){
              if (appPackage) {
                if (user.appPackage !== appPackage) {
                  return next(new Error('invalid package name'));
                }
              }else{
                return next(new Error('invalid platform'));
              }
            }else if(type_platform === 'web'){
              if (domain) {
                if (user.domain !== domain) {
                  console.log({domain});
                  if (domain !== 'localhost') {
                    return next(new Error('invalid domain name'));
                  }
                }
              }else{
                return next(new Error('invalid platform'));
              }
            }else{
              return next(new Error('invalid platform'));
            }

            console.log("pass middleware");
            next()
          }
        
        } else {
          next()
        }

        // next()
      } catch (e: any) {
        next(new Error(e?.message + " - contact- admin@goldpriceupdate.com"));
      }
    });
  }


  private setupWebSocket(): void {
    this.io.on('connection', (socket) => {
      console.log("user connect => " + socket.id);


      socket.on('subscribe_gold_price', () => {
        socket.join(goldPriceUpdateRoom);
      });

      socket.on('unsubscribe_gold_price', () => {
        socket.leave(goldPriceUpdateRoom);
      });

      socket.on('subscribe_gold_candle', () => {
        socket.join(goldCandleRoom);
      });

      socket.on('unsubscribe_gold_candle', () => {
        socket.leave(goldCandleRoom);
      });

      socket.on('gold_candle_received_py', (data) => {
        this.io.to(goldCandleRoom).emit('gold_candles', data);
      });

      socket.on('gold_price_update_from_py', (data) => {
        this.io.to(goldPriceUpdateRoom).emit('gold_price_update', data);
      });

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
