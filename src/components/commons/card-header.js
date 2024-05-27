import React from 'react'
import { Dropdown, Menu, Button} from 'antd';
import { CCardHeader } from '@coreui/react'
import { Link } from 'react-router-dom'
import { SettingOutlined, DownOutlined } from '@ant-design/icons';

const CardHeader = (props) => {
	const menu = (
	  <Menu>
	    <Menu.Item key="1">
	      <Link to={props.actions.listLink}>{props.actions.linkTitle}</Link>
	    </Menu.Item>
	  </Menu>
	);
	return(
		<CCardHeader>
		  {props.actions.linkTitle}
		  <small className="text-muted"> Create</small>
		  <div className="card-header-actions">
		    <Dropdown overlay={menu} placement="bottomRight">
		      <Button type="primary" icon={<SettingOutlined />}>
		        Settings <DownOutlined />
		      </Button>
		    </Dropdown>
		  </div>
		</CCardHeader>
	)
}

export default CardHeader