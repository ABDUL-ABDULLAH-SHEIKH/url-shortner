import express from 'express';

const app = express();

const PORT = process.env.PORT ?? 8000 ;

app.get('/', (req, res)=>{
    console.log('server is up and runing');
})
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})