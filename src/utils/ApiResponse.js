// always use this class to sand msg to client
class ApiResponse {
    constructor(data, statusCode,msg="Sucess"){
        this.massage =msg,
        this.data=data,
        this.statusCode = statusCode
        this.success = statusCode <400
    }
}

export default ApiResponse;