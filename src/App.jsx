import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import MovieForm from "./components/MovieForm";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMoviesStart, 
      fetchAllMoviesSuccess, 
      fetchAllMoviesFail, 
      addCurrentMovie, 
      openViewPopup, 
      openDeletePopup,
      openEditPopup,
      movieCount,
      updateCurrentPage,
      addForm } from './redux/appSlice';
import ViewPopup from "./components/ViewPopup";
import DeletePopup from "./components/DeletePopup";
import EditPopup from "./components/EditPopup";
import Pagination from "./components/Pagination";




const App = () => {
  const movies = useSelector(state => state.movie.movies)
  const dispatch = useDispatch();
  const totalMovies = useSelector(state => state.movie.totalMovieCount);
  const currentPage = useSelector(state => state.movie.currentPage);
  const moviesPerPage = 20
  const totalPages = Math.floor(totalMovies/moviesPerPage);
  const [filter, setFilter] = useState('Released_Year');
  const [sortOrder, setSortOrder] = useState('desc');
  const [keyword, setKeyword] = useState('');


  const totalMovieCountApi = async () => {
    try{
      const response = await fetch('api/v1/movie/count');
      const data = await response.json();
      if(data.status){
        dispatch(movieCount(data.data))
      }
    }catch(error){

    }
    
  }

  const callMovieApi = async () => {
    try{
      dispatch(fetchAllMoviesStart());
      const response = await fetch(`api/v1/movie?p=${currentPage}&sortTitle=${filter}&sort=${sortOrder}`);
      const data = await response.json();
      dispatch(fetchAllMoviesSuccess(data.data))
    }catch(error){
      dispatch(fetchAllMoviesFail(error.message))
    }
    
  }

  useEffect(() => {
    callMovieApi();
    totalMovieCountApi();
  }, [])


  const handleEdit = (movie) => {
    dispatch(openEditPopup());
    dispatch(addCurrentMovie(movie));
  };

  const handleDelete = (movie) => {
    dispatch(openDeletePopup());
    dispatch(addCurrentMovie(movie));
  };

  const handleDetails = (movie) => {
    dispatch(openViewPopup());
    dispatch(addCurrentMovie(movie));
  };

  const fetchCommonApi = async () => {
    try{
      dispatch(fetchAllMoviesStart(currentPage, filter, sortOrder));
      const response = await fetch(`api/v1/movie?p=${currentPage}&sortTitle=${filter}&sort=${sortOrder}&search=${keyword}`);
      const data = await response.json();
      dispatch(fetchAllMoviesSuccess(data.data))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }catch(error){
      dispatch(fetchAllMoviesFail(error.message))
    }
  }

  const handlePageChange = (e) => {
    dispatch(updateCurrentPage(e))
  }

  useEffect(() => {
    fetchCommonApi(currentPage, filter, sortOrder);
  }, [currentPage, filter, sortOrder, keyword])

  const handleFilterChange = async(event) => {
    setFilter(event.target.value);
    dispatch(updateCurrentPage(1))
  };

  const handleSortOrderChange = async (event) => {
    setSortOrder(event.target.value);
    dispatch(updateCurrentPage(1))
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    dispatch(updateCurrentPage(1))
  }


  return ( 
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <header className="bg-blue-600 text-white px-16 p-4 flex justify-between items-center">
            <div className="text-xl font-bold">My Movie App</div>
            <input type="text" value={keyword} onChange={handleSearch} placeholder="Search..." className="p-2 rounded text-black" />
            <div className="space-x-4">
            <button className="text-white" onClick={() => dispatch(addForm())}>Add New Movie</button>
            </div>
        </header>

      <main className=" max-w-screen-xl mx-auto flex-1 p-4">
      <div className="mb-4 flex justify-between items-center space-x-4">
          <div className="flex space-x-2">
            <label htmlFor="filter" className="self-center">Filter :</label>
            <select 
            value={filter} 
              onChange={handleFilterChange} 
              className="p-2 border border-gray-300 rounded-md outline-none">
              <option value="Released_Year">Choose</option>
              <option value="No_of_Votes">Votes</option>
              <option value="IMDB_Rating">Rating</option>
              <option value="Meta_score">Score</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <label htmlFor="sortOrder" className="self-center">Sort by Year:</label>
            <select 
              id="sortOrder" 
              value={sortOrder} 
              onChange={handleSortOrderChange} 
              className="p-2 border border-gray-300 rounded-md outline-none"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          { movies.length > 0 ? movies.map(movie => (
            <MovieCard
              key={movie._id}
              image={movie.Poster_Link}
              title={movie.Series_Title}
              year={movie.Released_Year}
              rating={movie.IMDB_Rating}
              onEdit={() => handleEdit(movie)}
              onDelete={() => handleDelete(movie)}
              onDetails={() => handleDetails(movie)}
            />
          )) : null}
        </div>
      </main>
      <footer className="bg-gray-200 text-center p-4">
        <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
      </footer>

      <ViewPopup />

      <DeletePopup />

      <EditPopup />

      <MovieForm />
    </div>
  )
}

export default App;