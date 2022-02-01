"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactForm = void 0;
const react_1 = require("react");
const ts_form_1 = require("ts-form");
var ListenerIds;
(function (ListenerIds) {
    ListenerIds["IsValid"] = "isValid";
    ListenerIds["IsTouched"] = "isTouched";
    ListenerIds["IsSubmitting"] = "isSubmitting";
    ListenerIds["IsSubmitted"] = "isSubmitted";
})(ListenerIds || (ListenerIds = {}));
class ReactForm extends ts_form_1.Form {
    constructor(props) {
        super(props);
        this.listeners = {};
        this.getFieldId = (fieldName) => `getField_${fieldName}`;
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
        this.updateIsSubmitting = () => this.listeners[ListenerIds.IsSubmitting].forEach((f) => f());
        this.updateIsSubmitted = () => this.listeners[ListenerIds.IsSubmitted].forEach((f) => f());
        this.updateIsTouched = () => this.listeners[ListenerIds.IsTouched].forEach((f) => f());
        this.updateIsValid = () => this.listeners[ListenerIds.IsValid].forEach((f) => f());
        this.updateField = (fieldName) => this.listeners[this.getFieldId(fieldName)].forEach((f) => f());
        this.updateAllFields = () => this.fieldNames.forEach(this.updateField);
        this.afterSubmit = () => {
            this.updateIsSubmitting();
            this.updateIsSubmitted();
        };
        this.beforeSubmit = () => {
            this.updateIsValid();
            this.updateIsSubmitting();
            this.updateIsSubmitted();
        };
        this.afterReset = () => {
            this.updateAllFields();
            this.updateIsTouched();
            this.updateIsValid();
            this.updateIsSubmitted();
        };
        this.afterValidate = (field) => {
            this.updateField(field);
            this.updateIsTouched();
            this.updateIsValid();
        };
        const { fieldNames, getIsSubmitting, getIsSubmitted, createGetValue, getIsValid, getIsTouched, getField, getFieldId, } = this;
        this.formEvents = {
            afterReset: this.afterReset,
            beforeSubmit: this.beforeSubmit,
            afterSubmit: this.afterSubmit,
            afterValidate: this.afterValidate,
        };
        const fieldIds = fieldNames.map(getFieldId);
        const listenerIds = [...Object.values(ListenerIds), ...fieldIds];
        listenerIds.forEach((id) => (this.listeners[id] = []));
        this.getIsSubmitting = createGetValue(ListenerIds.IsSubmitting, getIsSubmitting);
        this.getIsSubmitted = createGetValue(ListenerIds.IsSubmitted, getIsSubmitted);
        this.getIsTouched = createGetValue(ListenerIds.IsTouched, getIsTouched);
        this.getIsValid = createGetValue(ListenerIds.IsValid, getIsValid);
        const createGetField = (fieldName) => createGetValue(getFieldId(fieldName), () => getField(fieldName));
        const getFieldValues = Object.fromEntries(fieldNames.map((fieldName) => [fieldName, createGetField(fieldName)]));
        this.getField = (fieldName) => getFieldValues[fieldName]();
    }
}
exports.ReactForm = ReactForm;
