'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ReloadIcon } from '@radix-ui/react-icons'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { crawlDocument } from '@/utils/utilFunctions'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { Separator } from '@/components/ui/separator'

export default function IndexPage() {
	const [loading, setLoading] = React.useState(false)
	const [url, setUrl] = React.useState('')
	const [entries, setEntries] = React.useState<any>([])
	const [cards, setCards] = React.useState<any[]>([])

	const [splittingMethod, setSplittingMethod] = React.useState('markdown')
	const [chunkSize, setChunkSize] = React.useState(256)
	const [overlap, setOverlap] = React.useState(1)
	console.log('cards', cards)
	console.log('entries', entries)
	return (
		<div className="pb-[200px]  mx-auto items-center pt-4 md:pt-10">
			<Card className="w-[380px] items-center ">
				<CardHeader>
					<CardTitle>Process Webpage </CardTitle>
					<CardDescription>
						Process and embed a webpage into a vectprized representation to
						store in a database
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="name">URL</Label>
								<Input
									id="url"
									placeholder="https://example.com"
									onChange={(e) => setUrl(e.target.value)}
									value={url}
								/>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button
						onClick={() =>
							crawlDocument(
								url,
								setEntries,
								setCards,
								splittingMethod,
								chunkSize,
								overlap,
								setLoading
							)
						}
						disabled={loading || url.length == 0}
					>
						{loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
						Process
					</Button>
				</CardFooter>
			</Card>

			{entries.length > 0 && (
				<>
					{' '}
					<Separator className="my-4" />
					<Table className="my-10">
						<TableCaption>A list urls scraped</TableCaption>

						<TableBody>
							{entries.map((entry: any) => {
								return (
									<TableRow key={entry.url}>
										<TableCell>{entry.url}</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
					<Separator className="my-4" />
				</>
			)}

			{cards.length > 0 &&
				cards.map((card: any, index: number) => (
					<Card className="items-center  p-5 m-2 " key={index}>
						<CardContent>
							<MemoizedReactMarkdown>{card.pageContent}</MemoizedReactMarkdown>
						</CardContent>
						<CardFooter className="flex justify-between">
							<b className="text-xs">{card.metadata.hash}</b>
						</CardFooter>
					</Card>
				))}
		</div>
	)
}
