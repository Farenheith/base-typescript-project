import 'reflect-metadata';

import { Container } from "inversify";
import { HelloWorldService } from './../services/hello-world.service';

export class InversifyContainer extends Container {
	static getContainer() {
		const result = new InversifyContainer();
		result.bindAll();

		return result;
	}

	constructor() {
		super({
			defaultScope: "Request",
		});
	}

	protected bindAll() {
		this.bind(HelloWorldService).toSelf();
	}
}
