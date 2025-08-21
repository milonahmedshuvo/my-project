import Button from '@/store/Button'
import Input from '@/store/Input'
import styles from '@/components/molecules/TodoForm/TodoForm.module.css'
import React, { useContext, useState } from 'react'
import { useTodoApp } from '@/store/useStore'
import { todoContext, useTodo } from '@/store/TodoContext'

const TodoForm = () => {
   const [values, setValues] = useState('')
  //  const {todos, addTodo, updateTodo, removeTodo } = useTodoApp()
   const {todos, addTodo, removeTodo } = useTodo() 

    const handleText = () => {
          console.log(values)
          addTodo(values)   
    }


  return (
   <div>
     <div className={`${styles.container}`}>
        <Input label='Select Item' placeholder='Give me item' type='text' onChange={(e)=>setValues(e.target.value)} />
        <Button workFunc={handleText} variant='error' >Submit</Button>
    </div>

    
      <div style={{display: 'flex', justifyContent: "center", flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
        {
        todos.map((item:{id: number, text:string, complate: boolean }) => <li key={item.id}>{item.text.charAt(0).toUpperCase() + item.text.slice(1) } <button onClick={ ()=> removeTodo(item.id)}>X</button> </li>)
      }
      </div>
   </div>
  )
}

export default TodoForm;
