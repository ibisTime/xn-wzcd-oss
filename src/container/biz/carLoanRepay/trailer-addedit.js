import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/trailer-addedit';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizTrailerAddEdit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class trailerAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.userId = getQueryString('userId', this.props.location.search);
    }
    render() {
        const fields = [{

            title: '客户姓名',
            field: 'customerName'
        }, {
            title: '业务编号',
            field: 'code'
        }, {
            title: '身份证',
            field: 'inNo'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '车辆型号',
            field: 'carModel'
        }, {
            title: '车牌号',
            field: 'carNo'
        }, {
            title: '银行欠款',
            field: 'bankAmount'
        }, {
            title: '代偿欠款',
            field: 'dcAmount'
        }, {
            title: '处理结果',
            field: 'dealResult',
            type: 'select',
            key: 'deal_result'
        }, {
            title: '出售价格',
            field: 'sellPrice',
            amount: true,
            hidden: this.props.pageData && this.props.pageData.dealResult !== 2
        }, {
            title: '保证金',
            field: 'deposit',
            amount: true,
            hidden: this.props.pageData && this.props.pageData.dealResult !== 3
        }, {
            title: '费用说明',
            field: 'feeNote'
        }, {
            title: '当前节点',
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
                detailCode: 630521
            });
    }
}

export default trailerAddedit;