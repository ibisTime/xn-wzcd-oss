import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/biz/mortgages/mortgages';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    dateTimeFormat,
    getUserId
} from 'common/js/util';
import {
    Button,
    Upload,
    Modal
} from 'antd';
import {
    mortgagesComplete,
    lastComplete,
    submitBank
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.mortgages,
        parentCode: state.menu.subMenuCode
    }), {
        setTableData,
        clearSearchParam,
        doFetching,
        setBtnList,
        cancelFetching,
        setPagination,
        setSearchParam,
        setSearchData
    }
)
class mortgages extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'bizCode',
            render: (v, d) => {
                return d.budgetOrder.code;
            },
            search: true
        }, {
            title: '客户姓名',
            field: 'user',
            search: true,
            render: (v, d) => {
                return d.user.realName;
            }
        }, {
            title: '解除日期',
            field: 'releaseDatetime',
            type: 'date'
        }, {
            title: '业务员',
            field: 'updaterName'
        }, {
            title: '模板ID',
            field: 'releaseTemplateId',
            type: 'select',
            key: 'template_id'
        }, {
            title: '申请日期',
            field: 'releaseApplyDatetime',
            type: 'date'
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }];
        return this.props.buildList({
            fields,
            pageCode: 630520,
            singleSelect: false,
            searchParams: {
                roleCode: getRoleCode(),
                curNodeCodeList: ['020_02', '020_03', '020_04', '020_05', '020_06', '020_07', '020_08', '020_09']
            },
            btnEvent: {
                apply: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '020_02') {
                        showWarnMsg('当前节点不是解除抵押申请');
                    } else {
                        this.props.history.push(`/biz/mortgages/apply?code=${selectedRowKeys[0]}`);
                    }
                },
                internal: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '020_03') {
                        showWarnMsg('当前节点不是风控内勤审核');
                    } else {
                        this.props.history.push(`/biz/mortgages/internal?code=${selectedRowKeys[0]}`);
                    }
                },
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '020_04') {
                        showWarnMsg('当前节点不是风控经理审核');
                    } else {
                        this.props.history.push(`/biz/mortgages/check?code=${selectedRowKeys[0]}`);
                    }
                },
                totalCheck: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '020_05') {
                        showWarnMsg('当前节点不是风控总监审核');
                    } else {
                        this.props.history.push(`/biz/mortgages/totalCheck?code=${selectedRowKeys[0]}`);
                    }
                },
                complete: (key, item) => {
                    if (!key || !key.length || !item || !item.length) {
                        showWarnMsg('请选择记录');
                    } else if (item[0].curNodeCode !== '020_07') {
                        showWarnMsg('当前节点不是理件完成');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定理件完成？',
                            onOk: () => {
                                this.props.doFetching();
                                let list = [];
                                for(let i = 0, len = item.length; i < len; i++) {
                                    list.push(item[i].code);
                                }
                                return mortgagesComplete(list).then(() => {
                                    showSucMsg('操作成功');
                                    setTimeout(() => {
                                        this.props.getPageData();
                                    }, 500);
                                }).catch(() => {
                                    this.props.cancelFetching();
                                });
                            }
                        });
                    }
                },
                submit: (key, item) => {
                    if (!key || !key.length || !item || !item.length) {
                        showWarnMsg('请选择记录');
                    } else if (item[0].curNodeCode !== '020_09') {
                        showWarnMsg('当前节点不是提交银行');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定提交银行？',
                            onOk: () => {
                                this.props.doFetching();
                                return submitBank(key[0]).then(() => {
                                    showSucMsg('操作成功');
                                    setTimeout(() => {
                                        this.props.getPageData();
                                    }, 500);
                                }).catch(() => {
                                    this.props.cancelFetching();
                                });
                            }
                        });
                    }
                }
            }
        });
    }
}

export default mortgages;