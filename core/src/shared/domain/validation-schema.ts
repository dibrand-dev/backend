export interface ValidationSchema {
    validate: (data: any, schema?: any) => boolean;
}