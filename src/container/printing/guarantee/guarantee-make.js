import React from 'react';
import XLSX from 'xlsx';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/printing/guarantee-make';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    moneyFormat,
    moneyUppercase,
    numUppercase,
    dateFormat,
    formatDate,
    moneyReplaceComma,
    moneyParse
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    CollapseWrapper
} from 'component/collapse-detail/collapse-detail';

@CollapseWrapper(
    state => state.printingGuaranteeMake, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class GuaranteeMake extends React.Component {
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
                    title: '客户姓名',
                    field: 'customerName',
                    readonly: true
                }, {
                    title: '业务编号',
                    field: 'code',
                    readonly: true
                }, {
                    title: '性别',
                    field: 'customerSex',
                    readonly: true
                }],
                [{
                    title: '身份证',
                    field: 'idNo',
                    readonly: true
                }, {
                    title: '生日',
                    field: 'customerBirth',
                    readonly: true
                }, {
                    title: '住所',
                    field: 'applyNowAddress',
                    readonly: true
                }],
                [{
                    title: '邮政编码',
                    field: 'postcode',
                    required: true
                }, {
                    title: '家庭电话',
                    field: 'familyPhone'
                }, {
                    title: '手机',
                    field: 'mobile',
                    readonly: true
                }],
                [{
                    title: '工作单位',
                    field: 'applyUserCompany',
                    readonly: true
                }, {
                    title: '职务',
                    field: 'applyUserDuty',
                    readonly: true
                }, {
                    title: '单位电话',
                    field: 'applyUserCompanyPhone'
                }]
            ]
        }, {
            title: '配偶信息',
            items: [
                [{
                    title: '客户姓名',
                    field: 'ghRealName',
                    readonly: true
                }, {
                    title: '身份证',
                    field: 'ghIdNo',
                    readonly: true
                }, {
                    title: '性别',
                    field: 'ghSex',
                    readonly: true
                }],
                [{
                    title: '手机电话',
                    field: 'ghMobile',
                    mobile: true
                }, {
                    title: '共还人公司名称',
                    field: 'ghCompanyName'
                }],
                [{
                    title: '与客户关系',
                    field: 'applyUserGhrRelation',
                    type: 'select',
                    key: 'credit_user_relation',
                    readonly: true
                }, {
                    title: '是否垫资',
                    field: 'isAdvanceFund',
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
                    readonly: true
                }]
            ]
        }, {
            title: '车辆信息',
            items: [
                [{
                    title: '车辆品牌',
                    field: 'carBrand'
                }, {
                    title: '车架号码',
                    field: 'frameNo'
                }, {
                    title: '发动机号码',
                    field: 'engineNo'
                }],
                [{
                    title: '车牌号码',
                    field: 'carNumber'
                }, {
                    title: '车辆颜色',
                    field: 'carColor'
                }, {
                    title: '品牌型号',
                    field: 'carModel',
                    readonly: true
                }],
                [{
                    title: '汽车总价',
                    field: 'originalPrice',
                    amount: true,
                    readonly: true
                }, {
                    title: '汽车发票价',
                    field: 'invoicePrice',
                    amount: true,
                    readonly: true
                }],
                [{
                    title: '汽车经销商名称',
                    field: 'carDealerName',
                    readonly: true
                }, {
                    title: '汽车经销商（联系电话）',
                    field: 'carDealerPhone',
                    readonly: true
                }]
            ]
        }, {
            title: '贷款银行信息',
            items: [
                [{
                    title: '贷款银行',
                    field: 'loanBankName',
                    readonly: true
                }, {
                    title: '银行名称（支行）',
                    field: 'fullName',
                    formatter: (v, d) => {
                        return d.bankSubbranch.fullName;
                    },
                    readonly: true
                }],
                [{
                    title: '贷款额(小写)',
                    field: 'loanAmount',
                    amount: true,
                    readonly: true
                }, {
                    title: '还款卡号',
                    field: 'bankCardNumber'
                }]
            ]
        }, {
            title: '档案信息',
            items: [
                [{
                    title: '档案编号',
                    field: 'customerName',
                    formatter: (v, d) => {
                        return d.code;
                    },
                    readonly: true
                }, {
                    title: '分期',
                    field: 'loanPeriods',
                    readonly: true
                }, {
                    title: '服务费',
                    field: 'fee',
                    amount: true,
                    readonly: true
                }],
                [{
                    title: '月还款额',
                    field: 'monthAmount',
                    amount: true
                }, {
                    title: '银行利率',
                    field: 'bankRate',
                    formatter: (v, d) => {
                      return (d.bankRate * 100).toFixed(4) + '%';
                    },
                    readonly: true
                }, {
                    title: '首付额',
                    field: 'repayFirstMonthAmount',
                    formatter: (v, d) => {
                        return moneyFormat(d.invoicePrice - d.loanAmount);
                    },
                    readonly: true
                }],
                [{
                    title: '总手续费(小写)',
                    field: 'serviceCharge',
                    amount: true,
                    readonly: true
                }, {
                    title: '总手续费(大写)',
                    field: 'code',
                    formatter: (v, d) => {
                        return moneyUppercase(moneyFormat(d.serviceCharge));
                    },
                    readonly: true
                }]
            ]
        }, {
            title: '担保人信息',
            items: [
                [{
                    title: '担保人姓名',
                    field: 'guarantor1Name',
                    readonly: true
                }, {
                    title: '身份证',
                    field: 'guarantor1IdNo',
                    readonly: true
                }, {
                    title: '性别',
                    field: 'guarantor1Sex',
                    readonly: true
                }],
                [{
                    title: '家庭电话',
                    field: 'guarantorFamilyPhone',
                    mobile: true
                }, {
                    title: '手机电话',
                    field: 'guarantor1Mobile',
                    readonly: true
                }, {
                    title: '工作单位',
                    field: 'guarantorCompanyName'
                }],
                [{
                    title: '担保人单位电话',
                    field: 'guarantorCompanyPhone',
                    mobile: true
                }, {
                    title: '担保人单位地址',
                    field: 'guarantorCompanyAddress'
                }, {
                    title: '担保人现地址',
                    field: 'guarantorNowAddress'
                }]
            ]
        }, {
            title: '其他信息',
            items: [
                [{
                    title: '承保公司',
                    field: 'insuranceCompany',
                    type: 'select',
                    listCode: 632046,
                    keyName: 'code',
                    valueName: 'name'
                }, {
                    title: '客户分类',
                    field: 'customerType',
                    type: 'select',
                    data: [{
                        key: '1',
                        value: '个人'
                    }, {
                        key: '2',
                        value: '企业'
                    }],
                    keyName: 'key',
                    valueName: 'value',
                    readonly: true
                }],
                [{
                    title: '客户具体情况说明',
                    field: 'guarantApplyUserNote',
                    type: 'textarea',
                    normalArea: true
                }],
                [{
                    title: '套打模板',
                    field: 'guarantPrintTemplateId',
                    type: 'select',
                    key: 'guarant_print_template_id',
                    required: true
                }]
            ]
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
                        param.code = this.code;
                        param.operater = getUserId();
                        this.props.doFetching();
                        let sex = ['', '男', '女'];
                        fetch(632142, param).then((data) => {
                            let num2 = Math.floor(((data.loanAmount + data.fee) / data.loanPeriods) / 1000) + Math.floor((((data.loanAmount + data.fee) * data.bankRate) / data.loanPeriods) / 1000);
                            num2 = moneyParse(num2);
                            let num1 = num2 * (data.loanPeriods - 1) - (data.loanAmount + data.fee) - ((data.loanAmount + data.fee) * data.bankRate);
                            let str1 = data.customerBirth.substr(0, 4);
                            let str2 = data.customerBirth.substr(4, 2) - 0;
                            let arr = [
                                ['工行姓名', data.customerName],
                                ['出生年月', str1 + '.' + str2],
                                ['性别', data.customerSex],
                                ['身份证号码', data.idNo],
                                ['手机号码', data.mobile],
                                ['工作单位', data.applyUserCompany],
                                ['现住址', data.applyNowAddress],
                                ['配偶姓名', data.ghRealName],
                                ['身份证号码', data.ghIdNo],
                                ['工作单位', data.ghCompanyName],
                                ['手机号码', data.ghMobile],
                                ['费利率（银行利率）', (data.bankRate * 100).toFixed(2)],
                                ['贷款额', moneyFormat(data.loanAmount)],
                                ['服务费', moneyReplaceComma(moneyFormat(data.fee))],
                                ['总贷款额（包含服务费）', moneyReplaceComma(moneyFormat(data.loanAmount + data.fee))],
                                ['贷款额（大写无元）', numUppercase(moneyFormat(data.loanAmount))],
                                ['服务费（大写无元）', numUppercase(moneyFormat(data.fee))],
                                ['总贷款额（大写无元）', numUppercase(moneyFormat(data.loanAmount + data.fee))],
                                ['分期期数', data.loanPeriods],
                                ['分期期数大写', numUppercase(data.loanPeriods)],
                                ['手续费总额', moneyReplaceComma(moneyFormat((data.loanAmount + data.fee) * data.bankRate))],
                                ['手续费总额大写', moneyUppercase(moneyFormat((data.loanAmount + data.fee) * data.bankRate))],
                                ['月还款额', moneyReplaceComma(moneyFormat(-num1)) + '/' + moneyReplaceComma(moneyFormat(num2))],
                                ['总贷款额和手续费总额', moneyReplaceComma(moneyFormat(data.loanAmount + data.fee + (data.loanAmount + data.fee) * data.bankRate))],
                                ['车辆总价', moneyReplaceComma(moneyFormat(data.originalPrice))],
                                ['车辆总价大写不带元', numUppercase(moneyFormat(data.originalPrice))],
                                ['车辆总价大写带元整', moneyUppercase(moneyFormat(data.originalPrice))],
                                ['首付额', moneyReplaceComma(moneyFormat(data.originalPrice - data.loanAmount - data.fee))],
                                ['首付额（大写无元）', numUppercase(moneyFormat(data.originalPrice - data.loanAmount - data.fee))],
                                ['车辆品牌', data.carBrand],
                                ['经销商', data.carDealerName],
                                ['发动机号', data.engineNo],
                                ['车架号', data.frameNo],
                                ['品牌型号', data.carModel],
                                ['担保人姓名', data.guarantor1IdNo],
                                ['性别', data.guarantor1Sex],
                                ['身份证号码', data.guarantor1IdNo],
                                ['手机号码', data.guarantor1Mobile],
                                ['现住址', data.guarantorNowAddress],
                                ['工作单位', data.guarantorCompanyName],
                                ['总的首期还款金额', moneyReplaceComma(moneyFormat(-num1))],
                                ['总的每期还款金额', moneyReplaceComma(moneyFormat(num2))],
                                ['原车发票价格', moneyReplaceComma(moneyFormat(data.invoicePrice))],
                                ['原车发票价格大写', moneyUppercase(moneyFormat(data.invoicePrice))]
                            ];
                            showSucMsg('操作成功');
                            const ws = XLSX.utils.aoa_to_sheet(arr);
                            const wb = XLSX.utils.book_new();
                            XLSX.utils.book_append_sheet(wb, ws, '数据');
                            XLSX.writeFile(wb, '担保合同-工商银行.xlsx');
                            this.props.cancelFetching();
                            setTimeout(() => {
                                this.props.history.go(-2);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
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

export default GuaranteeMake;
