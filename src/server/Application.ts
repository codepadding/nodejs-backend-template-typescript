import dotenv from 'dotenv';
import "express-async-errors";
import AbstractApp from './AbstractApp';
import SocketIO from "./SocketHandler";
import session from "express-session";
import mongoose, { ConnectionStates, HydratedDocument, Mongoose } from 'mongoose';
import middlewareRoot from '../middlewares/middlewareRoot';
dotenv.config();
class Application extends AbstractApp {


  protected setupRoutes(): void {
    super.setupRoutes();
  }

  protected setupMiddlewares(): void {
    super.setupMiddlewares()
    // for google passport authentication
    this.app.use(
      session({
        secret: process.env.EXPRESS_SESSION_SECRET || 'default',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: true }
      })
    );


   

  }

  public runServer(): any {
    this.server.listen(process.env.PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`);  
    });
    return this.server
  }

  public getServer(): any {
    return this.server
  }


  // public runSocket(): any {}
  public runSocket(): void {
    new SocketIO(this.server)
  }


  public connectMongoDB(): void {
    mongoose.connect(process.env.MONGODB_URL || '', {
      autoIndex: false,
      dbName: process.env.DB_NAME
    }).then(async (db: Mongoose) => {
      const status = db.connection.readyState
      if (status === db.STATES.connected) {
        console.log('MongoDB connected');
        // const userModel: HydratedDocument<User> = new UserModel({
        //   firstName: 'tesing',
        //   lastName: 'mix',
        //   email:'codepadding@gmail.com'
        // })
        // const user: User = await userModel.save()
        // console.log(user);


        // const user = new UserModel({ firstName: 'Jean-Luc', lastName: 'Picard',email:'testing@gmail.com' });
        // user.save()
        
        // const fullName: string = user.fullName(); // 'Jean-Luc Picard'
        // console.log(fullName);
        

        // const user = await UserModel.findOne()
        // console.log(user?.fullName());
        
        // const fullName = user?.fullName()
        // console.log(fullName);
        


        // user.Da
      }
    }).catch(error => {
      console.log(error.message);
    });
  }

}


export default Application;


// const userModel : HydratedDocument<User> = new UserModel({
//   email : 'tesing',
//   name : 'mix'
// })
// const user : User = await userModel.save()