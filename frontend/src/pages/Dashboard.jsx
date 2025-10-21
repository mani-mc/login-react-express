import { Link } from "react-router-dom"

export default function Dashboard() {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="max-w-sm flex flex-col justify-center items-center">
                <p className="font-semibold text-2xl" >Login successful. Welcome, user</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 mt-3 px-4 rounded-lg transition duration-200" ><Link to="/">Logout</Link></button>
            </div>

        </div >
    )
}
