
import mongoose, { Mongoose } from "mongoose"
import dotenv from 'dotenv';
import * as readline from 'readline';

dotenv.config();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestionAsync = (question:any) => {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  };

const askQuestions = async (ques: any) => {
    let yesOrNo = { ...ques }; // Copying the object to prevent mutations
    const keys = Object.keys(yesOrNo);
  
    for (let i = 0; i < keys.length; i++) {
      const que = keys[i];
      const answer:any = await askQuestionAsync(`Do you want to upload ${que} ? (y/n): `);
      const sanitizedAnswer = answer.trim().charAt(0).toLowerCase();
      if (sanitizedAnswer === 'y') {
        yesOrNo[que] = true;
      }
    }
  
    return yesOrNo;
  };

(async () => {
    try {

        const db: Mongoose = await mongoose.connect(process.env.MONGODB_URL || '', {
            autoIndex: false,
            dbName: process.env.DB_NAME
        })
        const status = db.connection.readyState
        if (status === db.STATES.connected) {
            console.log('db is connected db name - ' + db.connection.db.databaseName);
            console.log(db.connection.host);
        }

        let yesOrNo:any = {
            countries: false,
            langs: false,
            services: false,
            landing_details: false,
            currencies: false,
        }

        const answers = await askQuestions(yesOrNo)
        rl.close();

        // if (answers.countries) await upload_country()
        // if (answers.langs) await upload_language()
        // if (answers.services) await fill_services()
        // if (answers.landing_details) await fill_landing_page()
        // if (answers.currencies) await populateCurrencyData()
        return

    } catch (error) {
        console.log(error);
    }
})()