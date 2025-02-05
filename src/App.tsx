"use client"
import { useEffect, useState } from "react"
import TaskList from "./TaskList"

interface Task {
  id: number
  title: string
  completed: boolean
  lastUpdated: string
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [totalPoints, setTotalPoints] = useState(0)

  useEffect(() => {
    // Load tasks and points from localStorage
    const storedTasks = localStorage.getItem("tasks")
    const storedPoints = localStorage.getItem("totalPoints")

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    } else {
      setTasks([
        { id: 1, title: "GitHub Streak 🔥", completed: false, lastUpdated: new Date().toISOString() },
        { id: 2, title: "LeetCode Streak 🚀", completed: false, lastUpdated: new Date().toISOString() },
        { id: 3, title: "Pookie's DSA 💞", completed: false, lastUpdated: new Date().toISOString() }
      ])
    }

    if (storedPoints) {
      setTotalPoints(Number.parseInt(storedPoints, 10))
    }

    resetTasksIfNeeded()
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem("totalPoints", totalPoints.toString())
  }, [totalPoints])

  const resetTasksIfNeeded = () => {
    const now = new Date()
    const storedTasks = localStorage.getItem("tasks")

    if (storedTasks) {
      const tasksData: Task[] = JSON.parse(storedTasks)
      const updatedTasks = tasksData.map((task) => {
        const lastUpdated = new Date(task.lastUpdated)
        if (now.getDate() !== lastUpdated.getDate()) {
          return { ...task, completed: false, lastUpdated: now.toISOString() }
        }
        return task
      })

      setTasks(updatedTasks)
      localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    }
  }

  const handleTaskCompletion = (taskId: number, completed: boolean) => {
    const now = new Date()
    let pointsChange = 0

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        if (!task.completed && completed) {
          pointsChange = 10 // Completing a task adds 10 points
        } else if (task.completed && !completed) {
          pointsChange = -10 // Unchecking a completed task removes 10 points
        }
        return { ...task, completed, lastUpdated: now.toISOString() }
      }
      return task
    })

    setTasks(updatedTasks)
    setTotalPoints((prev) => prev + pointsChange)
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Total Points: {totalPoints}</h1>
      <TaskList tasks={tasks} onTaskCompletion={handleTaskCompletion} />
    </main>
  )
}
