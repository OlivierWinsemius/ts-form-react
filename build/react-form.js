"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactForm = void 0;
const ts_form_1 = require("ts-form");
class ReactForm extends ts_form_1.Form {
    constructor() {
        super(...arguments);
        this._fieldNames = this.fieldNames;
        this._getIsSubmitting = this.getIsSubmitting;
        this._getIsTouched = this.getIsTouched;
        this._getIsValid = this.getIsValid;
        this._getField = this.getField;
        this._setAfterValidate = (afterValidate) => {
            this.afterValidate = afterValidate;
        };
        this._setAfterSubmit = (afterSubmit) => {
            this.afterSubmit = afterSubmit;
        };
        this._setBeforeSubmit = (beforeSubmit) => {
            this.beforeSubmit = beforeSubmit;
        };
        this._setAfterReset = (afterReset) => {
            this.afterReset = afterReset;
        };
        this._setGetIsSubmitting = (getIsSubmitting) => {
            this.getIsSubmitting = getIsSubmitting;
        };
        this._setGetIsTouched = (getIsTouched) => {
            this.getIsTouched = getIsTouched;
        };
        this._setGetIsValid = (getIsValid) => {
            this.getIsValid = getIsValid;
        };
        this._setGetField = (getField) => {
            this.getField = getField;
        };
    }
}
exports.ReactForm = ReactForm;
