import './App.css'
import '@picocss/pico'
import React, { SyntheticEvent } from 'react'
import List from './List/List'
import TitleBox from './TitleBox/TitleBox'
import AddItemBox from './AddItemBox/AddItemBox'
import { readItemStorage, updateItemStorage } from './lib/storage'
import { downloadTextAsFile, getTextFromFileAsync } from './lib/file-io'

interface Item {
  name: string
  crossedOff: boolean
  objectID: number
}

const App = () => {
	const [itemStore, setItemStore] = React.useState(readItemStorage())
	
	if (import.meta.env.VITE_NETLIFY_FUNCTIONS_URL) {
		fetch(import.meta.env.VITE_NETLIFY_FUNCTIONS_URL + `/.netlify/functions/food`)
		.then(async res => console.log(await res.json()))
		.catch(err => console.error(err))
	}
	else {
		fetch('/.netlify/functions/food')	
		.then(async res => {
			console.log(await res.json());
		})
		.catch(err => console.error(err))
	}	

	const handleNewItem = (event: SyntheticEvent) => {
		event.preventDefault()
		if (!newItemInput || newItemInput.trim().length === 0) {
			console.log("No text in input, can't add task.")
			return
		}

		itemStore.items.push({
			name: newItemInput,
			crossedOff: false,
			objectID: ++itemStore.idIncrement,
		})

		setItemStore({
			...itemStore,
			items: [...itemStore.items],
		})

		setNewItemInput('')
	}

	const handleItemDeletion = (deleteItemID: number) => {
		itemStore.items = itemStore.items.filter(
			(item: Item) => item.objectID !== deleteItemID
		)

		setItemStore({
			...itemStore,
			items: [...itemStore.items],
		})
	}

	const toggleCrossOff = (crossedItemID: number) => {
		const updatedItem = itemStore.items.find(
			(item: Item) => item.objectID === crossedItemID
		)
		if (updatedItem == null) {
			return
		}

		updatedItem.crossedOff = !updatedItem.crossedOff
		setItemStore({
			...itemStore,
			items: [...itemStore.items],
		})
	}

	const [newItemInput, setNewItemInput] = React.useState('')

	const handleNewItemInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target ) {
      setNewItemInput(event.target.value)
    }
	}

	React.useEffect(() => {
		console.log(itemStore)
		updateItemStorage(itemStore)
	}, [itemStore])

	const onExport = (event: SyntheticEvent) => {
		event.preventDefault()
		downloadTextAsFile(JSON.stringify(itemStore), 'task_export.txt')
	}

	const onImport: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
		const input = event.target
		if ('files' in input && input.files && input.files.length > 0) {
			const importedJson = await getTextFromFileAsync(input.files[0])

			// TODO: Should validate that imported string
			setItemStore(JSON.parse(importedJson as string))
		}
	}

	return (
		<main className="container">
			<nav>
				<ul>
					<li>
						<a href="#" className="contrast" onClick={onExport}>
							Export
						</a>
					</li>
					<li>
						<label htmlFor="import-file" style={{ cursor: 'pointer' }}>
							Import
							<input
								id="import-file"
								type="file"
								className="contrast"
								style={{ display: 'none' }}
								onChange={onImport}
							/>
						</label>
					</li>
				</ul>
			</nav>
			<div className="App">
				<TitleBox></TitleBox>
				<AddItemBox
					handleNewItem={handleNewItem}
					handleNewItemInputChange={handleNewItemInputChange}
					input={newItemInput}
				></AddItemBox>
				<List
					list={itemStore.items}
					handleItemDeletion={handleItemDeletion}
					toggleCrossOff={toggleCrossOff}
				></List>
			</div>
		</main>
	)
}

export default App