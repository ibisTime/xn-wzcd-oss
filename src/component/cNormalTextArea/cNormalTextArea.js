import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';
import { noop, isUndefined } from 'common/js/util';
import { formItemLayout } from 'common/js/config';

const { TextArea } = Input;
const FormItem = Form.Item;

export default class CNormalTextArea extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.isPropsChange(nextProps);
  }
  isPropsChange(nextProps) {
    const { field, rules, readonly, getFieldValue, hidden, initVal, inline } = this.props;
    let nowValue = getFieldValue(field);
    let flag = this.prevValue !== nowValue;
    if (isUndefined(this.prevValue) || isUndefined(nowValue)) {
      flag = isUndefined(this.prevValue) && isUndefined(nowValue) ? false : this.prevValue !== nowValue;
    }
    if (flag) {
      this.prevValue = nowValue;
    }
    return nextProps.field !== field || nextProps.rules.length !== rules.length ||
      nextProps.readonly !== readonly || nextProps.hidden !== hidden || flag ||
      nextProps.initVal !== initVal || nextProps.inline !== inline;
  }
  render() {
    const { label, field, rules, readonly, hidden, getFieldDecorator,
      onChange, initVal, inline } = this.props;
    let layoutProps = inline ? {} : formItemLayout;
    return (
      <FormItem key={field} label={label} {...layoutProps} className={hidden ? 'hidden' : ''}>
        {
          readonly ? <div className="readonly-text">{initVal}</div>
            : getFieldDecorator(field, {
                rules,
                initialValue: initVal
              })(<TextArea className="textarea-normalArea" autosize/>)
        }
      </FormItem>
    );
  }
}

CNormalTextArea.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  hidden: PropTypes.bool,
  rules: PropTypes.array,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  initVal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  inline: PropTypes.bool,
  field: PropTypes.string.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired
};

CNormalTextArea.defaultProps = {
  label: 'title',
  field: 'key',
  getFieldDecorator: noop,
  hidden: false,
  inline: false
};
