import express from "express"
import router from "./router/routesProducts";
import db from "./config/db";
import colors from "colors"
import morgan from "morgan";
import cors ,{ CorsOptions} from "cors";


//conexion de db
async function conexionDB() {
  try {
    await db.authenticate()
    db.sync()
    console.log(colors.bgGreen.white("Conexion exitosa a la Base de datos"))
  } catch (error) {
    console.log(error)
    console.log(colors.red.bold("error en la conexion con la BD"))
  }
}

conexionDB()

const server = express()
server.use(express.json())
// CORS
const domainsAllowed=[process.env.CLIENT_URL]
const corsOptions : CorsOptions = {
  origin:function( origin ,callback){
    if(domainsAllowed.indexOf(origin) === -1){
      callback(null , true)
    }else{
      callback(new Error('Error de Cors , no permitido'))
    }
  }
}

server.use(cors(corsOptions))
server.use(morgan('dev'))
//Routing
server.use("/api/products" , router)


export default server;