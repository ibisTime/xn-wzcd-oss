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
    showSucMsg
} from 'common/js/util';
import {
  CollapseWrapper
} from 'component/collapse-detail/collapse-detail';

@CollapseWrapper(
  state => state.loaNarchivesAddedit, {
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
                    field: '1',
                    type: 'select',
                    readonly: true
                }],
                [{
                    title: '身份证',
                    field: 'customerName',
                    readonly: true
                }, {
                    title: '家庭电话',
                    field: 'code',
                    readonly: true
                }, {
                    title: '住所',
                    field: '1',
                    type: 'select',
                    readonly: true
                }],
                [{
                    title: '邮政编码',
                    field: 'customerName',
                    required: true
                }, {
                    title: '家庭电话',
                    field: 'code'
                }, {
                    title: '手机',
                    field: '1'
                }],
                [{
                    title: '工作单位',
                    field: 'customerName',
                    readonly: true
                }, {
                    title: '职务',
                    field: 'code',
                    readonly: true
                }, {
                    title: '单位电话',
                    field: '1',
                    mobile: true
                }]
            ]
        }, {
            title: '配偶信息',
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
                    field: '1',
                    type: 'select',
                    readonly: true
                }],
                [{
                    title: '家庭电话',
                    field: 'customerName'
                }, {
                    title: '手机电话',
                    field: 'code',
                    readonly: true
                }, {
                    title: '工作单位',
                    field: '1'
                }],
                [{
                    title: '与客户关系',
                    field: 'customerName',
                    readonly: true
                }, {
                    title: '是否垫资',
                    field: 'code',
                    readonly: true
                }]
            ]
        }, {
            title: '车辆信息',
            items: [
                [{
                    title: '车辆品牌',
                    field: 'customerName'
                }, {
                    title: '车架号码',
                    field: 'code'
                }, {
                    title: '发动机号码',
                    field: ''
                }],
                [{
                    title: '车牌号码',
                    field: 'customerName'
                }, {
                    title: '车辆颜色',
                    field: 'code'
                }, {
                    title: '品牌型号',
                    field: '1'
                }],
                [{
                    title: '汽车总价',
                    field: 'customerName',
                    readonly: true
                }, {
                    title: '汽车发票价',
                    field: 'code',
                    readonly: true
                }],
                [{
                    title: '汽车经销商名称',
                    field: 'customerName',
                    readonly: true
                }, {
                    title: '汽车经销商（联系电话）',
                    field: 'code',
                    readonly: true
                }, {
                    title: '购车车行',
                    field: 'code',
                    readonly: true
                }]
            ]
        }, {
            title: '贷款银行信息',
            items: [
                [{
                    title: '汽车总价',
                    field: 'customerName',
                    readonly: true
                }, {
                    title: '汽车发票价',
                    field: 'code',
                    readonly: true
                }],
                [{
                    title: '贷款额(小写)',
                    field: 'customerName',
                    amount: true,
                    readonly: true
                }, {
                    title: '还款卡号',
                    field: 'code'
                }]
            ]
        }, {
            title: '档案信息',
            items: [
                [{
                    title: '档案编号',
                    field: 'customerName',
                    readonly: true
                }, {
                    title: '期限',
                    field: 'code'
                }, {
                    title: '分期',
                    field: 'code',
                    readonly: true
                }],
                [{
                    title: '月还款额',
                    field: 'customerName',
                    amount: true,
                    readonly: true
                }, {
                    title: '首付额',
                    field: 'code',
                    amount: true,
                    readonly: true
                }, {
                    title: '利率',
                    field: 'code'
                }],
                [{
                    title: '总手续费(小写)',
                    field: 'customerName',
                    amount: true,
                    readonly: true
                }, {
                    title: '总手续费(大写)',
                    field: 'code',
                    amount: true,
                    readonly: true
                }],
                [{
                    title: '服务费',
                    field: 'customerName',
                    amount: true,
                    readonly: true
                }, {
                    title: '合同编号',
                    field: 'code',
                    amount: true,
                    readonly: true
                }, {
                    title: '月费率',
                    field: 'code'
                }]
            ]
        }, {
            title: '担保人信息',
            items: [
                [{
                    title: '担保人姓名',
                    field: 'customerName',
                    readonly: true
                }, {
                    title: '身份证',
                    field: 'code',
                    readonly: true
                }, {
                    title: '性别',
                    field: '1',
                    type: 'select',
                    readonly: true
                }],
                [{
                    title: '家庭电话',
                    field: 'customerName',
                    mobile: true
                }, {
                    title: '手机电话',
                    field: 'code',
                    readonly: true
                }, {
                    title: '工作单位',
                    field: '1'
                }],
                [{
                    title: '担保人单位',
                    field: 'customerName'
                }, {
                    title: '担保人单位电话',
                    field: 'code',
                    mobile: true
                }, {
                    title: '担保人单位地址',
                    field: '1'
                }]
            ]
        }, {
            title: '其他信息',
            items: [
                [{
                    title: '承保公司',
                    field: 'customerName'
                }, {
                    title: '客户分类',
                    field: 'code',
                    mobile: true
                }],
                [{
                    title: '客户具体情况说明',
                    field: '1',
                    type: 'textarea',
                    normalArea: true
                }],
                [{
                    title: '套打模板',
                    field: '1',
                    type: 'select',
                    key: '1'
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
                    handler: (selectedRowKeys, selectedRows) => {
                        let data = [];
                        console.log(fields);
                        console.log(this.props.pageData);
                        let pageData = this.props.pageData;
                        fields.forEach(f => {
                            let arr = [f.title, pageData[f.field]];
                            data.push(arr);
                        });
                        console.log(data);
                        const ws = XLSX.utils.aoa_to_sheet(data);
                        const wb = XLSX.utils.book_new();
                        XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
                        XLSX.writeFile(wb, 'sheetjs.xlsx');
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