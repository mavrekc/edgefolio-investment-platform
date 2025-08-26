export class ApiError extends Error {
	constructor({ message, type, status }) {
		super(message);
		this.type = type;
		this.status = status;
	}
}