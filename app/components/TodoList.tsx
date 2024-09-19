import { ITask } from "@/types/tasks";
import Task from "./Task";

interface TodoListProps {
    tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {

return (
<div className="overflow-x-auto">
    <table className="table">

     <thead className="bg-gray-200">
        <tr className="border-none">
            <th className="text-black uppercase">Task</th>
            <th className="text-black uppercase">Actions</th>
        </tr>
        </thead>
         <tbody>
            {tasks.map((task) => (
                <Task key={task.id} task={task}/>
            ))}
        </tbody>
     </table>
    </div>
    )
};

export default TodoList;