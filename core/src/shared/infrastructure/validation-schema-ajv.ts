import Ajv from "ajv"
import { ValidationSchema } from "../domain/validation-schema"

export class ValidationSchemaAjv implements ValidationSchema {
    private readonly ajv: Ajv
    constructor(private readonly schema: any) {
        this.ajv = new Ajv({ allErrors: true })
    }
    validate(data: any, schema?: any): boolean {
        return this.ajv.validate(schema || this.schema, data)
    }
}