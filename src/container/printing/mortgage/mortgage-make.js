import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/printing/mortgage-make';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import { DetailWrapper } from 'common/js/build-detail';
import { createHt } from 'common/js/contract/ICBC-dyht';
import { exportBOCZdzsxffq } from 'common/js/contract/BOC-zdzsxffq';
import { exportBOCSxfycx } from 'common/js/contract/BOC-sxfycx';
import { exportBOCDy } from 'common/js/contract/BOC-dy';
import { exportBOCCt } from 'common/js/contract/BOC-ct';
import { exportBOCJcdy } from 'common/js/contract/BOC-jcdy';
import { exportBOCZdzfjf } from 'common/js/contract/BOC-zdzfjf';
import { exportCCBDy } from 'common/js/contract/CCB-dy';
import { exportCCBFwf } from 'common/js/contract/CCB-fwf';
import { exportBOCFjd } from 'common/js/contract/CCB-fjd';
import { exportCCBJc } from 'common/js/contract/CCB-jc';
import { exportCCBXydb } from 'common/js/contract/CCB-xydb';

@DetailWrapper(
    state => state.printingMortgageMake, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class MortgageMake extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '主贷人姓名',
            field: 'customerName',
            readonly: true
        }, {
            title: '身份证号码',
            field: 'idNo',
            readonly: true
        }, {
            title: '配偶姓名',
            field: 'ghRealName',
            readonly: true
        }, {
            title: '身份证号码',
            field: 'ghIdNo',
            readonly: true
        }, {
            title: '家庭地址',
            field: 'applyNowAddress',
            formatter: (v, d) => {
              return d.applyNowAddressProvince ? `${d.applyNowAddressProvince} ${d.applyNowAddressCity} ${d.applyNowAddressArea} ${d.applyNowAddress}` : '';
            },
            readonly: true
        }, {
            title: '合同编号',
            field: 'bankContractCode',
            readonly: true
        }, {
            title: '账单日',
            field: 'billDatetime',
            readonly: true
        }, {
            title: '车牌号',
            field: 'carNumber',
            required: true
        }, {
            title: '车架号',
            field: 'frameNo',
            required: true
        }, {
            title: '发动机号',
            field: 'engineNo',
            required: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true
        }, {
            title: '银行贷款额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '服务费',
            field: 'fee',
            amount: true,
            readonly: true
        }, {
            title: '履约保证金',
            field: 'lyAmount',
            amount: true,
            readonly: true
        }, {
            title: '贷款期限（年）',
            field: 'loanPeriods',
            render: (v, d) => {
                return d.loanPeriods / 12;
            },
            readonly: true
        }, {
            title: '银行全称',
            field: 'fullName',
            formatter: (v, d) => {
                return d.bankSubbranch.fullName;
            },
            readonly: true
        }, {
            title: '银行委托人',
            field: 'bankClient',
            formatter: (v, d) => {
                return d.bankSubbranch.bankClient;
            },
            readonly: true
        }, {
            title: '银行地址',
            field: 'address',
            formatter: (v, d) => {
                return d.bankSubbranch.address;
            },
            readonly: true
        }, {
            title: '银行电话',
            field: 'phoneNumber',
            formatter: (v, d) => {
                return d.bankSubbranch.phoneNumber;
            },
            readonly: true
        }, {
            title: '委托书有效期',
            field: 'clientValidDate',
            formatter: (v, d) => {
                return d.bankSubbranch.clientValidDate;
            },
            readonly: true
        }, {
            title: '授权人姓名',
            field: 'autherName',
            formatter: (v, d) => {
                return d.bankSubbranch.autherName;
            },
            readonly: true
        }, {
            title: '授权人身份证',
            field: 'autherIdNo',
            formatter: (v, d) => {
                return d.bankSubbranch.autherIdNo;
            },
            readonly: true
        }, {
            title: '授权人电话',
            field: 'autherPhoneNumber',
            formatter: (v, d) => {
                return d.bankSubbranch.autherPhoneNumber;
            },
            readonly: true
        }, {
            title: '授权人地址',
            field: 'autherAddress',
            formatter: (v, d) => {
                return d.bankSubbranch.autherAddress;
            },
            readonly: true
        }, {
            title: '信用卡类型',
            field: 'creditCardType',
            formatter: (v, d) => {
                return d.bankSubbranch.creditCardType;
            },
            type: 'select',
            key: 'credit_card_type',
            readonly: true
        }, {
            title: '信用卡名称',
            field: 'creditCardName',
            formatter: (v, d) => {
                return d.bankSubbranch.creditCardName;
            },
            readonly: true
        }, {
            title: '所属地区',
            field: 'belongArea',
            formatter: (v, d) => {
                return d.bankSubbranch.belongArea;
            },
            readonly: true
        }, {
            title: '套打模版',
            field: 'pledgePrintTemplateId',
            type: 'select',
            key: 'pledge_print_template_id',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146,
            buttons: [{
                    title: '打印',
                    check: true,
                    handler: (param) => {
                        param.operator = getUserId();
                        this.props.doFetching();
                        let num = param.pledgePrintTemplateId;
                        fetch(632192, param).then((data) => {
                            if(num === '1') {
                              createHt(data, this.props.pageData);
                            } else if(num === '2') {
                              exportBOCZdzsxffq(data);
                            } else if(num === '3') {
                              exportBOCSxfycx(data);
                            } else if(num === '4') {
                              exportBOCDy(data, this.props.selectData.creditCardType);
                            } else if(num === '5') {
                              exportBOCCt(data);
                            } else if(num === '6') {
                              exportBOCJcdy(data);
                            } else if(num === '8') {
                              exportBOCZdzfjf(data);
                            } else if(num === '9') {
                              exportCCBDy(data);
                            } else if(num === '10') {
                              exportCCBFwf(data);
                            } else if(num === '11') {
                              exportBOCFjd(data);
                            } else if(num === '12') {
                              exportCCBJc(data);
                            } else if(num === '13') {
                              exportCCBXydb(data);
                            }
                            this.props.cancelFetching();
                            showSucMsg('操作成功');
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching());
                    }
                },
                {
                    title: '返回',
                    handler: (param) => {
                        this.props.history.go(-1);
                    }
                }
            ]
        });
    }
}

export default MortgageMake;
