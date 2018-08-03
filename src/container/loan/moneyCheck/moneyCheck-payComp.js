import React from 'react';
import moment from 'moment';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/moneyCheck-payComp';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    getCompanyCode
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanMoneyCheckPayComp, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class AdvMoneyPayComp extends React.Component {
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
                if (value) {
                    this.props.doFetching();
                    fetch(632188, { companyCode: value, curNodeCode: '004_05' }).then((data) => {
                        this.props.setPageData({
                            totalAdvanceFund: data.totalAdvanceFund,
                            hasAdvanceFund: data.hasAdvanceFund,
                            unAdvanceFund: data.unAdvanceFund,
                            advanceFundlist: data.advanceFundlist
                        });
                        this.props.cancelFetching();
                    }).catch(this.props.cancelFetching);
                } else {
                    this.props.setPageData({
                        totalAdvanceFund: 0,
                        hasAdvanceFund: 0,
                        unAdvanceFund: 0,
                        advanceFundlist: []
                    });
                }
            }
        }, {
            title: '请款预算单金额',
            field: 'hasAdvanceFund',
            amount: true,
            readonly: true
        }, {
            title: '垫资总金额',
            field: 'totalAdvanceFund',
            amount: true,
            readonly: true
        }, {
            title: '待垫资金额',
            field: 'unAdvanceFund',
            amount: true,
            readonly: true
        }, {
            title: '垫资客户',
            field: 'advanceFundlist',
            type: 'o2m',
            options: {
                fields: [{
                    title: '客户姓名',
                    field: 'customerName'
                }, {
                    title: '贷款金额',
                    field: 'loanAmount',
                    amount: true
                }, {
                    title: '手续费',
                    field: 'serviceCharge',
                    amount: true
                }, {
                    title: '手续费收取方式',
                    field: 'serviceChargeWay',
                    type: 'select',
                    key: 'fee_way'
                }, {
                    title: 'GPS费',
                    field: 'gpsFee',
                    amount: true
                }, {
                    title: 'GPS费收取方式',
                    field: 'gpsFeeWay',
                    type: 'select',
                    key: 'gps_fee_way'
                }, {
                    title: '应退按揭款',
                    field: 'useAmount',
                    amount: true
                }]
            }
        }, {
            title: '垫资日期',
            field: 'payDatetime',
            type: 'date',
            value: moment(),
            required: true
        }, {
            title: '付款账号',
            field: 'payBankcardCode',
            type: 'select',
            listCode: 632007,
            params: {
                companyCode: getCompanyCode()
            },
            initValue: true,
            keyName: 'code',
            valueName: 'bankcardNumber',
            required: true
        }, {
            title: '银行回单',
            field: 'billPdf',
            type: 'img',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632186,
            buttons: [{
              title: '确认',
              handler: (params) => {
                this.props.doFetching();
                params.operator = getUserId();
                params.codeList = [];
                let item = params.advanceFundlist;
                let len = params.advanceFundlist.length;
                for(let i = 0; i < len; i++) {
                    params.codeList.push(item[i].code);
                }
                params.totalAdvanceFund = this.props.pageData.totalAdvanceFund;
                params.hasAdvanceFund = this.props.pageData.hasAdvanceFund;
                params.unAdvanceFund = this.props.pageData.unAdvanceFund;
                params.payAmount = this.props.pageData.payAmount;
                fetch(632176, params).then(() => {
                  showSucMsg('操作成功');
                  setTimeout(() => {
                    this.props.history.go(-1);
                  }, 1000);
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

export default AdvMoneyPayComp;
