import {Document} from "mongoose"
interface user extends Document {
    email: String;
    password: String;
    firstName: String;
    lastName: String;
    isVip: Boolean;
    isAdmin: Boolean;
    isLocked: Boolean;
    lockedUntil:Date;
    createdAt: Date;
    updatedAt: Date;
}
interface changePassword {
    currentPassword: string;
    newPassword: string;
}
interface login {
    email: string;
    password: string;
}

export {user,changePassword,login}
