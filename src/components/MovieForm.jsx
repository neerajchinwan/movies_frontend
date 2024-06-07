import { useState } from "react";
import Popup from "./Popup";
import { useSelector, useDispatch} from 'react-redux';
import { addForm, addNewMovie } from "../redux/appSlice";

const MovieForm = () => {
    const formOpen = useSelector(state => state.movie.openForm);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const response = await fetch('api/v1/movie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
    
            const data = await response.json();
            if(data.status){
                dispatch(addNewMovie(data.data))
                dispatch(addForm())
            }
            
        }catch(error){}

        
    }



    return (
        <Popup title="Add New Movie" isOpen={formOpen} onClose={() => dispatch(addForm())}>
            <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex justify-between gap-2">
                <input
                type="text"
                placeholder="Movie Name"
                name="Series_Title"
                onChange={handleChange}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
                <input
                type="text"
                placeholder="Genre"
                name="Genre"
                onChange={handleChange}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
            </div>
            
            <div className="flex justify-between gap-2">
                <input
                type="text"
                placeholder="IMDB Rating"
                name="IMDB_Rating"
                onChange={handleChange}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
                <input
                type="text"
                placeholder="Meta score"
                name="Meta_score"
                onChange={handleChange}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
            </div>

            <div className="flex justify-between gap-2">
                <input
                type="text"
                placeholder="Votes"
                name="No_of_Votes"
                onChange={handleChange}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
                <input
                type="text"
                placeholder="Director"
                name="Director"
                onChange={handleChange}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
            />
            </div>
            <div className="flex justify-between gap-2">
                <input
                type="text"
                placeholder="Overview"
                name="Overview"
                onChange={handleChange}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
                <input
                type="text"
                placeholder="Image Link"
                name="Poster_Link"
                onChange={handleChange}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
            </div>

            <div className="flex justify-between gap-2">
                <input
                type="text"
                placeholder="Released_Year"
                name="Released_Year"
                onChange={handleChange}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
                <input
                type="text"
                placeholder="Runtime"
                name="Runtime"
                onChange={handleChange}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
            </div>

            <div className="flex justify-between gap-2">
                <input
                type="text"
                placeholder="Star1"
                name="Star1"
                onChange={handleChange}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
                <input
                type="text"
                placeholder="Star2"
                name="Star2"
                onChange={handleChange}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
            </div>

            <div className="flex justify-between gap-2">
                <input
                type="text"
                placeholder="Star3"
                name="Star3"
                onChange={handleChange}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
                <input
                type="text"
                placeholder="Star4"
                name="Star4"
                onChange={handleChange}
                className="flex-1 p-2 my-2 border-gray-300 rounded-md outline-none border-2 border-solid"
                />
            </div>
            

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        </form>
      </Popup>
        
    )
}

export default MovieForm
