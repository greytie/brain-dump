import { IonIcon } from '@ionic/react'
import {
	closeOutline,
	arrowUndoOutline,
	checkmarkOutline,
} from 'ionicons/icons'
import './List.css'

const List = ({ list, handleItemDeletion, toggleCrossOff }) => {
	return (
		<div className="list-container">
			{list && list.length > 0 ? (
				list.map(({ objectID, name, crossedOff }) => (
					<div key={objectID} className="item">
						<span className={'item-name' + (crossedOff ? ' crossed-off' : '')}>
							{name}
						</span>
						<span className="item-action item-cross">
							<IonIcon
								icon={crossedOff ? arrowUndoOutline : checkmarkOutline}
								className={crossedOff ? 'undo-blue' : 'checkmark-green'}
								onClick={() => toggleCrossOff(objectID)}
							/>
						</span>
						<span className="item-action item-delete">
							<IonIcon
								icon={closeOutline}
								className="delete-red"
								onClick={() => handleItemDeletion(objectID)}
							/>
						</span>
					</div>
				))
			) : (
				<div className="no-items">No Items</div>
			)}
		</div>
	)
}

export default List
