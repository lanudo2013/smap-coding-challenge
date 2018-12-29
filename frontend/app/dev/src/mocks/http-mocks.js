


const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios, { delayResponse: 2000 });
let baseId=10;

const baseConsumers = require('./consumers.json');
const statistics = require('./statistics.json');



let consumers = [].concat(baseConsumers.map(x =>(Object.assign({},x))));
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

mock.onGet(/\/api\/monthly_statistics\/\d+?/).reply(function(config){
    //const consumerId= config.url.split('/').slice(3)[0];
    const year= config.params ?  config.params.year : null;
    return [200, year ? statistics.filter(x => x.year === parseInt(year)) : statistics];
});