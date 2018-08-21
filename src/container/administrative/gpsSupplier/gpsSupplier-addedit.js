import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/administrative/gpsSupplier-addedit';
import {getQueryString} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.administrativeGpsSupplierAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class gpsSupplierAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '名称',
            field: 'name',
            required: true
        }, {
            title: '联系人',
            field: 'contacts',
            required: true
        }, {
            title: '联系人手机号',
            field: 'contactsMobile',
            mobile: true,
            required: true
        }, {
            title: '地址',
            field: 'address',
            required: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 632780,
            editCode: 632781,
            detailCode: 632786
        });
    }
}

export default gpsSupplierAddedit;
