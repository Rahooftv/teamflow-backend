import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const {Pool} = pg

const pool = new Pool({

    host : process.env.PG_HOST,
    port :process.env.PG_PORT,
    user : process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
})


  
export const connectDB = async () =>{

    try {
        await pool.query("SELECT NOW()")
        console.log("postgreSQL connected");
        

    } catch(err){
        console.log("connection failed",err)


    }

}

export default pool