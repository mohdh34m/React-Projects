import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

function App() {
  const [page, setPage] = useState(0)

  const fetchPosts = (page = 0) =>
    fetch('https://dummyjson.com/posts?limit=10&skip=' + page * 10)
      .then((res) => res.json())
      .then((data) => { return data.posts })

  const { isLoading, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ['posts', page],
      queryFn: () => fetchPosts(page),
      keepPreviousData: true,
    })

  return (
    <div className="h-screen bg-[#EFF5FE] flex justify-center items-center">
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div className=''>
            <div className='grid grid-cols-5'>
              {data.map((post) => (
                <p key={post.id} className='m-5 bg-slate-400 h-[150px] w-[150px] flex justify-center items-center font-bold text-lg p-5 rounded-xl'>{post.title}</p>
              ))}
            </div>
          </div>

        )}
        <div className='flex justify-between'>
          <span>Current Page: {page + 1}</span>
          <button
            className='bg-slate-500 disabled:cursor-not-allowed disabled:bg-slate-300 cursor-pointer border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white'
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 0}
          >
            Previous Page
          </button>
          <button
            className='bg-slate-500 disabled:cursor-not-allowed disabled:bg-slate-300 cursor-pointer border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white'
            onClick={() => setPage((old) => old + 1)}
          >
            Next Page
          </button>
        </div>

        {isFetching ? <span> Loading...</span> : null}
      </div>
    </div>
  )
}

export default App
