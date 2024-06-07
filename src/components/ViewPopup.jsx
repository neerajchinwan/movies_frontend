import { useSelector, useDispatch } from "react-redux";
import Popup from "./Popup";
import { openViewPopup } from '../redux/appSlice';

const ViewPopup = () => {
    const isDetailsOpen = useSelector(state => state.movie.openView);
    const currentMovie = useSelector(state => state.movie.currentMovie);
    const dispatch = useDispatch()
    return (
        <Popup title="Movie Details" isOpen={isDetailsOpen} onClose={() => dispatch(openViewPopup())}>
            {currentMovie && (
            <div>
                <p><strong>Title:</strong> {currentMovie.Series_Title}</p>
                <p><strong>Overview:</strong> {currentMovie.Overview}</p>
                <p><strong>Genre:</strong> {currentMovie.Genre}</p>
                <p><strong>Released Year:</strong> {currentMovie.Released_Year}</p>
                <p><strong>Rating:</strong> {currentMovie.IMDB_Rating}</p>
                <p><strong>Star cast:</strong> {`${currentMovie.Star1}, ${currentMovie.Star2}, ${currentMovie.Star3}, ${currentMovie.Star4}`}</p>
                <p><strong>Director:</strong> {currentMovie.Director}</p>
                <p><strong>Votes:</strong> {currentMovie.No_of_Votes}</p>
                <p><strong>Runtime:</strong> {currentMovie.Runtime}</p>
                <p><strong>Meta score:</strong> {currentMovie.Meta_score}</p>
            </div>
            )}
        </Popup>
    )
}

export default ViewPopup;