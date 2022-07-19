import UserService from './../service/UserService.js';

class UserController
{

    async getAccessToken(req, res)
    {
        const result = await UserService.getAccessToekn(req);
        return res.status(result.status.code).json(result);
    }

    async findByEmail(req, res)
    {
        const result = await UserService.findByEmail(req);
        return res.status(result.status.code).json(result);
    }

}

export default new UserController;
