import errorMessages from "../errorMessages";

class HttpException extends Error{
    public status:number;
    public message:string;
    constructor(status:number,message:string){
        super();
        this.status=status;
        this.message=message && typeof message === "string" && message in errorMessages
        ? errorMessages[message]
        : message;
    }
}
export default HttpException