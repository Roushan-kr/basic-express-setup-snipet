class ApiError extends Error {
    constructor(statusCode,error= [], stack ="", msg="SomeThing went wrong"){
        super(msg)
        this.statusCode= statusCode;
        this.error= error;
        this.message = msg;
        this.data = null;
        this.success = false;
        if(stack){
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this, this.stack)
        }
    }
}