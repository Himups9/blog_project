import logo from "../../../../assets/logo.png";

const BackgroundWatermark = ({ className = "" }) => {
    return (
        <img
            src={logo}
            alt=""
            className={`pointer-events-none select-none ${className}`}
        />
    );
};

export default BackgroundWatermark;