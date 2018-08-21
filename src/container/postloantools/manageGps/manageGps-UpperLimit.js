import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/postloantools/manageGps-UpperLimit';
import {getQueryString, getUserId, showSucMsg} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.postloantoolsManageGpsUpperLimit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class manageGpsAddedit extends React.Component {
    render() {
        const fields = [{
            title: '上限个数',
            field: 'number',
            number: true,
            'Z+': true,
            min: 1,
            required: true,
            formatter: (v, data) => {
                return data.cvalue;
            }
        }];
        return this.props.buildDetail({
            fields,
            key: 'key',
            code: 'PERSONAL_APPLICATION_LIMIT',
            view: false,
            addCode: 632789,
            detailCode: 630047,
            buttons: [{
                title: '保存',
                check: true,
                handler: (params) => {
                    this.props.doFetching();
                    fetch(632789, params).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                    }).catch(this.props.cancelFetching);
                }
            }]
        });
    }
}

export default manageGpsAddedit;
