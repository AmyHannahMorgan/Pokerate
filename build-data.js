const axios = require('axios').default;
const fs = require('fs').promises;

fs.open('./data.json', 'wx').then( async file => {
    let data = {'mons': []}
    let ids = [];
    let idRegexp = /\b[0-9]{1,}/;

    for(let i = 0; i < 898; i++) {
        let species = await (await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i+1}/`)).data;
        for(let ii = 0; ii < species.varieties.length; ii++) {
            console.log(species.varieties[ii].pokemon);
            console.log(species.varieties[ii].pokemon.url.match(idRegexp)[0]);
            let id = parseInt(species.varieties[ii].pokemon.url.match(idRegexp)[0]);
            console.log(`id: ${id} | name: ${species.varieties[ii].pokemon.name}`);
            ids.push();
        }
    }

    for(let i = 0; i < ids.length; i++) {
        let mon = await getMon(ids[i]);
        console.log(mon);
        if(mon) data.mons.push(mon)
    }

    return file.writeFile(JSON.stringify(data));
})
.then(file => {
    console.log('data file written');
})

async function getMon(id, output) {
    let data
    try {
        data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    } catch (error) {
        console.log(error)
        return false;
    }
    
    let mon = {
        'id': id,
        'name': data.data.name,
        'pic': data.data.sprites.other['official-artwork'].front_default,
        'wins': 0,
        'losses': 0,
        'ratio': 0
    };
    return mon;
}