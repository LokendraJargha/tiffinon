import React,{useState} from 'react';
import { CCard, CCol, CRow} from '@coreui/react'
import GridTable from '../../components/grid/index'
//import Form from './form'
import Module from '../../components/auth/roles/index'

const Roles = () => {
	const [modules, setModules] = useState({
		visible: false
	})

	const handleCreate = (e) => {
		e.preventDefault();
		setModules({visible: true, isEdit: false, role: {}})
	}

	const handeEditAction = (e,row) =>{
		e.preventDefault();
		setModules({visible: true, isEdit: true, role: row})
	}

	const columns = [
	{
		title: 'Name',
		order: 1,
		dataIndex: 'name',
		sorter: true,
		editable: false
	},
	{
		title: 'created_at',
		order: 4,
		dataIndex: 'created_at',
		sorter: true,
	}]
	const acolumns = {
		apiurl: 'roles',
		title: 'Roles',
		settings: {
			show: true,
			create: {
				show: true,
				name: 'Create',
				value: 'create',
				type: 'popup', //popup or link if type is link must be define url
				url: '',
				callFunction: 'handleCreate'
			},
			delete: {
				show: true,
				value: 'delete',
				name: 'Delete',
				type: 'popup',
			}
		},
		statusColumn: [{
			column: 'Active',
			dataIndex: 'status',
			show: true,
			order: 3,
			primaryIndex: true, //only one column should be true
			callFunction: '',
		}],
		pivotRelation: {
		  items: [{
		  	order:2,
		    column: 'Allow Modules',
		    show: true,
		    relationName: 'modules',
		    relationColName: 'name',
		    dType: 'array'//we can pass dType like array or object
		  }]
		},		
		actions: {
			show: true,
		  edit: {
		    show: true,
		    name: 'Edit',
		    type: 'popup', //it should only two type: popup/url if type is url its redirect to path like {modules/id/edit} 
				callFunction: 'handleEdit'
		  },
	    delete:{
	      show: true,
	  		type: 'popup',
	      name: 'Delete',
	    }
		}
	}
	return(
		<CRow>
			<CCol xl={12} md={12}>
				<CCard>
					<GridTable
						columns={columns}
						acolumns={acolumns}
						handleCreate={(e) => handleCreate(e)}
						handleEdit = {(e,row) => handeEditAction(e,row)}
					/>
				</CCard>
			</CCol>
			{
				modules.visible && (
					<Module {...modules} handleClose={()=>setModules({visible: false})}/>
				)
			}
		</CRow>
	)
}

export default Roles;