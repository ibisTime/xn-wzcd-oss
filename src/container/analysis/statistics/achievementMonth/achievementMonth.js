import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/analysis/achievementMonth';
import {
    listWrapper
} from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.analysisAchievementMonth,
        parentCode: state.menu.subMenuCode
    }), {
        setTableData,
        clearSearchParam,
        doFetching,
        setBtnList,
        cancelFetching,
        setPagination,
        setSearchParam,
        setSearchData
    }
)
class AchievementMonth extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 630909
        });
    }
}

export default AchievementMonth;
