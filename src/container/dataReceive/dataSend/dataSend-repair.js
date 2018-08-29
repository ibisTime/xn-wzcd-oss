import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/dataReceive/dataSend-repair';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(state => state.dataReceiveDataSendRepair, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class DataSendRepair extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.sendTypeFalg = false;
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'customerName',
            readonly: true
        }, {
            title: '业务编号',
            field: 'bizCode',
            readonly: true
        }, {
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'logistics_type',
            readonly: true
        }, {
            title: '发件节点',
            field: 'fromNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            readonly: true
        }, {
            title: '收件节点',
            field: 'toNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            readonly: true
        }, {
            title: '寄送方式',
            field: 'sendType',
            type: 'select',
            data: [{
                key: '1',
                value: '线下'
            }, {
                key: '2',
                value: '快递'
            }],
            keyName: 'key',
            valueName: 'value',
            required: true,
            value: '2',
            onChange: (value) => {
                this.sendTypeFalg = value === '1';
            }
        }, {
            title: '快递公司',
            field: 'logisticsCompany',
            type: 'select',
            key: 'kd_company',
            required: !this.sendTypeFalg,
            hidden: this.sendTypeFalg,
            formatter: () => ''
        }, {
            title: '快递单号',
            field: 'logisticsCode',
            required: !this.sendTypeFalg,
            hidden: this.sendTypeFalg,
            formatter: () => ''
        }, {
            title: '发件时间',
            field: 'sendDatetime',
            type: 'datetime',
            required: true,
            formatter: () => ''
        }, {
            title: '补件原因',
            field: 'supplementReasonList',
            type: 'o2m',
            options: {
                rowKey: 'id',
                fields: [{
                    title: '原因',
                    field: 'reason'
                }]
            }
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632156,
            buttons: [{
                title: '确认',
                handler: (param) => {
                    let list = this.props.o2mSKeys.supplementReasonList;
                    if (!list.length) {
                        showSucMsg('请勾选补件原因');
                        return;
                    }
                    if (param.supplementReasonList.length !== list.length) {
                      showSucMsg('补件原因还未勾选完全，无法发件');
                      return;
                    }
                    param.operator = getUserId();
                    fetch(632153, param).then(() => {
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

export default DataSendRepair;
