'use client';

import { ITask } from "@/types/tasks";
import { MdEditSquare } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { FormEventHandler, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";


interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {

    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [tasktToEdit, setTaskToEdit] = useState<string>(task.text);

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo ({
            id: task.id,
            text: tasktToEdit,
        });
        setTaskToEdit("");
        setOpenModalEdit(false);
        router.refresh();
    }

    const handleDeleteTask = async (task: ITask) => {
        if (task.id) {
          await deleteTodo(task.id);
          setOpenModalDelete(false);
          router.refresh();
        } else {
          console.error("ID da tarefa não encontrado.");
        }
      };
    
    

    return (
    <tr key={task.id}>
        <td className="w-full">{task.text}</td>
        <td className="flex gap-5"> 
            <MdEditSquare onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={25}/>
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className="font-bold text-lg">Edit Task</h3>
                        <div className="modal-action">
                        <input 
                            value={tasktToEdit}
                            onChange={(e) => setTaskToEdit(e.target.value)}
                            type="text" 
                            placeholder="Type here" 
                            className="input input-bordered w-full" 
                            />
                            <button type="submit" className="btn">Submit</button>
                        </div>
                    </form>
                </Modal>

                <FaTrashAlt onClick={() => setOpenModalDelete(true)} cursor="pointer" className="text-red-500" size={25} />
                    <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                    <h3 className="text-alg">Do you really want to delete this task?</h3>
                    <div className="modal-action">

                        <button className="btn" onClick={() => handleDeleteTask(task)}> 
                        Yes
                        </button>
                    </div>
                    </Modal>
        </td>
    </tr>

    )
};

export default Task;