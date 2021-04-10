// 成员列表查看功能
import { useEffect } from 'react';
import { connect } from 'dva';
import { Table, Tag, Space,Button } from 'antd';
import { Link } from 'umi';

function EmployeeList({ employee, dispatch }) {
    const { Column, ColumnGroup } = Table;
    // 如果列表对象已经存在了内容，则不再进行get请求的数据加载，直接从store中获取数据
    if(!employee || employee.length === 0){
      // 初始化数据功能：模拟get请求获取数据
    useEffect(() => {
        dispatch({
        type: 'employee/getAll',
        });
    }, []);
  }
  return (
    <div>
      <h1>成员列表信息</h1>
      <Table dataSource={employee}>
    <ColumnGroup title="Name">
      <Column title="First Name" dataIndex="firstName" key="firstName" />
      <Column title="Last Name" dataIndex="lastName" key="lastName" />
    </ColumnGroup>
    <Column title="Age" dataIndex="age" key="age" />
    <Column title="Address" dataIndex="address" key="address" />
    <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={tags => (
        <>
          {tags.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )}
    />
    <Column
      title="Action"
      key="action"
      render={(text, record) => (
        <Space size="middle">
         <Button
              onClick={() =>
                dispatch({
                  type: 'employee/deleteEmployee',
                  payload: {
                    key: record.key,
                  },
                })
              }
            >
              删除
            </Button>
            <Link to={'/employee/'+record.key}>编辑</Link>
        </Space>
      )}
    />
  </Table>
    </div>
  );
}

export default connect(({ employee }) => ({ employee }))(EmployeeList);
