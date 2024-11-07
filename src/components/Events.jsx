import { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar } from "primereact/sidebar";
import { Link } from "react-router-dom";
import Header from "./Header";
import { Dialog } from "primereact/dialog";

const Events = () => {
    const [visible, setVisible] = useState(false);
    const [events, setEvents] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        branch: '',
        year: '',
        emailId: '',
        mobileNo: '',
        eventTitle: '',   // Add eventTitle to form data
        eventDate: ''     // Add eventDate to form data
    });

    // Fetch upcoming events on component mount
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
                const currentDate = new Date();
                const upcomingEvents = response.data.filter(event => new Date(event.eventDate) > currentDate);
                setEvents(upcomingEvents);
            } catch (error) {
                console.error("Error fetching events", error);
            }
        };

        fetchEvents();
    }, []);

    const handleRegisterClick = (event) => {
        setFormData({
            ...formData,
            eventTitle: event.eventName,    // Set event title
            eventDate: new Date(event.eventDate).toISOString(), // Convert to ISO string

        });
        setDialogVisible(true); // Show the dialog
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, formData); // Adjust the URL as needed
            console.log('Registration successful:', response.data);
            setDialogVisible(false); // Close the dialog after submission
            setFormData({
                name: '',
                branch: '',
                year: '',
                emailId: '',
                mobileNo: '',
                eventTitle: '', // Reset event title
                eventDate: ''   // Reset event date
            }); // Reset form data
        } catch (error) {
            console.error("Error registering for event:", error);
            // Optionally, you can show an error message to the user here
        }
    };

    return (
        <>
            <div>
                <Header />
                <Sidebar
                    visible={visible}
                    position="right"
                    onHide={() => setVisible(false)}
                >
                    <div className="flex flex-col gap-7 items-center">
                        <Link to="/" onClick={() => setVisible(false)}>Home</Link>
                        <Link to="/events" onClick={() => setVisible(false)}>Events</Link>
                        <Link to="/execom" onClick={() => setVisible(false)}>Execom</Link>
                        <Link to="/contacts" onClick={() => setVisible(false)}>Contact</Link>
                    </div>
                </Sidebar>
            </div>
            <div className="flex-auto p-7 mb-7 sm:mb-20 sm:px-14">
                <div className="flex sm:mt-7 mb-24">
                    <div className="font-black text-4xl sm:text-6xl">EVENTS</div>
                    <div className="flex-auto border-b-4 mb-2 ml-2"></div>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    {events.length > 0 ? (
                        events.map(event => (
                            <div key={event._id} className="event-card mb-6 p-5 w-80 border rounded-lg shadow-lg transition-transform duration-200 hover:scale-105 bg-gradient-to-b from-gray-700 to-black text-white text-center">
                                {event.eventImage && (
                                    <img 
                                        src={`data:image/png;base64,${event.eventImage}`} 
                                        alt={event.eventName} 
                                        className="w-100 h-120 object-contain rounded-t-lg mb-4"
                                    />
                                )}
                                <h3 className="text-xl font-semibold mb-2 uppercase underline">{event.eventName}</h3>
                                <p className="mb-2 font-normal text-gray-400">{event.eventDescription}</p>
                                <p className="text-gray-200">
                                    <strong>Date: </strong> 
                                    <span className="text-red-500">
                                        {new Date(event.eventDate).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true
                                        })}
                                    </span>
                                </p>
                                <p className="text-gray-200"><strong>Venue:</strong> {event.eventVenue}</p>
                                <p className="text-gray-200"><strong>Mode:</strong> {event.eventMode}</p>

                                <button onClick={() => handleRegisterClick(event)} className="mt-4 bg-white text-green-500 font-semibold py-2 px-4 rounded hover:bg-gray-200">Register</button>
                            </div>
                        ))
                    ) : (
                        <p>No upcoming events currently</p>
                    )}
                </div>
            </div>

            {/* Registration Dialog */}
            <Dialog header="Register for Event" visible={dialogVisible} style={{ width: '50vw', background: 'linear-gradient(to bottom, white, gray)' }} onHide={() => setDialogVisible(false)}>
                <div className="bg-gradient-to-b from-white to-gray-300 p-5 rounded-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label className="mb-1">Name:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="mb-3 p-2 border border-gray-300 rounded" required />

                            <label className="mb-1">Branch:</label>
                            <select name="branch" value={formData.branch} onChange={handleInputChange} className="mb-3 p-2 border border-gray-300 rounded" required>
                                <option value="">Select your branch</option>
                                <option value="ARCH">ARCH</option>
                                <option value="CHEM">CHEM</option>
                                <option value="CIVIL">CIVIL</option>
                                <option value="CSE-AI">CSE-AI</option>
                                <option value="CSE">CSE</option>
                                <option value="ECE">ECE</option>
                                <option value="EEE">EEE</option>
                                <option value="ER">ER</option>
                                <option value="MECH">MECH</option>
                            </select>

                            <label className="mb-1">Year:</label>
                            <select name="year" value={formData.year} onChange={handleInputChange} className="mb-3 p-2 border border-gray-300 rounded" required>
                                <option value="">Select your year</option>
                                <option value="First">First</option>
                                <option value="Second">Second</option>
                                <option value="Third">Third</option>
                                <option value="Fourth">Fourth</option>
                            </select>

                            <label className="mb-1">Email ID:</label>
                            <input type="email" name="emailId" value={formData.emailId} onChange={handleInputChange} className="mb-3 p-2 border border-gray-300 rounded" required />

                            <label className="mb-1">Mobile No:</label>
                            <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleInputChange} className="mb-3 p-2 border border-gray-300 rounded" required />

                            <button
                                type="submit"
                                className="mt-4 w-32 bg-gradient-to-r from-red-500 to-blue-500 text-white font-semibold py-2 px-4 rounded hover:scale-105 transition-transform duration-200 transform translate-x-2"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </Dialog>
        </>
    );
};

export default Events;
