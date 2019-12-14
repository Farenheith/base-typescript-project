import 'reflect-metadata';

import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { HelloWorldService } from '../src/services/hello-world.service';
import { InversifyContainer } from '../src/ioc/inversify-config';
import { expectCall } from 'sinon-chai-calls-assertion';

chai.use(sinonChai);
const testedFile = '../src/index';

describe('index', () => {
	let helloWorld: sinon.SinonStub;
	let get: sinon.SinonStub;
	let getContainer: sinon.SinonStub;

	afterEach(() => {
		sinon.restore();
	});

	beforeEach(() => {
		delete require.cache[require.resolve(testedFile)];
		helloWorld = sinon.stub();
		get = sinon.stub().returns({ helloWorld })
		getContainer = sinon.stub(InversifyContainer, 'getContainer').returns({ get } as any) as any;
	});

	it('should call helloWorld', () => {
		require(testedFile);

		expectCall(getContainer, []);
		expectCall(get, [HelloWorldService]);
		expectCall(helloWorld, []);
	});
});
