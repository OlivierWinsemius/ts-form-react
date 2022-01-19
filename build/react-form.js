"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactForm = void 0;
const ts_form_1 = require("ts-form");
class ReactForm extends ts_form_1.Form {
    constructor() {
        super(...arguments);
        this._fieldNames = this.fieldNames;
        this._getField = this.getField;
        this._setAfterValidateField = (afterValidateField) => {
            this.afterValidateField = afterValidateField;
        };
        this._setAfterSubmit = (afterSubmit) => {
            this.afterSubmit = afterSubmit;
        };
        this._setAfterValidateForm = (afterValidateForm) => {
            this.afterValidateForm = afterValidateForm;
        };
        this._setGetField = (getField) => {
            this.getField = getField;
        };
    }
}
exports.ReactForm = ReactForm;
