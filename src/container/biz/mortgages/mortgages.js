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
            type: 'datetime'
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
            field: 'applyDatetime',
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
                roleCode: getRoleCode()
            },
            btnEvent: {
                apply: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '020_06') {
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
                    } else if (selectedRows[0].curNodeCode !== '020_07') {
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
                    } else if (selectedRows[0].curNodeCode !== '020_08') {
                        showWarnMsg('当前节点不是风控经理审核');
                    } else {
                        this.props.history.push(`/biz/mortgages/check?code=${selectedRowKeys[0]}`);
                    }
                },
                // submit: (selectedRowKeys, selectedRows) => {
                //     if (!selectedRowKeys.length) {
                //         showWarnMsg('请选择记录');
                //     } else if (selectedRowKeys.length > 1) {
                //         showWarnMsg('请选择一条记录');
                //     } else if (selectedRows[0].curNodeCode !== '020_12') {
                //         showWarnMsg('当前节点不是驻行人员提交材料');
                //     } else {
                //         this.props.history.push(`/biz/mortgages/submit?code=${selectedRowKeys[0]}`);
                //     }
                // },
                submit: (key, item) => {
                    if (!key || !key.length || !item || !item.length) {
                        showWarnMsg('请选择记录');
                    } else if (item[0].curNodeCode !== '020_12') {
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
                },
                // enter: (selectedRowKeys, selectedRows) => {
                //     if (!selectedRowKeys.length) {
                //         showWarnMsg('请选择记录');
                //     } else if (selectedRowKeys.length > 1) {
                //         showWarnMsg('请选择一条记录');
                //     } else if (selectedRows[0].curNodeCode !== '020_08') {
                //         showWarnMsg('当前节点不是风控经理审核');
                //     } else {
                //         this.props.history.push(`/biz/mortgages/enter?code=${selectedRowKeys[0]}`);
                //     }
                // },
                complete: (key, item) => {
                    if (!key || !key.length || !item || !item.length) {
                        showWarnMsg('请选择记录');
                    } else if (item[0].curNodeCode !== '020_10') {
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
                }
                // over: (key, item) => {
                //     if (!key || !key.length || !item || !item.length) {
                //         showWarnMsg('请选择记录');
                //     } else if (item[0].curNodeCode !== '020_13') {
                //         showWarnMsg('当前节点不是解除抵押完成');
                //     } else {
                //         Modal.confirm({
                //             okText: '确认',
                //             cancelText: '取消',
                //             content: '确定抵押完成？',
                //             onOk: () => {
                //                 this.props.doFetching();
                //                 return lastComplete(key[0]).then(() => {
                //                     showWarnMsg('操作成功');
                //                     setTimeout(() => {
                //                         this.props.getPageData();
                //                     }, 500);
                //                 }).catch(() => {
                //                     this.props.cancelFetching();
                //                 });
                //             }
                //         });
                //     }
                // }
            }
        });
    }
}

export default mortgages;