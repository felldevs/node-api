const Tech = require('../models/Tech');
const User = require('../models/User');

module.exports = {

    async findAll(req, res){

        const { user_id } = req.params;
        const user = await User.findByPk(user_id, {
            include: { association: 'techs', through:{ attributes: []} }
        });

        return res.json(user);
    },

    async save(req, res) {

        const {user_id} = req.params;
        const {name} = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({error: 'User not found'});
        }

        const [tech, created] = await Tech.findOrCreate({
            where: {name}
        });

        /* Quando é feita uma associação de N:N, o sequelize disponibiliza 
            métodos auxiliares para facilitar. 
        */

        if (created){
            await user.addTech(tech);
        }    

        return res.json(tech);
    },

    async delete(req, res) {
        const {user_id} = req.params;
        const {name} = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({error: 'User not found'});
        }

        const tech = await Tech.findOne({
            where: {name}
        });

        await user.removeTech(tech);

        return res.json();
    }

}

