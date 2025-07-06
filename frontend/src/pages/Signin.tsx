import Auth from "../components/Auth"
import Quote from "../components/Quote"

const Signin = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full overflow-hidden">
      <div className="flex items-center justify-center p-4 h-full">
        <Auth type="signin" />
      </div>
      <div className="hidden md:block bg-gray-50 h-full">
        <Quote />
      </div>
    </div>
  )
}

export default Signin