const { randomUUID } = require('crypto');
const mqtt = require('mqtt');
const { emit } = require('process');
const client = mqtt.connect('http://localhost:4001');

let data = null;
let uuid = null;
let synchoronized = false;

client.on('sync', () => {
    console.log('Start sync with database');
    if (uuid === null) {
        uuid = randomUUID();
    }

    client.subscribe(uuid);

    const payload = {
        uuid,
        email: 'higorgrigorio@gmail.com',
        password: '123456',
        serialCode: '0000000001',
        cpf: '48494370871',
    };

    client.publish('sync/', JSON.stringify(payload));
});

client.on('check-sync-result', () => {
    let result = [data.toString()];

    [';', '='].map((char) => {
        const temp = [];

        result.map((item) => {
            temp.push(...item.split(char));
        });

        result = temp;
    });

    if (result[1] === 'true') {
        client.emit('sync-success');
    }

    if (result[1] === 'false') {
        console.log('Failed on sync with database.');
        console.log('message: ' + result[3])
        console.log('Trying again...');

        client.emit('sync-failure');
    }
});

client.on('sync-failure', () => {
    client.unsubscribe(uuid);
    uuid = null;
    client.emit('sync');
});

client.on('sync-success', () => {
    console.log('Success on sync with database');
    client.unsubscribe(uuid);
    synchoronized = true;
    client.emit('send-measure');
});

client.on('send-measure', () => {
    const measure = {
        idSensorTypeProduct: '3',
        measure: '10',
    };

    client.publish('send-measure/', JSON.stringify(measure));
});

client.on('message', (topic, payload) => {
    if (topic === uuid) {
        data = payload;
        client.emit('check-sync-result');
        console.log('payload: ' + payload.toString());
    }
});

client.on('connect', () => {
    client.emit('sync');
});
