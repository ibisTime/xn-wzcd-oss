import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/dataReceive/dataSend-send';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(state => state.dataReceiveDataSendSend, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class DataSendSend extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.sendTypeFalg = false;
    }
    render() {
        const fields = [{
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
            title: '发件说明',
            field: 'sendNote',
            formatter: () => ''
        }];
        return this.props.buildDetail({
            fields,
            view: this.view,
            buttons: [{
                title: '确认',
                handler: (param) => {
                    param.operator = getUserId();
                    param.codeList = this.code.split(',');
                    delete param.code;
                    fetch(632150, param).then(() => {
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

export default DataSendSend;