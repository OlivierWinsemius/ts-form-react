"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactForm = void 0;
const react_1 = require("react");
const ts_form_1 = require("ts-form");
class ReactForm extends ts_form_1.Form {
    constructor(props) {
        super(props);
        this.listeners = {};
        this.validId = `isValid`;
        this.touchedId = `isTouched`;
        this.submitId = `isSubmitting`;
        this.fieldId = (fieldName) => `getField_${fieldName}`;
        this.createGetValue = (id, getValue) => () => {
            const [value, setValue] = (0, react_1.useState)(getValue());
            (0, react_1.useEffect)(() => {
                let isMounted = true;
                this.listeners[id].push(() => isMounted && setValue(getValue()));
                return () => {
                    isMounted = false;
                };
            }, []);
            return value;
        };
        this.updateIsSubmitting = () => this.listeners[this.submitId].forEach((f) => f());
        this.updateIsTouched = () => this.listeners[this.touchedId].forEach((f) => f());
        this.updateIsValid = () => this.listeners[this.validId].forEach((f) => f());
        this.updateField = (fieldName) => this.listeners[this.fieldId(fieldName)].forEach((f) => f());
        this.updateAllFields = () => this.fieldNames.forEach(this.updateField);
        this.afterSubmit = () => {
            this.updateIsSubmitting();
        };
        this.beforeSubmit = () => {
            this.updateIsSubmitting();
            this.updateIsValid();
        };
        this.afterReset = () => {
            this.updateAllFields();
            this.updateIsTouched();
            this.updateIsValid();
        };
        this.afterValidate = (field) => {
            this.updateField(field);
            this.updateIsTouched();
            this.updateIsValid();
        };
        const { fieldNames, getIsSubmitting, createGetValue, getIsValid, getIsTouched, getField, submitId, touchedId, validId, fieldId, } = this;
        this.formEvents = {
            afterReset: this.afterReset,
            beforeSubmit: this.beforeSubmit,
            afterSubmit: this.afterSubmit,
            afterValidate: this.afterValidate,
        };
        const fieldIds = fieldNames.map(fieldId);
        const listenerIds = [submitId, validId, touchedId, ...fieldIds];
        listenerIds.forEach((id) => (this.listeners[id] = []));
        this.getIsSubmitting = createGetValue(submitId, getIsSubmitting);
        this.getIsTouched = createGetValue(touchedId, getIsTouched);
        this.getIsValid = createGetValue(validId, getIsValid);
        const createGetField = (fieldName) => createGetValue(fieldId(fieldName), () => getField(fieldName));
        const getFieldValues = Object.fromEntries(fieldNames.map((fieldName) => [fieldName, createGetField(fieldName)]));
        this.getField = (fieldName) => getFieldValues[fieldName]();
        this.reset();
    }
}
exports.ReactForm = ReactForm;
