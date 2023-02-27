import { config } from '@config/server';
import { Broker, BrokerOptions } from '@infra/broker';

function setup(config: BrokerOptions): Broker {
    const broker = Broker.create(config, null);
    broker.init();
    broker.onLinten(() => {
        console.log(`broker initilized successfully`);
    });
    return broker;
}

setup(config).listen();
