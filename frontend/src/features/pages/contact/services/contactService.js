import api from "../../../api";

const sendContactMessage = (data) => api.post("/contact", data);

export { sendContactMessage };
