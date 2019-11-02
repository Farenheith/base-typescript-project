import 'reflect-metadata';

import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { expectCall, method } from 'strict-mocha-describers';

import { Container } from 'inversify';
import { HelloWorldService } from './hello-world.service';

chai.use(sinonChai);

describe('HelloWorldService', () => {
	let target: HelloWorldService;
	afterEach(() => {
		sinon.restore();
	});

	beforeEach(() => {
		const container = new Container();
		container.bind(HelloWorldService).toSelf();

		target = container.get(HelloWorldService);
	});

	method(() => target, HelloWorldService, 'helloWorld', () => {
		beforeEach(() => {
			sinon.stub(console, 'log');
		});

		it('should print hello world on console', () => {
			target.helloWorld();

			expectCall(console.log, ['hello world'],
				['world hello'],
			);
		});
	});
});
