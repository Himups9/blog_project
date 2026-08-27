import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../../shared/components/Button";
import { sendContactMessage } from "../services/contactService";

const ContactForm = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateField = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            await sendContactMessage(form);
            setForm({ name: "", email: "", subject: "", message: "" });
            toast.success("Your message has been sent.");
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Unable to send your message."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (

        <div className="rounded-4xl bg-gray-300 shadow-2xl p-10 border border-slate-200">

            <span className="uppercase tracking-[2px] text-yellow-600 text-xs">
                Schedule a Consultation
            </span>

            <h3 className="text-4xl font-bold mt-5">

                How can we help?

            </h3>

            <p className="mt-6 text-slate-500 text-justify leading-7">
                Tell us about your project, business goals, or technical requirements. Our team will review your request and get back to you within 24 hours.
            </p>

            <form className="mt-10 space-y-6" onSubmit={handleSubmit}>

                <div className="grid md:grid-cols-2 gap-5">

                    <input
                        name="name"
                        value={form.name}
                        onChange={updateField}
                        required
                        placeholder="Full Name"
                        className="border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-700"
                    />

                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={updateField}
                        required
                        placeholder="Email Address"
                        className="border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-700"
                    />

                </div>

                <div className="grid md:grid-cols-2 gap-5">

                    <input
                        placeholder="Phone Number"
                        className="border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-700"
                    />

                    <input
                        name="subject"
                        value={form.subject}
                        onChange={updateField}
                        placeholder="Subject"
                        className="border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-700"
                    />

                </div>

                <textarea
                    name="message"
                    value={form.message}
                    onChange={updateField}
                    required
                    rows="6"
                    placeholder="Tell us about your project..."
                    className="w-full border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-700"
                />

                <label className="flex items-center gap-3 text-sm">

                    <input type="checkbox"/>

                    I agree to the privacy policy.

                </label>

                
                <Button  
                    text="Send Message"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-center justify-center"
                />

            </form>

        </div>

    );

};

export default ContactForm;
