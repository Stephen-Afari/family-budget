
import { useState } from "react"
import ReactDOM from 'react-dom';
import {ButtonGroup,Button1, Button2, FormGroup, Form,ModalOverlay, ModalContent,ModalHeader,Input,Select} from "./modal.styles";

export const Modal = ({isOpen,onClose, onSubmit, heading,subGroups,parents})=>{

// //utility function to truncate text
// const truncateText = (text, maxLength)=>{
//   if(text.length <= maxLength){
    
//     return text + ' '.repeat(maxLength - text.length);
//   }
//   return text.substring(0,maxLength) + '...';
// }


//state
const [formData, setFormData]= useState({
    date: '',
    subGroup:'', //Default to the first item in the dropdown
    parent:'',
    description:'',
    amount: '',
    target:''
});
  // State to manage filtered subgroups
  const [filteredSubGroups, setFilteredSubGroups] = useState([]);

if (!isOpen) return null;



//spread through previous data and assign the new value to the key in the input box.
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, 
      //Check if the name is "amount" or "target", and convert to number if true
    [name]: (name === "amount" || name === "target") ? parseFloat(value) || '' : value
       }));

    // If the parent is changed, update the filtered subgroups
    if(name === 'parent'){
//       console.log('Name:', value);
// console.log('SubGroups Object:', subGroups);
// console.log('ParentArray:', subGroups[value]);
      const newFilteredSubGroups = subGroups[value] || [];
      setFilteredSubGroups(newFilteredSubGroups);
      // Reset subGroup selection when parent changes
      setFormData((prevData) => ({ ...prevData, subGroup: '' }));
    }
  };
  const closeModal =()=>{
    setFormData({
      date: '',
      subGroup:'', //Default to the first item in the dropdown
      parent:'',
      description:'',
      amount: '',
      target:''
  })
  onClose();
  }
//prevent the form's default behavior of refreshing and set the form data to the state from the parent (ie. onSubmit)
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
 
    onClose();
    setFormData({
      date: '',
      subGroup:'', //Default to the first item in the dropdown
      parent:'',
      description:'',
      amount: '',
      target:''
  })
  };
//Renders the modal using ReactDOM.createPortal to ensure it is rendered outside the main component hierarchy.
//e.stopPropagation prevents events from bubbling up.We add this onClick (e.stopPropagation)… so that anytime
// someone clicks on one of the children inside the component,we
// don’t want that click event bubbling up and closing the modal.
//Bubbling: When an event occurs on an element, it first runs the handlers on that element, then on its parent, and then on all its ancestors up to the root. This is called event bubbling.
//n a modal, clicking on the overlay (background) typically closes the modal. If you don't use e.stopPropagation() on the modal content, clicking anywhere inside the modal content would also trigger the overlay click event, causing the modal to close.
//The <button> element with type="submit" must be inside a <form> element or associated with a form using the form attribute.
//When the button is clicked, it automatically triggers the form's submit event.
return ReactDOM.createPortal(
<ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>{heading}</ModalHeader>
        <Form onSubmit={handleSubmit}>
        <FormGroup>
          <div>
            <label>
              Date
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                
              />
            </label>
          </div>
          
          <div>
            <label>
            Parent
            <Select name='parent' value={formData.parent} onChange={handleChange} >
            <option value='' disabled>select parent </option>
                {parents.map((item,index)=>(
                   <option key={index} value={item}>
                    {item}
                   </option> 
                ))}

            </Select>

            </label>

          </div>
          <div>
            <label>
            Group
            <Select name='subGroup' value={formData.subGroup} onChange={handleChange}>
                <option value='' disabled>select group</option>
                {filteredSubGroups.map((item,index)=>(
                   <option key={index} value={item}>
                    {item}
                   </option> 
                ))}

            </Select>

            </label>
                 
          </div>     
          <div>
            <label>
              Description
              <Input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="free text"
              />
            </label>
          </div>
          <div>
            <label>
              Amount
              <Input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="GHC"
              />
            </label>
          </div>
          <div>
            <label>
              Target
              <Input
                type="text"
                name="target"
                value={formData.target}
                onChange={handleChange}
                placeholder="%"
              />
            </label>
          </div>
          </FormGroup>
          <ButtonGroup>
          <Button1 type="submit">Submit</Button1>  
          <Button2 type="button" onClick={closeModal}>Close</Button2>
          </ButtonGroup>
        </Form> 
       
      </ModalContent>
    </ModalOverlay>,
    document.getElementById('modal-root') //the root of the portal
  );

}