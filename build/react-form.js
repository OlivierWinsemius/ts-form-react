"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactForm = void 0;
const react_1 = require("react");
const ts_form_1 = require("ts-form");
let numberOfForms = 0;
const listeners = {};
const createGetVal = (id, getValue) => () => {
    const [value, setValue] = (0, react_1.useState)(getValue());
    (0, react_1.useEffect)(() => {
        listeners[id].push(() => setValue(getValue()));
    }, []);
    return value;
};
const createGetField = (fieldId, getField) => (fieldName) => {
    const [field, setField] = (0, react_1.useState)(getField(fieldName));
    (0, react_1.useEffect)(() => {
        listeners[`${fieldId}_${fieldName}`].push(() => setField(getField(fieldName)));
    }, []);
    return field;
};
class ReactForm extends ts_form_1.Form {
    constructor(props) {
        super(props);
        this.id = ++numberOfForms;
        this.validId = `isValid_${this.id}`;
        this.touchedId = `isTouched_${this.id}`;
        this.submitId = `isSubmitting_${this.id}`;
        this.fieldId = `getField_${this.id}`;
        this.fieldIds = this.fieldNames.map((fieldName) => `${this.fieldId}_${fieldName}`);
        this.updateIsSubmitting = () => listeners[this.submitId].forEach((f) => f());
        this.updateIsTouched = () => listeners[this.touchedId].forEach((f) => f());
        this.updateIsValid = () => listeners[this.validId].forEach((f) => f());
        this.updateField = (fieldName) => listeners[`${this.fieldId}_${fieldName}`].forEach((f) => f());
        this.afterSubmit = () => {
            this.updateIsSubmitting();
        };
        this.beforeSubmit = () => {
            this.updateIsSubmitting();
            this.updateIsValid();
        };
        this.afterReset = () => {
            this.fieldNames.forEach(this.updateField);
            this.updateIsTouched();
            this.updateIsValid();
        };
        this.afterValidate = (field) => {
            this.updateField(field);
            this.updateIsTouched();
            this.updateIsValid();
        };
        const { getIsSubmitting, getIsValid, getIsTouched, getField, submitId, touchedId, validId, fieldId, fieldIds, } = this;
        const listenerIds = [submitId, validId, touchedId, ...fieldIds];
        listenerIds.forEach((id) => (listeners[id] = []));
        this.getIsSubmitting = createGetVal(submitId, getIsSubmitting);
        this.getIsTouched = createGetVal(touchedId, getIsTouched);
        this.getIsValid = createGetVal(validId, getIsValid);
        this.getField = createGetField(fieldId, getField);
    }
}
exports.ReactForm = ReactForm;
