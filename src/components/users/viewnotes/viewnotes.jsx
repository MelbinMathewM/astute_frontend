import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useLocation, useNavigate } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = import.meta.env.VITE_PDF_WORKER_SRC;

const PdfViewerPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pdfUrl = location.state?.pdfUrl;
    const subject = location.state?.subject;
    const chapter = location.state?.chapter;

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        if (!pdfUrl) {
            console.error('No PDF URL provided! Redirecting...');
            navigate('/');
        }
    }, [pdfUrl, navigate]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handlePrevPage = () => {
        if (pageNumber > 1) setPageNumber(pageNumber - 1);
    };

    const handleNextPage = () => {
        if (pageNumber < numPages) setPageNumber(pageNumber + 1);
    };

    return (
        <div className="flex flex-col justify-center items-center py-4 space-y-6">
            {/* Breadcrumb */}
            <div className="w-full max-w-screen-sm md:max-w-4xl px-4 pt-12 md:px-8">
                <div className="text-sm text-gray-600">
                    <span className="cursor-pointer hover:text-blue-500" onClick={() => navigate('/notes')}>
                        Notes
                    </span>
                    {' > '}
                    <span className="text-gray-500">View</span>
                </div>
            </div>

            {/* Subject and Chapter */}
            <div className="w-full max-w-screen-sm md:max-w-4xl px-4 md:px-8 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold">{subject}</span>
                    <span className="text-lg font-semibold text-gray-500">-</span>
                    <span className="text-lg font-semibold">{chapter}</span>
                </div>
                <button
                    onClick={() => navigate('/notes')}
                    className="px-4 py-2 bg-[#237BFF] hover:bg-[#0544A4] text-white rounded"
                >
                    Back
                </button>
            </div>

            {/* PDF Viewer */}
            <div className="w-full max-w-screen-sm md:max-w-4xl px-4 md:px-8">
                {pdfUrl ? (
                    <div
                        className="border border-gray-300 rounded-lg overflow-auto"
                        style={{
                            height: '80vh',
                        }}
                    >
                        <Document
                            file={pdfUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                            loading={ <Loading /> }
                            error={ <Error /> }
                        >
                            <Page
                                key={`page_${pageNumber}`}
                                pageNumber={pageNumber}
                                scale={window.innerWidth < 768 ? 1 : 1.5}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        </Document>
                    </div>
                ) : (
                    <Loading />
                )}
            </div>

            {/* Sticky Page Navigation Controls */}
            {numPages && (
                <div
                    className="flex justify-between mt-4 sticky bottom-0 bg-white py-4 px-4 border-t border-gray-300 w-full max-w-screen-sm md:max-w-4xl"
                    style={{
                        boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
                    }}
                >
                    <button
                        onClick={handlePrevPage}
                        disabled={pageNumber === 1}
                        className="px-4 py-2 bg-blue-300 hover:bg-blue-700 hover:text-white text-gray-700 rounded"
                    >
                        Prev
                    </button>
                    <span>
                        Page {pageNumber} of {numPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={pageNumber === numPages}
                        className="px-4 py-2 bg-blue-300 hover:bg-blue-700 hover:text-white text-gray-700 rounded"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

const Loading = () => {
    return (
        <div className="flex justify-center items-center flex-col space-y-4 py-8">
    <svg
        className="animate-spin h-12 w-12 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        ></circle>
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 1115.934-.42L20 12H4z"
        ></path>
    </svg>
    <p className="text-lg text-gray-700">Loading PDF, please wait...</p>
</div>

    )
}

const Error = () => {
    return (
        <div className="flex justify-center items-center flex-col space-y-4 py-8">
            <svg
                className="h-12 w-12 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
            >
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zM11 7h2v6h-2zm0 8h2v2h-2z"
                ></path>
            </svg>
            <p className="text-lg text-red-500">Error loading PDF. Please try again later.</p>
        </div>
    )
}

export default PdfViewerPage;
