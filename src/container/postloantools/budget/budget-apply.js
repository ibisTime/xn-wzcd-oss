import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/postloantools/budget-apply';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.postloantoolsBudgetApply, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class budgetApply extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '代偿性质',
            field: 'companyCode',
            required: true
        }, {
            title: '业务编号',
            field: 'receiptBank',
            required: true
        }, {
            title: '预算金额',
            field: 'receiptAccount',
            amount: true,
            required: true
        }, {
            title: '收款人姓名',
            field: 'useDatetime'
        }, {
            title: '收款人开户行',
            field: 'useDatetime'
        }, {
            title: '收款人账号',
            field: 'useDatetime'
        }, {
            title: '是否加急',
            field: 'useDatetime'
        }, {
            title: '代偿说明',
            field: 'useDatetime'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632106,
            buttons: [{
                title: '发送',
                check: true,
                handler: (params) => {
                    this.props.doFetching();
                    let bank = this.props.selectData.receiptBank.find(v => v.code === params.receiptBank);
                    params.receiptAccount = bank.bankcardNumber;
                    params.receiptBank = bank.bankCode;
                    params.buttonCode = 1;
                    fetch(632100, params).then(() => {
                        showSucMsg('操作成功');
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1500);
                        this.props.cancelFetching();
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default budgetApply;