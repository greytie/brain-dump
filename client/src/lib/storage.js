const readItemStorage = () => {
	const itemStorageJson = localStorage.getItem('itemStorage')

	if (itemStorageJson) {
		// TODO: Should use in try/catch
		// TODO: Should validate
		const itemStorage = JSON.parse(itemStorageJson)
		return itemStorage
	}

	return {
		items: [],
		idIncrement: 0,
	}
}

const updateItemStorage = (itemStorage) => {
	localStorage.setItem('itemStorage', JSON.stringify(itemStorage))
}

export { readItemStorage, updateItemStorage }
