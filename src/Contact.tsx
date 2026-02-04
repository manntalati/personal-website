import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiSend, FiArrowRight } from 'react-icons/fi';

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
            <div className="contact-container">
                <div className="contact-header">
                    <span className="section-label">Contact</span>
                    <h2 className="section-heading">Let's Work Together</h2>

                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <div className="contact-card">
                            <h3 className="contact-card-title">Get in Touch</h3>
                            <p className="contact-card-description">
                                I'm always open to discussing new opportunities,
                                interesting projects, or just having a conversation.
                            </p>

                            <div className="contact-links">
                                <a href="mailto:mann.talati@gmail.com" className="contact-link">
                                    <div className="contact-link-icon">
                                        <FiMail />
                                    </div>
                                    <div className="contact-link-content">
                                        <span className="contact-link-label">Email</span>
                                        <span className="contact-link-value">mann.talati@gmail.com</span>
                                    </div>
                                    <FiArrowRight className="contact-link-arrow" />
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/mann-talati-017gvffgh"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="contact-link"
                                >
                                    <div className="contact-link-icon">
                                        <FaLinkedin />
                                    </div>
                                    <div className="contact-link-content">
                                        <span className="contact-link-label">LinkedIn</span>
                                        <span className="contact-link-value">Connect with me</span>
                                    </div>
                                    <FiArrowRight className="contact-link-arrow" />
                                </a>

                                <a
                                    href="https://github.com/manntalati"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="contact-link"
                                >
                                    <div className="contact-link-icon">
                                        <FaGithub />
                                    </div>
                                    <div className="contact-link-content">
                                        <span className="contact-link-label">GitHub</span>
                                        <span className="contact-link-value">View my code</span>
                                    </div>
                                    <FiArrowRight className="contact-link-arrow" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-wrapper">
                        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject" className="form-label">Subject</label>
                                <input
                                    id="subject"
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="What's this about?"
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Your message..."
                                    className="form-input form-textarea"
                                />
                            </div>

                            <button
                                type="submit"
                                className="form-submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    'Sending...'
                                ) : (
                                    <>
                                        Send Message <FiSend />
                                    </>
                                )}
                            </button>

                            {submitStatus === 'success' && (
                                <div className="form-status success">
                                    ✓ Message sent successfully! I'll get back to you soon.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="form-status error">
                                    Failed to send message. Please try again or email me directly.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
