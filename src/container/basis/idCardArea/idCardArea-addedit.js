import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/basis/idCardArea-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper,
    beforeDetail
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.basisIdCardAreaAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class IdCardAreaAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '身份证区域号',
            field: 'areaNo',
            required: true
        }, {
            title: '身份证区域名称',
            field: 'areaName',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            addCode: 632010,
            editCode: 632012,
            detailCode: 632016
        });
    }
}

export default IdCardAreaAddedit;