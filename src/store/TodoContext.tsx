'use client'

import { createContext, useContext, useState } from "react"

type todo = {
    id: number,
    text: string,
    complate: boolean,
}

type TTodoProps = {
    todos: todo[],
    addTodo: (text:string) => void,
    removeTodo: (id:number) => void,
    updateTodo: (id:number, newText:string) => void
}

export const todoContext = createContext<TTodoProps | undefined >(undefined)


const TodoContextComponent = ({children}: {children:React.ReactNode}) => {
      const [todos, setTodos] = useState<todo[]>([])

      const addTodo = (text:string) => {
        setTodos((prev)=> [...prev, {text: text, complate: false, id: Date.now() }] )
      }

      const removeTodo = (id:number) => {
         setTodos((prev)=> prev.filter((item)=> item.id !== id))
      }

      const updateTodo = (id: number, newText: string) => {
         setTodos((prev)=>prev.map((t) => t.id === id ? { ...t, text: newText, complate: true } : t  ))
      }

  return (
    <div>
      <todoContext.Provider value={{ todos, addTodo, removeTodo, updateTodo}}>
        {children}
      </todoContext.Provider>
    </div>
  )
}

export default TodoContextComponent;


export function useTodo() {
  const context = useContext(todoContext);
  if (!context) throw new Error("useTodo must be used inside <TodoProvider>");
  return context;
}