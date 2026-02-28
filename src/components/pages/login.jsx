import React, {Component} from 'react';
import {connect} from 'react-redux'

class Login extends Component {

    render (){
        return (
         <signForm user={this.props.user} data={this.props}/>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.user.user,


    
})
export default connect(mapStateToProps)(Login)