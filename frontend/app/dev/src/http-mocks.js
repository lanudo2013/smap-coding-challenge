const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);
let baseId=10;

const baseConsumers = [
    {
        "id": 1,
        "name": "Jim Bond",
        "consumer_type": "extra_high"
    },
    {
        "id": 2,
        "name": "Dianne King",
        "consumer_type": "high"
    },
    {
        "id": 3,
        "name": "Julia Miller",
        "consumer_type": "low"
    },
    {
        "id": 4,
        "name": "Cameron Hamilton",
        "consumer_type": "low"
    },
    {
        "id": 5,
        "name": "Rose Martin",
        "consumer_type": "low"
    },
    {
        "id": 6,
        "name": "John Oliver",
        "consumer_type": "low"
    },
    {
        "id": 7,
        "name": "Adam Oliver",
        "consumer_type": "low"
    },
    {
        "id": 8,
        "name": "Dianne Rees",
        "consumer_type": "extra_high"
    },
    {
        "id": 9,
        "name": "Charles Walsh",
        "consumer_type": "low"
    },
    {
        "id": 10,
        "name": "Mary Hamilton",
        "consumer_type": "low"
    }
];

let consumers = [ ...baseConsumers.map(x =>({...x})) ];
const consumerTypes= ['high','extra_high','low'];

mock.onGet(/\/api\/consumers\/[high|extra_high|low]?/).reply(function(config){
    const consumerType= config.url.split('/').slice(3)[0];
    return [200, consumerType ? consumers.filter(x => x.consumer_type === consumerType) : consumers];
});

mock.onPost(/\/api\/consumer\//).reply(function(config){
    let data;
    try{
        data=JSON.parse(config.data);
    }catch(_){
        return [400, 'Bad request'];
    }
    const {name, consumer_type} = data;

    if (consumerTypes.findIndex(x => x === consumer_type)<0){
        return [400, 'Consumer Type is invalid'];
    }
    if (name == null || name === ''){
        return [400, 'Consumer Name is invalid'];
    }
    consumers.push({name, consumer_type, id: ++baseId})

    return [200, {success:true}];
});

mock.onDelete(/\/api\/consumer\/\d+?/).reply(function(config){
    const id= config.url.split('/').slice(3)[0];
    consumers=consumers.filter(x => x.id !== parseInt(id));
    return [200, {success:true}];
});