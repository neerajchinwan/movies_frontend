import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";


const MovieCard =({image, title, year, rating, onEdit, onDelete, onDetails}) => {
    return <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
        <img className="w-20 mx-6" src={image} alt={title} />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 text-base">Year: {year}</p>
            <p className="text-gray-700 text-base">Rating: {rating}</p>
        </div>
        <div className="px-3 pt-4 pb-2 flex justify-between">
            <button className="text-xl bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded" onClick={onEdit}><MdEdit /></button>
            <button className="text-xl bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded" onClick={onDelete}><MdDelete /></button>
            <button className="text-xl bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded" onClick={onDetails}><CgDetailsMore /></button>
        </div>
    </div>
}

export default MovieCard;