import { addForm } from "../redux/appSlice";
import { useDispatch } from "react-redux";

const Header = () => {
    const dispatch = useDispatch();
    return (
        <header className="bg-blue-600 text-white px-16 p-4 flex justify-between items-center">
            <div className="text-xl font-bold">My Movie App</div>
            <input type="text" placeholder="Search..." className="p-2 rounded" />
            <div className="space-x-4">
            <button className="text-white" onClick={() => dispatch(addForm())}>Add New Movie</button>
            </div>
        </header>
    )
}

export default Header;