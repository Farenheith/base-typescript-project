import 'reflect-metadata';
import { HelloWorldService } from './../services/hello-world.service';
import { Container } from "inversify";

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
