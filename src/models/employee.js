import request from 'umi-request';

export default {
  namespace: 'employee',

  state: [],
// 同步请求
  reducers: {
    // 更新方法，当使用模拟的get请求时，获取到的数据通过该方法更新
    update(_, { payload }) {
      const { employees } = payload;
      console.log(employees)
      return employees;
    },
    // 更新个人信息
    updateEmployeeInfo(state, { payload }) {
      const { employeeInfo} = payload;
      const {key:employeesInfoKey } = employeeInfo;
      // 根据用户对象中的key值判断当前用户是否在state中
      const exits = state.find((e) => e.key !== employeesInfoKey);
      // 创建一个空数据，用来返回最新的数据
      let newEmployeeList = []
      if(exits){
        // 如果state中存在当前用户数据，则先进行删除操作
        const employeeList = state.filter((e) => e.key !== employeesInfoKey);
        // 追加新的用户进去
        newEmployeeList= employeeList.concat([employeeInfo])
      } else {
        // 如果state中没有当前用户数据，直接追加
        newEmployeeList = state.concat([employeeInfo])
      }
      console.log(newEmployeeList)
      return newEmployeeList;
    },
    // 删除用户方法
    deleteEmployee(state, { payload }) {
      const { key: targetkey } = payload;
      const employeeList = state.filter((e) => e.key !== targetkey);
      console.log(employeeList)
      return employeeList
    },
  },
// 异步请求
  effects: {
    *getAll(_, { call, put }) {
      const response = yield call(request.get, '/api/employees');

      yield put({
        type: 'update',
        payload: {
          employees: response,
        },
      });
    },
  },
};
