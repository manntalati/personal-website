import './About.css'
 
export default function About() {
    return (
        <section id="About" className="about">
            <div className="about-text">
                <p className="description">Hey! I am a student at the University of Illinois Urbana-Champaign 
                    studying statistics and computer science, specifically interested in machine learning and 
                    artificial intelligence. Growing up I was always fascinated with technology and its
                    application in the real world setting, which has only continued to prosper at UIUC.
                    At UIUC, I am involved in the CUBE Consulting organization that aims to bridge technology
                    and business together to solve real-world problems for clients. Beyond my interests in
                    AI & ML & SWE, I love playing volleyball, learning a new song on the drums, strength
                    training, coin-collecting (specifically U.S. state quarters), and building with LEGO.
                </p>
            </div>
            <div className="about-image">
                <img src={'headshot.jpg'} alt="Mann Talati" />
            </div>
        </section>
    )
}