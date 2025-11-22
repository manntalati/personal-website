import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const result = await emailjs.sendForm(
                'service_wieg4kk',
                'template_iu7qc9f',
                formRef.current!,
                'uQEcJvzf1MVPOLQ9n'
            );

            if (result.status === 200) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });

                setTimeout(() => setSubmitStatus('idle'), 5000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Email send failed:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="Contact" className="contact-section">
            <h2 className="section-title">Contact Agent</h2>

            <div className="contact-container">
                <div className="contact-info-panel">
                    <h3 className="panel-title">Get in Touch</h3>
                    <p className="panel-description">
                        Interested in casting me for your next project?
                        Reach out via email or connect on social media.
                    </p>

                    <div className="social-links-large">
                        <a href="mailto:mann.talati@gmail.com" className="social-link-item">
                            <FaEnvelope className="social-icon" />
                            <span>Email</span>
                        </a>
                        <a href="https://www.linkedin.com/in/mann-talati-017gvffgh" target="_blank" rel="noreferrer" className="social-link-item">
                            <FaLinkedin className="social-icon" />
                            <span>LinkedIn</span>
                        </a>
                        <a href="https://github.com/manntalati" target="_blank" rel="noreferrer" className="social-link-item">
                            <FaGithub className="social-icon" />
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>

                <div className="contact-form-panel">
                    <form ref={formRef} className="netflix-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Name"
                                className="netflix-input"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Email"
                                className="netflix-input"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                placeholder="Subject"
                                className="netflix-input"
                            />
                        </div>

                        <div className="form-group">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                placeholder="Message"
                                className="netflix-input"
                            />
                        </div>

                        <button
                            type="submit"
                            className="netflix-submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>

                        {submitStatus === 'success' && (
                            <div className="form-status success">
                                Message sent successfully!
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="form-status error">
                                Failed to send. Please try again.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}

