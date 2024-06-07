import { useSelector, useDispatch } from "react-redux";
import { openDeletePopup, deleteMovieSuccess } from '../redux/appSlice';
import Popup from "./Popup";

const DeletePopup = () => {
    const isDeleteOpen = useSelector(state => state.movie.openDelete);
    const dispatch = useDispatch();
    const currentMovie = useSelector(state => state.movie.currentMovie);

    const handleDeleteMovie = async() => {
        try{
            if(currentMovie){
                const response = await fetch(`api/v1/movie/${currentMovie._id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            dispatch(deleteMovieSuccess(currentMovie))
            dispatch(openDeletePopup());
            }
        }catch(error){
        }
    }


    return (
        <Popup title="Delete Movie" isOpen={isDeleteOpen} onClose={() => dispatch(openDeletePopup())}>
            <p>Are you sure you want to delete this movie?</p>
            <div className="flex justify-end space-x-4">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDeleteMovie}>Confirm</button>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => dispatch(openDeletePopup())}>Cancel</button>
            </div>
        </Popup>
    )
}

export default DeletePopup;