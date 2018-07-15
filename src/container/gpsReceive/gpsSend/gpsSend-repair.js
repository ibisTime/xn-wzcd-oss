import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/gpsReceive/gpsSend-repair';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(state => state.gpsReceiveGpsSendRepair, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class GpsSendRepair extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.sendTypeFalg = false;
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'userName',
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
            title: '发货时间',
            field: 'sendDatetime',
            type: 'datetime',
            required: true,
            formatter: () => ''
        }, {
            title: '补件原因',
            field: 'supplementReason',
            readonly: true
        }, {
            title: '发货说明',
            field: 'sendNote',
            formatter: () => ''
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632156,
            editCode: 632153,
            okText: '确认'
        });
    }
}

export default GpsSendRepair;
