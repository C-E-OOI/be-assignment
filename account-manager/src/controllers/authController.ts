import { Response } from "express";
import { STATUS } from "../../constants/status";
import { supabase } from "../config/supabase";
import { LoginRequest } from "../types";


export default class AuthController {
    static async login(req: LoginRequest, res: Response) {
        const { email, password } = req.body
        
        const { data: user, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if(error) return res.status(STATUS.NETWORK_ERROR).json({error : error.message})
        
        return (
            res
            .status(STATUS.SUCCESS)
            .json({user})
        )

    }
    
    static async register(req: LoginRequest, res: Response) {
        const { email, password } = req.body

        const { data: user, error } = await supabase.auth.signUp({
            email,
            password
        })

        if (error) return res.status(STATUS.BAD_REQ).json({ error: error.message });

        return (
            res
            .status(STATUS.SUCCESS)
            .json({user})
        )
        
    }
}