import aboutImage from "../../../assets/aboutImage.png";
import aboutImage2 from "../../../assets/aboutImage2.png";
import aboutImage3 from "../../../assets/aboutImage3.png";
import aboutImage4 from "../../../assets/aboutImage4.png";
import aboutImage5 from "../../../assets/aboutImage5.png";

import team1 from "../../../assets/team/team1.jpg";
import team2 from "../../../assets/team/team2.jpg";
import team3 from "../../../assets/team/team3.jpg";
import team4 from "../../../assets/team/team4.jpg";
import team5 from "../../../assets/team/team5.jpg";
import team6 from "../../../assets/team/team6.jpg";


import {
    Users,
    Briefcase,
    Award,
    Globe,
} from "lucide-react";

export const aboutIntro = [
    {
        id: 1,
        section: "about_intro",
        label: "ABOUT US",
        title: "Creating modern digital solutions for businesses.",
        image: aboutImage,
        content: [
            {
                id: 1,
                type: "paragraph",
                value: "Himalaya Tech is a forward-thinking technology company committed to delivering innovative digital solutions that help businesses thrive in an increasingly connected world. We specialize in designing and developing high-quality websites, custom software, e-commerce platforms, mobile applications, and digital transformation solutions tailored to the unique needs of startups, small businesses, and enterprises. By combining creativity, technical expertise, and strategic thinking, we build reliable digital products that drive efficiency, enhance customer engagement, and support long-term business growth.",
            },
            {
                id: 2,
                type: "paragraph",
                value: "Our approach is built on understanding our clients' objectives, challenges, and future ambitions. Rather than simply delivering technology, we develop solutions that align with business goals, improve operational performance, and create measurable value. Every project is managed with a strong focus on quality, transparency, innovation, and collaboration, ensuring that our clients remain involved throughout every stage of the development process.",
            },  
        ],
    },

    {
        id: 2,
        label: "OUR MISSION",
        title: "Helping businesses grow with technology.",
        image: aboutImage2,
        content: [
            {
                id: 1,
                type: "paragraph",
                value: "At Himalaya Tech, our mission is to help businesses grow through innovative, reliable, and future-ready technology solutions. We are committed to delivering high-quality websites, custom software, mobile applications, and digital services that enable startups, small businesses, and enterprises to improve efficiency, strengthen their online presence, and achieve sustainable growth. Every solution we create is tailored to meet our clients' unique goals while maintaining the highest standards of quality, security, and performance."
            },
            {
                id: 2,
                type: "paragraph",
                value: "We strive to be more than a technology provider—we aim to become a trusted long-term partner for our clients. Through innovation, transparency, collaboration, and continuous improvement, we build secure, scalable, and user-focused digital products that create lasting value. Our mission is to empower organizations with technology that drives success, supports digital transformation, and prepares them for future opportunities in an ever-evolving business environment.",
            },
        ]
    },

    {
        id: 3,
        label: "OUR VISION",
        title: "Innovation that creates lasting value.",
        image: aboutImage3,
        content: [
            {
                id: 1,
                type: "paragraph",
                value: "At Himalaya Tech, our vision is to create innovative digital solutions that deliver lasting value for businesses and the people they serve. We believe technology should do more than solve today's challenges—it should open new opportunities, improve everyday operations, and support long-term success. By embracing creativity, continuous learning, and modern technologies, we aim to build solutions that remain useful, reliable, and adaptable as businesses grow and evolve."
            },
            {
                id: 2,
                type: "paragraph",
                value: "We envision becoming a trusted technology partner known for quality, integrity, and innovation. Our goal is to help organizations confidently embrace digital transformation through secure, user-friendly, and scalable solutions. By building strong relationships with our clients and focusing on their long-term success, we strive to create meaningful digital experiences that inspire growth, strengthen businesses, and make a positive impact in an ever-changing digital world.",
            },
        ]
    },

    {
        id: 4,
        label: "WHY US",
        title: "Your trusted digital partner.",
        image: aboutImage4,
        content: [
            {
                id: 1,
                type: "paragraph",
                value: "At Himalaya Tech, we understand that choosing a technology partner is an important decision. That's why we focus on building strong relationships based on trust, transparency, and consistent results. We take the time to understand your business, your goals, and the challenges you face before creating solutions that truly fit your needs. Our team combines technical expertise with creative thinking to deliver secure, user-friendly, and high-performing digital products that help your business succeed."
            },
            {
                id: 2,
                type: "paragraph",
                value: "What makes us different is our commitment to quality, reliability, and long-term support. We don't just complete projects—we work alongside our clients to ensure their continued growth and success. From planning and design to development and maintenance, every step is handled with care and professionalism. By staying up to date with modern technologies and industry best practices, we deliver scalable solutions that create real value, helping your business grow confidently in today's fast-changing digital world."
            },
        ]
    }
    
];

export const stats = {
    badge: "OUR ACHIEVEMENTS",
    title: "Numbers That Reflect Our Journey",
    description:
        "We take pride in our work and the trust our clients place in us.",

    items: [
        {
            id: 1,
            icon: Users,
            value: "0+",
            title: "Happy Clients",
            description: "Businesses that trust our technology solutions.",
            color: "red"
        },
        {
            id: 2,
            icon: Briefcase,
            value: "0+",
            title: "Projects Completed",
            description: "Successfully delivered across multiple industries.",
            color: "blue"
        },
        {
            id: 3,
            icon: Award,
            value: "0+",
            title: "Years Experience",
            description: "Delivering innovative digital products.",
            color: "purple"
        },
        {
            id: 4,
            icon: Globe,
            value: "0+",
            title: "Countries Served",
            description: "Supporting clients around the world.",
            color: "green"
        },       
    ],   
};

export const team = {
    label: "OUR TEAM",
    title: "Amazing people\nbehind Himalaya Tech",
    description: "Our experienced team combines creativity, technical expertise, and business knowledge to deliver reliable digital solutions for clients worldwide.",
    members: [
        {
            id: 1,
            image: team1,
            name: "Himlal Pokhrel",
            position: "Chief Executive Officer",
            email: "john@himalayatech.com",
            Facebook: "https://www.facebook.com/HimalayaTech01",
        },
        {
            id: 2,
            image: team2,
            name: "Emily Wilson",
            position: "Chief Technology Officer",
            email: "emily@himalayatech.com",
            Facebook: "#",
        },
        {
            id: 3,
            image: team3,
            name: "David Brown",
            position: "UI / UX Designer",
            email: "david@himalayatech.com",
            linkedin: "#",
        },
        {
            id: 4,
            image: team4,
            name: "Michael Lee",
            position: "Frontend Developer",
            email: "michael@himalayatech.com",
            linkedin: "#",
        },
        {
            id: 5,
            image: team5,
            name: "Sophia White",
            position: "Backend Developer",
            email: "sophia@himalayatech.com",
            linkedin: "#",
        },
        {
            id: 6,
            image: team6,
            name: "Daniel Smith",
            position: "Project Manager",
            email: "daniel@himalayatech.com",
            linkedin: "#",
        },
    ],

    joinTeam: {
        title: "Join our amazing team",
        description: "Build innovative software, work with talented professionals, and grow your career with Himalaya Tech.",
        buttonText: "Join Now",
        buttonLink: "/register",
    },
};