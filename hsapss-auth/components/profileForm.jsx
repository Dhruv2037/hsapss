// import react,{useState,useEffect} from "react";
// import axios from "axios";


// const countriesAndStates={
//     USA: ["California", "Texas", "Florida", "New York"],
//     Canada: ["Ontario", "Quebec", "British Columbia", "Alberta"]
// };


// export default function ProfileForm({userId}){
//     const [formData,setFormData] = useState({
//         firstName:"",
//         lastName:"",
//         email:"",
//         street:"",
//         postalCode:"",
//         city:"",
//         state:"",
//         country:"",
//     });


//     const [states,setStates] = useState([]);


//     useEffect(() =>{

//         if(formData.country){
//             setStates(countriesAndStates[formData.country] || []);
//             setFormData((prev) => ({...prev,state:""}));  //reset state when country change
//         }
//     },[formData.country]);

//     const handleChange = async (e)=>{
//         const {name , value} = e.target;
//         setFormData((prev) => ({...prev,[name] : value}));
//     }
    
//     const handleSubmit =  async(e) =>{
//         e.preventDefault();
//         try {
//             const response = await axios.post('/api/register/save-profile',{userId,formData});
//             if(!response.ok)
//                 throw new error("failed to update profile");
    
//             const data = await response.json();
//             console.log("profile updated successfully",data);
//             alert("profile updated successfully");
//         } catch (error) {
//             console.error("Error updating profile:", error);
//             alert("Failed to update profile. Please try again.");
//         }
//     }
    

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>FirstName:</label>
//                 <input type="text" name="firstName"  value={formData.firstName} onChange={handleChange} required/>
//             </div>
//             <div>
//                 <label>LastName:</label>
//                 <input type="text" name="lastName"  value={formData.lastName} onChange={handleChange} required/>
//             </div>
//             <div>
//                 <label>Email:</label>
//                 <input type="text" name="email"  value={formData.email} onChange={handleChange} required/>
//             </div>
//             <div>
//                 <label>Street:</label>
//                 <input type="text" name="street"  value={formData.street} onChange={handleChange} required/>
//             </div>
//             <div>
//                 <label>PostalCode:</label>
//                 <input type="text" name="postalCode"  value={formData.postalCode} onChange={handleChange} required/>
//             </div>
//             <div>
//                 <label>Country:</label>
//                 <select name="country" value={formData.country} onChange={handleChange} required>           
//                     <option value="">Select Country</option>
//                     {Object.keys(countriesAndStates).map((country)=>{
//                         <option key={country} value={country}>{country}</option>
//                     })}

//                 </select>
//             </div>
//             <div>
//                 <label>State:</label>
//                 <select name="state" value={formData.state} onChange={handleChange}>
//                     {states.map((state)=>{
//                         <option  key={state} value={state}>
//                             {state}
//                         </option>
//                   })}
//                 </select>
//             </div>
//             <button type="submit">Save Profile</button>
//         </form>
//     )
// };


import React, { useState, useEffect } from "react";



export default function ProfileForm({phone,onProfileSet}) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
  });
  const countriesAndStates = {
    USA: ["California", "Texas", "Florida", "New York"],
    Canada: ["Ontario", "Quebec", "British Columbia", "Alberta"],
    India: ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu"],
  };
  const [states, setStates] = useState([]);

  // Update states dynamically based on the selected country
  useEffect(() => {
    if (formData.country) {
      setStates(countriesAndStates[formData.country] || []);
      setFormData((prev) => ({ ...prev, state: "" })); // Reset the state when the country changes
    }
  }, [formData.country]);

  // Generic handler for input and select changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({phone, ...formData }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      console.log("Profile updated successfully:", data);
      alert("Profile updated successfully!");
      onProfileSet();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Street:</label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Postal Code:</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Country:</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="">Select Country</option>
          {Object.keys(countriesAndStates).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>State:</label>
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Save Profile</button>
    </form>
  );
}
