import React from 'react';
import moment from 'moment';
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
    getUserId,
    isUndefined
} from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getIdNoFront, getIdNoReverse } from 'api/user';
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
        this.curNodeCode = getQueryString('curNodeCode', this.props.location.search);
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
            mobile: true,
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
            required: true,
            onChange: (v, props) => {
                if (v) {
                    props.doFetching();
                    getIdNoFront(v).then((data) => {
                        if (data.success) {
                            let birthYear = data.birth.substr(0, 4);
                            let date = new Date();
                            let nowYear = date.getFullYear();
                            let num = nowYear - birthYear;
                            if(num < 18) {
                                showWarnMsg('18周岁以下征信不能提交');
                                return;
                            }
                            props.form.setFieldsValue({
                                idNo: data.idNo,
                                userName: data.realName
                            });
                        } else {
                            showWarnMsg('识别失败，请手动输入');
                        }
                        props.cancelFetching();
                    }).catch(() => {
                        props.cancelFetching();
                    });
                }
            }
        }, {
            title: '身份证反面',
            field: 'idNoReverse',
            type: 'img',
            single: true,
            required: true,
            onChange: (v, props) => {
                if (v) {
                    props.doFetching();
                    getIdNoReverse(v).then((data) => {
                        console.log(data);
                        if (data.success) {
                            let str = data.endDate;
                            let str1 = str.substr(0, 4);
                            let str2 = str.substr(4, 2);
                            let str3 = str.substr(6, 2);
                            let arr = [str1, str2, str3];
                            let date = arr.join('/');
                            var d = new Date('2019/09/09');
                            var n = new Date();
                            let days = (d.getTime() - n.getTime()).toFixed(0);
                            if(days < 0) {
                                showWarnMsg('身份证已经过期');
                            }else if(days < 90) {
                                showSucMsg('身份证有效期不足90天');
                            }
                        } else {
                            showWarnMsg('识别失败，请手动输入');
                        }
                        props.cancelFetching();
                    }).catch(() => {
                        props.cancelFetching();
                    });
                }
            }
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
        }, {
            title: '是否发送一审',
            field: 'isFirstAudit',
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value',
            readonly: true,
            hidden: !(this.isCheckSalesman || this.isCheckFirst),
            noVisible: !(this.isCheckSalesman || this.isCheckFirst)
        }];
        if (!this.isAddedit) {
            o2mFields = o2mFields.concat([{
                title: '贷款抵押笔数',
                field: 'dkdyCount',
                number: true,
                value: 0,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款抵押贷款余额',
                field: 'dkdyAmount',
                amount: true,
                value: 0,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款抵押近两年逾期次数',
                field: 'dkdy2YearOverTimes',
                number: true,
                value: 0,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款抵押最高逾期金额',
                field: 'dkdyMaxOverAmount',
                amount: true,
                value: 0,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款抵押当前逾期金额',
                field: 'dkdyCurrentOverAmount',
                amount: true,
                value: 0,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款抵押近6个月平均月还款额',
                field: 'dkdy6MonthAvgAmount',
                amount: true,
                value: 0,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款信用未结清贷款笔数',
                field: 'hkxyUnsettleCount',
                number: true,
                value: 0,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款信用未结清贷款余额',
                field: 'hkxyUnsettleAmount',
                amount: true,
                value: 0,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款信用近两年逾期次数',
                field: 'hkxy2YearOverTimes',
                number: true,
                value: 0,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款信用单月最高逾期金额',
                field: 'hkxyMonthMaxOverAmount',
                amount: true,
                value: 0,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款信用当前逾期金额',
                field: 'hkxyCurrentOverAmount',
                amount: true,
                value: 0,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '贷款信用近6个月平均月还款额',
                field: 'hkxy6MonthAvgAmount',
                amount: true,
                value: 0,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '信用卡张数',
                field: 'xykCount',
                number: true,
                value: 0,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '信用卡授信总额',
                field: 'xykCreditAmount',
                amount: true,
                value: 0,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '信用卡近6个月使用额',
                field: 'xyk6MonthUseAmount',
                amount: true,
                value: 0,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '信用卡近两年逾期次数',
                field: 'xyk2YearOverTimes',
                number: true,
                value: 0,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '信用卡单月最高逾期金额',
                field: 'xykMonthMaxOverAmount',
                amount: true,
                value: 0,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '信用卡当前逾期金额',
                field: 'xykCurrentOverAmount',
                amount: true,
                value: 0,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '对外担保笔数',
                field: 'outGuaranteesCount',
                number: true,
                value: 0,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '对外担保余额',
                field: 'outGuaranteesAmount',
                amount: true,
                value: 0,
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }, {
                title: '备注',
                field: 'outGuaranteesRemark',
                required: true,
                readonly: !this.isEntry,
                hidden: !this.view,
                noVisible: true
            }]);

            if((this.isCheckFirst || this.view) && !this.isCheckSalesman && !this.isEntry && !this.isAddedit) {
                o2mFields = o2mFields.concat([{
                    title: '法院网查询结果',
                    field: 'courtNetworkResults',
                    type: 'textarea',
                    normalArea: true,
                    required: true,
                    readonly: !this.isCheckFirst,
                    hidden: !this.view,
                    noVisible: true
                }]);
            }
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
                detail: !(this.isEntry || this.isCheckFirst || !this.view),
                check: (this.isEntry || this.isCheckFirst),
                checkName: '录入',
                scroll: {x: 1300},
                fields: o2mFields
            }
        }, {
            title: '流程日志',
            field: 'list',
            type: 'o2m',
            listCode: 630176,
            params: {
                refOrder: this.code
            },
            hidden: this.isEntry || this.isAddedit,
            options: {
                fields: [{
                    title: '操作人',
                    field: 'operatorName'
                }, {
                    title: '开始时间',
                    field: 'startDatetime',
                    type: 'datetime'
                }, {
                    title: '结束时间',
                    field: 'endDatetime',
                    type: 'datetime'
                }, {
                    title: '花费时长',
                    field: 'speedTime'
                }, {
                    title: '审核意见',
                    field: 'dealNote'
                }, {
                    title: '当前节点',
                    field: 'dealNode',
                    type: 'select',
                    listCode: 630147,
                    keyName: 'code',
                    valueName: 'name'
                }]
            }
        }, {
            title: '审核意见',
            field: 'approveNote',
            readonly: !this.isCheckSalesman && !this.isCheckFirst,
            hidden: !this.isCheckSalesman && !this.isCheckFirst,
            required: true
        }];

        // 业务员初审
        if (this.isCheckSalesman) {
            this.buttons = [{
                title: '通过并发送一审',
                check: true,
                handler: (params) => {
                    let list = this.props.o2mSKeys.creditUserList;
                    let length = list.length;
                    let arr = [];
                    let userList = params.creditUserList;
                    delete params.list;
                    for(let i = 0; i < length; i++) {
                        if(list[i] === userList[i].code) {
                            userList[i].isFirstAudit = '1';
                            arr.push(userList[i]);
                        }
                    }
                    params.creditUserList = arr;
                    if (!params.creditUserList.length) {
                        showSucMsg('请选择发送一审的名单');
                        return;
                    }
                    let mainRole = false;
                    for (let i = 0, len = params.creditUserList.length; i < len; i++) {
                        if (params.creditUserList[i].loanRole === '1') {
                            mainRole = true;
                            break;
                        }
                    }
                    if (!mainRole) {
                        showSucMsg('发送一审的名单中必须包含申请人');
                        return;
                    }
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
                    delete params.list;
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
                    delete params.list;
                    for (let i = 0; i < params.creditUserList.length; i++) {
                        if (!params.creditUserList[i].courtNetworkResults) {
                            showWarnMsg('请录入' + params.creditUserList[i].userName + '的法院网查询结果！');
                            return;
                        }
                    }
                    let courtNetworkResultsList = [];
                    params.creditUserList.map(v => {
                        courtNetworkResultsList.push({
                            code: v.code,
                            courtNetworkResults: v.courtNetworkResults
                        });
                    });
                    params.courtNetworkResultsList = courtNetworkResultsList;
                    delete params.creditUserList;
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
                    delete params.list;
                    let courtNetworkResultsList = [];
                    params.creditUserList.map(v => {
                        courtNetworkResultsList.push({
                            code: v.code,
                            courtNetworkResults: v.courtNetworkResults
                        });
                    });
                    params.courtNetworkResultsList = courtNetworkResultsList;
                    delete params.creditUserList;
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
                    delete params.list;
                    let data = {};
                    data.creditCode = this.code;
                    for (let i = 0; i < params.creditUserList.length; i++) {
                        if (isUndefined(params.creditUserList[i].dkdyCount)) {
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
                title: '保存',
                handler: (params) => {
                    delete params.list;
                    params.creditCode = this.code;
                    params.operator = getUserId();
                    params.buttonCode = '0';
                    this.props.doFetching();
                    let bizCode = this.code ? 632112 : 632110;
                    // if(this.curNodeCode === '001_01') {
                    //     bizCode = 632110;
                    // }
                    fetch(bizCode, params).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '发送',
                check: true,
                handler: (params) => {
                    delete params.list;
                    params.creditCode = this.code;
                    params.operator = getUserId();
                    params.buttonCode = '1';
                    this.props.doFetching();
                    let bizCode = this.code ? 632112 : 632110;
                    // if(this.curNodeCode === '001_01') {
                    //     bizCode = 632110;
                    // }
                    fetch(bizCode, params).then(() => {
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
