import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//import './App.css';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader'
import Maintenance from './Maintenance'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import AddNewDepartment from './AddNewDepartment';
const required = (value, props) => {
  if (!value || (props.isCheckable && !props.checked)) {
    return <span className="form-error is-visible">Required</span>;
  }
};


/* 
const isEqual = (value, props, components) => {
  const bothUsed = components.password[0].isUsed && components.confirm[0].isUsed;
  const bothChanged = components.password[0].isChanged && components.confirm[0].isChanged;

  if (bothChanged && bothUsed && components.password[0].value !== components.confirm[0].value) {
    return <span className="form-error is-visible">Passwords are not equal.</span>;
  } 
}; */


class RemoveDepartment extends Component{

  constructor() {
        super()
        this.state = {

            department: '',
           
                      };
          }

     
          handleAddNew(value) {
            this.setState({
                department :value,
            });
          }
      
          componentDidMount() {
            //for drop down
            alert('componentDidMount');
          
          var department=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Department'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
          console.log(department);
          var dept;
          dept += '<option value="" disabled selected hidden>Select a department</option>';
            $.each(department, function (i, item) {
            
              dept += '<option value="' + item.department + '">'+item.department+ '</option>'
              
            });
          $("#department").append(dept);
          
            
          }
     

         
      RemoveDepartmentFunc(){
    
    alert(this.state.department);
    this.setState({
         });
             alert(JSON.stringify(this.state));
             $.ajax({
                    type: 'POST',
                    data:JSON.stringify(this.state),
                    url: "https://192.168.0.104:8443/EmployeeAttendenceAPI/employee/deletedepartment",
                    contentType: "application/json",
                    dataType: 'json',
                    async:false,
                    success: function(data,textStatus,jqXHR)
                         {
                       console.log(data);
                       confirmAlert({
                            title: 'Removed Department',                        // Title dialog
                            message: 'successfully Removed Department  '+data.department,            // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm
                                                      
                            
                             })
                        ReactDOM.render(
                          <Router >
                          <div>
                          <Route path="/" component={EmployeeMenuHeader}/>
                                         
                          <Route path="/" component={RemoveDepartment}/>
                                                              
                            </div>
                          </Router>, document.getElementById('root'));
                                        

                    },
                    error:function(data) {
                         console.log('#####################error:################################'+data);
                         alert('Login Invalid'+ data);

                    },
                    });
  }
  

render(){
    return(
        
<div class="container">
<h2>Remove Department</h2>




 <form  style={{ paddingBottom: '20px',  position: 'inline-block'}}>


<div className="col-xs-12 col-sm-12 col-lg-12" style={{marginTop:"20px", marginBottom:"20px"}} >
   <label>
     Department Name* 
      <input
        type="text"
        value={this.state.department}
        required 
        name="department"
        onChange={(e)=>this.handleAddNew(e.target.value)}
        className="form-control"
        id="department"
        placeholder="Enter Department Name"
      />
    </label>

  
<button 
type="button"

 style={{marginLeft:"20px",
 marginLeft:"auto",
 marginRight: "auto",
 marginTop: "20px",
 marginBottom: "25px",
 display:"block"}}
   
  className="btn btn-danger" 
  onClick={()=>this.RemoveDepartmentFunc()} 
 >Remove</button>
  
  </div>
 
  
   </form> 
</div>           
                    
                
            );
        }
    
    }
    
    export default RemoveDepartment;