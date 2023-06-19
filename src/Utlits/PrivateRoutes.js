import React from 'react'
import { privateRoutes } from '../Store/PrivateRoutes';
import { observer } from 'mobx-react-lite';
const PrivateRoutes = observer( ()=> {
  return (
    <div>
     {privateRoutes.renderProtectedRoutes()}
    </div>
  )
})

export default PrivateRoutes
