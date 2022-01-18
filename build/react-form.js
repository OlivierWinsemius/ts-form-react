"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactForm = void 0;
const ts_form_1 = require("ts-form");
class ReactForm extends ts_form_1.Form {
    constructor() {
        super(...arguments);
        this.setAfterValidateField = (afterValidateField) => {
            this.afterValidateField = afterValidateField;
        };
    }
}
exports.ReactForm = ReactForm;
