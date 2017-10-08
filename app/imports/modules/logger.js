class LoggerClass {
	constructor() {

	}

	log(msg) {
		console.log(`[Log] ${msg}`);
	}

	error(msg) {
		toastr.error(msg);
		console.log(`[Error] ${msg}`);
	}

	success(msg) {
		toastr.success(msg);
		console.log(`[Success] ${msg}`);
	}

	warning(msg) {
		toastr.warning(msg);
		console.log(`[Warning] ${msg}`);
	}
}

const Logger = new LoggerClass();

export { Logger };
export default Logger;