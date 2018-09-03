import React from 'react';
import { Form, Button, Spin, Modal, Carousel, Tooltip, Icon } from 'antd';
import { getDictList } from 'api/dict';
import { getQiniuToken } from 'api/general';
import {
  isUndefined, showSucMsg, showErrMsg, showWarnMsg, getUserId,
  moneyParse, getRules, getRealValue } from 'common/js/util';
import fetch from 'common/js/fetch';
import { UPLOAD_URL, PIC_PREFIX, PIC_BASEURL_L, tailFormItemLayout, tailFormItemLayout1,
  validateFieldsAndScrollOption, DATE_FORMAT, MONTH_FORMAT, DATETIME_FORMAT } from 'common/js/config';
import cityData from 'common/js/lib/city';
import CInput from 'component/cInput/cInput';
import CNormalTextArea from 'component/cNormalTextArea/cNormalTextArea';
import CTextArea from 'component/cTextArea/cTextArea';
import CSelect from 'component/cSelect/cSelect';
import CSearchSelect from 'component/cSearchSelect/cSearchSelect';
import CUpload from 'component/cUpload/cUpload';
import CDate from 'component/cDate/cDate';
import CRangeDate from 'component/cRangeDate/cRangeDate';
import CMonth from 'component/cMonth/cMonth';
import CCitySelect from 'component/cCitySelect/cCitySelect';
import CCheckbox from 'component/cCheckbox/cCheckbox';
import CTreeSelect from 'component/cTreeSelect/cTreeSelect';

const { Item: FormItem } = Form;

