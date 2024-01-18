import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "./ui/button"
import { api } from "horizen-framework/frontend"
import { useToast } from "@/components/ui/use-toast"

const Task = ({ name, link, status, created }) => {
	const { toast } = useToast()

	const onRebuild = async () => {
		await api.call("rebuildTask", {
			auth: false,
			params: { name, link, type: "createReport" }
		})
		toast({
			description: "Пересобрано"
		})
	}

	return (
		<div className="grid grid-cols-[1fr_1fr_auto_auto] items-center gap-4 border rounded-lg px-4 py-2">
			<div className="font-medium">{name}</div>
			<div>
				{new Date(created)
					.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })
					.replace(/\//g, ".")}
			</div>
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
