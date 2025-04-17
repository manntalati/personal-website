import './Resume.css'

function Resume() {

    return (
        <>
            <div>   
                <p className="heading">Resume</p>
                <iframe className="pdf" src='../src/assets/talati_mann_resume.pdf' width={300} height={400}/>
            </div>
        </>
    )
}

export default Resume;