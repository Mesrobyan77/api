const {Model ,DataTypes, Sequelize} = require('sequelize') 

const sequelize = new Sequelize('Team','root','', {
    host:'localhost',
    dialect:'mysql'
})

class Url extends Model{}

Url.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    url:DataTypes.STRING
},{
    modelName:'url',
    sequelize
})

Url.sync()


class Voting extends Model{}

Voting.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    like:{
        type:DataTypes.INTEGER,
        defaultValue:1
    }
},{
    modelName:'voting',
    sequelize
})
Voting.belongsTo(Url)
Url.hasMany(Voting)
Voting.sync()

module.exports={Url,Voting,sequelize}