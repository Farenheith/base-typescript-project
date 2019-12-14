import 'reflect-metadata';

import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { HelloWorldService } from '../../src/services/hello-world.service';
import { InversifyContainer } from '../../src/ioc/inversify-config';
import { expect } from 'chai';
import { describeClass } from 'strict-mocha-describers';
import { expectCall } from 'sinon-chai-calls-assertion';

chai.use(sinonChai);

describeClass(InversifyContainer, () => new InversifyContainer(), describeMethod => {
	afterEach(() => {
		sinon.restore();
	});

	describeMethod.static('getContainer', () => {
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

	describeMethod('bindAll' as any, (it, getTarget) => {
		let toSelf: sinon.SinonStub;
		let bind: sinon.SinonStub;

		beforeEach(() => {
			const target = getTarget();
			toSelf = sinon.stub();
			bind = sinon.stub(target, 'bind' as any)
				.returns({ toSelf });
		});

		it('should bind all services', target => {
			const result = target['bindAll']();

			expectCall(bind, [HelloWorldService]);
			expectCall(toSelf, []);
			expect(result).undefined;
		});
	});	
});
