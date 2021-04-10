// 更新用户功能
import { Form, Input, InputNumber, Button } from 'antd';
import { connect } from 'dva';
import {useState} from 'react'

function Employee({employee,dispatch,
  match: {
    params: { key },
  }
}) {
  // 从store中获取对应的用户数据
  const employeeSelf = employee.find((employeeOne) => employeeOne.key === key)
  console.log(employeeSelf)
  // form表单案例中的方法
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  // from表单的校验失败提示信息
  const validateMessages = {
    required: '${label} is required!',
    types: {
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  //表单校验方法
  const onFinish = (values) => {
    console.log(values);
  };

  // start 表单属性附初始值
  const [newFirstName,setNewFirstName] = useState(employeeSelf.firstName)
  const [newLastName,setNewLastName] = useState(employeeSelf.lastName)
  const [newAge,setNewAge] = useState(employeeSelf.age)
  const [newAddress,setNewAddress] = useState(employeeSelf.address)
  // end 表单属性附初始值

  // 更新用户方法
  function submitHandler(){
    if(newFirstName){
      employeeSelf.firstName=newFirstName
    }
    if(newLastName){
      employeeSelf.lastName=newLastName
    }
    if(newAge){
      employeeSelf.age=newAge
    }
    if(newAddress){
      employeeSelf.address=newAddress
    }
    // 调用store层的更新用户方法
    dispatch({
      type: 'employee/updateEmployeeInfo',
      payload: {
        employeeInfo: employeeSelf,
      },
    })
  }

  // age更新时调用方法，使用(e)=>setNewAge(e.target.value),存在问题，所以采用该方法
  function onChange(value) {
    setNewAge(value)
  }
  
  return (
    <Form {...layout} onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name="firstName" label="FirstName" rules={[{ required: true }]}>
        <Input defaultValue={newFirstName} value={newFirstName} onChange={
      (e)=>setNewFirstName(e.target.value)
    }/>
      </Form.Item>
      <Form.Item name="lastName" label="LastName" rules={[{  required: true }]}>
        <Input defaultValue={newLastName}  value={newLastName} onChange={
      (e)=>setNewLastName(e.target.value)
    }/>
      </Form.Item>
      <Form.Item name="age" label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
        <InputNumber defaultValue={newAge}  value={newAge} onChange={onChange
    }/>
      </Form.Item>
      <Form.Item name="address" label="Address">
        <Input defaultValue={newAddress}  value={newAddress} onChange={
      (e)=>setNewAddress(e.target.value)
    }/>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" onClick={
          submitHandler
        }>
          更新
        </Button>
      </Form.Item>
    </Form>
  );
}

export default connect(({ employee }) => ({ employee }))(Employee);