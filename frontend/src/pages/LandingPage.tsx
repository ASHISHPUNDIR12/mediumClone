import { useNavigate } from "react-router-dom"

const LandingPage = () => {
    const navigate = useNavigate();
  return (
    <div>
        <div>
            <nav className="w-screen bg-gray-200 p-3 flex justify-between " >
                <div>Medium</div>
                <button onClick={()=>{
                    navigate("/signup")
                }} className="mr-5 bg-gray-700 text-white p-1 rounded" >Signup</button>
            </nav>
                <div className="text-center mt-50 text-4xl font-bold  " >
                    Simple Clone of medium like webapp
                </div>
        </div>
    </div>
  )
}

export default LandingPage