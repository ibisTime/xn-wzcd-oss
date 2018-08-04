import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/postloantools/regressesGps-apply';
import {
    getQueryString,
    getCompanyCode,
    getUserId,
    showSucMsg,
    showWarnMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.postloantoolsRegressesGpsApply, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class RegressesGpsApply extends React.Component {
    constructor(props) {
        super(props);
        this.view = !!getQueryString('v', this.props.location.search);
        this.code = getQueryString('code', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '回退原因',
            field: 'reason',
            type: 'select',
            data: [{
                key: '1',
                value: 'gps损坏'
            }, {
                key: '2',
                value: '员工离职'
            }],
            keyName: 'key',
            valueName: 'value'
        }];
        return this.props.buildDetail({
            fields,
            view: this.view,
            buttons: [{
                title: '确认',
                handler: (param) => {
                    param.code = this.code;
                    param.operator = getUserId();
                    this.props.doFetching();
                    fetch(632701, param).then(() => {
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

export default RegressesGpsApply;