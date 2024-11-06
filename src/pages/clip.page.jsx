import React from 'react'

const ClipIntroductionPage = ({ setNextPage }) => {
    return (
        <div className="relative min-h-screen flex justify-end items-end p-12">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setNextPage()}
            >
                Skip
            </button>
        </div>
    )
}

export default ClipIntroductionPage