import { useEffect, useState } from "react"
import TaskList from "./TaskList"

interface Task {
  id: number
  title: string
  completed: boolean
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [totalPoints, setTotalPoints] = useState(0)

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks")
    const storedPoints = localStorage.getItem("totalPoints")
    const storedDate = localStorage.getItem("lastUpdatedDate")

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    } else {
      setTasks([
        { id: 1, title: "GitHub Streak 🔥", completed: false },
        { id: 2, title: "DSA Streak 🚀", completed: false }
      ])
    }

    if (storedPoints) {
      setTotalPoints(Number.parseInt(storedPoints, 10))
    }

    resetPointsIfNeeded(storedDate)
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem("totalPoints", totalPoints.toString())
  }, [totalPoints])

  const resetPointsIfNeeded = (storedDate: string | null) => {
    const today = new Date().toDateString()

    if (storedDate !== today) {
      let deductedPoints = 0

      const storedTasks = localStorage.getItem("tasks")
      if (storedTasks) {
        const tasksData: Task[] = JSON.parse(storedTasks)
        
        tasksData.forEach((task) => {
          if (!task.completed) {
            deductedPoints -= 1
          }
        })
      }

      setTotalPoints((prev) => prev + deductedPoints) 
      setTasks((prevTasks) => prevTasks.map((task) => ({ ...task, completed: false })))

      localStorage.setItem("lastUpdatedDate", today)
    }
  }

  const handleTaskCompletion = (taskId: number, completed: boolean) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed } : task
    )

    setTasks(updatedTasks)

    setTotalPoints((prev) => prev + (completed ? 1 : -1))
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Total Points: {totalPoints}</h1>
      <TaskList tasks={tasks} onTaskCompletion={handleTaskCompletion} />
    </main>
  )
}
