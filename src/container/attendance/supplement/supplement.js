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
} from '@redux/attendance/supplement';
import {
    showWarnMsg,
    showSucMsg,
    dateTimeFormat
} from 'common/js/util';
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
        ...state.attendanceSupplement,
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
class supplement extends React.Component {
    render() {
        const fields = [{
            title: '申请人',
            field: 'applyUser',
            render: (v, d) => {
                return d.applyUserArchive[0] && d.applyUserArchive[0].realName;
            }
        }, {
            title: '工号',
            field: 'jobNo',
            render: (v, d) => {
                return d.applyUserArchive[0] && d.applyUserArchive[0].jobNo;
            }
        }, {
            title: '部门',
            field: 'departmentName',
            render: (v, d) => {
                return d.applyUserArchive[0] && d.applyUserArchive[0].departmentName;
            }
        }, {
            title: '职务',
            field: 'postCode',
            render: (v, d) => {
                return d.applyUserArchive[0] && d.applyUserArchive[0].postName;
            }
        }, {
            title: '缘由',
            field: 'reason'
        }, {
            title: '申请时间',
            field: 'applyDatetime',
            rangedate: ['applyDatetimeStart', 'applyDatetimeEnd'],
            type: 'date',
            render: dateTimeFormat,
            search: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'leave_apply_status',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632605,
            btnEvent: {
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '0') {
                        showWarnMsg('不是待审核的记录！');
                    } else {
                        this.props.history.push(`/attendance/supplement/addedit?v=1&isCheck=1&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default supplement;
