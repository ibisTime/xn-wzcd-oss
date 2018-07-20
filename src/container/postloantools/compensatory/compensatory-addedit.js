import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/postloantools/compensatory-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    CollapseWrapper
} from 'component/collapse-detail/collapse-detail';

@CollapseWrapper(
    state => state.postloantoolsCompensatoryAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class compensatoryAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户信息',
            items: [
                [{
                    title: '客户姓名',
                    field: 'customerUserName',
                    readonly: true
                }, {
                    title: '业务编号',
                    field: 'bizCode',
                    readonly: true
                }, {
                    title: '身份证',
                    field: 'idNo',
                    readonly: true
                }]
            ]
        }, {
            title: '预算单信息',
            open: true,
            items: [
                [{
                    title: '代偿性质',
                    field: 'type',
                    type: 'select',
                    key: 'replace_repay_type',
                    readonly: true
                }, {
                    title: '预算金额',
                    field: 'budgetAmount',
                    amount: true,
                    readonly: true
                }],
                [{
                    title: '收款人姓名',
                    field: 'useDatetime',
                    readonly: true
                }, {
                    title: '收款人开户行',
                    field: 'repayBankName',
                    readonly: true
                }, {
                    title: '收款人账号',
                    field: 'useDatetime',
                    type: 'date',
                    readonly: true
                }],
                [{
                    title: '是否加急',
                    field: 'useDatetime',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '是'
                    }, {
                        key: '1',
                        value: '否'
                    }],
                    keyName: 'key',
                    valueName: 'value',
                    readonly: true
                }, {
                    title: '已代偿金额',
                    field: 'budgetAmount',
                    amount: true,
                    readonly: true
                }, {
                    title: '代偿说明',
                    field: 'useDatetime',
                    readonly: true
                }]
            ]
        }, {
            title: '其他信息',
            open: true,
            items: [
                [{
                    title: '与我司过往是否有纠纷',
                    field: 'isPlatIssue',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '是'
                    }, {
                        key: '1',
                        value: '否'
                    }],
                    keyName: 'key',
                    valueName: 'value',
                    readonly: true
                }],
                [{
                    title: '垫款后采取的方式',
                    field: 'takeWay',
                    readonly: true
                }, {
                    title: '暂缓起诉(天)',
                    field: 'deferDays',
                    readonly: true
                }],
                [{
                    title: '申请垫款理由',
                    field: 'useDatetime',
                    readonly: true
                }]
            ]
        }, {
            title: '欠款人以及担保人相关财产状况信息',
            items: [
                [{
                    title: '欠款人及配偶信息',
                    field: 'useDatetime',
                    readonly: true
                }],
                [{
                    title: '担保人信息及其名下财产信息',
                    field: 'useDatetime',
                    readonly: true
                }]
            ]
        }, {
            title: '风控部意见',
            open: true,
            items: [
                [{
                    title: '特殊情况说明',
                    field: 'riskNote',
                    required: true
                }]
            ]
        }, {
            title: '审核说明',
            field: 'remark',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632337
        });
    }
}

export default compensatoryAddedit;