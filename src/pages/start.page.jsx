import React from 'react'

const StartPage = ({ setNextPage }) => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setNextPage()}
            >
                Start
            </button>
        </div>

    )
}

export default StartPage