import { SyncProductWithDatabase } from '@application/use-cases/sync-product-with-database';
import { IPayloadHandler } from '@core/infra/PayloadHandle';
import { Maybe } from '@core/logic';
import { Override } from '@core/logic/Override';
import { createServer, Server } from 'node:net';
import { adaptBroker } from './adapters/broker-adapter';
import { CreateMeasurementController } from './controllers/create-measure-controller';
import { SyncController } from './controllers/sync-controller';
import { SyncControllerBody } from './dtos/sync-controller-body';
import { HttpClient } from './helpers/http-client';
import { HttpClientRepository } from './repositories/http-client-repository';
import { HttpProductRepository } from './repositories/http-product-repository';
import { CreateMeasurementPayload } from './topics/create-measure';
import { SyncPayload } from './topics/sync-payload';

const Aedes = require('aedes');

type AedesOptions = typeof Aedes.AedesOptions;
type Client = typeof Aedes.Client;
type AedesPublishPacket = typeof Aedes.AedesPublishPacket;

export type BrokerOptions = Override<AedesOptions> & {
    host: string;
    port: number;
};

const nop = function () {};

interface Publication {
    id: String;
    createdAt: Date;
}

class PublicationManager {
    private readonly queue: Array<Publication> = [];
    public static TIME_STAMP: number = 3 * 1000;

    public exist(id: String): boolean {
        return this.queue.some((p) => p.id === id);
    }

    add(publication: Publication) {
        if (!this.exist(publication.id)) {
            this.queue.push(publication);
            console.log(`Added publication ${publication.id}`);
            return true;
        }
        return false;
    }

    removeExpiredPublications() {
        while (this.queue.length > 0) {
            const begin = this.queue.at(0);

            if (begin) {
                if (
                    new Date().getTime() - begin.createdAt.getTime() <
                    PublicationManager.TIME_STAMP
                ) {
                    break;
                } else {
                    this.queue.shift();
                    console.log(`Removed publication: ${begin.id}`);
                }
            }
        }
    }
}

export class Broker extends Aedes {
    private _onListen: () => void;
    private readonly _server: Server;
    private syncPaylaodHandler: IPayloadHandler;
    private createMeasurePaylaodHandler: IPayloadHandler;
    private publicationManager: PublicationManager = new PublicationManager();
    private constructor(
        private readonly options: BrokerOptions,
        server: Maybe<Server>,
        _syncPaylaodHandler?: IPayloadHandler,
        _createMeasurePaylaodHandler?: IPayloadHandler,
    ) {
        super({ ...options });

        if (!server) {
            this._server = server ?? createServer(adaptBroker(this));
        }

        this.syncPaylaodHandler =
            _syncPaylaodHandler ??
            new SyncPayload(SyncController.default(), this);

        this.createMeasurePaylaodHandler =
            _createMeasurePaylaodHandler ??
            new CreateMeasurementPayload(CreateMeasurementController.default());

        this.init();
    }

    static create(
        options: BrokerOptions,
        server: Maybe<Server>,
        syncPaylaodHandler?: SyncPayload,
        measurementPaylaodHandler?: IPayloadHandler,
    ) {
        return new Broker(
            options,
            server,
            syncPaylaodHandler,
            measurementPaylaodHandler,
        );
    }

    get onListen(): () => void {
        return this._onListen;
    }

    set onListen(value: () => void) {
        this._onListen = value;
    }

    public listen() {
        const { options } = this;

        if (!options.port) {
            throw new Error('port must be specified');
        }

        this._server.listen(options.port, this._onListen ?? nop);
    }

    public init() {
        super.on(
            'publish',
            async (packet: AedesPublishPacket, client: Client) => {
                if (client) {
                    try {
                        const publication: Publication = {
                            id: client.id,
                            createdAt: new Date(),
                        };

                        if (this.publicationManager.add(publication)) {
                            return;
                        } else {
                            this.publicationManager.removeExpiredPublications();
                        }

                        const payload = JSON.parse(packet.payload.toString());
                        const { topic } = packet;

                        if (topic === 'sync/') {
                            await this.syncPaylaodHandler.handle(payload);
                        }

                        if (topic === 'send-measure/') {
                            await this.createMeasurePaylaodHandler.handle(
                                payload,
                            );
                        }
                    } catch (err) {
                        console.error(err);
                    }
                }
            },
        );
    }
}
