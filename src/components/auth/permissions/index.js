import React,{useState, useEffect} from 'react';
import { CCard, CCol, CRow} from '@coreui/react'
import {Button, Spin, Drawer, Switch, Tag} from 'antd';
import {connect} from 'react-redux';

import http from '../../../config';

const Permissions = (props) => {
	const [state, setState] = useState({
		loading: false,
		role_id: null,
		permissions: [],
	})

	useEffect(()=>{
		getPermissions();
	},[])

	const getPermissions = async () =>{
		setState({...state, loading: true});
		let rpermissions = []
		const {user} = props;
		const user_id = user.id, role_id=user.role_id;
		let result = await http.get('/permissions',{params: {user_id,role_id}});
		let modules = result.data.modules;
		result = result.data.permissions;
		if(result && result.length){
			modules.forEach((module)=>{
				let obj={}
				let ob = result.find((item)=>item.module_id === module.id)
				obj.id = ob ? ob.id : null;
				obj.module_id = module.id;
				obj.name = module.name;
				obj.read = ob ? (ob.read === 1 ? true : false) : false;
				obj.write = ob ? (ob.write === 1 ? true : false) : false;
				obj.delete = ob ? (ob.delete === 1 ? true : false) : false;
				rpermissions.push(obj)
			})
		}
		else{
			modules.forEach((item)=>{
				let obj = {};
				obj.read = true;
				obj.write = false;
				obj.delete = false;
				obj.module_id = item.id;
				obj.name = item.name;
				obj.id = null;
				rpermissions.push(obj)
			});
		}
		setState({
			...state,
			user_id:user_id,
			role_id: role_id, 
			permissions: rpermissions,
			loading: false
		});
	}

	const handleSubmit = async() =>{
		try{
			setState({...state,loading:true})
			let permissions = await http.post('/permissions',state);
			getPermissions();
			setState({...state,loading:false})
		}
		catch(err){
			setState({...state,loading:false})
		}
	}

	const getRole= () =>{
		const {role_id} = props.user;
		const {roles} = props;
		const role = roles.find((item)=>item.id === +role_id);
		return role.name;
	}

	const handleToggle =(e,index,type) => {
		const {permissions} = state
		permissions[index][type] = e;
		if(type === 'read' && !e){
			permissions[index]['write'] = false;
			permissions[index]['delete'] = false;
		}
		setState({...state, permissions}); 
	}

	const onClose = () =>{
		props.handleClose();
	}
	const {permissions} = state;

	return(
		<CRow>
		  <CCol xl={12} md={12}>
		    <CCard>
	        <Drawer
            title={`Modules Permissions of "${props.user.first_name}"`}
            width="960"
            closable={true}
            maskClosable={false}
            onClose={onClose}
            visible={props.visible}
            footer={
            	<div style={{textAlign: 'right'}}>
	              <Button key="submit" type="primary" loading={state.loading} onClick={handleSubmit}>
	                Update Permissions
	              </Button>
	            </div>
            }
          >
            <Spin spinning={state.loading}>
            	<div className="role" style={{marginBottom: '20px'}}>
            		Role : <Tag color="purple">{getRole()}</Tag>
            	</div>
            	<table className="table table-striped table-hover">
          	  	<thead>
        	  	    <tr>
        	  	      <th scope="col">#</th>
        	  	      <th scope="col">Module</th>
        	  	      <th scope="col">Read</th>
        	  	      <th scope="col">Write</th>
        	  	      <th scope="col">Delete</th>
        	  	    </tr>
        	  	  </thead>
        	  	  <tbody>
        	  	  {
        	  	  	permissions.map((permission,index)=>{
        	  	  		return(
        	  	  			<tr key={index}>
        	  	  			  <th scope="row">{index + 1}</th>
        	  	  			  <td>{permission.name}</td>
        	  	  			  <td><Switch checked={permission.read} onChange={(e)=>handleToggle(e,index,'read')} size="small" defaultChecked /></td>
        	  	  			  <td><Switch disabled={!permission.read} checked={permission.write} onChange={(e)=>handleToggle(e,index,'write')} size="small" defaultChecked /></td>
        	  	  			  <td><Switch disabled={!permission.read} checked={permission.delete} onChange={(e)=>handleToggle(e,index,'delete')} size="small" defaultChecked /></td>
        	  	  			</tr>
        	  	  		)
        	  	  	})
        	  	  }
        	  	  </tbody>
            	</table>
            </Spin>
          </Drawer>
			  </CCard>
			</CCol>
		</CRow>
	)
}
const mapStateToProps = state =>({
	modules: state.auth.modules,
	roles: state.auth.roles
})
export default connect(mapStateToProps,{})(Permissions);