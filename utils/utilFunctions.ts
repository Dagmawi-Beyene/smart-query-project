interface ICard {
	pageContent: string
	metadata: {
		hash: string
	}
}
interface IUrlEntry {
	url: string
	title: string
	seeded: boolean
	loading: boolean
}
export async function crawlDocument(
	url: string,
	setEntries: React.Dispatch<React.SetStateAction<IUrlEntry[]>>,
	setCards: React.Dispatch<React.SetStateAction<ICard[]>>,
	splittingMethod: string,
	chunkSize: number,
	overlap: number,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> {
	console.log('crawlDocument')
	setCards([])
	setEntries([])
	setLoading(true)
	const response = await fetch('/api/crawl', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			url,
			options: {
				splittingMethod,
				chunkSize,
				overlap
			}
		})
	})

	const { documents, pages } = await response.json()

	setCards(documents)

	setEntries(pages)

	setLoading(false)
}
