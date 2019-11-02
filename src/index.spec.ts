import 'reflect-metadata';

import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { HelloWorldService } from './services/hello-world.service';
import { InversifyContainer } from './ioc/inversify-config';
import { expect } from 'chai';
import { expectCall } from 'strict-mocha-describers';

chai.use(sinonChai);
const testedFile = './index';

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
		getContainer = sinon.stub(InversifyContainer, 'getContainer').returns({ get } as any);
	});

	it('should call helloWorld', () => {
		require(testedFile);

		expectCall(getContainer, []);
		expectCall(get, [HelloWorldService]);
		expectCall(helloWorld, []);
	});
});
