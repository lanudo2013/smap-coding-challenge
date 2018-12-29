import axios from 'axios';


export const getConsumers = (type) => {
    return axios.get('/api/consumers/'+ (type != null && type !== '' ? type : ''))
        .then(response => {
            return response.data;
        })

}


export const createConsumer = (name, consumer_type) => {
    return axios.post('/api/consumer/', {name, consumer_type})
        .then(response => {
            return response.data;
        })

}

export const consumerTypes = [
    {id: 'low', label: 'LABEL.CONSUMERTYPE.LOW'},
    {id: 'high', label: 'LABEL.CONSUMERTYPE.HIGH'},
    {id: 'extra_high', label: 'LABEL.CONSUMERTYPE.EXTRAHIGH'}
];

export const getConsumerTypes = () => {
    return Promise.resolve(consumerTypes);
}