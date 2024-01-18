import { useEffect, useState } from "react"
import { api } from "horizen-framework/frontend"
import Task from "./Task"
import { Button } from "./ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"

const Tasks = () => {
	const [tasks, setTasks] = useState()

	const getTasks = async () => {
		const result = await api.call("getTasks", {
			auth: false,
			params: {}
		})
		setTasks(result.tasks)
	}

	useEffect(() => {
		getTasks()
		setInterval(getTasks, 5000)
	}, [])

	return (
		<div className="space-y-2">
			<Button onClick={getTasks} variant="outline" className="absolute top-0 right-0">
				<ReloadIcon />
			</Button>
			{tasks?.map((task) => {
				const { _id, name, link, status, created } = task
				return <Task {...{ name, link, status, created }} key={_id} />
			}) || "Loading..."}
		</div>
	)
}

export default Tasks
