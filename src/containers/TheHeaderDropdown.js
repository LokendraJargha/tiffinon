import React from 'react'
import {CBadge,CDropdown,CDropdownItem,CDropdownMenu,CDropdownToggle,CImg} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { local } from 'brownies';
import {useHistory} from 'react-router-dom';

import http from '../config'

const TheHeaderDropdown = (props) => {
  const history = useHistory();
  const handleLogout = async() => {
    try{
      await http.post('/auth/log-out');
      local.access_token=null;
      history.push('/login')
    }
    catch(err){
      local.access_token=null
      history.push('/login');
    }
  }
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/6.jpg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem onClick={handleLogout}>
          <CIcon name="cil-account-logout" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
