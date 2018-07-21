import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/bankMoney-loanList';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    showWarnMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanBankMoneyLoanList, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class AdvMoneyCompBill extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '业务公司',
            field: 'companyCode',
            listCode: 630106,
            params: {
                typeList: [1]
            },
            type: 'select',
            keyName: 'code',
            valueName: 'name',
            required: true,
            onChange: (value) => {
                this.props.doFetching();
                fetch(632188, { companyCode: value, curNodeCode: '004_04' }).then((data) => {
                    this.props.setPageData({
                        advanceFundlist: data.advanceFundlist
                    });
                    this.props.cancelFetching();
                }).catch(this.props.cancelFetching);
            }
        }, {
            title: '放款客户',
            field: 'advanceFundlist',
            type: 'o2m',
            options: {
                delete: true,
                fields: [{
                    title: '客户姓名',
                    field: 'customerName'
                }, {
                    title: '贷款金额',
                    field: 'loanAmount',
                    amount: true
                }]
            },
            afterDelete: (key, data) => {
                let useAmount = data.useAmount;
                let advanceFund = this.props.pageData.advanceFund - useAmount;
                this.props.setPageData({
                    ...this.props.pageData,
                    advanceFund
                });
            }
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            buttons: [{
              title: '确认',
              check: true,
              handler: (params) => {
                if (params.advanceFundlist.length) {
                    this.props.doFetching();
                    params.totalAdvanceFund = this.props.pageData.totalAdvanceFund;
                    params.payAmount = this.props.pageData.payAmount;
                    params.codeList = [];
                    let item = params.advanceFundlist || [];
                    let len = params.advanceFundlist.length || 0;
                    for(let i = 0; i < len; i++) {
                        params.codeList.push(item[i].code);
                    }
                    params.operator = getUserId();
                    fetch(632174, params).then(() => {
                        showSucMsg('操作成功');
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                        this.props.cancelFetching();
                    }).catch(this.props.cancelFetching);
                } else {
                    showWarnMsg('垫资列表不能为空');
                }
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

export default AdvMoneyCompBill;
