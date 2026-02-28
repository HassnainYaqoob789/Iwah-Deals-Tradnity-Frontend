import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {custSignUp} from '../../actions'
import "./register.css";
import HeadSEO from '../layouts/tradnity/headSEO';
import { useForm } from "react-hook-form";


function registerForm() {


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    trigger,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    data["Country"] =  localStorage.getItem('country');
    custSignUp(data);
    reset();
  };
  



  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

 

  useEffect(()=>{
    document.querySelector('body').scrollTo(0,0)
   },[])


  return(
    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
     <HeadSEO title="Register" />


<section className="marginia" >
  <div className="form-container">
    <div className="section-header">
      <h1 className="primary-heading">
        Create a new account
      </h1>
      <h2 className="secondary-heading">
        Already A Member? <Link to={`${process.env.PUBLIC_URL}/login`} className="login-link">Login Now!</Link>
      </h2>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className="form my-4" >
      <div className="form-input">
        <div className="name-input">
          <div style={{width:"100%", textAlign:"initial"}}>

          <input type="text" className={`modifierI fw-normal ${errors.first_name && "invalid"}`} placeholder="Enter First Name" {...register("first_name", { required: "First Name is Required",
                minLength: {
                  value: 3,
                  message: "First Name must be at least 3 characters",
                }
               })}
                onKeyUp={() => {
                  trigger("first_name");
                }} 
                 />
         {errors.first_name && (
                <small className="text-danger">{errors.first_name.message}</small>
              )}


          </div>

          <div style={{width:"100%", textAlign:"initial"}}>

          <input type="text" className={`modifierI fw-normal ${errors.last_name && "invalid"}`} name="last_name" id="lname" placeholder="Enter Last Name"  {...register("last_name", { required: "Last Name is Required" ,
                minLength: {
                  value: 3,
                  message: "Last Name must be at least 3 characters",
                }
              })}
                onKeyUp={() => {
                  trigger("last_name");
                }}  />
        {errors.last_name && (
                <small className="text-danger">{errors.last_name.message}</small>
              )}
          </div>
        </div>

        <div className="name-input">
      
   <div style={{width:"100%", textAlign:"initial"}}>
        <input className={`modifierI fw-normal ${errors.email && "invalid"}`} type="email" name="email" required={true} placeholder="Enter Email" {...register("email", { required: "Email is Required" ,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid Email Address",
                }})}
                onKeyUp={() => {
                  trigger("email");
                }} />
       {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}       
   </div>

 


        </div>
        <div className="name-input">

        <div style={{width:"100%", textAlign:"initial"}}>

<div  style={{ display:"flex"}}>

<input type={showPassword ? "text" : "password"}    {...register("password", { required: "Password is Required" ,
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters",
  }

})}
  onKeyUp={() => {
    trigger("password");
  }} style={{width:"100%"}} className={`modifierI fw-normal ${errors.password && "invalid"}`} name="password" id="password" placeholder="Enter Password" />
            

<div className="stylesa">

{
 showPassword ?
 <VisibilityOff onClick={()=>setShowPassword(!showPassword)} style={{fontSize:20}} />
 :
<Visibility onClick={()=>setShowPassword(!showPassword)} style={{fontSize:20}} />
}

</div> 
</div>  
       
{errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}

</div>   

        <div style={{width:"100%", textAlign:"initial"}}>

        <div style={{ display:"flex"}}>

<input  
 type={showConfirmPassword ? "text" : "password"} style={{width:"100%"}}
 className={`modifierI fw-normal ${errors.password_confirmation && "invalid"}`}  name="password_confirmation" id="password_confirmation" 
 {...register("password_confirmation", { required: "Password Confirmation is Required" ,
                validate: value =>
                value === password.current || "The passwords do not match"
              
              })}
                onKeyUp={() => {
                  trigger("password_confirmation");
                }}
                placeholder="Confirm Password" />

<div className="stylesa">

{
 showConfirmPassword ?
 <VisibilityOff onClick={()=>setShowConfirmPassword(!showConfirmPassword)} style={{fontSize:20}} />
 :
<Visibility onClick={()=>setShowConfirmPassword(!showConfirmPassword)} style={{fontSize:20}} />
}

</div> 
</div>  

{errors.password_confirmation && (
                <small className="text-danger">{errors.password_confirmation.message}</small>
              )}


</div>
</div>
<br />

        <div className="btn-input">
        
        <button 
       
         type="submit"  className="myButtons"><span className="spansa"></span>Sign Up</button>

        </div>
      </div>
    </form>
    
  </div>
 
</section>










    </div>
  )
}
export default registerForm;
