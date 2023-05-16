import './AddItemBox.css'

const AddItemBox = ({ handleNewItem, handleNewItemInputChange, input }: any) => (
	<div className="add-item-box">
		<form onSubmit={handleNewItem}>
			<div className="add-item-grid">
				<input
					id="add-item"
					value={input}
					onChange={handleNewItemInputChange}
					placeholder="Enter a task"
				/>
				<span>
					<button type="submit">add item</button>
				</span>
			</div>
		</form>
	</div>
)

export default AddItemBox
