

const Popup = ({title, isOpen, onClose, children}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-md w-1/2 overflow-auto">
                <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <button onClick={onClose} className="text-gray-600">&times;</button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Popup
