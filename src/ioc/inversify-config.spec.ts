import 'reflect-metadata';

import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { expectCall, method } from 'strict-mocha-describers';

import { HelloWorldService } from '../services/hello-world.service';
import { InversifyContainer } from './inversify-config';
import { expect } from 'chai';

chai.use(sinonChai);

describe('InversifyContainer', () => {
	afterEach(() => {
		sinon.restore();
	});

	method.static(InversifyContainer, 'getContainer', () => {
		let bindAll: sinon.SinonStub;
		beforeEach(() => {
			bindAll = sinon.stub(InversifyContainer.prototype, 'bindAll' as any);
		});

		it('should return instance of InversifyContainer', () => {
			const result = InversifyContainer.getContainer();

			expect(bindAll).callCount(1)
				.calledWithExactly();
			expect(result).instanceOf(InversifyContainer);
		});
	});

	describe('instance', () => {
		let target: InversifyContainer;

		beforeEach(() => {
			target = new InversifyContainer();
		});

		method(() => target, InversifyContainer, 'bindAll' as any, () => {
			let toSelf: sinon.SinonStub;
			let bind: sinon.SinonStub;

			beforeEach(() => {
				toSelf = sinon.stub();
				bind = sinon.stub(InversifyContainer.prototype, 'bind' as any)
					.returns({ toSelf });
				target = new InversifyContainer();
			});

			it('should bind all services', () => {
				const result = target['bindAll']();

				expectCall(bind, [HelloWorldService]);
				expectCall(toSelf, []);
				expect(result).undefined;
			});
		});	
	});
});
