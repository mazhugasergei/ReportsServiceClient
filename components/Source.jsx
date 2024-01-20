import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import zod from "zod"
import { Button } from "@/components/ui/button"
import cronstrue from "cronstrue/i18n"
import { useToast } from "@/components/ui/use-toast"
import { api } from "horizen-framework/frontend"

const formSchema = zod.object({
	name: zod.string().min(1, { message: "Обязательное поле" }),
	link: zod.string().min(1, { message: "Обязательное поле" }),
	cron: zod.string().min(1, { message: "Обязательное поле" })
})

const Source = ({ self, _id, name, link, cron }) => {
	const { toast } = useToast()

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: name ?? "",
			link: link ?? "",
			cron: cron ?? ""
		}
	})

	const onSubmit = async (values) => {
		const { _id } = await api.call("createSource", {
			auth: false,
			params: { ...values }
		})
		// toast({
		// 	description: "Сохранено"
		// })
		form.reset()
		self.setState({ sources: [{ _id, ...values }, ...self.state.sources] })
	}

	const onUpdate = async (values) => {
		await api.call("updateSource", {
			auth: false,
			params: { _id, ...values }
		})
		toast({
			description: "Изменения сохранены"
		})
	}
	const onDelete = async () => {
		await api.call("deleteSource", {
			auth: false,
			params: { _id }
		})
		// toast({
		// 	description: "Удалено"
		// })
		self.setState({ sources: [...self.state.sources.filter((source) => source._id !== _id)] })
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="border rounded-lg space-y-2 p-4">
				<div className="flex gap-2">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Имя</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="link"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ссылка</FormLabel>
								<FormControl>
									<div className="flex gap-2">
										<Input {...field} />
										{_id ? (
											<>
												<Button type="button" onClick={onDelete}>
													Удалить
												</Button>
												<Button type="button" onClick={form.handleSubmit(onUpdate)}>
													Сохранить
												</Button>
											</>
										) : (
											<Button type="submit">Добавить</Button>
										)}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex items-end gap-2">
					<FormField
						control={form.control}
						name="cron"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Строка крон</FormLabel>
								<FormControl>
									<div className="flex gap-2">
										<Input {...field} />
										<Button
											type="button"
											onClick={() => {
												try {
													const cron = form.getValues("cron")
													alert(cronstrue.toString(cron, { locale: "ru" }))
												} catch (e) {
													alert(e)
												}
											}}
										>
											Протестировать
										</Button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</form>
		</Form>
	)
}

export default Source
