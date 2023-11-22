'use client'

import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useState } from 'react'
import { Tabs, TabsTrigger } from './ui/tabs'
import { TabsList } from '@radix-ui/react-tabs'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from './ui/select'

const exampleMessages = [
	{
		heading: 'Find courses',
		message: `What are the available courses at Haaga-Helia?`
	},
	{
		heading: 'Upcoming events',
		message: 'What events are happening at Haaga-Helia? \n'
	},
	{
		heading: 'Contact information',
		message: ` How can I contact Haaga-Helia? \n`
	}
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) { 
	let [categories] = useState(['🤖 LLaMA v2', '✨GPT-4', '⚡GPT-3.5'])
	const [currentModel, setCurrentModel] = useLocalStorage<string | null>(
		'current-model',
		null
	)

	const selectedTab = () => {
		if (currentModel === 'gpt4') {
			return '✨GPT-4'
		} else if (currentModel === 'chatgpt') {
			return '⚡GPT-3.5'
		} else if (currentModel === 'llama') {
			return '🤖 LLaMA v2'
		}

		return '🤖 LLaMA v2'
	}

	console.log(currentModel)

	return (
		<div className="mx-auto max-w-2xl px-4">
			<div className="rounded-lg border bg-background p-8">
				<h1 className="mb-2 text-lg font-semibold">
					Welcome to Haaga-Helia AI Chatbot!
				</h1>
				<div className="items-center  px-2 py-6 sm:px-0">
					<h3 className="text-start mb-3 font-semibold leading-6">
						Select Model
					</h3>

					<Select onValueChange={(value) => setCurrentModel(value)}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Model" />
						</SelectTrigger>
						<SelectContent>
							{categories.map((category, index) => (
								<SelectItem
									key={index}
									value={category}
									// onClick={() => {
									// 	setCurrentModel(
									// 		category === '🤖 LLaMA v2'
									// 			? 'llama'
									// 			: category === '✨GPT-4'
									// 			? 'gpt4'
									// 			: 'chatgpt'
									// 	)
									// }}
								>
									{category}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<p className="mb-2 leading-normal text-muted-foreground">
					This is an open source AI chatbot app template built for Haaga-Helia
					students to query information about Haaga-Helia.
				</p>
				<p className="leading-normal text-muted-foreground">
					
					You can start a conversation here or try the following examples:
				</p>
				<div className="mt-4 flex flex-col items-start space-y-2">
	
					{exampleMessages.map((message, index) => (
						<Button
							key={index}
							variant="link"
							className="h-auto p-0 text-base"
							onClick={() => setInput(message.message)}
						>
							
							<IconArrowRight className="mr-2 text-muted-foreground" />
							{message.heading}
						</Button>
					))}
				</div>
			</div>
		</div>
	)
}
