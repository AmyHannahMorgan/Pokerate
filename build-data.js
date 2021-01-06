const axios = require('axios').default;
const fs = require('fs').promises;

fs.open('./data.json', 'wx').then( async file => {
    let data = {'mons': []}

    for(let i = 0; i < 898; i++) {
        let mon = await getMon(i + 1);
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
        'losses': 0
    };
    return mon;
}