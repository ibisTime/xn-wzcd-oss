import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/trailer-dispose';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizTrailerDispose, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class trailerDispose extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.userId = getQueryString('userId', this.props.location.search);
        this.dealResult = '';
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
            key: 'deal_result',
            required: true,
            readonly: false,
            onChange: (v, data) => {
                this.dealResult = v;
            }
        }, {
            title: '出售价格',
            field: 'sellPrice',
            amount: true,
            required: true,
            readonly: false,
            hidden: this.dealResult !== 2
        }, {
            title: '保证金',
            field: 'deposit',
            amount: true,
            required: true,
            readonly: false,
            hidden: this.dealResult !== 3
        }, {
            title: '费用说明',
            field: 'feeNote',
            readonly: false
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630521,
                buttons: [{
                    title: '确定',
                    handler: (param) => {
                        param.code = this.code;
                        param.operator = getUserId();
                        this.props.doFetching();
                        fetch(632146, param).then(() => {
                            showSucMsg('操作成功');
                            this.props.cancelFetching();
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    },
                    check: true,
                    type: 'primary'
                }, {
                    title: '返回',
                    handler: (param) => {
                        this.props.history.go(-1);
                    }
                }]
            });
    }
}

export default trailerDispose;