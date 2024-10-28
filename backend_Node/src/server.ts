import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import loginRouter from './routes/LoginRoutes'
import guestRouter from './routes/GuestRoutes';
import konobarRouter from './routes/KonobarRoutes';
import adminRouter from './routes/AdminRoutes';

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/projekat')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/login', loginRouter)
router.use('/gost', guestRouter)
router.use('/konobar', konobarRouter)
router.use('/admin', adminRouter)
app.use('/', router)


app.listen(4000, () => console.log(`Express server running on port 4000`));