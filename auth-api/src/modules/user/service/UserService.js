import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from './../repository/UserRepository.js';
import UserException from './../exception/UserException.js';
import * as httpStatus from './../../../config/constants/httpStatus.js';
import * as secrets from './../../../config/constants/secrets.js';
import { tracing } from './../../../config/tracing/helper.js';

class UserService
{

    async findByEmail(req)
    {
        try
        {
            tracing(req, 'UserService.findByEmail');

            const { email } = req.params;
            const { authUser } = req;
            this.validateRequest(email);

            const user = await UserRepository.findByEmail(email);
            this.validateUser(user);
            this.validateAuthenticatedUser(user, authUser);

            const result = {
                status: 
                {
                    code: httpStatus.SUCCESS,
                    message: 'Ok',
                },
                result: 
                {
                    user: 
                    {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                }
            };

            return tracing(req, 'UserService.findByEmail', result);

        }
        catch (error)
        {
            return {
                status: 
                {
                    code: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
                    message: error.message,
                },
                result: null
            };
        }
    }

    async getAccessToekn(req)
    {

        try
        {
            tracing(req, 'UserService.getAccessToekn');

            const { email, password } = req.body;
            this.validateAccessToken(email, password);

            const user = await UserRepository.findByEmail(email);
            this.validateUser(user);
            await this.validatePassword(password, user.password);

            const authUser = {
                id: user.id,
                name: user.name,
                email: user.email
            };

            const accessToken = jwt.sign(
                {
                    authUser
                },
                secrets.API_SECRET,
                {
                    expiresIn: '1d'
                }
            );

            const result = {
                status: 
                {
                    code: httpStatus.SUCCESS,
                    message: 'Ok',
                },
                result: 
                {
                    accessToken
                }
            };

            return tracing(req, 'UserService.getAccessToekn', result);

        }
        catch (error)
        {
            return {
                status: 
                {
                    code: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
                    message: error.message,
                },
                result: null
            };
        }

    }

    validateRequest(email)
    {
        if (!email)
        {
            throw new UserException(
                httpStatus.BAD_REQUEST,
                'User email was not informed'
            );
        }
        return this;
    }

    validateUser(user)
    {
        if (!user)
        {
            throw new UserException(
                httpStatus.BAD_REQUEST,
                'User not found'
            );
        }
        return this;
    }

    validateAccessToken(email, password)
    {
        if (!email || !password)
        {
            throw new UserException(
                httpStatus.UNHAUTHORIZED,
                'Email and password are invalid'
            );
        }
        return this;
    }

    async validatePassword(password, hashPassword)
    {
        if (!await bcrypt.compare(password, hashPassword))
        {
            throw new UserException(
                httpStatus.UNHAUTHORIZED,
                'Password is invalid'
            );
        }
    }

    validateAuthenticatedUser(user, userAuthenticated)
    {
        if (!userAuthenticated || (user.id != userAuthenticated.id))
        {
            throw new UserException(
                httpStatus.UNHAUTHORIZED,
                'User is invalid'
            );
        }
        return this;
    }

}

export default new UserService;
