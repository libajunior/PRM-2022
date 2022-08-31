import { ICredential } from '@typesCustom';
import {FirebaseError, signInAdmin} from '../services/firebase'

import { Request, Response } from 'express';
 
class AuthController {

    public async signInAdmin(request: Request, response: Response) {
        const credential = request.body;

        try {

            const result = await signInAdmin(credential.email, credential.password);
            
            response.json(result)

        } catch (e) {
            response.status(500).json(e)
        }
    }

}

export default new AuthController();