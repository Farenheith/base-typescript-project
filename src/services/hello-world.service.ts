import 'reflect-metadata';
import { injectable } from 'inversify';

@injectable()
export class HelloWorldService {
	helloWorld() {
		console.log('hello world');
		console.log('world hello');
	}
}
