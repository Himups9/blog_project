import { team } from "../../data/aboutData";
import Button from "../../shared/components/Button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const Team = () => {
    return (
        <section className="bg-[#edf5f4] py-28">

            <div className="mx-auto max-w-7xl px-6">

                {/* Heading */}

                <div className="mx-auto mb-20 max-w-3xl text-center">
                    <div className="flex items-center justify-center gap-4">
                        <span className="h-0.5 w-12 bg-red-800"></span>

                        <p className="text-sm font-semibold uppercase tracking-[1px] text-red-800">
                            {team.label}
                        </p>
                        <span className="h-0.5 w-12 bg-red-800"></span>
                    </div>

                    <h2 className="mt-5 whitespace-pre-line text-4xl font-semibold leading-tight text-slate-900">
                        {team.title}
                    </h2>

                    <p className="mx-auto mt-8 max-w-2xl text-sm leading-6 text-slate-600">
                        {team.description}
                    </p>

                </div>

                {/* Team */}
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

                    {team.members.map((member) => (
                        <div
                            key={member.id}
                            className="group overflow-hidden rounded-2xl shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="relative rounded-2xl overflow-hidden mx-8 mt-8">   
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="aspect-4/4.5 object-center object-cover transition duration-500 ease-in-out group-hover:scale-110 select-none pointer-events-none"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                                                              
                            </div>

                            <div className="px-6 pb-6 pt-5">

                                <h3 className="text-xl font-semibold text-slate-900">
                                    {member.name}
                                </h3>

                                <p className="mt-2 text-sm font-medium uppercase tracking-[2px] text-emerald-700">
                                    {member.position}
                                </p>

                                <div className="mt-4 flex items-center gap-4 text-sm">

                                    <a
                                        href={`mailto:${member.email}`}
                                        className="hover:text-red-700 underline transition-colors duration-300"
                                    >
                                        Email
                                    </a>

                                    <span>•</span>

                                    <a
                                        href={member.Facebook} target="blank"
                                        className="hover:text-red-700 underline"
                                    >
                                        Facebook
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Join Team */}
                <div className="relative mt-24 overflow-hidden rounded-3xl bg-linear-to-r from-[#0d534c] via-[#1f6d64] to-[#2d7a71] p-12">
                    <div className="relative z-10 flex flex-col lg:items-center justify-between gap-10 lg:flex-row">

                        {/* Decorative Blur */}
                        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl"></div>
                        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl"></div>

                        {/* Content */}
                        <div className="relative z-10 flex item-center gap-8">

                            {/* Left */}
                            <div className="flex items-center gap-8">

                                {/*Icons*/}
                                <div className="relative flex h-24 w-24 items-center justify-center">
                                    <div className="absolute h-20 w-8 -rotate-25 rounded-md bg-white"></div>
                                    <div className="absolute h-20 w-8 translate-x-8 rotate-25 rounded-md bg-white"></div>
                                </div>
                            <div>
                            <h2 className="text-4xl font-semibold text-white">
                                {team.joinTeam.title}
                            </h2>

                            <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">
                                {team.joinTeam.description}
                            </p>
                            </div></div>
                        </div>

                        <Button
                            text={team.joinTeam.buttonText}
                            to={team.joinTeam.buttonLink}
                            className="shrink-0"
                        />
                    </div>   
                </div>
            </div>
        </section>
    );
};

export default Team;