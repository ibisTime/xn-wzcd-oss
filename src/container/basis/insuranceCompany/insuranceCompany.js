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
} from '@redux/basis/insuranceCompany';
import {
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import {
    Button,
    Upload,
    Modal
} from 'antd';
import {
    listWrapper
} from 'common/js/build-list';
import {
    lowerFrame,
    onShelf,
    sendMsg
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.basisInsuranceCompany,
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
class InsuranceCompany extends React.Component {
    render() {
        const fields = [{
            title: '公司名称',
            field: 'keyword',
            search: true,
            render: (e, t) => {
                return t.name;
            }
        }, {
            title: '联系人',
            field: 'contact'
        }, {
            title: '联系电话',
            field: 'mobile'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632045,
            deleteCode: 632041
        });
    }
}

export default InsuranceCompany;