const axios = require('axios');
const { Type } = require('../db.js')

function normalizeInfoTypes(infoApi){
    return {
        name: infoApi.name,
    }
}
async function getAllTypes(){
    const infoApi = await axios.get('https://pokeapi.co/api/v2/type')
    const results = infoApi.data.results.map(type => normalizeInfoTypes(type))
    return results;
}

async function chargeAndGetAllTypes(){
    const dbTypes = await Type.findAll({})
    if(!dbTypes.length){
        const results = await getAllTypes();
        return Type.bulkCreate(results)
    }
    return dbTypes;
}


module.exports = {
    getAllTypes,
    chargeAndGetAllTypes,
}