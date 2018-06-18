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
import {COMPANY_CODE} from 'common/js/config';
import LoanCreditEnteringEdit from 'component/loanCreditEntering-edit/loanCreditEntering-edit';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.loanCreditStartAddedit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class CreditStartAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entryVisible: false,
            bankCreditResult: null,
            selectKey: ''
        };
        this.code = getQueryString('code', this.props.location.search);
        // 录入银行征信结果
        this.isEntry = !!getQueryString('isEntry', this.props.location.search);
        // 业务员初审
        this.isCheckSalesman = !!getQueryString('isCheckSalesman', this.props.location.search);
        // 准入审查
        this.isCheckFirst = !!getQueryString('isCheckFirst', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.newCar = true;
    }

    setEnteringVisible = (entryVisible, selectKey) => {
        let bankCreditResult = [];
        if (!this.state.bankCreditResult && this.props.isLoaded) {
            bankCreditResult = this.props.pageData.creditUser;
        }
        this.setState({entryVisible, selectKey, bankCreditResult: bankCreditResult});

        console.log(this.state.bankCreditResult);
    };

    creditEntryFun = (data) => {
        let falg = true;
        let bankCreditResult = this.state.bankCreditResult;
        for (let i = 0; i < bankCreditResult.length; i++) {
            if (bankCreditResult[i].code === data.code) {
                bankCreditResult[i] = data;
                falg = false;
            }
        }
        if (falg) {
            bankCreditResult.push(data);
        }
        this.setState({
            bankCreditResult: bankCreditResult
        });
    };

    render() {
        let _this = this;
        let buttons = [];

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

        let entryResultFields = [{
            title: '银行查询结果',
            field: 'bankResult',
            render: (text, record) => {
                return (
                    <span><a href="javascript:;" onClick={() => this.setEnteringVisible(true, record.code)}>录入</a></span>
                );
            },
            fixed: 'right'
        }];

        let creditReportFields = [{
            title: '征信报告',
            field: 'report',
            hidden: true,
            render: (text, record) => {
                return (
                    <span><a href="javascript:;" onClick={() => {
                        console.log(text, 'r', record);
                    }}>查看</a></span>
                );
            },
            fixed: 'right'
        }];

        let checkCourtResultFields = [{
            title: '法院网查询结果',
            field: 'report',
            hidden: true,
            render: (text, record) => {
                return (
                    <span><a href="javascript:;" onClick={() => {
                        console.log(text, 'r', record);
                    }}>录入</a></span>
                );
            },
            fixed: 'right'
        }];

        // 业务员初审
        if (this.isCheckSalesman) {
            o2mFields = o2mFields.concat(creditReportFields);

            buttons = [{
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

        // 银行录入结果
        if (this.isEntry) {
            o2mFields = o2mFields.concat(entryResultFields);

            buttons = [{
                title: '录入',
                check: true,
                handler: (params) => {
                    if (!this.state.bankCreditResult.length) {
                        showWarnMsg('请录入银行征信结果！');
                        return false;
                    }
                    params.creditCode = this.code;
                    params.bankCreditResultList = this.state.bankCreditResult;
                    params.operator = getUserId();
                    this.props.doFetching();
                    fetch(632111, params).then(() => {
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
            o2mFields = o2mFields.concat(creditReportFields);
            o2mFields = o2mFields.concat(checkCourtResultFields);

            buttons = [{
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
                scroll: {x: 1300},
                fields: o2mFields
            }
        }, {
            title: '附件',
            field: 'accessory',
            type: 'img',
            single: true,
            readonly: !this.isCheckSalesman,
            hidden: (!this.isCheckySalesman || this.isEntry || !this.isCheckFirst)
        }, {
            title: '审核说明',
            field: 'approveNote',
            readonly: !this.isCheckFirst,
            hidden: !this.isCheckFirst
        }];

        return (
            <div>
                {
                    this.props.buildDetail({
                        fields,
                        code: this.code,
                        view: this.view,
                        detailCode: 632117,
                        addCode: 632110,
                        editCode: 632110,
                        buttons: buttons,
                        beforeSubmit: (param) => {
                            if (!param.creditUserList) {
                                showWarnMsg('至少新增一条征信列表');
                                return false;
                            } else {
                                param.operator = getUserId();
                                return param;
                            }
                        }
                    })
                }
                <LoanCreditEnteringEdit code={this.state.selectKey}
                                        creditEntryFun={this.creditEntryFun}
                                        entryVisible={this.state.entryVisible}
                                        bankCreditResult={this.state.bankCreditResult}
                                        setModalVisible={this.setEnteringVisible}/>
            </div>
        );
    }
}

export default CreditStartAddedit;
