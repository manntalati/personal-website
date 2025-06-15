import { useState, useEffect } from 'react';
import './Hero.css';

export default function Hero() {
    const statements = [
        'is a student @ UIUC',
        'enjoys weightlifting',
        'loves creating new tech projects',
        'drumming to a new song',
        'watching new TV shows',
        'learning new technologies'
    ];

    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
    const i = loopNum % statements.length;
    const fullText = statements[i];
    let ticker: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === fullText) {
      ticker = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    } else {
      const nextText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
      ticker = setTimeout(
        () => setText(nextText),
        isDeleting ? 100 : 150
      );
    }

    return () => clearTimeout(ticker);
  }, [text, isDeleting, loopNum, statements]);

    return (
        <section className="hero">
            <h1 className="hero-name">Mann Talati</h1>
              <div className="rotating-text">
                {text}
                <span className="cursor"></span>
              </div>
        </section>
    );
}