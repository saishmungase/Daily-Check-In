import { Check } from "lucide-react"

interface Task {
  id: number
  title: string
  completed: boolean
}

interface TaskListProps {
  tasks: Task[]
  onTaskCompletion: (taskId: number, completed: boolean) => void
}

export default function TaskList({ tasks, onTaskCompletion }: TaskListProps) {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center space-x-2">
          <div
            className={`w-6 h-6 border-2 rounded-md flex items-center justify-center cursor-pointer ${
              task.completed ? "bg-blue-500 border-blue-500" : "border-gray-300"
            }`}
            onClick={() => onTaskCompletion(task.id, !task.completed)}
          >
            {task.completed && <Check className="text-white" size={16} />}
          </div>
          <label
            className={`text-lg cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
            onClick={() => onTaskCompletion(task.id, !task.completed)}
          >
            {task.title}
          </label>
        </li>
      ))}
    </ul>
  )
}