export default class DetailUtil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 是否正在加载中
      fetching: true,
      // 下拉框中的数据
      selectData: {},
      // 页面详情查数据
      pageData: {},
      // 页面是否加载完成
      isLoaded: false,
      // 7牛token
      token: ''
    };
    this.fetchList = [];
    this.first = true;
    this.textareas = {};
  }
  componentDidMount() {
    let firstFn = [];
    if (this.options.useData) {
      firstFn = Promise.resolve(this.options.useData);
    } else if (this.options.code && this.options.detailCode) {
      firstFn = this.getDetailInfo();
    } else {
      firstFn = Promise.resolve({});
    }
    let list = this.fetchList.map(f => {
      if (f.data) {
        return Promise.resolve(f.data);
      } else if (f.key) {
        return getDictList({parentKey: f.key, bizType: f.keyCode});
      } else if (f.listCode) {
        let param = f.params || {};
        return fetch(f.listCode, param);
      }
      return Promise.resolve([]);
    });
    list.unshift(getQiniuToken());
    list.unshift(firstFn);
    this.getInfos(list);
  }
  // 获取页面详情数据
  getDetailInfo() {
    let key = this.options.key || 'code';
    let param = {[key]: this.options.code};
    this.options.beforeDetail && this.options.beforeDetail(param);
    return fetch(this.options.detailCode, param);
  }
  // 获取所有页面所需的数据
  getInfos(list) {
    let selectData = {};
    let pageData;
    let token;
    Promise.all(list).then(([...results]) => {
      results.forEach((data, i) => {
        if (i === 0) {
          pageData = data;
        } else if (i === 1) {
          token = data.uploadToken;
        } else {
          selectData[this.fetchList[i - 2].field] = data;
        }
      });
      this.setState({
        pageData,
        token,
        selectData,
        fetching: false
      }, () => {
        if (this.options.code) {
          this.options.fields.forEach(f => {
            if (f.onChange) {
              let initVal = getRealValue({...f, pageData: this.state.pageData});
              f.onChange(initVal);
            }
          });
        }
      });
    }).catch(() => {});
  }
  buildDetail(options) {
    this.options = { ...this.options, ...options };
    const children = [];
    this.options.fields.forEach(f => {
      f.readonly = isUndefined(f.readonly) ? this.options.view : f.readonly;
      if (f.type === 'citySelect') {
        f.cFields = f.cFields || ['province', 'city', 'area'];
      } else if (f.type === 'select' || f.type === 'checkbox' || f.type === 'provSelect') {
        f.keyName = f.keyName || 'dkey';
        f.valueName = f.valueName || 'dvalue';
        if (f.type === 'provSelect') {
          f.keyName = 'value';
          f.valueName = 'label';
          f.data = cityData.map(c => ({
            value: c.value,
            label: c.label
          }));
        }
        this.first && this.fetchList.push(f);
      } else if (f.type === 'treeSelect') {
        this.first && this.fetchList.push(f);
      }
      children.push(this.getItemByType(f.type, f));
    });
    children.push(this.getBtns(this.options.buttons));
    this.first = false;
    return this.getPageComponent(children);
  }
  // 组装页面结构
  getPageComponent = (children) => {
    return (
      <Spin spinning={this.state.fetching}>
        <Form className="detail-form-wrapper" onSubmit={this.handleSubmit}>
          {children}
        </Form>
      </Spin>
    );
  }
  // 根据类型获取控件
  getItemByType(type, item) {
    const { getFieldDecorator } = this.props.form;
    let rules = getRules(item);
    let initVal = getRealValue({...item, pageData: this.state.pageData});
    switch (type) {
      case 'o2m':
        return this.getTableItem(item, initVal, rules, getFieldDecorator);
      case 'provSelect':
      case 'select':
        return item.pageCode
          ? this.getSearchSelectItem(item, initVal, rules, getFieldDecorator)
          : this.getSelectComp(item, initVal, rules, getFieldDecorator);
      case 'date':
      case 'datetime':
        return item.rangedate
          ? this.getRangeDateItem(item, initVal, rules, getFieldDecorator, type === 'datetime')
          : this.getDateItem(item, initVal, rules, getFieldDecorator, type === 'datetime');
      case 'month':
        return this.getMonthItem(item, initVal, rules, getFieldDecorator);
      case 'img':
        return this.getFileComp(item, initVal, rules, getFieldDecorator, true);
      case 'file':
        return this.getFileComp(item, initVal, rules, getFieldDecorator, false);
      case 'textarea':
        return item.normalArea
          ? this.getNormalTextArea(item, initVal, rules, getFieldDecorator)
          : this.getTextArea(item, initVal, rules, getFieldDecorator);
      case 'citySelect':
        return this.getCitySelect(item, initVal, rules, getFieldDecorator);
      case 'checkbox':
        return this.getCheckboxComp(item, initVal, rules, getFieldDecorator);
      case 'treeSelect':
        return this.getTreeSelectComp(item, initVal, rules, getFieldDecorator);
      default:
        return this.getInputComp(item, initVal, rules, getFieldDecorator);
    }
  }
  // 获取输入框类型的控件
  getInputComp(item, initVal, rules, getFieldDecorator) {
    const props = {
      rules,
      initVal,
      getFieldDecorator,
      hidden: item.hidden,
      type: item.type,
      field: item.field,
      label: this.getLabel(item),
      readonly: item.readonly,
      onChange: item.onChange,
      getFieldValue: this.props.form.getFieldValue
    };
    return <CInput key={item.field} {...props} />;
  }
  // 获取textarea的控件
  getNormalTextArea(item, initVal, rules, getFieldDecorator) {
    const props = {
      initVal,
      rules,
      getFieldDecorator,
      hidden: item.hidden,
      field: item.field,
      label: this.getLabel(item),
      readonly: item.readonly,
      onChange: item.onChange,
      getFieldValue: this.props.form.getFieldValue
    };
    return <CNormalTextArea key={item.field} {...props} />;
  }
  // 获取富文本控件
  getTextArea(item, initVal, rules, getFieldDecorator) {
    const props = {
      initVal,
      rules,
      hidden: item.hidden,
      field: item.field,
      label: this.getLabel(item),
      readonly: item.readonly,
      token: this.state.token,
      textareaChange: this.textareaChange,
      isLoaded: !this.code || !this.state.fetching
    };
    return <CTextArea key={item.field} {...props} />;
  }
  // 获取选择框类型的控件
  getSelectComp(item, initVal, rules, getFieldDecorator) {
    const props = {
      initVal,
      rules,
      getFieldDecorator,
      multiple: item.multiple,
      hidden: item.hidden,
      field: item.field,
      label: this.getLabel(item),
      keyName: item.keyName,
      valueName: item.valueName,
      readonly: item.readonly,
      onChange: item.onChange,
      list: this.state.selectData[item.field]
    };
    return <CSelect key={item.field} {...props} />;
  }
  // 获取搜索框类型的控件
  getSearchSelectItem(item, initVal, rules, getFieldDecorator) {
    const props = {
      initVal,
      rules,
      getFieldDecorator,
      code: this.options.code,
      params: item.params,
      pageCode: item.pageCode,
      searchName: item.searchName,
      hidden: item.hidden,
      field: item.field,
      label: this.getLabel(item),
      keyName: item.keyName,
      valueName: item.valueName,
      readonly: item.readonly,
      onChange: item.onChange,
      getFieldValue: this.props.form.getFieldValue,
      isLoaded: !this.code || !this.state.fetching
    };
    return <CSearchSelect key={item.field} {...props} />;
  }
  // 获取文件图片上传类型的控件
  getFileComp(item, initVal, rules, getFieldDecorator, isImg) {
    const props = {
      initVal,
      rules,
      isImg,
      getFieldDecorator,
      getFieldValue: this.props.form.getFieldValue,
      accept: item.accept,
      multiple: item.multiple,
      hidden: item.hidden,
      field: item.field,
      label: this.getLabel(item),
      isSingle: item.isSingle,
      readonly: item.readonly,
      onChange: item.onChange,
      token: this.state.token,
      isLoaded: !this.code || !this.state.fetching
    };
    return <CUpload key={item.field} {...props} />;
  }
  // 获取日期类型的控件
  getDateItem(item, initVal, rules, getFieldDecorator, isTime = false) {
    const props = {
      rules,
      initVal,
      isTime,
      getFieldDecorator,
      hidden: item.hidden,
      field: item.field,
      label: this.getLabel(item),
      readonly: item.readonly,
      onChange: item.onChange,
      getFieldValue: this.props.form.getFieldValue
    };
    return <CDate key={item.field} {...props} />;
  }
  // 获取月份选择控件
  getMonthItem(item, initVal, rules, getFieldDecorator) {
    const props = {
      rules,
      initVal,
      getFieldDecorator,
      hidden: item.hidden,
      field: item.field,
      label: this.getLabel(item),
      readonly: item.readonly,
      onChange: item.onChange,
      getFieldValue: this.props.form.getFieldValue
    };
    return <CMonth key={item.field} {...props} />;
  }
  // 获取范围日期选择类型的控件
  getRangeDateItem(item, initVal, rules, getFieldDecorator, isTime = false) {
    const props = {
      rules,
      initVal,
      isTime,
      getFieldDecorator,
      hidden: item.hidden,
      field: item.field,
      label: this.getLabel(item),
      readonly: item.readonly,
      onChange: item.onChange,
      getFieldValue: this.props.form.getFieldValue
    };
    return <CRangeDate key={item.field} {...props} />;
  }
  // 获取城市选择框控件
  getCitySelect(item, initVal, rules, getFieldDecorator) {
    const props = {
      rules,
      initVal,
      getFieldDecorator,
      hidden: item.hidden,
      field: item.field,
      label: this.getLabel(item),
      readonly: item.readonly,
      onChange: item.onChange,
      getFieldValue: this.props.form.getFieldValue
    };
    return <CCitySelect key={item.field} {...props} />;
  }
  // 获取checkbox控件
  getCheckboxComp(item, initVal, rules, getFieldDecorator) {
    const props = {
      initVal,
      rules,
      getFieldDecorator,
      hidden: item.hidden,
      field: item.field,
      label: this.getLabel(item),
      keyName: item.keyName,
      valueName: item.valueName,
      readonly: item.readonly,
      onChange: item.onChange,
      list: this.state.selectData[item.field],
      getFieldValue: this.props.form.getFieldValue
    };
    return <CCheckbox key={item.field} {...props} />;
  }
  // 获取树型结构控件
  getTreeSelectComp(item, initVal, rules, getFieldDecorator) {
    const props = {
      initVal,
      rules,
      getFieldDecorator,
      hidden: item.hidden,
      field: item.field,
      label: this.getLabel(item),
      keyName: item.keyName,
      valueName: item.valueName,
      readonly: item.readonly,
      onChange: item.onChange,
      bParams: item.bParams,
      disabled: item.disabled,
      isLoaded: !this.code || !this.state.fetching,
      list: this.state.selectData[item.field],
      getFieldValue: this.props.form.getFieldValue
    };
    return <CTreeSelect key={item.field} {...props} />;
  }
  getTableItem(item, initVal, rules, getFieldDecorator) {}
  // 获取页面按钮
  getBtns(buttons) {
    return (
      <FormItem key='btns' {...this.getBtnItemProps()}>
        {buttons.length
          ? buttons.map((b, i) => (
            <Button
              style={{marginRight: 20}}
              key={i}
              type={b.type || ''}
              onClick={() => b.check ? this.customSubmit(b.handler) : this.customSubmitSave(b.handler)}>
              {b.title}
            </Button>
          ))
          : this.options.view
            ? <Button style={{marginLeft: 20}} onClick={this.onCancel}>返回</Button>
            : (
              <div>
                <Button type="primary" htmlType="submit">{this.options.okText || '保存'}</Button>
                <Button style={{marginLeft: 20}}
                        onClick={this.onCancel}>{this.options.cancelText || '返回'}</Button>
              </div>
            )
        }
      </FormItem>
    );
  }
  // 获取label
  getLabel(item) {
    return (
      <span className={item.required && ((item.type === 'textarea' && !item.normalArea) || (item.type === 'o2m')) ? 'ant-form-item-required' : ''}>
        {item.title + (item.single ? '(单)' : '')}
          {item.help ? <Tooltip title={item.help}><Icon type="question-circle-o"/></Tooltip> : null}
      </span>
    );
  }
  // 获取button的props
  getBtnItemProps() {
      return this.options.moreBtns ? tailFormItemLayout1 : tailFormItemLayout;
  }
  // 返回
  onCancel = () => {
    this.options.onCancel ? this.options.onCancel() : this.props.history.go(-1);
  }
  // 富文本框值改变后的回调
  textareaChange = (field, validateStatus, editorContent) => {
    this.textareas[field] = { validateStatus, editorContent };
  }
  // 提交前处理特殊的字段
  beforeSubmit(err, values) {
    if (err) {
      return false;
    }
    let areaKeys = Object.keys(this.textareas);
    if (areaKeys.length && areaKeys.filter(v => this.textareas[v].validateStatus !== 'success').length) {
      return false;
    }
    areaKeys.forEach(v => values[v] = this.textareas[v].editorContent);
    let key = this.options.key || 'code';
    values[key] = isUndefined(values[key]) ? this.props.code || '' : values[key];
    this.options.fields.forEach(v => {
      if (v.amount) {
        values[v.field] = moneyParse(values[v.field], v.amountRate);
      } else if (v.type === 'citySelect') {
        let mid = values[v.field].map(a => a === '全部' ? '' : a);
        v.cFields.forEach((f, i) => {
          values[f] = mid[i];
        });
      } else if (v.type === 'date' || v.type === 'datetime' || v.type === 'month') {
        let format = v.type === 'date' ? DATE_FORMAT : v.type ===
          'month' ? MONTH_FORMAT : DATETIME_FORMAT;
        if (v.rangedate) {
          let bDate = values[v.field] ? [...values[v.field]] : [];
          if (bDate.length) {
            v.rangedate.forEach((d, i) => {
              values[d] = bDate[i].format(format);
            });
          }
        } else {
          values[v.field] = values[v.field] ? values[v.field].format(format) : values[v.field];
        }
      } else if (v.type === 'o2m') {
        values[v.field] = this.props.pageData[v.field];
      } else if (v.type === 'checkbox') {
        if (values[v.field] !== '' && values[v.field].push) {
          values[v.field] = values[v.field].join(',');
        } else {
          values[v.field] = values[v.field] || '';
        }
      } else if (v.multiple) {
        values[v.field] = values[v.field] ? values[v.field].join(',') : '';
      }
    });
    values.updater = values.updater || getUserId();
    console.log(values);
    return values;
  }
  // 保存并校验错误
  customSubmit = (handler) => {
    let fieldsList = [];
    this.options.fields.forEach(v => {
      if (v.items && !v.hidden) {
        v.items.forEach(v1 => {
          v1.forEach(v2 => {
            if (!v2.readonly) {
              fieldsList.push(v2.field);
            }
          });
        });
      } else {
        fieldsList.push(v.field);
      }
    });
    this.props.form.validateFieldsAndScroll(fieldsList, validateFieldsAndScrollOption, (err, values) => {
      let params = this.beforeSubmit(err, values);
      if (!params) {
        return;
      }
      handler && handler(params);
    });
  }
  // 保存，不校验错误
  customSubmitSave = (handler) => {
    let values = this.props.form.getFieldsValue();
    let params = this.beforeSubmit('', values);
    if (!params) {
      return;
    }
    handler && handler(params);
  }
  // 页面提交
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      let params = this.beforeSubmit(err, values);
      if (!params || (this.options.beforeSubmit && !this.options.beforeSubmit(params))) {
        return;
      }
      let code = this.options.code ? this.options.editCode : this.options.addCode;

      fetch(code, params).then((data) => {
        showSucMsg('操作成功');
        this.doFetching();
        if (this.options.onOk) {
          this.options.onOk(data);
        } else {
          setTimeout(() => {
            this.props.history.go(-1);
          }, 1000);
        }
      }).catch(() => this.cancelFetching());
    });
  }
  doFetching() {
    this.setState({ fetching: true });
  }
  cancelFetching() {
    this.setState({ fetching: false });
  }
}
