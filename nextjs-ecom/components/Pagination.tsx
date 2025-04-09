interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    // get pagination range
    const getPaginationRange = () => {
        const range = [];

        // Add the "First page" button
        if (currentPage > 2) {
            range.push(1)
            if (currentPage > 3) {
                range.push("...")
            }
        }

        // Add the current page
        const start = Math.max(1, currentPage - 1);
        const end = Math.min(totalPages, currentPage + 1);

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        // Add the "Last page" button
        if (currentPage < totalPages - 1) {
            if (currentPage < totalPages - 2) {
                range.push("...")
            }
            range.push(totalPages)
        }

        return range;
    }

    const handlePageChange = (page: number | string) => {
        if (typeof page === "number") {
            onPageChange(page)
        }
    }

    const paginationRange = getPaginationRange()

    return (
        <div className="space-x-3">
            {/* Previous Button */}
            <button onClick={() => currentPage > 1 && onPageChange(currentPage - 1)} className="px-2 py-2 bg-gray-100 rounded-md focus:outline-none focus:right-0" disabled={currentPage === 1}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-4 ${currentPage === 1 ? "text-gray-400" : "text-black"}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            {/* Pagination Numbers */}
            {
                paginationRange.map((page, index) => (
                    <button onClick={() => handlePageChange(page)} key={index} className={`w-8 h-8 px-1 py-1 rounded-md text-sm font-medium focus:outline-none focus:right-0 ${currentPage === page ? "bg-green-500 text-white" : ""}`} disabled={page === "..."}>
                        {page}
                    </button>
                ))
            }
            {/* Next Button */}
            <button onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)} className="px-2 py-2 bg-gray-100 rounded-md focus:outline-none focus:right-0" disabled={currentPage === totalPages}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-4 ${currentPage === totalPages ? "text-gray-400" : "text-black"}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    )
}

export default Pagination