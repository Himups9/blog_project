// src/pages/Home.jsx

import { useAuth } from "../../auth/context/AuthContext";

import {
    Hero,
    Feature,
    FeaturedServices,
    HomeCard,
} from "./components/index";
// import FeaturedBlogs from "../components/home/FeaturedBlogs";
// import LatestBlogs from "../components/home/LatestBlogs";
// import Categories from "../components/home/Categories";

import { services } from "../data/servicesData";
import PageTransition from "../shared/components/PageTransition";

const Home = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <PageTransition>
            <div className="home-container"> <Hero isAuthenticated={isAuthenticated} user={user} />
                <Feature />
                <FeaturedServices random limit={3} />
                <HomeCard />
                

                {/*<Contact />*/}
            </div>
        </PageTransition>
    );
};

export default Home;
