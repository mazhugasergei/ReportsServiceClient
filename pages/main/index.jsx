import React from "react"
import Head from "next/head"
import Error from "next/error"
import { api } from "horizen-framework/frontend"
import { withRouter } from "next/router"
import Source from "@/components/Source"
import { Toaster } from "@/components/ui/toaster"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Task from "@/components/Task"
import Tasks from "@/components/Tasks"

class WrappApp extends React.Component {
	static getInitialProps({ query }) {
		return { query }
	}

	constructor(props) {
		super(props)
		this.state = {}
	}

	async componentDidMount() {
		await this.getSources()
	}

	getSources = async () => {
		const result = await api.call("getSources", {
			auth: false,
			params: {}
		})

		this.setState({ sources: result.sources })
	}

	render() {
		return (
			<main className="min-h-screen flex justify-center p-8">
				<Tabs defaultValue="sources" className="w-full max-w-[45rem] relative">
					<TabsList>
						<TabsTrigger value="sources">Ресурсы</TabsTrigger>
						<TabsTrigger value="tasks">Логи</TabsTrigger>
					</TabsList>
					<TabsContent value="sources" className="flex flex-col gap-4">
						<Source self={this} />
						{this.state.sources?.map((source) => {
							const { _id, name, link, cron } = source
							return <Source {...{ self: this, _id, name, link, cron }} key={_id} />
						}) || "Loading..."}
					</TabsContent>
					<TabsContent value="tasks">
						<Tasks />
					</TabsContent>
				</Tabs>
				<Toaster />
			</main>
		)
	}
}

export default withRouter(WrappApp)
