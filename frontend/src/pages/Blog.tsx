import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import FullBlock from "../components/FullBlock";
import Skeleton from "../components/Skeleton";

const Blog = () => {
  const {id} = useParams<{id:string}>();
  const   {loading , blog} = useBlog({
    id : id || ""
  })
  if (loading || !blog) {
    return (
      <div className="min-h-screen mt-30 bg-gradient-to-br from-gray-50 via-white to-gray-200">
        <Skeleton />
      </div>
    );
  }
  return (
    <div>
      <FullBlock blog={blog}/>
    </div>
  )
}

export default Blog 