import 'reflect-metadata';

import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { describeClass } from 'strict-mocha-describers';
import { expectCall } from 'sinon-chai-calls-assertion';

import { Container } from 'inversify';
import { HelloWorldService } from '../../src/services/hello-world.service';

chai.use(sinonChai);

function bootStrap() {
	const container = new Container();
	container.bind(HelloWorldService).toSelf();

	return container.get(HelloWorldService);
}

describeClass(HelloWorldService, bootStrap, describeMethod => {
	describeMethod('helloWorld', it => {
		beforeEach(() => {
			sinon.stub(console, 'log');
		});

		it('should print hello world on console', (target) => {
			target.helloWorld();
			expectCall(console.log, ['hello world'],
				['world hello'],
			);
		});
	});
});
