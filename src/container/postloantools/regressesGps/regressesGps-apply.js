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
    }
    render() {
        const fields = [{
            title: 'GPS设备号',
            field: 'code',
            type: 'select',
            listCode: 632707,
            params: {
                applyStatus: '0',
                companyApplyStatus: '1',
                companyCode: getCompanyCode()
            },
            keyName: 'code',
            valueName: 'gpsDevNo',
            nowrap: true,
            required: true
        }, {
            title: '回退原因',
            field: 'reason'
        }];
        return this.props.buildDetail({
            fields,
            view: this.view,
            buttons: [{
                title: '确认',
                handler: (param) => {
                    param.code = this.code;
                    param.applyUser = getUserId();
                    if (!param.gpsList) {
                        showWarnMsg('请新增GPS!');
                        return false;
                    }
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