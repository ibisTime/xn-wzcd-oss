import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Form } from 'antd';
import { noop, isUndefined } from 'common/js/util';
import { formItemLayout, MONTH_FORMAT } from 'common/js/config';
import locale from 'common/js/lib/date-locale';

const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;

export default class CMonth extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.isPropsChange(nextProps);
  }
  isPropsChange(nextProps) {
    const { field, rules, readonly, hidden, getFieldValue, initVal, inline } = this.props;
    let nowValue = getFieldValue(field);
    let flag;
    if (isUndefined(this.prevValue) || isUndefined(nowValue)) {
      flag = isUndefined(this.prevValue) && isUndefined(nowValue) ? false : this.prevValue !== nowValue;
    } else {
      flag = !this.prevValue.isSame(nowValue);
    }
    if (flag) {
      this.prevValue = nowValue;
    }
    return nextProps.field !== field || nextProps.rules.length !== rules.length ||
      nextProps.readonly !== readonly || nextProps.hidden !== hidden || flag ||
      nextProps.initVal !== initVal || nextProps.inline !== inline;
  }
  getDateProps(onChange) {
    let props = {
      locale,
      allowClear: false,
      placeholder: '选择日期',
      format: MONTH_FORMAT
    };
    if (onChange) {
      props.onChange = (date, dateString) => onChange(date, dateString);
    }
    return props;
  }
  render() {
    const { label, field, rules, readonly, hidden, getFieldDecorator,
      initVal, inline, onChange } = this.props;
    let layoutProps = inline ? {} : formItemLayout;
    return (
      <FormItem key={field} {...layoutProps} className={hidden ? 'hidden' : ''} label={label}>
        {
          readonly ? <div className="readonly-text">{initVal}</div>
            : getFieldDecorator(field, {
                rules,
                initialValue: initVal || null
              })(<MonthPicker {...this.getDateProps(onChange)}/>)
        }
      </FormItem>
    );
  }
}

CMonth.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  initVal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  hidden: PropTypes.bool,
  rules: PropTypes.array,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  inline: PropTypes.bool,
  field: PropTypes.string.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired
};

CMonth.defaultProps = {
  label: 'title',
  field: 'key',
  getFieldValue: noop,
  getFieldDecorator: noop,
  hidden: false,
  inline: false
};
