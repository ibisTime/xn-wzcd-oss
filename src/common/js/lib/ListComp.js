import React from 'react';
import {getWorkbook} from 'common/js/xlsx-util';
import {Form, Select, DatePicker, Input, Button, Table} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {
    moneyFormat, dateTimeFormat, dateFormat, tempString,
    showWarnMsg, showSucMsg, showDelConfirm, getUserId,
    dateListFormat
} from 'common/js/util';
import {PIC_PREFIX} from 'common/js/config';
import {getOwnerBtns} from 'api/menu';
import {getDictList} from 'api/dict';
import fetch from 'common/js/fetch';
import locale from './date-locale';
import cityData from './city';

moment.locale('zh-cn');
const FormItem = Form.Item;
const Option = Select.Option;
const {RangePicker} = DatePicker;
const DATE_FORMAT = 'YYYY-MM-DD';
const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export default class ListComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedRowKeys: [],
            selectedRows: []
        };
        this.first = true;
        this.options = {
            fields: [],
            rowKey: 'code',
            btnEvent: {},
            singleSelect: true,
            searchParams: {}
        };
    }

    buildList = (options) => {
        this.options = {
            ...this.options,
            ...options
        };
        if (this.first) {
            this.options.pageCode && this.getPageData();
            if (this.options.buttons) {
                this.addOwnerBtns();
            } else if (this.props.parentCode) {
                this.getOwnerBtns();
            }
        }
        const columns = [];
        const searchFields = [];
        this.options.fields.forEach(f => {
            let obj = {};
            if (f.children) {
                obj = {
                    title: f.title,
                    children: []
                };
                f.children.forEach(f1 => {
                    this.getFields(f1, function (rf) {
                        f.search && searchFields.push(f);
                        if (!f1.noVisible) {
                            obj.children.push(rf);
                        }
                    });
                });
                columns.push(obj);
            } else {
                this.getFields(f, function (rf) {
                    f.search && searchFields.push(f);
                    if (!f.noVisible) {
                        columns.push(rf);
                    }
                });
            }
        });
        this.first = false;
        this.columns = columns;
        return this.getPageComponent(searchFields);
    }

    getFields = (f, callback) => {
        let obj = {
            title: f.title,
            dataIndex: f.field
        };
        if (f.type === 'datetime') {
            if (f.render) {
                obj.render = f.render;
            } else {
                obj.render = (v) => {
                    return f.nowrap ? <span style={{whiteSpace: 'nowrap'}}>{dateTimeFormat(v)}</span> : dateTimeFormat(v);
                };
                this.addRender(f, dateTimeFormat);
            }
        } else if (f.type === 'date') {
            if (f.render) {
                obj.render = f.render;
            } else {
                obj.render = (v) => {
                    return f.nowrap ? <span style={{whiteSpace: 'nowrap'}}>{dateListFormat(v)}</span> : dateListFormat(v);
                };
                this.addRender(f, dateListFormat);
            }
        } else if (f.type === 'select' || f.type === 'provSelect') {
            if (f.key) {
                f.keyName = f.keyName || 'dkey';
                f.valueName = f.valueName || 'dvalue';
            } else if (f.type === 'provSelect') {
                f.keyName = 'value';
                f.valueName = 'label';
                f.data = cityData.map(c => ({
                    value: c.value,
                    label: c.label
                }));
            }
            if (!f.data) {
                f.data = this.props.searchData[f.field];
                this.first && this.getSelectData(f);
            } else if (!this.props.searchData[f.field]) {
                this.props.setSearchData({data: f.data, key: f.field});
            }
            if (!f.render) {
                obj.render = (value) => {
                    let val = this.renderSelect(value, f);
                    return f.nowrap ? <span style={{whiteSpace: 'nowrap'}}>{val}</span> : val;
                };
            } else {
                obj.render = f.render;
            }
            this.addRender(f, (val) => this.renderSelect(val, f));
        } else if (f.type === 'img') {
            obj.render = (value) => <img src={PIC_PREFIX + value}/>;
        }
        if (f.amount) {
            obj.render = (v, d) => <span style={{whiteSpace: 'nowrap'}}>{moneyFormat(v, d)}</span>;
            this.addRender(f, moneyFormat);
        }
        if (!obj.render) {
            if (f.render) {
                obj.render = f.render;
            } else {
                obj.render = (v) => f.nowrap ? <span style={{whiteSpace: 'nowrap'}}>{v}</span> : v;
                this.addRender(f, v => v);
            }
        }

        callback && callback(obj);
    }

    renderSelect(value, f) {
        let val = '';
        if (value && f.data) {
            let item = f.data.find(v => v[f.keyName] === value);
            val = item
                ? item[f.valueName]
                    ? item[f.valueName]
                    : tempString(f.valueName, item)
                : '';
        }
        return val;
    }

    addRender(f, func) {
        if (!f.render) {
            f.render = func;
        }
    }

    // 导出表单
    handleExport() {
        this.props.doFetching();
        let url = window.location.pathname;
        fetch(this.options.pageCode, {
            start: 1,
            limit: 1000000,
            ...this.getRealSearchParams(this.props.searchParam),
            ...this.options.searchParams
        }).then(data => {
            if (!data.list.length) {
                this.props.cancelFetching();
                showWarnMsg('暂无数据');
            } else {
                let operator = getUserId();
                fetch(632090, {
                    url,
                    operator
                }).then(info => {
                    let titles = [];
                    let bodys = [];
                    data.list.forEach((d, i) => {
                        let temp = [];
                        this.options.fields.forEach(f => {
                            if (i === 0) {
                                titles.push(f.title);
                            }
                            temp.push(f.render(d[f.field], d));
                        });
                        bodys.push(temp);
                    });
                    let result = [titles].concat(bodys);
                    const wb = getWorkbook();
                    wb.getSheet(result, 'SheetJS');
                    wb.downloadXls(info);
                    this.props.cancelFetching();
                });
            }
        }).catch(this.props.cancelFetching);
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({selectedRowKeys, selectedRows});
    }

    searchSelectChange(key, item, start = 1, limit = 20) {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        let params = item.params || {};
        params.start = start;
        params.limit = limit;
        params[item.searchName || item.keyName || item.field] = key;
        this.timeout = setTimeout(() => {
            fetch(item.pageCode, params).then(data => {
                params.start++;
                let list = this.props.searchData[item.field] || [];
                list = start === 1 ? [] : list;
                this.props.setSearchData({data: list.concat(data.list), key: item.field});
            }).catch(() => {
            });
        }, 300);
    }

    handleRowClick = (record) => {
        let {selectedRowKeys, selectedRows} = this.state;
        let {rowKey} = this.options;
        let idx = selectedRowKeys.findIndex(v => v === record[rowKey]);
        if (this.options.singleSelect) {
            selectedRowKeys = [record[rowKey]];
            selectedRows = [record];
        } else {
            if (idx > -1) {
                selectedRowKeys.splice(idx, 1);
                let idx1 = selectedRows.findIndex(v => v[rowKey] === record[rowKey]);
                selectedRows.splice(idx1, 1);
            } else {
                selectedRowKeys.push(record[rowKey]);
                selectedRows.push(record);
            }
        }
        this.setState({
            selectedRowKeys,
            selectedRows
        });
    }
    handleReset = () => {
        this.props.form.resetFields();
        this.props.clearSearchParam();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let values = this.props.form.getFieldsValue();
        this.getPageData(1, values);
    }

    getRealSearchParams(params) {
        let result = {};
        this.options.fields.forEach(v => {
            if (v.type === 'date' || v.type === 'datetime') {
                let format = v.type === 'date' ? DATE_FORMAT : DATETIME_FORMAT;
                if (v.rangedate) {
                    let bDate = params[v.field] ? [...params[v.field]] : [];
                    if (bDate.length) {
                        v.rangedate.forEach((d, index) => {
                            result[d] = bDate[index].format(format);
                        });
                    }
                } else {
                    result[v.field] = params[v.field] ? params[v.field].format(format) : params[v.field];
                }
            } else {
                result[v.field] = params[v.field];
            }
        });
        return result;
    }

    goDetail(view) {
        const {selectedRowKeys} = this.state;
        if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
        } else if (!this.options.singleSelect && selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
        } else {
            let url = `${this.props.location.pathname}/addedit?${view ? 'v=1&' : ''}code=${selectedRowKeys[0]}`;
            this.props.history.push(url);
        }
    }

    delete() {
        const {selectedRowKeys} = this.state;
        if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
        } else if (this.options.singleSelect && selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
        } else {
            showDelConfirm({
                onOk: () => {
                    let keyName = this.options.rowKey || 'code';
                    let param = {};
                    param[keyName] = selectedRowKeys[0];
                    this.options.beforeDelete && this.options.beforeDelete(param);
                    this.props.doFetching();
                    fetch(this.options.deleteCode, param).then(data => {
                        showSucMsg('操作成功');
                        this.getPageData();
                    }).catch(this.props.cancelFetching);
                }
            });
        }
    }

    handleBtnClick = (url) => {
        const {btnEvent} = this.options;
        switch (url) {
            case 'add':
                btnEvent.add
                    ? btnEvent.add()
                    : this.props.history.push(`${this.props.location.pathname}/addedit`);
                break;
            case 'edit':
                btnEvent.edit
                    ? btnEvent.edit(this.state.selectedRowKeys, this.state.selectedRows)
                    : this.goDetail();
                break;
            case 'detail':
                btnEvent.detail
                    ? btnEvent.detail(this.state.selectedRowKeys, this.state.selectedRows)
                    : this.goDetail(true);
                break;
            case 'delete':
                btnEvent.detail
                    ? btnEvent.delete(this.state.selectedRowKeys, this.state.selectedRows)
                    : this.delete();
                break;
            case 'export':
                btnEvent.export
                    ? btnEvent.export(this.state.selectedRowKeys, this.state.selectedRows)
                    : this.handleExport();
                break;
            default:
                btnEvent[url] && btnEvent[url](this.state.selectedRowKeys, this.state.selectedRows);
        }
        this.setState({selectedRowKeys: [], selectedRows: []});
    }
    handleTableChange = (pagination) => {
        this.getPageData(pagination.current);
    }

    // 获取select框的数据
    getSelectData(item) {
        if (item.key) {
            getDictList({parentKey: item.key, bizType: item.keyCode}).then(data => {
                this.props.setSearchData({data, key: item.field});
            }).catch(() => {
            });
        } else if (item.listCode) {
            let param = item.params || {};
            fetch(item.listCode, param).then(data => {
                this.props.setSearchData({data, key: item.field});
            }).catch(() => {
            });
        }
    }

    getOwnerBtns() {
        getOwnerBtns(this.props.parentCode).then(data => {
            this.props.setBtnList(data);
        }).catch(() => {
        });
    }

    addOwnerBtns() {
        let btnEvent = {};
        let btns = this.options.buttons.map(v => {
            btnEvent[v.code] = v.handler;
            return {
                code: v.code,
                name: v.name,
                url: '/' + v.code
            };
        });
        this.options.btnEvent = btnEvent;
        this.props.setBtnList(btns);
    }

    // 获取页面初始化数据
    getPageData = (current = this.props.pagination.current, searchParam) => {
        if (searchParam) {
            this.props.setSearchParam(searchParam);
        } else {
            searchParam = this.props.searchParam;
        }
        searchParam = this.getRealSearchParams(searchParam);
        if (this.options.searchParams) {
            searchParam = {
                ...searchParam,
                ...this.options.searchParams
            };
        }
        this.props.doFetching();
        const {pagination} = this.props;
        fetch(this.options.pageCode, {
            start: current,
            limit: pagination.pageSize,
            ...searchParam
        }).then(data => {
            this.props.cancelFetching();
            this.props.setTableData(data.list);
            this.props.setPagination({
                ...pagination,
                current,
                total: data.totalCount
            });
        }).catch(this.props.cancelFetching);
    }

    getPageComponent(searchFields) {
        let rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
            type: this.options.singleSelect ? 'radio' : 'checkbox'
        };
        let useData = this.props.tableList;

        // noSelect为true时 列表不可选
        if (this.options.noSelect) {
            rowSelection = null;
        }
        // 月度业绩用
        if (this.options.userDataAfter) {
            useData = this.options.userDataAfter(useData);
        }
        return (
            <div>
                {searchFields.length ? (
                    <Form className="search-form" layout="inline" onSubmit={this.handleSubmit}>
                        {this.getSearchFields(searchFields)}
                    </Form>
                ) : null}
                <div className="tools-wrapper" style={{marginTop: 8}}>
                    {this.props.btnList.map(v => (
                        <Button key={v.code} onClick={() => {
                            this.handleBtnClick(v.url.substr(1));
                        }}>{v.name}</Button>
                    ))}
                </div>
                <div className="table-wrapper">
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        columns={this.columns}
                        rowKey={record => record[this.options.rowKey]}
                        dataSource={useData}
                        pagination={this.props.pagination}
                        loading={this.props.fetching}
                        onChange={this.handleTableChange}
                        onRowClick={this.handleRowClick}
                    />
                </div>
            </div>
        );
    }

    getSearchFields(fields) {
        const {getFieldDecorator} = this.props.form;
        const children = [];
        fields.forEach(v => {
            children.push(
                <FormItem key={v.field} label={v.title}>
                    {getFieldDecorator(`${v.field}`, {initialValue: this.props.searchParam[v.field]})(
                        this.getItemByType(v.type, v)
                    )}
                </FormItem>
            );
        });
        children.push(
            <FormItem key='searchBtn'>
                <Button type="primary" htmlType="submit">搜索</Button>
                <Button style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
            </FormItem>
        );
        return children;
    }

    getItemByType(type, item) {
        switch (type) {
            case 'provSelect':
            case 'select':
                return item.pageCode ? this.getSearchSelectItem(item) : this.getSelectItem(item);
            case 'date':
                return item.rangedate ? this.getRangeDateItem(item) : this.getDateItem(item);
            case 'datetime':
                return item.rangedate ? this.getRangeDateItem(item, true) : this.getDateItem(item, true);
            default:
                return <Input style={{width: 200}} placeholder={item.placeholder}/>;
        }
    }

    getSelectItem(item) {
        return <Select
            showSearch
            notFoundContent='暂无数据'
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            style={{width: 200}}
            placeholder="请选择">
            {item.data ? item.data.map(d => (
                <Option key={d[item.keyName]} value={d[item.keyName]}>
                    {d[item.valueName] ? d[item.valueName] : tempString(item.valueName, d)}
                </Option>
            )) : null}
        </Select>;
    }

    getSearchSelectItem(item) {
        return <Select
            mode="combobox"
            showArrow={false}
            filterOption={false}
            onSearch={v => this.searchSelectChange(v, item)}
            optionLabelProp="children"
            style={{width: 200}}
            placeholder="请输入关键字搜索">
            {item.data ? item.data.map(d => (
                <Option key={d[item.keyName]} value={d[item.keyName]}>
                    {d[item.valueName] ? d[item.valueName] : tempString(item.valueName, d)}
                </Option>
            )) : null}
        </Select>;
    }

    getDateItem(item, isTime = false) {
        let format = DATE_FORMAT;
        let places = '选择日期';
        if (isTime) {
            format = DATETIME_FORMAT;
            places = '选择时间';
        }
        return <DatePicker
            allowClear={false}
            locale={locale}
            placeholder={places}
            format={format}
            showTime={isTime}/>;
    }

    getRangeDateItem(item, isTime = false) {
        let format = DATE_FORMAT;
        let places = ['开始日期', '结束日期'];
        if (isTime) {
            format = DATETIME_FORMAT;
            places = ['开始时间', '结束时间'];
        }
        return <RangePicker
            allowClear={false}
            locale={locale}
            placeholder={places}
            ranges={{'今天': [moment(), moment()], '本月': [moment(), moment().endOf('month')]}}
            format={format}
            showTime={isTime}/>;
    }
}
