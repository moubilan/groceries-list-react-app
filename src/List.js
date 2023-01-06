import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({list, editItem,  removeItem}) => {
  return (
    <div className='grocery-list'>
      { list.map( (item) => {
        return (
          <article key={item.id} className='grocery-item'>
            <p className='title'>{item.title}</p>
            <div className='btn-container'>
              <button type='button' className='edit-btn' onClick={()=> editItem(item.id)}><label htmlFor='grocery'><FaEdit/></label></button>
              <button type='button' className='delete-btn' onClick={()=> removeItem(item.id)}><FaTrash/></button>
            </div>
          </article>
        );
      })
      }
    </div>
  );
}

export default List
