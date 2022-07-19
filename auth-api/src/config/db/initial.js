import bcrypt from 'bcrypt';
import User from './../../modules/user/model/User.js'

export async function createInicialData()
{

    try
    {
    
        await User.sync(
            {
                force: true
            }
        );

        const password = await bcrypt.hash('123456', 10);

        await User.create(
            {
                name: 'Root',
                email: 'root@root.com',
                password
            }
        );

        await User.create(
            {
                name: 'Admin',
                email: 'admin@admin.com',
                password
            }
        );

    }
    catch (exception)
    {
        console.error(exception);
    }

};
