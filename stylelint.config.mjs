/** @type {import('stylelint').Config}*/
export default {
  extends: ['stylelint-config-standard'],
  ignoreDisables: true,
  rules: {
    'selector-type-no-unknown': true,
    'selector-no-invalid': true,
  },
};
