import React, { useEffect, useState } from 'react'
import List from './List'
import Alert from './Alert'
import { nanoid } from 'nanoid';

function App() {

  const [name, setName] = useState('');
  const [list, setList] = useState( JSON.parse(localStorage.getItem('list')) || [] );
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type:''})

  useEffect( () => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list])
  
  function handleSubmit(event) {
    event.preventDefault();

    if(name && isEditing) {
      setList( (oldList) => { return ( oldList.map(
        item => { 
          if(item.id === editID) {
            return {...item, title : name}
          } else {
            return item;
          }
        }
        ))}
      );
      setIsEditing(false);
    }
    else if(name) {
      console.log('submit')
      setList(oldList => { return ([...oldList, {id: nanoid(), title:name}])});
      showAlert(true, "Item added successfully", 'success')
      // setAlert(oldAlert => { return ({...oldAlert, show : true, msg : 'Item added successfully', type : "success"}) });
    }else {
      showAlert(true, 'Please enter a value', 'danger')
      // setAlert(oldAlert => { return ({...oldAlert, show : true, msg : 'Please enter a value', type : "danger"}) });
    }
    setName('');
  }

  function changeInput(event) {
    const {value} = event.target;
    setName(value)
    console.log(name)
  }

  function editItem(id) {
    const editList = list;
    const item = editList.find( (item) => item.id === id);
    setIsEditing(true)
    setEditID(item.id)
    setName(item.title)
  }

  function removeItem(id) {
    setList(oldList => {
      return oldList.filter( item => (item.id !== id))
    })
    showAlert(true, 'Item has been deleted', 'danger');
  }

  function clearList() {
    setList([]);
    showAlert( true, "All items are deleted", "danger" )
    localStorage.clear();
  }
  
  function showAlert(show=false, msg='', type='') {
    setAlert({show, msg, type});
  }

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {<Alert alert={alert} list={list} showAlert={showAlert}/>}
        <h3>My Groceries</h3>
        <div className='form-control'>
          <input id='grocery' value={name} className='grocery' onChange={changeInput}/>
          <button className='submit-btn'>{ isEditing ? 'Edit' : 'Submit' }</button>
        </div>
      </form>
      <div className='grocery-container'>
        <List list={list} editItem={editItem} removeItem={removeItem}/>
        <button className='clear-btn' onClick={clearList}>{list.length !==0 && 'Clear items'}</button>
      </div>
    </section>
  );
}

export default App
