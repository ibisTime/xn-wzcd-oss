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
    getUserId
} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import {COMPANY_CODE} from 'common/js/config';

@DetailWrapper(
    state => state.loanCreditStartAddedit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class CreditStartAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        // 是否是录入银行征信结果
        this.isEntry = getQueryString('isEntry', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.newCar = true;
    }

    render() {
        let _this = this;
        let entryResultFields = [{
            title: '银行查询结果',
            field: 'bankResult',
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

        let fields = [{
            title: '银行',
            field: 'loanBankCode',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName',
            searchName: 'bankName',
            required: true
        }, {
            title: '购车途径',
            field: 'shopWay',
            type: 'select',
            data: [{
                dkey: '1',
                dvalue: '新车'
            }, {
                dkey: '2',
                dvalue: '二手车'
            }],
            keyName: 'dkey',
            valueName: 'dvalue',
            value: '1',
            required: true,
            onChange: (value) => {
                _this.newCar = value === '1';
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
                fields: [{
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
                    // }, {
                    //     title: '征信报告',
                    //     field: 'report',
                    //     hidden: true,
                    //     render: (text, record) => {
                    //         return (
                    //             <span><a href="javascript:;" onClick={() => {
                    //                 console.log(text, 'r', record);
                    //             }}>查看</a></span>
                    //         );
                    //     }
                    // },
                    // {
                    //     title: '历史贷款',
                    //     field: 'history',
                    //     hidden: true,
                    //     render: (text, record) => {
                    //         return (
                    //             <span><a href="javascript:;" onClick={() => {
                    //                 console.log(text, 'r', record);
                    //             }}>查看</a></span>
                    //         );
                    //     },
                    //     fixed: 'right'
                    // }
                }]
            }
        }];

        // 是否是银行录入结果
        if (this.isEntry) {
            fields[5].options.fields = fields[5].options.fields.concat(entryResultFields);
        }
        ;

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

            </div>
        );
    }
}

export default CreditStartAddedit;
