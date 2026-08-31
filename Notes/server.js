const app = require('./src/app')
const connectdb = require('./src/config/db')

let PORT = 12000

connectdb()

app.listen(PORT,()=>{
    console.log(`Port is running on ${PORT}`)
})