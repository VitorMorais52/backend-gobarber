import {Router} from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUsersService from '../services/createUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try{
        const {name, email, password} = request.body;

        const createUser = new CreateUsersService();

        const user = await createUser.execute({
            name, 
            email,
            password,
        });

        return response.json({name, email});
    }
    catch(err){
        return response.status(400).json({error: err.message})
    }
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    console.log(request.file);
    return response.json({ok: true});
})

export default usersRouter;