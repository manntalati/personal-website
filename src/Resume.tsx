import './Resume.css'
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `${import.meta.env.BASE_URL}pdf.worker.min.js`;

function Resume() {
    return (
        <>
            <div>   
                <p className="heading">Resume</p>
                <Document file='/talati_mann_resume.pdf'
                onLoadError={console.error}
                onSourceError={console.error}>
                    <Page pageNumber={1}></Page>
                </Document>
            </div>
        </>
    )
}

export default Resume;