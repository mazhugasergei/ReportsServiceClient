import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "./ui/button"
import { api } from "horizen-framework/frontend"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "./ui/input"
import { useState } from "react"

const Task = ({ _id, name, link, status, created }) => {
	const { toast } = useToast()

	const [newLink, setNewLink] = useState(link)
	const date = new Date(created)

	const onRebuild = async () => {
		await api.call("rebuildTask", {
			auth: false,
			params: { _id, link: newLink }
		})
		toast({ description: "Таск пересобран" })
	}

	return (
		<div className="grid grid-cols-[1fr_auto_1fr_auto_auto] items-center gap-4 border rounded-lg px-4 py-2">
			<div className="font-medium">{name}</div>
			<div>
				{("0" + date.getHours()).slice(-2)}:{("0" + date.getMinutes()).slice(-2)} {date.getFullYear()}.
				{("0" + (date.getMonth() + 1)).slice(-2)}.{("0" + date.getDate()).slice(-2)}
			</div>
			<Input value={newLink} onChange={(e) => setNewLink(e.target.value)} />
			<div
				className={`w-[5rem] grid place-items-center text-sm text-white rounded-md py-1 ${
					status === "success" ? "bg-emerald-500" : status === "waiting" ? "bg-gray-500" : "bg-destructive"
				}`}
			>
				{status}
			</div>
			<Button onClick={onRebuild}>Пересобрать</Button>
		</div>
	)
}

export default Task
