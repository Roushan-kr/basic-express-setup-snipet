// always use this class to sand msg to client
/*
* @class ApiResponse
* @description This class is used to send response to the client
*/
class ApiResponse {
    constructor( statusCode,data,msg="Sucess"){
        this.massage =msg,
        this.data=data,
        this.statusCode = statusCode
        this.success = statusCode <400
    }
}

export default ApiResponse;