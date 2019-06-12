import { Users } from './connectDB';

export const User = {
    create : async ({ name, password, email }) => { 
        return await Users.create({ name, password, email });
    },
    all : async () => {
        return await Users.findAll();
    },
    one : async (obj, protect) => {
        return await Users.findOne(
            {
                where: obj
            },
            {   
                attributes: protect ? ['name', 'email'] : undefined 
            }
        )
    },
    update : async (obj, email, name) => {
        let user = await Users.findOne(
            {
                where: {
                    email
                }
            }
        )
        // console.log(user.toJSON())
        if(user) return await Users.update(obj, { where : { id : user.toJSON().id } })
        else return null
        // Users.update(obj, {where : {email}}).then(result => {
        //     console.log(result)
        // })
    }
}