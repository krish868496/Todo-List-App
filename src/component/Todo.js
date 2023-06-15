import {useState} from 'react'
import { FaPlus, FaTrashAlt, FaRegEdit } from "react-icons/fa";
import '../App.css'




const Todo = () => {
    const [input, setInput] = useState("");
    const [items, setItems] = useState([]);
    const [btn, setBtn] = useState(true);
    const [isEdit, setIsEdit] = useState(null);


    // onchange function 

    const handleChange = (e) => {
        setInput(e.target.value);

    }
    // handleadd function 
    const handleAdd = () => {
        if(!input){
            alert("please fill data");
        }
        else if(input && !btn){
            setItems(
                items.map((elem) => {
                    if(elem.id===isEdit){
                        return { ...elem, data: input }  
                    }
                    return elem;
                })
            )
            setBtn(true);
            setInput("");
            setIsEdit(null);
        }
        else{
            const datas={
                id: new Date().getTime().toString(),
                data: input
            }
            setItems([...items, datas]);
            setInput("");
        }
        
     
    }

    // deleteItems 
        const delelteItems = (id) => {
           const delteItem = items.filter((elem) => {
                return elem.id!==id;
           })
           setItems(delteItem);
        }

        // editItems 
        const editItems = (id) => {
            console.log("edit item", id);
           const editItem = items.find((elem) => {
                return elem.id === id;
            })
            setBtn(false);
            setInput(editItem.data);
            setIsEdit(id);
        }
    

  return (
    <>
    <div className="container-fluid">
    <div className="main">
    <div className="container">
        <div className="input">
            <input
             type="text"
             value={input}
             onChange={handleChange}
             />
             <div className="main-btn">
              {
                btn ? <FaPlus className='btn' onClick={handleAdd} /> 
                : <FaRegEdit className='btn' onClick={handleAdd} />
              }  
            </div>
       
        </div>
      
    </div>
    <ul>
            {
                items.map((item) => {
                  return ( 
                  <li key= {item.id}>            
                   {item.data} 
                   <FaRegEdit className='edit' onClick={()=> editItems(item.id)} />  
                   <FaTrashAlt className='trash' onClick={() =>     
                     delelteItems(item.id)} />
                 </li>)
                })
            }
            
        </ul>
    </div>
    </div>
    </>
  )
}

export default Todo