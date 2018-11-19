import React from 'react';
import { initStates, doFetching, cancelFetching, setSelectData,
  setPageData, restore } from '@redux/basis/cities-addedit';
import { getQueryString } from 'common/js/util';
import fetch from 'common/js/fetch';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.basisCitiesAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class CitiesAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '城市ID',
            field: 'cityId'
        }, {
            title: '城市名称',
            field: 'cityName'
        }, {
            title: '所属省份ID',
            field: 'provId'
        }, {
            title: '所属省份名称',
            field: 'provName'
        }, {
            title: '更新时间',
            field: 'createDatetime',
            type: 'datetime'
        }];
        return this.props.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            detailCode: 630446
        });
    }
}

export default CitiesAddedit;
