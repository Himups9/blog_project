import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

export const Contacts = () => {
    return (
        <section className="relative overflow-hidden py-24 min-h-screen">

            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.04)_1px,transparent_1px)]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    <ContactInfo />
                    <ContactForm />

                </div>

            </div>

        </section>
    );
};
