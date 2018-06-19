import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/creditStart-addedit';
import {
    getQueryString,
    showWarnMsg,
    showSucMsg,
    getUserId
} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.loanCreditStartAddedit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class CreditStartAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        // 发起征信
        this.isAddedit = !!getQueryString('isAddedit', this.props.location.search);
        // 录入银行征信结果
        this.isEntry = !!getQueryString('isEntry', this.props.location.search);
        // 业务员初审
        this.isCheckSalesman = !!getQueryString('isCheckSalesman', this.props.location.search);
        // 准入审查
        this.isCheckFirst = !!getQueryString('isCheckFirst', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.newCar = true;
        this.buttons = [];
    }

    render() {
        let o2mFields = [{
            title: '姓名',
            field: 'userName',
            nowrap: true,
            required: true,
            width: 80
        }, {
            title: '与借款人关系',
            field: 'relation',
            type: 'select',
            key: 'credit_user_relation',
            required: true
        }, {
            title: '贷款角色',
            field: 'loanRole',
            type: 'select',
            key: 'credit_user_loan_role',
            required: true
        }, {
            title: '手机号',
            field: 'mobile',
            required: true,
            render: (v) => {
                let val = (v && v.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')) || '';
                return <span style={{whiteSpace: 'nowrap'}}>{val}</span>;
            }
        }, {
            title: '身份证号',
            field: 'idNo',
            idCard: true,
            required: true,
            render: (v) => {
                let val = (v && v.replace(/^(\d{6}).+(\d{4})$/, '$1****$2')) || '';
                return <span style={{whiteSpace: 'nowrap'}}>{val}</span>;
            }
        }, {
            title: '身份证正面',
            field: 'idNoFront',
            type: 'img',
            single: true,
            required: true
        }, {
            title: '身份证反面',
            field: 'idNoReverse',
            type: 'img',
            single: true,
            required: true
        }, {
            title: '征信查询授权书',
            field: 'authPdf',
            type: 'img',
            single: true,
            required: true
        }, {
            title: '面签照片',
            field: 'interviewPic',
            type: 'img',
            single: true,
            required: true
        }];
        if (!this.isAddedit) {
            o2mFields = o2mFields.concat([{
                title: '贷款抵押笔数',
                field: 'dkdyCount',
                number: true,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款抵押贷款余额',
                field: 'dkdyAmount',
                amount: true,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款抵押近两年逾期次数',
                field: 'dkdy2yearOverTimes',
                number: true,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款抵押最高逾期金额',
                field: 'dkdyMaxOverAmount',
                amount: true,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款抵押当前逾期金额',
                field: 'dkdyCurrentOverAmount',
                amount: true,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款抵押近6个月平均月还款额',
                field: 'dkdy6monthAvgAmount',
                amount: true,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款信用未结清贷款笔数',
                field: 'hkxyUnsettleCount',
                number: true,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款信用未结清贷款余额',
                field: 'hkxyUnsettleAmount',
                amount: true,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款信用近两年逾期次数',
                field: 'hkxy2yearOverTimes',
                number: true,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款信用单月最高逾期金额',
                field: 'hkxyMonthMaxOverAmount',
                amount: true,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款信用当前逾期金额',
                field: 'hkxyCurrentOverAmount',
                amount: true,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款信用近6个月平均月还款额',
                field: 'hkxy6monthAvgAmount',
                amount: true,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '信用卡张数',
                field: 'xykCount',
                number: true,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '信用卡授信总额',
                field: 'xykCreditAmount',
                amount: true,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '信用卡近6个月使用额',
                field: 'xyk6monthUseAmount',
                amount: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '信用卡近两年逾期次数',
                field: 'xyk2yearOverTimes',
                number: true,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '信用卡单月最高逾期金额',
                field: 'xykMonthMaxOverAmount',
                amount: true,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '信用卡当前逾期金额',
                field: 'xykCurrentOverAmount',
                amount: true,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '对外担保笔数',
                field: 'outGuaranteesCount',
                number: true,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '对外担保余额',
                field: 'outGuaranteesAmount',
                amount: true,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '对外担保备注',
                field: 'outGuaranteesRemark',
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }]);
        }

        let fields = [{
            title: '银行',
            field: 'loanBankCode',
            type: 'select',
            listCode: 632057,
            keyName: 'code',
            valueName: '{{bankName.DATA}}-{{abbrName.DATA}}',
            required: true
        }, {
            title: '购车途径',
            field: 'shopWay',
            type: 'select',
            key: 'budget_orde_biz_typer',
            value: this.code ? '' : '1',
            required: true,
            onChange: (value) => {
                this.newCar = value === '1';
            }
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            required: true
        }, {
            title: '行驶证正面',
            field: 'xszFront',
            type: 'img',
            required: true,
            single: true,
            hidden: this.newCar
        }, {
            title: '行驶证反面',
            field: 'xszReverse',
            type: 'img',
            required: true,
            single: true,
            hidden: this.newCar
        }, {
            title: '征信列表',
            field: 'creditUserList',
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                delete: true,
                detail: !(this.isEntry || !this.view),
                check: this.isEntry,
                checkName: '录入',
                scroll: {x: 1300},
                fields: o2mFields
            }
        }, {
            title: '审核说明',
            field: 'approveNote',
            readonly: !this.isCheckSalesman,
            hidden: !this.isCheckSalesman
        }];

        // 业务员初审
        if (this.isCheckSalesman) {
            this.buttons = [{
                title: '通过并发送一审',
                check: true,
                handler: (params) => {
                    params.approveResult = '1';
                    params.operator = getUserId();
                    this.props.doFetching();
                    fetch(632113, params).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '退回重新征信',
                check: true,
                handler: (params) => {
                    params.approveResult = '0';
                    params.operator = getUserId();
                    this.props.doFetching();
                    fetch(632113, params).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        }

        // 准入审查
        if (this.isCheckFirst) {
            this.buttons = [{
                title: '通过',
                check: true,
                handler: (params) => {
                    params.approveResult = '1';
                    params.operator = getUserId();
                    this.props.doFetching();
                    fetch(632114, params).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '不通过',
                check: true,
                handler: (params) => {
                    params.approveResult = '0';
                    params.operator = getUserId();
                    this.props.doFetching();
                    fetch(632114, params).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        }

        // 录入征信结果
        if (this.isEntry) {
            this.buttons = [{
                title: '录入',
                check: true,
                handler: (params) => {
                    let data = {};
                    data.creditCode = this.code;
                    for (let i = 0; i < params.creditUserList.length; i++) {
                        if (!params.creditUserList[i].dkdyCount) {
                            showWarnMsg('请录入' + params.creditUserList[i].userName + '的银行征信结果！');
                            return;
                        }
                    }
                    data.bankCreditResultList = params.creditUserList;
                    data.operator = getUserId();
                    this.props.doFetching();
                    fetch(632111, data).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.push(`/loan/creditStart`);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        }

        if (this.isAddedit) {
            this.buttons = [{
                title: '确定',
                check: true,
                handler: (params) => {
                    console.log(params);
                    params.creditCode = this.code;
                    params.operator = getUserId();
                    this.props.doFetching();
                    let bizCode = this.code ? 632112 : 632110;
                    // fetch(bizCode, params).then(() => {
                    //     showSucMsg('操作成功');
                    //     this.props.cancelFetching();
                    //     setTimeout(() => {
                    //         this.props.history.go(-1);
                    //     }, 1000);
                    // }).catch(this.props.cancelFetching);
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        }
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632117,
            buttons: this.buttons
        });
    }
}

export default CreditStartAddedit;
