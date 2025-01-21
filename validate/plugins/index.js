export const validator = {};

export const buildTargetValue = ({
  formValue,
  defaultValueParams = [],
  formItemInput,
  valueInput,
  paramPlugin,
  ruleParamInput = [],
}) => {
  const ruleParamsValue = ruleParamInput.map((param) => {
    if (param?.field) {
      return formValue[param?.field];
    }
    return param?.value;
  });

  let target = {};
  paramPlugin.forEach((param, index) => {
    target[param] = ruleParamsValue[index] || defaultValueParams[index];
  });

  return {
    ...target,
    _field_: formItemInput?.label,
    _value_: valueInput,
  };
};

export const extend = (name, config) => {
  const { params, defaultValueParams = [], validate, messageId } = config;

  validator[name] = {
    name: name,
    params,
    defaultValueParams,
    validate({ fieldValue, formValue, formItem, ruleParams }) {
      const target = buildTargetValue({
        formValue,
        defaultValueParams,
        formItemInput: formItem,
        valueInput: fieldValue,
        paramPlugin: params || [],
        ruleParamInput: ruleParams,
      });

      return validate(fieldValue, target);
    },
    messageId,
  };
};
