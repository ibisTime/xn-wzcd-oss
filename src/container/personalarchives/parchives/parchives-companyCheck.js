import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/personalarchives/parchives-companyCheck.js';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    CollapseWrapper
} from 'component/collapse-detail/collapse-detail';

@CollapseWrapper(
    state => state.personalarchivesParchivesCompanyCheck, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class ParchivesCompanyCheck extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '用户信息',
            items: [
                [{
                    title: '姓名',
                    field: 'realName',
                    readonly: true
                }, {
                    title: '身份证号码',
                    field: 'idNo',
                    required: true,
                    idCard: true,
                    readonly: true
                }, {
                    title: '手机号码',
                    field: 'mobile',
                    mobile: true,
                    required: true,
                    readonly: true
                }],
                [{
                    title: '工号',
                    field: 'jobNo',
                    required: true,
                    readonly: true
                }, {
                    title: '入职时间',
                    field: 'entryDatetime',
                    required: true,
                    type: 'date',
                    readonly: true
                }],
                [{
                    title: '岗位',
                    field: 'postCode',
                    type: 'treeSelect',
                    disabled: (item) => item.type !== '3',
                    listCode: 630106,
                    params: {
                        status: '1'
                    },
                    keyName: 'code',
                    valueName: 'name',
                    bParams: ['type'],
                    required: true,
                    readonly: true
                }, {
                    title: '上班班次',
                    field: 'jobClasses',
                    required: true,
                    type: 'select',
                    key: 'job_classes',
                    readonly: true
                }, {
                    title: '出生年月',
                    field: 'birthday',
                    required: true,
                    type: 'date',
                    readonly: true
                }],
                [{
                    title: '性别',
                    field: 'gender',
                    required: true,
                    type: 'select',
                    key: 'gender',
                    readonly: true
                }, {
                    title: '民族',
                    field: 'nation',
                    required: true,
                    readonly: true
                }, {
                    title: '籍贯',
                    field: 'nativePlace',
                    required: true,
                    readonly: true
                }],
                [{
                    title: '婚姻状况',
                    field: 'marryStatus',
                    required: true,
                    type: 'select',
                    key: 'marry_state',
                    readonly: true
                }, {
                    title: '政治面貌',
                    field: 'politics',
                    required: true,
                    type: 'select',
                    key: 'politics',
                    readonly: true
                }, {
                    title: '专业',
                    field: 'major',
                    required: true,
                    readonly: true
                }],
                [{
                    title: '学历',
                    field: 'education',
                    required: true,
                    type: 'select',
                    key: 'education',
                    readonly: true
                }, {
                    title: '状态',
                    field: 'workStatus',
                    readonly: true,
                    type: 'select',
                    key: 'work_status'
                }, {
                    title: '健康状况',
                    field: 'health',
                    readonly: true
                }],
                [{
                    title: '工资卡账号',
                    field: 'salaryCard',
                    bankCard: true,
                    readonly: true
                }, {
                    title: '开户行',
                    field: 'bankName',
                    type: 'select',
                    listCode: 802116,
                    keyName: 'bankCode',
                    valueName: 'bankName',
                    readonly: true
                }, {
                    title: '开户支行',
                    field: 'subbranch',
                    readonly: true
                }, {
                    title: '五险一金信息',
                    field: 'fiveInsuranceInfo',
                    type: 'select',
                    key: 'five_insurance_info',
                    readonly: true
                }],
                [{
                    title: '户籍地址',
                    field: 'residenceAddress',
                    required: true,
                    readonly: true
                }, {
                    title: '户籍性质',
                    field: 'residenceProperty',
                    required: true,
                    type: 'select',
                    key: 'residence_property',
                    readonly: true
                }, {
                    title: '社保登记日期',
                    field: 'socialSecurityRegDatetime',
                    type: 'date',
                    readonly: true
                }],
                [{
                    title: '现住址',
                    field: 'currentAddress',
                    readonly: true
                }, {
                    title: '紧急联系人',
                    field: 'emergencyContact',
                    readonly: true
                }, {
                    title: '紧急联系号码：',
                    field: 'emergencyContactMobile',
                    mobile: true,
                    readonly: true
                }],
                [{
                    title: '合同期限',
                    field: 'contractDeadline',
                    type: 'date',
                    readonly: true
                }, {
                    title: '合同类型',
                    field: 'contractType',
                    type: 'select',
                    key: 'contract_type',
                    readonly: true
                }, {
                    title: '试用期时间',
                    field: 'probationTime',
                    required: true,
                    type: 'select',
                    key: 'probation_time',
                    readonly: true
                }],
                [{
                    title: '转正日期',
                    field: 'convertDatetime',
                    type: 'date',
                    readonly: true
                }, {
                    title: '离职日期',
                    field: 'leaveDatetime',
                    type: 'date',
                    readonly: true
                }],
                [{
                    title: '门禁号',
                    field: 'entranceNo',
                    number: true,
                    readonly: true
                }, {
                    title: '考勤号',
                    field: 'checkNo',
                    number: true,
                    readonly: true
                }, {
                    title: '车牌号',
                    field: 'carNo',
                    readonly: true
                }],
                [{
                    title: '身份证复印件',
                    field: 'idNoPdf',
                    type: 'img',
                    readonly: true
                }, {
                    title: '照片',
                    field: 'photo',
                    type: 'img',
                    readonly: true
                }],
                [{
                    title: '微信号',
                    field: 'wechat',
                    readonly: true
                }, {
                    title: 'QQ',
                    field: 'qq',
                    number: true,
                    readonly: true
                }],
                [{
                    title: '社会关系',
                    field: 'socialRelationList',
                    required: true,
                    readonly: true,
                    type: 'o2m',
                    options: {
                        noSelect: true,
                        fields: [{
                            title: '成员姓名',
                            field: 'realName'
                        }, {
                            title: '与本人关系',
                            field: 'relation',
                            type: 'select',
                            key: 'borrower_relation'
                        }, {
                            title: '工作单位',
                            field: 'companyName'
                        }, {
                            title: '担任职务',
                            field: 'post'
                        }, {
                            title: '联系方式(电话)',
                            field: 'contact',
                            mobile: true
                        }]
                    }
                }],
                [{
                    title: '绩效工资考核标准',
                    field: 'performSalaryStandard',
                    type: 'textarea',
                    normalArea: true,
                    readonly: true
                }, {
                    title: '季度奖考核标准',
                    field: 'quarterlyAwardStandard',
                    type: 'textarea',
                    normalArea: true,
                    readonly: true
                }],
                [{
                    title: '通讯费报销标准',
                    field: 'commumicationFeeStandard',
                    type: 'textarea',
                    normalArea: true,
                    readonly: true
                }, {
                    title: '省会住宿报销标准',
                    field: 'provincialBedStandard',
                    type: 'textarea',
                    normalArea: true,
                    readonly: true
                }],
                [{
                    title: '非省会住宿报销标准',
                    field: 'noProvincialBedStandard',
                    type: 'textarea',
                    normalArea: true,
                    readonly: true
                }],
                [{
                    title: '出租车补助',
                    field: 'taxiWard',
                    amount: true,
                    readonly: true
                }, {
                    title: '市内交通现金补助',
                    field: 'trafficAward',
                    amount: true,
                    readonly: true
                }],
                [{
                    title: '电话现金补贴',
                    field: 'mobileAward',
                    amount: true,
                    readonly: true
                }, {
                    title: '餐补',
                    field: 'mealAward',
                    amount: true,
                    readonly: true
                }]
            ]
        }, {
            title: '流转日志',
            items: [
                [{
                    title: '流程日志',
                    field: 'list',
                    rowKey: 'id',
                    type: 'o2m',
                    listCode: 630176,
                    params: {
                        refOrder: this.code
                    },
                    options: {
                        rowKey: 'id',
                        noSelect: true,
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
                }]
            ]
        }, {
            title: '审核',
            open: true,
            items: [
                [{
                    title: '审核意见',
                    field: 'approveNote',
                    type: 'textarea',
                    normalArea: true,
                    required: true
                }]
            ]
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 632806,
                buttons: [{
                    title: '通过',
                    handler: (param) => {
                        param.approveResult = '1';
                        param.operator = getUserId();
                        this.props.doFetching();
                        fetch(632804, param).then(() => {
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
                    title: '不通过',
                    handler: (param) => {
                        param.approveResult = '0';
                        param.operator = getUserId();
                        this.props.doFetching();
                        fetch(632804, param).then(() => {
                            showSucMsg('操作成功');
                            this.props.cancelFetching();
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    },
                    check: true
                }, {
                    title: '返回',
                    handler: (param) => {
                        this.props.history.go(-1);
                    }
                }]
            });
}
}

export default ParchivesCompanyCheck;