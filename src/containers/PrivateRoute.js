// import AuthService from './Services/AuthService'
import { Redirect, Route } from 'react-router-dom'
import React from 'react'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = localStorage.getItem("customerData") ? true : false;
    return (
      <Route
    {...rest}
      render={props =>
        isLoggedIn  ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute
