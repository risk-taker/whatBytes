class CustomErrorHandler extends Error {
    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg;
    }

    static alreadyExist(message) {
        return new CustomErrorHandler(409, message)
    }

    static unAuthorized(message = " UnAuthorized") {
        return new CustomErrorHandler(401, message);
    }

    static notFound(message) {
        return new CustomErrorHandler(404, message);
    }
}

export default CustomErrorHandler;