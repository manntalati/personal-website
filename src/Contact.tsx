import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

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
        <section id="Contact" className="contact">
            <h2 className="contact-heading">Get In Touch</h2>
            <p className="contact-subtitle">
                I'm always interested in hearing about new opportunities and interesting projects.
            </p>
            
            <div className="contact-content">
                <div className="contact-info">
                    <h3>Let's Connect</h3>
                    <p>Feel free to reach out if you'd like to discuss potential collaborations, 
                    have questions about my work, or just want to say hello!</p>
                    
                    <div className="contact-methods">
                        <div className="contact-method">
                            <span className="contact-icon">📧</span>
                            <div>
                                <h4>Email</h4>
                                <p>mann.talati@gmail.com</p>
                            </div>
                        </div>
                        <div className="contact-method">
                            <span className="contact-icon">💼</span>
                            <div>
                                <h4>LinkedIn</h4>
                                <p>in/mann-talati</p>
                            </div>
                        </div>
                        <div className="contact-method">
                            <span className="contact-icon">🐙</span>
                            <div>
                                <h4>GitHub</h4>
                                <p>manntalati</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your name"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="What's this about?"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            placeholder="Tell me more about your project or opportunity..."
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                    
                    {submitStatus === 'success' && (
                        <div className="success-message">
                            ✅ Message sent successfully! I'll get back to you soon.
                        </div>
                    )}
                    
                    {submitStatus === 'error' && (
                        <div className="error-message">
                            ❌ Something went wrong. Please try again or email me directly at mann.talati@gmail.com
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}
