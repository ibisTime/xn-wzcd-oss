import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/rebates-bill';
import {
    getQueryString,
    showSucMsg,
    getUserId
} from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.loanstoolsRebatesBill, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class RebatesBill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bankcardData: []
        };
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '汽车经销商',
            field: 'carDealerCode',
            type: 'select',
            pageCode: 632065,
            keyName: 'code',
            valueName: '{{parentGroup.DATA}}-{{abbrName.DATA}}',
            required: true,
            onChange: (v, data) => {
                this.props.form.setFieldsValue({
                    bankcardCode: ''
                });
                if (data) {
                  let list = [].concat(data.jxsCollectBankcardList).concat(data.gsCollectBankcardList)
                    .concat(data.jhCollectBankcardList).concat(data.zhCollectBankcardList);
                  this.setState({
                      bankcardCode: list
                  });
                }
            }
        }, {
            title: '收款账号',
            field: 'bankcardCode',
            type: 'select',
            data: this.state.bankcardCode,
            keyName: 'code',
            valueName: '{{realName.DATA}}-{{subbranch.DATA}}-{{bankcardNumber.DATA}}',
            searchName: 'customerName',
            required: true,
            onChange: (v, data) => {
                let carDealerCode = this.props.form.getFieldValue('carDealerCode');
                if (carDealerCode && v) {
                    fetch(632297, {
                        carDealerCode: carDealerCode
                    }).then((data) => {
                        this.props.cancelFetching();
                        let list = [];
                        let totalAmount = 0;
                        data.map(v => {
                            if (v.useMoneyPurpose !== '1') {
                                list.push(v);
                                totalAmount += v.repointAmount;
                            }
                        });
                        this.props.setPageData({
                            ...this.props.pageData,
                            repointDetailCodeList: list,
                            totalAmount: totalAmount
                        });
                    }).catch(this.props.cancelFetching);
                }
            }
        }, {
            title: '返点列表',
            field: 'repointDetailCodeList',
            required: true,
            type: 'o2m',
            onChange: (data) => {
                let totalAmount = this.props.pageData.totalAmount;
                data.map(v => {
                    if (v.useMoneyPurpose !== '1') {
                        totalAmount += v.repointAmount;
                    }
                });
                this.props.setPageData({
                    ...this.props.pageData,
                    totalAmount: totalAmount
                });
            },
            options: {
                delete: true,
                scroll: {
                    x: 1600
                },
                fields: [{
                    title: 'code',
                    field: 'code',
                    hidden: true
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
                    field: 'accountCode',
                    required: true
                }, {
                    title: '开户行',
                    field: 'openBankName',
                    required: true
                }, {
                    title: '户名',
                    field: 'companyName',
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
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632246,
            buttons: [{
                title: '确认',
                check: true,
                handler: (params) => {
                    params.totalAmount = this.props.pageData.totalAmount;
                    params.operator = getUserId();
                    let repointDetailCodeList = [];
                    params.repointDetailCodeList.map(value => {
                        repointDetailCodeList.push(value.code);
                    });
                    params.repointDetailCodeList = repointDetailCodeList;
                    this.props.doFetching();
                    fetch(632240, params).then(() => {
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

export default RebatesBill;
