import ContactCard from "./ContactCard";
import { contacts } from "../../data/ContactData";

const ContactInfo = () => {

    return (
        <div>

            <span className="uppercase tracking-[2px] text-yellow-600 text-xs">
                Get In Touch
            </span>

            <h2 className="mt-6 text-6xl font-bold text-slate-900 leading-tight">
                Let's build
                <br />
                something
                <br />
                amazing.
            </h2>

            <p className="mt-8 text-lg text-slate-600 leading-8">
                Tell us about your business, your idea,
                or your project requirements.
                Our team will contact you shortly.
            </p>

            <div className="mt-12 space-y-6">

                {contacts.map((item,index)=>(
                    <ContactCard key={index} {...item}/>
                ))}

            </div>

        </div>
    );
};

export default ContactInfo;