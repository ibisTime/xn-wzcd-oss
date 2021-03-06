import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/postloantools/installGps-toVoid';
import {
    getQueryString,
    showSucMsg,
    getUserId,
    getCompanyCode
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.postloantoolsInstallGpsToVoid, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class InstallGpstoVoid extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.edit = getQueryString('edit', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名1',
            field: 'customerName',
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '作废GPS设备号',
            field: 'Gpscode',
            type: 'select',
            listCode: 632707,
            params: {
                applyStatus: '2',
                companyApplyStatus: '1',
                companyCode: getCompanyCode(),
                useStatus: '1',
                bizCode: this.code
            },
            keyName: 'code',
            valueName: 'gpsDevNo',
            nowrap: true,
            required: true
        }, {
            title: '备注',
            field: 'remark'
        }, {
            title: 'GPS安装列表',
            field: 'budgetOrderGpsList',
            type: 'o2m',
            options: {
                fields: [{
                    title: 'GPS设备号',
                    field: 'gpsDevNo',
                    nowrap: true,
                    required: true
                }, {
                    title: '安装位置',
                    field: 'azLocation',
                    type: 'select',
                    key: 'az_location',
                    nowrap: true,
                    required: true
                }, {
                    title: '安装时间',
                    field: 'azDatetime',
                    type: 'date',
                    nowrap: true,
                    required: true
                }, {
                    title: '安装人员',
                    field: 'azUser',
                    nowrap: true,
                    required: true
                }, {
                    title: '备注',
                    field: 'remark',
                    nowrap: true
                }]
            }
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146,
            buttons: [{
                title: '确认',
                handler: (param) => {
                    param.operator = getUserId();
                    param.code = this.props.selectData.Gpscode[0].code;
                    this.props.doFetching();
                    if (this.edit) {
                        param.gpsAzList = param.budgetOrderGpsList;
                    }
                    fetch(632343, param).then(() => {
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
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default InstallGpstoVoid;