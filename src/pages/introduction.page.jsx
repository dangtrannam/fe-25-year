import React from 'react'

const IntroductionPage = ({ setNextPage }) => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setNextPage()}
            >
                Next
            </button>
        </div>
    )
}

export default IntroductionPage