const {Op} = require('sequelize');
const User = require('../models/User');

module.exports = {
    async show(req, res) {
        const users = await User.findAll({
            attributes: ['name', 'email'], 
            where: {
                email: {
                    [Op.like]: '%@domain.com'
                }
            },
            include: [
                {association: 'addresses', where: { street: 'Rua Vieira de Carvalho'}},
                {
                    association: 'techs',
                    required: false,    // Busca os dados e não mostra se não encontrar. Troca inner pelo left outer
                    where: {
                        name: {
                            [Op.like]: 'React%'
                        }
                    }
                }
            ]
        })
        return res.json(users);
    }
}