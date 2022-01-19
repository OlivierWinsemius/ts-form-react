"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactFormProvider = exports.ReactForm = void 0;
const react_1 = __importStar(require("react"));
const ts_form_1 = require("ts-form");
class ReactForm extends ts_form_1.Form {
  constructor() {
    super(...arguments);
    this.setAfterSubmit = (afterSubmit) => {
      this.afterSubmit = afterSubmit;
    };
    this.setAfterValidateForm = (afterValidateForm) => {
      this.afterValidateForm = afterValidateForm;
    };
    this.setAfterValidateField = (afterValidateField) => {
      this.afterValidateField = afterValidateField;
    };
  }
}
exports.ReactForm = ReactForm;
class ReactFormProvider extends react_1.Component {
  constructor() {
    super(...arguments);
    this.state = this.props.form;
  }
  updateForm(form) {
    const { isValid } = form;
    this.setState(Object.assign(Object.assign({}, form), { isValid }));
  }
  updateField(_, form) {
    this.updateForm(form);
  }
  componentDidMount() {
    this.props.form.setAfterValidateField(this.updateField.bind(this));
    this.props.form.setAfterValidateForm(this.updateForm.bind(this));
    this.props.form.setAfterSubmit(this.updateForm.bind(this));
  }
  render() {
    const { Context } = this.props;
    return react_1.default.createElement(
      Context.Provider,
      { value: this.state },
      this.props.children
    );
  }
}
exports.ReactFormProvider = ReactFormProvider;
