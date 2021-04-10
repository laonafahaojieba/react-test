// 新增用户功能
import { Form, Input, InputNumber, Button } from 'antd';
import { connect } from 'dva';
import {useState} from 'react'

function Employee({employee,dispatch}) {
  // 新增用户方法
  function submitHandler(){
    // 将表单中的数据更新至employeeSelf对象中
    employeeSelf.firstName=newFirstName
    employeeSelf.lastName=newLastName
    employeeSelf.age=newAge
    employeeSelf.address=newAddress
    // 调用store层的更新用户方法（也可以新增用户），新增用户
    dispatch({
      type: 'employee/updateEmployeeInfo',
      payload: {
        employeeInfo: employeeSelf,
      },
    })
  }
  // 创建一个初始的用户对象
  let employeeSelf = {
      key:String(Math.floor(Math.random() * 1000000)).padStart(6, "0"),
      firstName:'',
      lastName:'',
      age:0,
      address:'',
      tags:["nice", "developer"]
    }
  // form表单案例中的方法
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
 
  //from表单的校验失败提示信息
  const validateMessages = {
    required: '${label} is required!',
    types: {
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  // 点击[新增]按钮，调用的方法，先进行表单校验，表单校验通过之后，再进行数据的保存操作
  const onFinish = (values) => {
    console.log(values);
    submitHandler()
  };
  // start 表单属性附初始值
  const [newFirstName,setNewFirstName] = useState('')
  const [newLastName,setNewLastName] = useState('')
  const [newAge,setNewAge] = useState('')
  const [newAddress,setNewAddress] = useState('')
   // end 表单属性附初始值
   // age更新时调用方法，使用(e)=>setNewAge(e.target.value),存在问题，所以采用该方法
  function onChange(value) {
    setNewAge(value)
  }
  

  return (
    <Form {...layout} onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name="firstName" label="FirstName" rules={[{ required: true }]}>
        <Input defaultValue={employeeSelf.firstName} value={newFirstName} onChange={
      (e)=>setNewFirstName(e.target.value)
    }/>
      </Form.Item>
      <Form.Item name="lastName" label="LastName" rules={[{  required: true }]}>
        <Input  defaultValue={employeeSelf.lastName} value={newLastName} onChange={
      (e)=>setNewLastName(e.target.value)
    }/>
      </Form.Item>
      <Form.Item name="age" label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
        <InputNumber  defaultValue={employeeSelf.age} value={newAge} onChange={onChange
    }/>
      </Form.Item>
      <Form.Item name="address" label="Address">
        <Input defaultValue={employeeSelf.address} value={newAddress} onChange={
      (e)=>setNewAddress(e.target.value)
    }/>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary"  htmlType="submit">
          新增
        </Button>
      </Form.Item>
    </Form>
  );
}

export default connect(({ employee }) => ({ employee }))(Employee);