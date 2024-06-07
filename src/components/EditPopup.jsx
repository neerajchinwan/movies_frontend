import { useEffect, useState } from 'react'
import Popup from "./Popup";
import { openEditPopup, updateMovie } from '../redux/appSlice';
import { useSelector, useDispatch } from 'react-redux';

const EditPopup = () => {
    const dispatch = useDispatch();
    const isEditOpen = useSelector(state => state.movie.openEdit);
    const currentMovie = useSelector(state => state.movie.currentMovie);
    const [formData, setFormData] = useState({
        Series_Title: '',
        Genre: '',
        IMDB_Rating: '',
        Meta_score: '',
        No_of_Votes: '',
        Director: '',
        Overview: '',
        Poster_Link: '',
        Released_Year: '',
        Runtime: '',
        Star1: '',
        Star2: '',
        Star3: '',
        Star4: ''
    });

    useEffect(() => {
        if(currentMovie){
            setFormData({
                Series_Title: currentMovie.Series_Title,
                Genre: currentMovie.Genre,
                IMDB_Rating: currentMovie.IMDB_Rating,
                Meta_score: currentMovie.Meta_score,
                No_of_Votes: currentMovie.No_of_Votes,
                Director: currentMovie.Director,
                Overview: currentMovie.Overview,
                Poster_Link: currentMovie.Poster_Link,
                Released_Year: currentMovie.Released_Year,
                Runtime: currentMovie.Runtime,
                Star1: currentMovie.Star1,
                Star2: currentMovie.Star2,
                Star3: currentMovie.Star3,
                Star4: currentMovie.Star4
            })
        }
    }, [currentMovie])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const response = await fetch(`/api/v1/movie/${currentMovie._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json();
            if(data.status){
                dispatch(updateMovie(data.data))
                dispatch(openEditPopup())
            }
        }catch(error){}
    }

    return ( currentMovie &&
        <Popup title="Edit Movie" isOpen={isEditOpen} onClose={() => dispatch(openEditPopup())}>
            <form onSubmit={handleSubmit} className="flex flex-col">

            <div className="flex justify-between gap-2">
                <input
                type="text"
                placeholder="Movie Name"
                name="Series_Title"
                onChange={handleChange}
                value={formData.Series_Title}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
                <input
                type="text"
                placeholder="Genre"
                name="Genre"
                onChange={handleChange}
                value={formData.Genre}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
            </div>
            
            <div className="flex justify-between gap-2">
                <input
                type="text"
                placeholder="IMDB Rating"
                name="IMDB_Rating"
                onChange={handleChange}
                value={formData.IMDB_Rating}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
                <input
                type="text"
                placeholder="Meta score"
                name="Meta_score"
                onChange={handleChange}
                value={formData.Meta_score}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
            </div>

            <div className="flex justify-between gap-2">
                <input
                type="text"
                placeholder="Votes"
                name="No_of_Votes"
                onChange={handleChange}
                value={formData.No_of_Votes}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
                <input
                type="text"
                placeholder="Director"
                name="Director"
                onChange={handleChange}
                value={formData.Director}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
            />
            </div>
            <div className="flex justify-between gap-2">
                <input
                type="text"
                placeholder="Overview"
                name="Overview"
                onChange={handleChange}
                value={formData.Overview}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
                <input
                type="text"
                placeholder="Image Link"
                name="Poster_Link"
                onChange={handleChange}
                value={formData.Poster_Link}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
            </div>

            <div className="flex justify-between gap-2">
                <input
                type="text"
                placeholder="Released_Year"
                name="Released_Year"
                onChange={handleChange}
                value={formData.Released_Year}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
                <input
                type="text"
                placeholder="Runtime"
                name="Runtime"
                onChange={handleChange}
                value={formData.Runtime}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
            </div>

            <div className="flex justify-between gap-2">
                <input
                type="text"
                placeholder="Star1"
                name="Star1"
                onChange={handleChange}
                value={formData.Star1}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
                <input
                type="text"
                placeholder="Star2"
                name="Star2"
                onChange={handleChange}
                value={formData.Star2}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
            </div>

            <div className="flex justify-between gap-2">
                <input
                type="text"
                placeholder="Star3"
                name="Star3"
                onChange={handleChange}
                value={formData.Star3}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
                <input
                type="text"
                placeholder="Star4"
                name="Star4"
                onChange={handleChange}
                value={formData.Star4}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
            </div>

            <div className="flex justify-center gap-4">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => dispatch(openEditPopup())}>Cancel</button>
            </div>

                
            </form>
        </Popup>
    )
}

export default EditPopup;