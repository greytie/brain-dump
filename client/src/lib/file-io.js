/**
 * Got from: https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react
 * @param {*} text
 */
export const downloadTextAsFile = (text, fileName) => {
	const element = document.createElement('a')
	const file = new Blob([text], {
		type: 'text/plain',
	})
	element.href = URL.createObjectURL(file)
	element.download = fileName
	document.body.appendChild(element) // Required for this to work in FireFox
	element.click()
}

/**
 *
 * Got from: https://stackoverflow.com/questions/31746837/reading-uploaded-text-file-contents-in-html
 * @param {*} file
 * @returns
 */
export const getTextFromFileAsync = async (file) => {
	try {
		const content = await readFileContent(file)
		return content
	} catch (err) {
		console.error(err)
	}
}

const readFileContent = (file) => {
	const reader = new FileReader()
	return new Promise((resolve, reject) => {
		reader.onload = (event) => resolve(event.target.result)
		reader.onerror = (error) => reject(error)
		reader.readAsText(file)
	})
}
