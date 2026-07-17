import express from "express";
import {db} from '../db/index'
import { userTable } from "../models";
import {eq} from 'drizzle-orm'
import {createHash, createHmac, randomBytes} from 'crypto'

const router = express.Router();

router('/signup', async (req, res)=>{
    const {firstName, lastName, email, password} = req.body();

    const [existingUser] = await db.select({
        id: userTable.id
    }).from(userTable).where(eq(userTable.email, email))
    if(existingUser){
        return res.status(400).json({error:`user already exist ${email}`})
    }
    const salt = randomBytes(256).toString('hex');
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex')

    const [users]= await db.insert(userTable).values({
        email,
        firstName,
        lastName,
        password:hashedPassword,
        salt
    }).returning({id: userTable.id})

    return res.status(201).json({data: {userId: users.id}})

})

export default router;