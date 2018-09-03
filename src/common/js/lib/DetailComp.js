import React from 'react';
import {
    Form, Select, Input, Button, Tooltip, Icon, Spin, Upload,
    Modal, Cascader, DatePicker, Table, Checkbox, TreeSelect,
    Carousel, Row, Col
} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import E from 'wangeditor';
import { getWorkbook } from 'common/js/xlsx-util';
import { getDictList } from 'api/dict';
import { getQiniuToken } from 'api/general';
import {
    formatFile, formatImg, isUndefined, dateTimeFormat, dateFormat, monthFormat,
    tempString, moneyFormat, moneyParse, showSucMsg, showErrMsg, showWarnMsg, getUserId
} from 'common/js/util';
import {
    UPLOAD_URL, PIC_PREFIX, PIC_BASEURL_M, PIC_BASEURL_L, formItemLayout,
    tailFormItemLayout, tailFormItemLayout1
} from '../config';
import fetch from 'common/js/fetch';
import cityData from './city';
import ModalDetail from 'common/js/build-modal-detail';
import locale from './date-locale';

moment.locale('zh-cn');
const {Item: FormItem} = Form;
const {Option} = Select;
const {TextArea} = Input;
const {RangePicker, MonthPicker} = DatePicker;
const { TreeNode } = TreeSelect;
const CheckboxGroup = Checkbox.Group;
const DATE_FORMAT = 'YYYY-MM-DD';
const MONTH_FORMAT = 'YYYY-MM';
const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const imgUploadBtn = (
    <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">上传</div>
    </div>
);
const fileUploadBtn = (
    <Button>
        <Icon type="upload"/> 上传
    </Button>
);
// 详情页基础构造类
export default class DetailComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 用于判断第一次加载页面
        this.first = true;
        // 页面调用该构造类时的入参的初始值
        this.options = {
            fields: [],
            buttons: {},
            code: '',
            view: false
        };
        // 构造类内部使用的state
        this.state = {
            // 图片预览框是否显示
            previewVisible: false,
            // 当前预览的图片
            previewImage: '',
            // 当前预览的图片对应的field
            previewImageField: null,
            // 图片上传需要的token
            token: '',
            // 保存页面里的富文本框
            textareas: {},
            // 下拉框是否显示loading
            fetching: {},
            // o2m类型的表格当前选中的项
            o2mSKeys: {},
            // 用于存储o2m类型里面type为select或checkbox的列表数据
            searchData: {},
            // 控制o2m的弹出框是否显示
            modalVisible: false,
            // 用于存储o2m类型的options
            modalOptions: {},
            // 用于控制搜索框当前只请求一次数据
            selectFetch: {},
            // 用于存储类型为treeSelect的数据
            treeData: {},
            // 用于控制全选按钮当前的状态 {indeterminate, checkAll}
            checkAll: {}
        };
        // 用于判断类型为o2m的是否是第一次请求
        this.o2mFirst = {};
        // 辅助存储页面里的富文本框
        this.textareas = {};
    }
    // 页面第一次渲染完后，初始化字段
    componentDidMount() {
        let _this = this;
        // 对页面的富文本进行处理，添加config
        Object.keys(this.textareas).forEach(v => {
            let elem = document.getElementById(v);
            if (!elem) {
                return;
            }
            _this.textareas[v].editor = new E(elem);
            _this.textareas[v].editor.customConfig.uploadFileName = 'file';
            _this.textareas[v].editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024;
            _this.textareas[v].editor.customConfig.showLinkImg = false;
            _this.textareas[v].editor.customConfig.uploadImgHooks = {
                customInsert: (insertLinkImg, result) => {
                    insertLinkImg(PIC_PREFIX + result.key);
                },
                before: (formdata, xhr, editor, file) => {
                    formdata.append('token', _this.state.token);
                    formdata.append('key', file.name + '_' + new Date().getTime());
                }
            };
            _this.textareas[v].editor.customConfig.uploadImgServer = UPLOAD_URL;
            // 给富文本添加change事件，用于校验必填
            _this.textareas[v].editor.customConfig.onchange = html => {
                let result = {};
                if (!html) {
                    result = {
                        validateStatus: 'error',
                        errorMsg: '必填字段'
                    };
                } else {
                    result = {
                        validateStatus: 'success',
                        errorMsg: ''
                    };
                }
                _this.setState({
                    textareas: {
                        ..._this.state.textareas,
                        [v]: result
                    }
                });
                _this.textareas[v].editorContent = html;
            };
            _this.textareas[v].editor.create();
        });
    }
    // 页面卸载时调用的方法
    componentWillUnmount() {
        this.props.restore();
    }
    // 构建详情页的方法
    buildDetail = (options) => {
        this.options = {
            ...this.options,
            ...options
        };
        if (this.options.useData) {
            this.props.initStates({code: this.options.code, view: this.options.view});
            this.props.setPageData(this.options.useData);
        } else if (this.first) {
            this.options.code && this.options.detailCode && this.getDetailInfo();
            this.props.initStates({code: this.options.code, view: this.options.view});
        }
        const children = [];
        this.options.fields.forEach(f => {
            f.readonly = isUndefined(f.readonly) ? this.options.view : f.readonly;
            if (f.type === 'citySelect') {
                f.cFields = f.cFields || ['province', 'city', 'area'];
            } else if (f.type === 'select' || f.type === 'checkbox' || f.type === 'provSelect') {
                f.keyName = f.keyName || 'dkey';
                f.valueName = f.valueName || 'dvalue';

                // 省选择框
                if (f.type === 'provSelect') {
                    f.keyName = 'value';
                    f.valueName = 'label';
                    f.data = cityData.map(c => ({
                        value: c.value,
                        label: c.label
                    }));
                }
                if (!f.data) {
                    f.data = this.props.selectData[f.field];
                    this.first && this.getSelectData(f);
                } else if (!this.props.selectData[f.field]) {
                    this.props.setSelectData({data: f.data, key: f.field});
                }
            } else if (f.type === 'treeSelect') {
                if (!f.data) {
                    f.data = this.props.selectData[f.field];
                    this.first && this.getTreeSelectData(f);
                } else if (!this.props.selectData[f.field]) {
                    this.props.setSelectData({data: f.data, key: f.field});
                }
            } else if (f.type === 'o2m' && f.listCode && this.first) {
                this.getO2MDatas(f);
            }
            children.push(this.getItemByType(f.type, f));
        });
        children.push(this.getBtns(this.options.buttons));
        this.first = false;
        return this.getPageComponent(children);
    }
    getO2MDatas(item) {
        item.params = item.params || {};
        fetch(item.listCode, item.params).then((data) => {
            this.props.setPageData({
                ...this.props.pageData,
                [item.field]: data
            });
        });
    }
    getBuildDetail = (code) => {
        this.first = true;
        this.buildDetail({ code });
    }

    beforeSubmit(err, values) {
        if (err) {
            return false;
        }
        let areaKeys = Object.keys(this.state.textareas);
        if (areaKeys.length && areaKeys.filter(v => this.state.textareas[v].validateStatus !== 'success').length) {
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
                let format = v.type === 'date' ? DATE_FORMAT : v.type === 'month' ? MONTH_FORMAT : DATETIME_FORMAT;
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
        return values;
    }

    customSubmit = (handler) => {
        let fieldsList = [];
        this.options.fields.map(v => {
            if (v.items && !v.hidden) {
                v.items.map(v1 => {
                    v1.map(v2 => {
                        if (!v2.readonly) {
                            fieldsList.push(v2.field);
                        }
                    });
                });
            } else {
                fieldsList.push(v.field);
            }
        });
        this.props.form.validateFieldsAndScroll(fieldsList, (err, values) => {
            let params = this.beforeSubmit(err, values);
            if (!params) {
                return;
            }
            handler && handler(params);
        });
    }

    customSubmitSave = (handler) => {
        let values = this.props.form.getFieldsValue();
        let params = this.beforeSubmit('', values);
        if (!params) {
            return;
        }
        handler && handler(params);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            let params = this.beforeSubmit(err, values);
            if (!params || (this.options.beforeSubmit && !this.options.beforeSubmit(params))) {
                return;
            }
            let code = this.props.code ? this.options.editCode : this.options.addCode;
            this.props.doFetching();
            fetch(code, params).then((data) => {
                showSucMsg('操作成功');
                this.props.cancelFetching();
                if (this.options.onOk) {
                    this.options.onOk(data);
                } else {
                    setTimeout(() => {
                        this.props.history.go(-1);
                    }, 1000);
                }
            }).catch(this.props.cancelFetching);
        });
    }
    onCancel = () => {
        this.options.onCancel ? this.options.onCancel() : this.props.history.go(-1);
    }
    normFile = (e) => {
        if (e) {
            return e.fileList.map(v => {
                if (v.status === 'done') {
                    return v.key || v.response.key;
                } else if (v.status === 'error') {
                    showErrMsg('文件上传失败');
                }
                return '';
            }).filter(v => v).join('||');
        }
        return '';
    }
    handleCancel = () => this.setState({previewVisible: false})

    handlePreview = (file, previewImageField) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
            previewImageField: previewImageField
        });
        // 切换到点击图片
        if (file.url && previewImageField) {
            let ImageData = this.props.form.getFieldValue(previewImageField).split('||');
            let imgIndex = 0;
            for (let i in ImageData) {
                if (file.key) {
                    if(ImageData[i] === file.key) {
                        imgIndex = i;
                    }
                } else {
                    if(ImageData[i] === file.response.key) {
                        imgIndex = i;
                    }
                }
            }
            setTimeout(() => {
                if (this.carousel) {
                    this.carousel.goTo(imgIndex);
                } else {
                    // 防止100毫秒this.carousel 未加载完成
                    setTimeout(() => {
                        if (this.carousel) {
                            this.carousel.goTo(imgIndex);
                        }
                    }, 100);
                }
            }, 100);
        }
    }
    handleFilePreview = (file) => {
        if (file.status === 'done') {
            let key = file.key || (file.response && file.response.key) || '';
            window.open(formatFile(key), true);
        } else {
            let msg = file.status === 'uploading' ? '文件还未上传完成' : '文件上传失败';
            showErrMsg(msg);
        }
    }

    getToken() {
        if (!this.tokenFetch) {
            this.tokenFetch = true;
            getQiniuToken().then(data => {
                this.setState({token: data.uploadToken});
            }).catch(() => this.tokenFetch = false);
        }
    }

    getUploadData = (file) => {
        return {token: this.state.token};
    }

    getDetailInfo() {
        let key = this.options.key || 'code';
        let param = {[key]: this.options.code};
        this.options.beforeDetail && this.options.beforeDetail(param);
        this.props.doFetching();
        fetch(this.options.detailCode, param).then(data => {
            this.props.cancelFetching();
            let keys = Object.keys(this.props.pageData);
            if (keys.length) {
                this.props.setPageData({
                    ...this.props.pageData,
                    ...data
                });
            } else {
                this.props.setPageData(data);
            }
        }).catch(this.props.cancelFetching);
    }

    setSearchLoading(item, flag) {
        this.setState({
            fetching: {
                ...this.state.fetching,
                [item.field]: flag
            }
        });
    }

    // 获取搜索框数据
    searchSelectChange({keyword, item, start = 1, limit = 20, key}) {
        let selectFetch = this.state.selectFetch;
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        if (!this.props.selectData[item.field]) {
            this.props.setSelectData({data: [], key: item.field});
        }
        this.setSearchLoading(item, true);
        selectFetch[item.field] = false;
        this.setState({
            selectFetch: selectFetch
        });
        this.props.setSelectData({data: [], key: item.field});
        let params = item.params || {};
        params.start = start;
        params.limit = limit;
        key = key || item.searchName || item.keyName || item.field;
        params[key] = keyword;
        this.timeout = setTimeout(() => {
            fetch(item.pageCode, params).then(data => {
                this.setSearchLoading(item, false);
                params.start++;
                let list = this.props.selectData[item.field] || [];
                list = start === 1 ? [] : list;
                this.props.setSelectData({data: list.concat(data.list), key: item.field});
                selectFetch[item.field] = true;
                this.setState({
                    selectFetch: selectFetch
                });
            }).catch(() => {
                !key && this.setSearchLoading(item, false);
                selectFetch[item.field] = false;
                this.setState({
                    selectFetch: selectFetch
                });
            });
        }, 300);
    }

    // 获取select框的数据
    getSelectData(item) {
        if (item.key) {
            getDictList({parentKey: item.key, bizType: item.keyCode}).then(data => {
                this.props.setSelectData({data, key: item.field});
            }).catch(() => {
            });
        } else if (item.listCode) {
            let param = item.params || {};
            fetch(item.listCode, param).then(data => {
                this.props.setSelectData({data, key: item.field});
            }).catch(() => {
            });
        }
    }

    // 获取treeSelect框的数据
    getTreeSelectData(item) {
        let param = item.params || {};
        fetch(item.listCode, param).then(data => {
            this.props.setSelectData({data, key: item.field});
            this.getTree(data, item);
        });
    }
    // 生成tree
    getTree(data, item) {
      let result = {};
      data.forEach(v => {
        v.parentCode = v.parentCode === '0' ? 'ROOT' : v.parentCode;
        if (!result[v.parentCode]) {
          result[v.parentCode] = [];
        }
        let obj = {
            title: v[item.valueName],
            key: v[item.keyName]
        };
        if (item.bParams) {
            item.bParams.forEach(p => {
              obj[p] = v[p];
            });
        }
        result[v.parentCode].push(obj);
      });
      this.getTree[item.field] = result;
      let tree = [];
      if (result['ROOT']) {
          this.getTreeNode(result['ROOT'], tree, item);
      }
      this.setState({
        treeData: {
          ...this.state.treeData,
          [item.field]: tree
        }
      });
    }
    // 生成treeNode
    getTreeNode(arr, children, item) {
      arr.forEach(a => {
        if (this.getTree[item.field][a.key]) {
          a.children = [];
          children.push(a);
          this.getTreeNode(this.getTree[item.field][a.key], a.children, item);
        } else {
          children.push(a);
        }
      });
    }
    // 生成treeSelect结构
    renderTreeNodes = (data, field) => {
      if (!data) return null;
      return data.map((item) => {
        if (item.children) {
          return (
            <TreeNode title={item.title} key={item.key} value={item.key} disabled={field.disabled ? field.disabled(item) : false}>
              {this.renderTreeNodes(item.children, field)}
            </TreeNode>
          );
        }
        return <TreeNode title={item.title} key={item.key} value={item.key} disabled={field.disabled ? field.disabled(item) : false}/>;
      });
    }

    getPageComponent = (children) => {
        const {previewImage, previewVisible, previewImageField} = this.state;
        let imgIndex = 0;
        let imgUrl = '';
        if (previewImageField && this.props.form.getFieldValue(previewImageField).split('||')) {
            let url = this.props.form.getFieldValue(previewImageField).split('||')[0];
            imgUrl = PIC_PREFIX + '/' + url + '?attname=' + url + '.jpg';
        }
        return (
            <Spin spinning={this.props.fetching}>
                <Form className="detail-form-wrapper" onSubmit={this.handleSubmit}>
                    {children}
                </Form>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <div className="previewImg-wrap">
                        <Carousel ref={(carousel => this.carousel = carousel)} afterChange={(a) => {
                            let url = this.props.form.getFieldValue(previewImageField).split('||')[a];
                            imgUrl = PIC_PREFIX + '/' + url + '?attname=' + url + '.jpg';
                        }}>
                            {
                                previewImageField && this.props.form.getFieldValue(previewImageField).split('||').map(v => {
                                    let url = PIC_PREFIX + '/' + v + PIC_BASEURL_L;
                                    return (<div className='img-wrap' key={v}><img alt="图片" style={{width: '100%'}} src={url}/></div>);
                                })
                            }
                        </Carousel>
                    </div>
                    <div className="down-wrap">
                        <Button icon="left" onClick={() => this.carousel.prev()}></Button>
                        <Button style={{marginLeft: 20}} icon="right" onClick={() => this.carousel.next()}></Button>
                        <Button style={{marginLeft: 20}} onClick={() => { location.href = imgUrl; }} icon="download">下载</Button>
                    </div>
                </Modal>
            </Spin>
        );
    }

    getItemByType(type, item) {
        const {getFieldDecorator} = this.props.form;
        let rules = this.getRules(item);
        let initVal = this.getRealValue(item);
        switch (type) {
            case 'o2m':
                return this.getTableItem(item, initVal, rules, getFieldDecorator);
            case 'provSelect':
            case 'select':
                // 解析select的数据，如详情查询返回userId，则根据该字段的配置把它解析成可以读懂的信息
                if (item.pageCode && initVal && this.props.isLoaded && !this.getItemByType[item.field]) {
                    this.getItemByType[item.field] = true;
                    this.searchSelectChange({item, keyword: initVal, key: item.keyName});
                }
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
                return this.getImgComp(item, initVal, rules, getFieldDecorator);
            case 'file':
                return this.getFileComp(item, initVal, rules, getFieldDecorator);
            case 'textarea':
                return item.normalArea
                    ? this.getNormalTextArea(item, initVal, rules, getFieldDecorator)
                    : this.getTextArea(item, initVal, rules, getFieldDecorator);
            case 'citySelect':
                return item.noArea
                    ? this.getNoAreaProvSelect(item, initVal, rules, getFieldDecorator)
                    : this.getCitySelect(item, initVal, rules, getFieldDecorator);
            case 'checkbox':
                return this.getCheckboxComp(item, initVal, rules, getFieldDecorator);
            case 'treeSelect':
                return this.getTreeSelectComp(item, initVal, rules, getFieldDecorator);
            default:
                return this.getInputComp(item, initVal, rules, getFieldDecorator);
        }
    }

    onSelectChange = (selectedRowKeys, key) => {
        this.setState((prevState, props) => ({
            o2mSKeys: {
                ...prevState.o2mSKeys,
                [key]: selectedRowKeys
            }
        }));
    }

    getTableItem(item, initVal, rules, getFieldDecorator) {
        const columns = this.getTableColumns(item);
        const {o2mSKeys} = this.state;
        o2mSKeys[item.field] = o2mSKeys[item.field] || [];
        const dataSource = initVal || [];
        const selectedRowKeys = o2mSKeys[item.field];
        let rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys) => this.onSelectChange(selectedRowKeys, item.field)
        };
        // noSelect为true时 列表不可选
        if (item.options.noSelect) {
            rowSelection = null;
        }
        item.options.key = item.options.rowKey || item.options.key || 'code';
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <FormItem className={item.hidden ? 'hidden' : ''} key={item.field} {...this.getInputItemProps()} label={this.getLabel(item)}>
                {this.getTableBtn(item, hasSelected)}
                <Table {...this.getTableProps(rowSelection, columns, item, dataSource)} />
            </FormItem>
        );
    }

    getTableProps(rowSelection, columns, item, dataSource) {
        const props = {
            columns,
            dataSource,
            rowSelection,
            bordered: true,
            rowKey: record => record[item.options.rowKey || 'code']
        };
        if (item.options.scroll) {
            props.scroll = item.options.scroll;
        }
        return props;
    }

    getTableBtn(item, hasSelected) {
        if (!item.options.buttons) {
            let _this = this;
            item.options.buttons = [{
                title: '确认',
                handler: (params, doFetching, cancelFetching, handleCancel) => {
                    let key = item.options.rowKey || 'code';
                    let arr = _this.props.pageData[item.field] || [];
                    let flag = false;
                    params[key] && arr.forEach((v, i) => {
                        if (v[key] === params[key]) {
                            arr[i] = {
                                ...arr[i],
                                ...params
                            };
                            flag = true;
                        }
                    });
                    let itemParams = flag ? arr : [...arr, params];
                    params[key] = isUndefined(params[key]) ? new Date().getTime() : params[key];
                    _this.props.setPageData({
                        ..._this.props.pageData,
                        [item.field]: itemParams
                    });
                    setTimeout(() => {
                        _this.setState((prevState, props) => ({
                            o2mSKeys: {...prevState.o2mSKeys, [item.field]: [params[key]]}
                        }));
                    }, 300);
                    handleCancel();
                },
                check: true
            }];
        }
        return (
            <div>
                {item.options.add && !item.readonly ? <Button
                    type="primary"
                    style={{marginRight: 20, marginBottom: 16}}
                    onClick={() => {
                        this.setState({
                            modalOptions: {
                                ...item.options,
                                useData: null,
                                view: false,
                                code: null
                            }
                        }, () => {
                            this.setState({
                                modalVisible: true
                            });
                        });
                    }}
                >新增</Button> : null}
                {item.options.edit && !item.readonly ? <Button
                    type="primary"
                    disabled={!hasSelected}
                    style={{marginRight: 20, marginBottom: 16}}
                    onClick={() => {
                        let keys = this.state.o2mSKeys[item.field];
                        if (!keys.length || keys.length > 1) {
                            showWarnMsg('请选择一条记录');
                            return;
                        }
                        let key = keys[0];
                        let keyName = item.options.rowKey || 'code';
                        let useData = this.props.pageData[item.field].filter((v) => v[keyName] === key)[0];
                        this.setState({
                            modalOptions: {
                                ...item.options,
                                code: key,
                                view: false,
                                useData
                            }
                        }, () => {
                            this.setState({
                                modalVisible: true
                            });
                        });
                    }}
                >修改</Button> : null}
                {item.options.delete && !item.readonly ? <Button
                    type="primary"
                    disabled={!hasSelected}
                    style={{marginRight: 20, marginBottom: 16}}
                    onClick={() => {
                        let keys = this.state.o2mSKeys[item.field];
                        if (!keys.length || keys.length > 1) {
                            showWarnMsg('请选择一条记录');
                            return;
                        }
                        let key = keys[0];
                        let keyName = item.options.rowKey || 'code';
                        let deleteItem = this.props.pageData[item.field].filter((v) => v[keyName] === key)[0];
                        let arr = this.props.pageData[item.field].filter((v) => v[keyName] !== key);
                        this.props.setPageData({
                            ...this.props.pageData,
                            [item.field]: arr
                        });
                        this.setState((prevState, props) => ({
                            o2mSKeys: {...prevState.o2mSKeys, [item.field]: []}
                        }));
                        setTimeout(() => {
                          item.afterDelete && item.afterDelete(key, deleteItem);
                        }, 100);
                    }}
                >删除</Button> : null}
                {item.options.detail ? <Button
                    type="primary"
                    disabled={!hasSelected}
                    style={{marginRight: 20, marginBottom: 16}}
                    onClick={() => {
                        let keys = this.state.o2mSKeys[item.field];
                        if (!keys.length || keys.length > 1) {
                            showWarnMsg('请选择一条记录');
                            return;
                        }
                        let key = keys[0];
                        let keyName = item.options.rowKey || 'code';
                        let useData = this.props.pageData[item.field].filter((v) => v[keyName] === key)[0];
                        this.setState({
                            modalOptions: {
                                ...item.options,
                                code: key,
                                view: true,
                                useData
                            }
                        }, () => {
                            this.setState({
                                modalVisible: true
                            });
                        });
                    }}
                >详情</Button> : null}
                {item.options.export ? <Button
                    type="primary"
                    style={{marginRight: 20, marginBottom: 16}}
                    onClick={() => {
                        let arr = this.props.pageData[item.field];
                        let titles = [];
                        let bodys = [];
                        arr.forEach((d, i) => {
                            let temp = [];
                            item.options.fields.forEach(f => {
                                if (i === 0) {
                                    titles.push(f.title);
                                }
                                let value = '';
                                if (f.render) {
                                    value = f.render(d[f.field], d);
                                } else if (f.amount) {
                                    value = moneyFormat(d[f.field]);
                                } else if (f.type === 'date' || f.type === 'datetime') {
                                    value = f.type === 'date' ? dateFormat(d[f.field]) : dateTimeFormat(d[f.field]);
                                } else {
                                    value = d[f.field];
                                }
                                temp.push(value);
                            });
                            bodys.push(temp);
                        });
                        let result = [titles].concat(bodys);
                        const wb = getWorkbook();
                        wb.getSheet(this.state.data, 'SheetJS');
                        wb.downloadXls(item.title);
                    }}
                >导出</Button> : null}
                {item.options.check ? <Button
                    type="primary"
                    disabled={!hasSelected}
                    style={{marginRight: 20, marginBottom: 16}}
                    onClick={() => {
                        let keys = this.state.o2mSKeys[item.field];
                        if (!keys.length || keys.length > 1) {
                            showWarnMsg('请选择一条记录');
                            return;
                        }
                        let key = keys[0];
                        let keyName = item.options.rowKey || 'code';
                        let useData = this.props.pageData[item.field].filter((v) => v[keyName] === key)[0];
                        this.setState({
                            modalOptions: {
                                ...item.options,
                                code: key,
                                view: true,
                                useData
                            }
                        }, () => {
                            this.setState({
                                modalVisible: true
                            });
                        });
                    }}
                >{item.options.checkName}</Button> : null}
            </div>
        );
    }

    getTableColumns(item) {
        const columns = item.options.fields;
        let first = this.o2mFirst[item.field];
        first = isUndefined(first) ? true : first;
        let result = [];
        columns.forEach(f => {
            let obj = {
                title: f.title,
                dataIndex: f.field
            };
            if (f.type === 'datetime' && !f.render) {
                obj.render = (v) => {
                    return f.nowrap ? <span style={{whiteSpace: 'nowrap'}}>{dateTimeFormat(v)}</span> : dateTimeFormat(v);
                };
            } else if (f.type === 'date' && !f.render) {
                obj.render = (v) => {
                    return f.nowrap ? <span style={{whiteSpace: 'nowrap'}}>{dateFormat(v)}</span> : dateFormat(v);
                };
            } else if (f.type === 'month' && !f.render) {
                obj.render = (v) => {
                    return f.nowrap ? <span style={{whiteSpace: 'nowrap'}}>{monthFormat(v)}</span> : monthFormat(v);
                };
            } else if (f.type === 'select' || f.type === 'checkbox') {
                f.keyName = f.keyName || 'dkey';
                f.valueName = f.valueName || 'dvalue';
                if (!f.data) {
                    f.data = this.state.searchData[f.field];
                    first && this.getO2MSelectData(f);
                } else if (!this.state.searchData[f.field]) {
                    this.setSearchData({data: f.data, key: f.field});
                }
                if (f.type === 'select') {
                    // if (this.props.code && f.pageC) {
                    if (f.render) {
                        obj.render = f.render;
                    } else {
                        obj.render = (value) => {
                            let val = '';
                            if (value && f.data) {
                                let item = f.data.find(v => v[f.keyName] === value);
                                val = item
                                    ? item[f.valueName]
                                        ? item[f.valueName]
                                        : tempString(f.valueName, item)
                                    : '';
                            }
                            return f.nowrap ? <span style={{whiteSpace: 'nowrap'}}>{val}</span> : val;
                        };
                    }
                } else {
                    obj.render = (value) => {
                        let val = '';
                        if (value && f.data) {
                            val = value.split(',').map(v => f.data.find(d => d[f.keyName] === v)[f.valueName]).join('、');
                        }
                        return f.nowrap ? <span style={{whiteSpace: 'nowrap'}}>{val}</span> : val;
                    };
                }
            } else if (f.type === 'img') {
                if(f.single) {
                    obj.render = (value) => value ? <img style={{maxWidth: 25, maxHeight: 25}} src={PIC_PREFIX + value}/> : '';
                } else {
                    obj.render = (value) => {
                        if (value) {
                            let imgStr = value.split('||');
                            return (<div>
                                { imgStr.map(pic => (
                                    <img key={pic} style={{maxWidth: 25, maxHeight: 25, marginRight: 10}} src={PIC_PREFIX + pic}/>
                                ))}
                            </div>);
                        }
                        return '';
                    };
                }
            }
            if (f.amount && !f.render) {
                obj.render = (v, d) => <span style={{whiteSpace: 'nowrap'}}>{moneyFormat(v, d)}</span>;
            }
            if (!obj.render) {
                if (f.render) {
                    obj.render = f.render;
                } else {
                    obj.render = (v) => f.nowrap ? <span style={{whiteSpace: 'nowrap'}}>{v}</span> : v;
                }
            }

            if (f.fixed) {
                obj.fixed = f.fixed;
                obj.width = f.width || 100;
            }
            if (!f.noVisible) {
                result.push(obj);
            }
        });
        this.o2mFirst[item.field] = false;
        return result;
    }

    // 获取select框的数据
    getO2MSelectData(item) {
        if (item.key) {
            getDictList({parentKey: item.key, bizType: item.keyCode}).then(data => {
                this.setSearchData({data, key: item.field});
            }).catch(() => {
            });
        } else if (item.listCode) {
            let param = item.params || {};
            fetch(item.listCode, param).then(data => {
                this.setSearchData({data, key: item.field});
            }).catch(() => {
            });
        }
    }

    setSearchData({data, key}) {
        this.setState((prevState, props) => ({
            searchData: {...prevState.searchData, [key]: data}
        }));
    }

    // 获取treeSelect
    getTreeSelectComp(item, initVal, rules, getFieldDecorator) {
        return (
            <FormItem
                className={item.hidden ? 'hidden' : ''}
                key={item.field}
                {...this.getInputItemProps()}
                label={this.getLabel(item)}>
                {
                    item.readonly ? <div className="readonly-text">{initVal}</div>
                        : getFieldDecorator(item.field, {
                            rules,
                            initialValue: initVal
                        })(
                            <TreeSelect
                              showSearch
                              style={{ width: '100%' }}
                              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                              placeholder="请选择"
                              allowClear
                              treeDefaultExpandAll
                            >
                                {this.renderTreeNodes(this.state.treeData[item.field], item)}
                            </TreeSelect>
                        )
                }
            </FormItem>
        );
    }

    getDateItem(item, initVal, rules, getFieldDecorator, isTime = false) {
        let format = isTime ? DATETIME_FORMAT : DATE_FORMAT;
        let places = isTime ? '选择时间' : '选择日期';
        return (
            <FormItem className={item.hidden ? 'hidden' : ''} key={item.field} {...this.getInputItemProps()} label={this.getLabel(item)}>
                {
                    item.readonly ? <div className="readonly-text">{initVal}</div>
                        : getFieldDecorator(item.field, {
                            rules,
                            initialValue: initVal || null
                        })(
                        <DatePicker
                            allowClear={false}
                            locale={locale}
                            placeholder={places}
                            format={format}
                            showTime={isTime}/>
                        )
                }
            </FormItem>
        );
    }

    getMonthItem(item, initVal, rules, getFieldDecorator) {
        let format = MONTH_FORMAT;
        let places = '选择日期';
        return (
            <FormItem className={item.hidden ? 'hidden' : ''} key={item.field} {...this.getInputItemProps()} label={this.getLabel(item)}>
                {
                    item.readonly ? <div className="readonly-text">{initVal}</div>
                        : getFieldDecorator(item.field, {
                            rules,
                            initialValue: initVal || null
                        })(
                        <MonthPicker
                            allowClear={false}
                            locale={locale}
                            placeholder={places}
                            format={format}
                            showTime={false}/>
                        )
                }
            </FormItem>
        );
    }

    getRangeDateItem(item, initVal, rules, getFieldDecorator, isTime = false) {
        let format = isTime ? DATETIME_FORMAT : DATE_FORMAT;
        let places = isTime ? ['开始时间', '结束时间'] : ['开始日期', '结束日期'];
        let props = {
            allowClear: false,
            locale: locale,
            placeholder: places,
            ranges: {'今天': [moment(), moment()], '本月': [moment(), moment().endOf('month')]},
            format: format,
            showTime: isTime
        };
        if (item.onChange) {
            props.onChange = (dates, dateString) => {
                item.onChange(dates, dateString, this.props);
            };
        }
        return (
            <FormItem className={item.hidden ? 'hidden' : ''} key={item.field} {...this.getInputItemProps()} label={this.getLabel(item)}>
                {
                    item.readonly ? <div className="readonly-text">{initVal}</div>
                        : getFieldDecorator(item.field, {
                            rules,
                            initialValue: initVal || null
                        })(
                        <RangePicker {...props} />
                        )
                }
            </FormItem>
        );
    }

    getSearchSelectItem(item, initVal, rules, getFieldDecorator) {
        let data;
        let value;
        if (item.readonly && item.data) {
            if (item.multiple) {
                value = initVal.map(i => {
                  let obj = item.data.find(v => v[item.keyName] === i);
                  return obj[item.valueName] || tempString(item.valueName, obj) || '';
                }).join('、');
            } else {
                value = item.data.filter(v => v[item.keyName] === initVal);
                value = value && value.length
                  ? value[0][item.valueName] || tempString(item.valueName, value[0])
                  : initVal;
            }
        }
        // let data;
        // if (item.readonly && item.data) {
        //     data = item.data.filter(v => v[item.keyName] === initVal);
        // }
        // let value = '';
        // if (initVal) {
        //     value = initVal;
        // }
        return (
            <FormItem key={item.field} {...this.getInputItemProps()} label={this.getLabel(item)}>
                {
                    item.readonly ? <div
                            className="readonly-text">{data && data.length ? data[0][item.valueName] || tempString(item.valueName, data[0]) : value}</div>
                        : getFieldDecorator(item.field, {
                            rules,
                            initialValue: item.data || initVal ? initVal : ''
                        })(
                        <Select
                            allowClear
                            mode="combobox"
                            showArrow={false}
                            filterOption={false}
                            onSearch={v => this.searchSelectChange({item, keyword: v})}
                            optionLabelProp="children"
                            notFoundContent={this.state.fetching[item.field] ? <Spin size="small"/> : '暂无数据'}
                            placeholder="请输入关键字搜索"
                            onChange={v => {
                                if (item.onChange && this.state.selectFetch[item.field]) {
                                    item.onChange(v, this.props.selectData[item.field] ? this.props.selectData[item.field].find(v1 => v1.code === v) : {}, this.props);
                                }
                            }}
                            {...this.getSelectProps(item, initVal)}>
                            {item.data ? item.data.map(d => (
                                <Option key={d[item.keyName]} value={d[item.keyName]}>
                                    {d[item.valueName] ? d[item.valueName] : tempString(item.valueName, d)}
                                </Option>
                            )) : null}
                        </Select>
                        )
                }
            </FormItem>
        );
    }

    // 省市区选择
    getCitySelect(item, initVal, rules, getFieldDecorator) {
        let cData = [];
        // 省市选择框
        cityData.map(p => {
            let city = [];
            p.children.map(c => {
                let area = [];
                c.children && c.children.map(a => {
                    area.push({
                        value: a.value,
                        label: a.label
                    });
                });
                city.push({
                    value: c.value,
                    label: c.label,
                    children: area
                });
            });

            cData.push({
                value: p.value,
                label: p.label,
                children: city
            });
        });
        return (
            <FormItem className={item.hidden ? 'hidden' : ''} key={item.field} {...this.getInputItemProps()} label={this.getLabel(item)}>
                {
                    item.readonly ? <div className="readonly-text">{initVal}</div>
                        : getFieldDecorator(item.field, {
                            rules,
                            initialValue: initVal
                        })(<Cascader placeholder="请选择" options={cityData}/>)
                }
            </FormItem>
        );
    }

    // 省市选择
    getNoAreaProvSelect(item, initVal, rules, getFieldDecorator) {
        let cData = [];
        // 省市选择框
        cityData.map(p => {
            let city = [];
            p.children.map(c => {
                city.push({
                    value: c.value,
                    label: c.label
                });
            });

            cData.push({
                value: p.value,
                label: p.label,
                children: city
            });
        });
        return (
            <FormItem className={item.hidden ? 'hidden' : ''} key={item.field} {...this.getInputItemProps()} label={this.getLabel(item)}>
                {
                    item.readonly ? <div className="readonly-text">{initVal}</div>
                        : getFieldDecorator(item.field, {
                            rules,
                            initialValue: initVal
                        })(<Cascader placeholder="请选择" options={cData}/>)
                }
            </FormItem>
        );
    }

    getCheckboxComp(item, initVal, rules, getFieldDecorator) {
        // 初始化checkAll的值
        if (item.checkAll) {
          if (!this.state.checkAll[item.field]) {
            this.setState({
              checkAll: {
                  ...this.state.checkAll,
                  [item.field]: { indeterminate: false, checkAll: false }
              }
            });
          } else if (item.data && item.data.length && initVal && initVal.length) {
            let checkAll = this.state.checkAll[item.field].checkAll;
            if (initVal.length === item.data.length && !this.getCheckboxComp[item.field] && !checkAll) {
              this.getCheckboxComp[item.field] = true;
              this.setState({
                checkAll: {
                    ...this.state.checkAll,
                    [item.field]: { indeterminate: false, checkAll: true }
                }
              });
            }
          }
        }
        let indeterminate = this.state.checkAll[item.field] ? this.state.checkAll[item.field].indeterminate : false;
        let checkAll = this.state.checkAll[item.field] ? this.state.checkAll[item.field].checkAll : false;
        let val = '';
        // 生成只读时需要显示的数据
        if (item.readonly && initVal && item.data && item.data.length) {
            val = initVal.map(v => item.data.find(d => d[item.keyName] === v)[item.valueName]).join('、');
        }
        return (
            <FormItem className={item.hidden ? 'hidden' : ''} key={item.field} {...this.getInputItemProps()} label={this.getLabel(item)}>
                {
                    item.readonly ? <div className='readonly-text'>{val}</div>
                        : (
                          <div>
                            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                                <Checkbox
                                    indeterminate={indeterminate}
                                    onChange={(e) => this.onCheckAllChange(e, item)}
                                    checked={checkAll}
                                >全选</Checkbox>
                            </div>
                            <br/>
                            {
                                getFieldDecorator(item.field, {
                                    rules,
                                    initialValue: initVal
                                })(
                                  <CheckboxGroup onChange={(list) => this.checkboxChange(list, item)} disabled={item.readonly}>
                                      {item.data && item.data.length
                                          ? <Row>{item.data.map(d => <Col key={d[item.keyName]} span={6}><Checkbox value={d[item.keyName]}>{d[item.valueName]}</Checkbox></Col>)}</Row>
                                          : null}
                                  </CheckboxGroup>
                                )
                            }
                            </div>
                        )
                }
            </FormItem>
        );
    }
    checkboxChange = (checkedList, item) => {
        let allList = this.props.selectData[item.field].map(v => v[item.keyName]);
        this.setState({
            checkAll: {
                ...this.state.checkAll,
                [item.field]: {
                    indeterminate: !!checkedList.length && (checkedList.length < allList.length),
                    checkAll: checkedList.length === allList.length
                }
            }
        });
    }
    getSelectComp(item, initVal, rules, getFieldDecorator) {
        let data;
        let value;
        if (item.readonly && item.data) {
            if (item.multiple) {
                value = initVal.map(i => {
                  let obj = item.data.find(v => v[item.keyName] === i);
                  return obj[item.valueName] || tempString(item.valueName, obj) || '';
                }).join('、');
            } else {
                value = item.data.filter(v => v[item.keyName] === initVal);
                value = value && value.length
                  ? value[0][item.valueName] || tempString(item.valueName, value[0])
                  : initVal;
            }
        }
        // if (item.initValue && item.data && item.data.length && isUndefined(initVal)) {
        //     initVal = item.data[0][item.keyName];
        // }
        // let value = isUndefined(initVal) ? '' : initVal;
        return (
            <FormItem className={item.hidden ? 'hidden' : ''} key={item.field} {...this.getInputItemProps()}
                      label={this.getLabel(item)}>
                {
                    item.readonly ? <div
                            className="readonly-text">{value}</div>
                        : getFieldDecorator(item.field, {
                            rules,
                            initialValue: initVal || ''
                        })(
                        <Select {...this.getSelectProps(item, initVal)}>
                            {item.data ? item.data.map(d => (
                                <Option key={d[item.keyName]} value={d[item.keyName]}>
                                    {d[item.valueName] ? d[item.valueName] : tempString(item.valueName, d)}
                                </Option>
                            )) : null}
                        </Select>
                        )
                }
            </FormItem>
        );
    }

    getInputComp(item, initVal, rules, getFieldDecorator) {
        let props = {
            type: item.type ? item.type : item.hidden ? 'hidden' : 'text'
        };
        if (item.onChange) {
            props.onChange = (e) => {
                const {value} = e.target;
                item.onChange(value, this.props);
            };
        }
        return (
            <FormItem className={item.hidden ? 'hidden' : ''}
                key={item.field}
                {...this.getInputItemProps()}
                label={item.title ? this.getLabel(item) : ''}>
                {item.title ? '' : <samp>&nbsp;</samp>}
                {
                    item.readonly ? <div className="readonly-text">{initVal}</div>
                        : getFieldDecorator(item.field, {
                            rules,
                            initialValue: initVal
                        })(<Input {...props}/>)
                }
            </FormItem>
        );
    }

    getFileComp(item, initVal, rules, getFieldDecorator, isImg) {
        let initValue = this.getFileInitVal(initVal, isImg);
        return (
            item.hidden ? null : (
                <FormItem key={item.field} {...this.getInputItemProps()} label={this.getLabel(item)}>
                    {getFieldDecorator(item.field, {
                        rules,
                        initialValue: initVal,
                        getValueFromEvent: this.normFile
                    })(
                        this.options.code && !this.props.isLoaded
                            ? <div></div>
                            : (
                                <Upload {...this.getUploadProps(item, initValue, isImg)}>
                                    {this.getUploadBtn(item, isImg)}
                                </Upload>
                            )
                    )}
                </FormItem>
            )
        );
    }

    getImgComp(item, initVal, rules, getFieldDecorator) {
        return this.getFileComp(item, initVal, rules, getFieldDecorator, true);
    }

    getUploadProps(item, initValue, isImg) {
        const commProps = {
            action: UPLOAD_URL,
            multiple: !item.single,
            defaultFileList: initValue,
            data: this.getUploadData,
            showUploadList: {
                showPreviewIcon: true,
                showRemoveIcon: !item.readonly
            }
        };
        const fileProps = {
            ...commProps,
            onChange: ({fileList}) => this.setUploadFileUrl(fileList),
            onPreview: this.handleFilePreview
        };
        const imgProps = {
            ...commProps,
            onChange: ({file, fileList, event}) => {
                this.setUploadFileUrl(fileList, true, item.onChange);
            },
            onPreview: (file) => {
                this.handlePreview(file, item.field);
            },
            listType: 'picture-card',
            accept: 'image/*'
        };
        if (item.accept) {
            fileProps.accept = item.accept;
            imgProps.accept = item.accept;
        }
        return isImg ? imgProps : fileProps;
    }

    getSelectProps(item, initVal) {
        const props = {
            mode: item.multiple ? 'multiple' : '',
            showSearch: true,
            allowClear: true,
            optionFilterProp: 'children',
            filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
            style: {width: '100%'},
            placeholder: '请选择'
        };
        if (item.onChange) {
            props.onChange = (v) => {
                item.onChange(v, this.props.selectData[item.field] ? this.props.selectData[item.field].find(v1 => v1[item.keyName] === v) : {}, this.props);
            };
            if (this.props.isLoaded && !this.getSelectProps[item.field]) {
                if (!isUndefined(initVal)) {
                    this.getSelectProps[item.field] = true;
                    setTimeout(() => {
                      props.onChange(initVal);
                    }, 100);
                }
            }
        }
        return props;
    }

    getNormalTextArea(item, initVal, rules, getFieldDecorator) {
        return (
            <FormItem
                key={item.field}
                {...this.getInputItemProps()}
                label={this.getLabel(item)}>
                {
                    item.readonly ? <div className="readonly-text">{initVal}</div>
                        : getFieldDecorator(item.field, {
                            rules,
                            initialValue: initVal
                        })(<TextArea className="textarea-normalArea" autosize/>)
                }
            </FormItem>
        );
    }

    getTextArea(item, initVal, rules, getFieldDecorator) {
        const {token} = this.state;
        !token && this.getToken();
        this.textareas[item.field] = this.textareas[item.field] || {};
        if (this.options.code && initVal && !this.textareas[item.field].editorContent &&
            this.textareas[item.field].editor && !this.textareas[item.field].initFlag) {
            this.textareas[item.field].initFlag = true;
            this.textareas[item.field].editorContent = initVal;
            this.textareas[item.field].editor.txt.html(initVal);
        }
        if (!this.state.textareas[item.field]) {
            this.setState({
                textareas: {
                    ...this.state.textareas,
                    [item.field]: {
                        validateStatus: 'success',
                        errorMsg: null
                    }
                }
            });
        }
        let areaState = this.state.textareas[item.field] || {
            validateStatus: 'success',
            errorMsg: null
        };
        return (
            <FormItem
                key={item.field}
                {...this.getInputItemProps()}
                validateStatus={areaState.validateStatus}
                help={areaState.errorMsg}
                label={this.getLabel(item)}>
                {
                    item.readonly ? <div className="readonly-text" dangerouslySetInnerHTML={{__html: initVal}}></div>
                        : <div id={item.field}></div>
                }
            </FormItem>
        );
    }

    getFileInitVal(initVal, isImg) {
        const {token} = this.state;
        !token && this.getToken();
        let initValue = [];
        if (initVal) {
            initValue = initVal.split('||').map(key => ({
                key,
                uid: key,
                name: key,
                status: 'done',
                url: isImg ? formatImg(key) : formatFile(key),
                thumbUrl: isImg ? formatImg(key) : formatFile(key)
            }));
        }
        return initValue;
    }

    // 获取修改、详情页每个输入框的真实值
    getRealValue(item, info) {
        info = info || this.props.pageData;
        let result = info[item.field];
        try {
            if (item._keys) {
                result = this.getValFromKeys(item);
            } else if (!isUndefined(item.value) && !result) {
                result = item.value;
            }
            if (item.type === 'citySelect') {
                result = this.getCityVal(item, result);
            } else if (item.type === 'date' || item.type === 'datetime' || item.type === 'month') {
                result = this.getRealDateVal(item, result);
            } else if (item.type === 'checkbox') {
                result = this.getRealCheckboxVal(item, result);
            } else if (item.multiple) {
                result = result ? result.split(',') : [];
            }
            if (item.formatter) {
                result = item.formatter(result, this.props.pageData);
            } else if (item.amount) {
                result = isUndefined(result) ? '' : moneyFormat(result, item.amountRate);
            }
        } catch (e) {
        }
        return isUndefined(result) ? '' : result; // this.options.view ? '' :
    }

    getRealCheckboxVal(item, result) {
        return result ? result.split(',') : [];
    }

    getRealDateVal(item, result) {
        let format = item.type === 'date' ? DATE_FORMAT : item.type === 'month' ? MONTH_FORMAT : DATETIME_FORMAT;
        let format1 = item.type === 'date' ? dateFormat : item.type === 'month' ? monthFormat : dateTimeFormat;
        let readonly = this.options.view || item.readonly;
        if (readonly) {
            return item.rangedate
                ? this.getRangeDateVal(item, result, format, format1, readonly)
                : result ? format1(result, format) : null;
        }
        return item.rangedate
            ? this.getRangeDateVal(item, result, format, format1)
            : result ? moment(dateTimeFormat(result), format) : null;
    }

    getRangeDateVal(item, result, format, fn, readonly) {
        let dates = item._keys && result ? result : this.props.pageData;
        let start = dates[item.rangedate[0]];
        let end = dates[item.rangedate[1]];
        if (readonly) {
            return start ? fn(start, format) + '~' + fn(end, format) : null;
        }
        return start ? [moment(fn(start), format), moment(fn(end), format)] : null;
    }

    getCityVal(item, result) {
        let cData = item._keys && result ? result : this.props.pageData;
        let prov = cData[item.cFields[0]];
        if (item.noArea) {
            let city = cData[item.cFields[1]] ? cData[item.cFields[1]] : '全部';
            result = [prov, city];
        } else if (prov) {
            let city = cData[item.cFields[1]] ? cData[item.cFields[1]] : '全部';
            let area = cData[item.cFields[2]] ? cData[item.cFields[2]] : '全部';
            result = [prov, city, area];
        } else {
            result = [];
        }
        return result;
    }

    getValFromKeys(item) {
        let _value = {...this.props.pageData};
        let emptyObj = {};
        item._keys.forEach(key => {
            _value = isUndefined(_value[key]) ? emptyObj : _value[key];
        });
        return (item.type === 'img' || item.type === 'file') && _value === emptyObj ? '' : _value;
    }

    getUploadBtn(item, isImg) {
        let btn = isImg ? imgUploadBtn : fileUploadBtn;
        return item.readonly
            ? null
            : item.single
                ? this.props.form.getFieldValue(item.field)
                    ? null : btn
                : btn;
    }

    setUploadFileUrl(fileList, isImg, callback) {
        let format = isImg ? formatImg : formatFile;
        fileList.forEach(f => {
            if (!f.url && f.status === 'done' && f.response) {
                f.url = format(f.response.key);
                callback && callback(f.response.key, this.props);
            }
        });
    }

    getLabel(item) {
        return (
            <span
            className={item.required && ((item.type === 'textarea' && !item.normalArea) || (item.type === 'o2m')) ? 'ant-form-item-required' : ''}>
        {item.title + (item.single ? '(单)' : '')}
            {item.help
                ? <Tooltip title={item.help}>
                    <Icon type="question-circle-o"/>
                </Tooltip> : null}
            </span>
        );
    }

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

    getBtnItemProps() {
        return this.options.moreBtns ? tailFormItemLayout1 : tailFormItemLayout;
    }

    getInputItemProps() {
        return formItemLayout;
    }

    getRules(item) {
        let rules = [];
        if (item.required && !item.hidden) {
            rules.push({
                required: true,
                message: '必填字段'
            });
        }
        if (item.email) {
            rules.push({
                type: 'email',
                message: '请输入正确格式的电子邮件'
            });
        }
        if (item.mobile) {
            rules.push({
                pattern: /^1[3|4|5|6|7|8|9]\d{9}$/,
                message: '手机格式不对'
            });
        }
        if (item['Z+']) {
            rules.push({
                pattern: /^[1-9]\d*$/,
                message: '请输入正整数'
            });
        }
        if (item.number) {
            rules.push({
                pattern: /^-?\d+(\.\d+)?$/,
                message: '请输入合法的数字'
            });
        }
        if (item.positive) {
            rules.push({
                pattern: /^\d+(\.\d+)?$/,
                message: '请输入正数'
            });
        }
        if (item.integer) {
            rules.push({
                pattern: /^-?\d+$/,
                message: '请输入整数'
            });
        }
        if (item.idCard) {
            rules.push({
                pattern: /^([1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3})|([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x))$/,
                message: '请输入合法的身份证号'
            });
        }
        if (item.bankCard) {
            rules.push({
                pattern: /^([1-9]{1})(\d{13,19})$/,
                message: '请输入合法的银行卡号'
            });
        }
        if (item.amount) {
            rules.push({
                pattern: /(^[1-9](,\d{3}|[0-9])*(\.\d{1,2})?$)|([0])/,
                message: '金额必须>=0，且小数点后最多2位'
            });
        }

        if (item.min) {
            rules.push({
                validator: (rule, value, callback) => {
                    let reg = /^-?\d+(\.\d+)?$/.test(value);
                    if (reg && value && value < item.min) {
                        let error = `请输入一个最小为${item.min}的值`;
                        callback(error);
                    } else {
                        callback();
                    }
                }
            });
        }

        if (item.max) {
            rules.push({
                validator: (rule, value, callback) => {
                    let reg = /^-?\d+(\.\d+)?$/.test(value);
                    if (reg && value && value > item.max) {
                        let error = `请输入一个最大为${item.max}的值`;
                        callback(error);
                    } else {
                        callback();
                    }
                }
            });
        }

        if (item.maxlength) {
            rules.push({
                min: 1,
                max: item.maxlength,
                message: `请输入一个长度最多是${item.maxlength}的字符串`
            });
        }
        return rules;
    }
    // 全选按钮的change事件
    onCheckAllChange(e, item) {
        let allList = this.props.selectData[item.field].map(v => v[item.keyName]);
        this.setState({
            checkAll: {
                ...this.state.checkAll,
                [item.field]: {
                    indeterminate: false,
                    checkAll: e.target.checked
                }
            }
        });
        this.props.form.setFieldsValue({
          [item.field]: e.target.checked ? allList : []
        });
    }
}
