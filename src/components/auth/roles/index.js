import React,{useState, useEffect} from 'react'
import { connect } from "react-redux"
import { CCard,CCol,CRow } from '@coreui/react'
import { Button, Drawer,Select,Switch,Tooltip, Form, Input,Alert, message, Row, Col, Spin} from 'antd';

import http from '../../../config'
import {setInitGrid, setRoles} from "../../../redux/actions";

const RoleForm = (props) => {
  const { Option } = Select;
  const { TextArea } = Input;

	const [form] = Form.useForm();
	const [state, setState] = useState({
		visible: false,
		loading: false,
		validationerror: 'closed',
		errors: []
	})

  const {isEdit} = props;

  useEffect(()=>{
    if(props.isEdit){
      initEdit();
    }
  },[props.isEdit]);

  const initEdit = () => {
    const {name, description,modules} = props.role;
    const mdules = []
    modules.forEach((item)=>{
      mdules.push(item.id)
    })
    form.setFieldsValue({
      name: name,
      description: description,
      modules: mdules,
    });
  }

  const onClose = () => {
    setState({
    	...state,
      validationerror: 'closed',
      errors: []
    });
    props.handleClose();
  }

  const handleSubmit = async(values) => {
  	try{
      const {id} = props.role;
      setState({...state, loading: true})
      let url = isEdit ? `/roles/${id}` : '/roles';
      let {roles} = props, role={};
      if(isEdit){ 
        delete values.name;
  		  role = await http.put(url, values);
        role = role.data.role;
      }
      else{
        role = await http.post(url, values);
        role = role.data.role;
        roles.push(role)
      }
      props.setRoles(roles);
  		form.resetFields();
      props.handleClose();
      setState({...state,loading: false})
      props.setInitGrid({init: true})
  	}
  	catch(err){
  		let error;
  		if(typeof err.response.data.message === 'string'){
  			error = err.response.data.message;
  		}
  		let ers = []
  		if(err.response.data.errors){
  			let errs = err.response.data.errors
  			for(let p in errs){
  				let obj = {};
  				obj.error = errs[p][0];
  				ers.push(obj)
  			}
  		}
      message.error({ content: error, duration: 10});
      setState({
      	...state,
      	loading: false,
				errors: ers,
				validationerror: error
			})
  	}
  }
  const {modules} = props;
	return (
	  <CRow>
	    <CCol xl={12} md={12}>
	      <CCard>
	        <Drawer
            title={`${props.isEdit ? 'Edit Role' : 'Add New Role'}`}
            width="720"
            closable={true}
            onClose={onClose}
            maskClosable={false}
            visible={props.visible}
          >
          	<Row>
          		<Col span={14} offset={6}>
	            	{
	            	  state.validationerror !=='closed' && 
	            	  <Alert message="Validation errors" description={state.validationerror} type="error" showIcon closable style={{marginBottom: '10px'}}/>
	            	}
	            	{
	            		state.errors.length > 0 && 
									state.errors.map((item, index)=>{
										return(
											<Alert message={item.error} style={{marginBottom: '20px'}} type="error" showIcon key={index} closable/>
										)
									})
	            	}
	            </Col>
            </Row>
            <Spin spinning={state.loading}>
              <Form
              	form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal" 
                onFinish={handleSubmit}             
              >
                <Form.Item 
                	label="Name"
                	name="name"
                	rules={[{ required: true, message: 'Please enter Name!' }]}
                >
                  <Input placeholder="Name" disabled={isEdit}/>
                </Form.Item>
                <Form.Item 
                  label="Description"
                  name="description"
                >
                  <TextArea placeholder="Description"/>
                </Form.Item>
                
                <Form.Item 
                	label="Allow Modules"
                	name="modules"
                	rules={[
                		{ required: true, message: 'Please select the module.' },
                	]}
                >
                  <Select
                    showSearch
                    mode="multiple"
                    style={{ width: 300 }}
                    placeholder="Select modules"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {
                      modules.map((item,index)=>{
                        return(<Option key={index} value={item.id}>{item.name}</Option>)
                      })
                    }
                  </Select>
                </Form.Item>
                <Form.Item label=" " colon={false}>
                  <Button type="primary" htmlType="submit">
                    {isEdit ? 'Update Role' : 'Create Role'}
                  </Button>
                </Form.Item>
              </Form>
            </Spin>
          </Drawer>
	      </CCard>
	    </CCol>
	  </CRow>
	)
}
const mapStateToProps = state => ({
  modules: state.auth.modules,
  roles: state.auth.roles
});
export default connect(mapStateToProps,{setInitGrid, setRoles})(RoleForm)