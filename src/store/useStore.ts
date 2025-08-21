import { create } from "zustand";

type TTodo = {
  id: number,
  text: string,
  complate: boolean
}

type TTodoState = {
  todos: TTodo[],
  addTodo: (text:string) => void
  removeTodo: (id:number) => void
  updateTodo: (id:number, newData: string) => void
}

export const useTodoApp = create<TTodoState>((set)=> ({
  todos: [],

  addTodo: (text) => set((state) => ({todos: [...state.todos, {id: Date.now(), text: text, complate: false } ]})),
  removeTodo: (id) => set((state) => ({todos: state.todos.filter((todo) => todo.id !== id )})),
  updateTodo: (id, newData) => set((state) => ({todos: state.todos.map((todo)=> todo.id === id ? {...todo, text: newData, complate: true } : todo )}))
}))