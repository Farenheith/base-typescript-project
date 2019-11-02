import 'reflect-metadata';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as chai from 'chai';
import { method, expectCall } from 'strict-mocha-describers';
chai.use(sinonChai);
import { HelloWorldService } from './hello-world.service';
import { Container } from 'inversify';
import { expect } from 'chai';

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
