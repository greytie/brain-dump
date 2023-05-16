import './App.css'
import '@picocss/pico'
import React from 'react'
import List from './List/List'
import TitleBox from './TitleBox/TitleBox'
import AddItemBox from './AddItemBox/AddItemBox'
import { readItemStorage, updateItemStorage } from './lib/storage'
import { downloadTextAsFile, getTextFromFileAsync } from './lib/file-io'

const App = () => {
	const [itemStore, setItemStore] = React.useState(readItemStorage())

	const handleNewItem = (event) => {
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

	const handleItemDeletion = (deleteItemID) => {
		itemStore.items = itemStore.items.filter(
			(item) => item.objectID !== deleteItemID
		)

		setItemStore({
			...itemStore,
			items: [...itemStore.items],
		})
	}

	const toggleCrossOff = (crossedItemID) => {
		const updatedItem = itemStore.items.find(
			(item) => item.objectID === crossedItemID
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

	const handleNewItemInputChange = (event) => {
		setNewItemInput(event.target.value)
	}

	React.useEffect(() => {
		console.log(itemStore)
		updateItemStorage(itemStore)
	}, [itemStore])

	const onExport = (event) => {
		event.preventDefault()
		downloadTextAsFile(JSON.stringify(itemStore), 'task_export.txt')
	}

	const onImport = async (event) => {
		const input = event.target
		if ('files' in input && input.files.length > 0) {
			const importedJson = await getTextFromFileAsync(input.files[0])

			// TODO: Should validate that imported string
			setItemStore(JSON.parse(importedJson))
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