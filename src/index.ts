import { HelloWorldService } from './services/hello-world.service';
import { InversifyContainer } from './ioc/inversify-config';

const container = InversifyContainer.getContainer();
const service = container.get(HelloWorldService);

service.helloWorld();
