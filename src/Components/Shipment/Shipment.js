import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const[loggedInUser,setLoggedInUser]=useContext(UserContext);
  const onSubmit = data => console.log(data);

  console.log(watch("example")); 

  return (
   
   <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      
      
      <input defaultValue={loggedInUser.name}  />
      {/* {errors.exampleRequired && <span>This field is required</span>} */}
      <input defaultValue={loggedInUser.email}  />
      {/* {errors.exampleRequired && <span>This field is required</span>} */}
      <input {...register("exampleRequired", { required: true })} placeholder="Your code"/>
      {errors.exampleRequired && <span className="error">This field is required</span>}
      <input {...register("exampleRequired", { required: true })}placeholder="Your city" />
      {errors.exampleRequired && <span className="error">This field is required</span>}
      
      
      
      <input type="submit" />
    </form>
  );
}


export default Shipment;