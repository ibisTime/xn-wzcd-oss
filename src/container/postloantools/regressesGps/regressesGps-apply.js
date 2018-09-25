import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail-dev';
import { getUserId } from 'common/js/util';

@Form.create()
class RegressesGpsApply extends DetailUtil {
    render() {
        const fields = [{
            field: 'operator',
            value: getUserId(),
            hidden: true
        }, {
            title: 'gps设备号',
            field: 'code',
            type: 'select',
            pageCode: 632705,
            params: {
                applyStatus: '2',
                applyUser: getUserId()
            },
            keyName: 'code',
            valueName: 'gpsDevNo'
        }, {
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
        return this.buildDetail({
            fields,
            addCode: 632701
        });
    }
}

export default RegressesGpsApply;
