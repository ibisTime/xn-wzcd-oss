import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/rebates-addedit';
import {
    getQueryString,
    showSucMsg,
    getUserId
} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanstoolsRebatesAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class RebatesAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '申请公司',
            field: 'carDealerName'
        }, {
            title: '申请人',
            field: 'applyUserName'
        }, {
            title: '申请日期',
            field: 'applyDatetime',
            type: 'date'
        }, {
            title: '返点列表',
            field: 'repointDetailList',
            required: true,
            type: 'o2m',
            options: {
                noSelect: true,
                scroll: {
                    x: 1600
                },
                fields: [{
                    title: 'code',
                    field: 'code',
                    noVisible: true
                }, {
                    title: '业务编号',
                    field: 'budgetCode'
                }, {
                    title: '客户姓名',
                    field: 'userName'
                }, {
                    title: '身份证号',
                    field: 'idNo'
                }, {
                    title: '车辆型号',
                    field: 'carType'
                }, {
                    title: '贷款金额',
                    field: 'loanAmount',
                    amount: true,
                    required: true
                }, {
                    title: '银行实际利率',
                    field: 'bankRate'
                }, {
                    title: '基准利率',
                    field: 'benchmarkRate'
                }, {
                    title: '手续费',
                    field: 'fee',
                    amount: true
                }, {
                    title: '用款用途',
                    field: 'useMoneyPurpose',
                    type: 'select',
                    data: [{
                        key: '1',
                        value: '应退按揭款'
                    }, {
                        key: '2',
                        value: '协议内返点'
                    }, {
                        key: '3',
                        value: '协议外返点'
                    }],
                    keyName: 'key',
                    valueName: 'value'
                }, {
                    title: '金额小写',
                    field: 'repointAmount',
                    amount: true,
                    required: true
                }, {
                    title: '账号',
                    field: 'accountNo',
                    required: true
                }, {
                    title: '开户行',
                    field: 'openBankName',
                    required: true
                }, {
                    title: '户名',
                    field: 'accountName',
                    required: true
                }]
            }
        }, {
            title: '总金额',
            field: 'totalAmount',
            amount: true,
            readonly: true
        }, {
            title: '缘由',
            field: 'reason',
            type: 'textarea',
            normalArea: true,
            required: true
        }, {
            title: '结算方式',
            field: 'settleType',
            type: 'select',
            key: 'settle_way'
        }, {
            title: '办理状态',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632246
        });
    }
}

export default RebatesAddedit;
