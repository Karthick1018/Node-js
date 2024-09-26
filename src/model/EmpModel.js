import { model, Schema } from "mongoose";

const EmpSchema = new Schema({
    email: String,
    password: String
}, { collation: 'Employee' })

const EmpModel = model('Employee', EmpSchema, 'Employee')

export default EmpModel;