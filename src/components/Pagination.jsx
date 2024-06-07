const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) {
                pages.push('...');
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push('...');
            }
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex justify-center space-x-2">
            <button 
            className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-400' : 'bg-blue-500 text-white'}`} 
            onClick={() => onPageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            >
            Previous
            </button>
            {getPageNumbers().map((page, index) => (
            <button 
                key={index}
                className={`px-4 py-2 ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                onClick={() => typeof page === 'number' && onPageChange(page)}
                disabled={page === '...'}
            >
                {page}
            </button>
            ))}
            <button 
            className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-400' : 'bg-blue-500 text-white'}`} 
            onClick={() => onPageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            >
            Next
            </button>
        </div>
    );
  };
  
  export default Pagination;
  