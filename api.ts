import { ITask } from "./types/tasks";
import { db } from './utils/firebase'; 
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, DocumentData } from 'firebase/firestore';

export const getAllTodos = async (): Promise<ITask[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, 'tasks')); 
      const todos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ITask));
      console.log("Tarefas do Firestore:", todos); 
      return todos;
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      return [];
    }
  };

  export const addTodo = async (todo: ITask): Promise<ITask> => {
    try {
      console.log("Dados enviados para addDoc:", todo); 
      const docRef = await addDoc(collection(db, 'tasks'), todo);
      return { id: docRef.id, ...todo };
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      throw error; 
    }
  };

  export const editTodo = async (todo: ITask): Promise<ITask> => {
    try {
      const { id, ...todoData } = todo;
      console.log("Dados enviados para updateDoc:", todoData); 
      await updateDoc(doc(db, 'tasks', id), todoData);
      return todo;
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
      throw error;
    }
  };

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'tasks', id));
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    throw error;
  }
};

