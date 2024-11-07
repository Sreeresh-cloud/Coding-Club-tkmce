import { useState, useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from "primereact/dropdown";
import { Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import "../styles/home.css";

const AdminEvents = () => {
    const [visible, setVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [registrationDialogVisible, setRegistrationDialogVisible] = useState(false); 

    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventDate, setEventDate] = useState(null);
    const [eventVenue, setEventVenue] = useState("");
    const [eventImage, setEventImage] = useState(""); 
    const [eventMode, setEventMode] = useState(""); 
    const [events, setEvents] = useState([]); 
    const [registrations, setRegistrations] = useState([]); 
    const [selectedEvent, setSelectedEvent] = useState(null); 


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
    const handleAddEvent = async () => {
        const formData = new FormData();
        formData.append("name", eventName);
        formData.append("description", eventDescription);
        formData.append("date", eventDate);
        formData.append("venue", eventVenue);
        formData.append("mode", eventMode);
        console.log("hi");
        if (eventImage) {
            formData.append("image", eventImage); 
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/events`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Event Added", response.data);
            setDialogVisible(false); 
            resetForm();

        } catch (error) {
            console.error("Error adding event", error);
        }
    };

    const resetForm = () => {
        setEventName("");
        setEventDescription("");
        setEventDate(null);
        setEventVenue("");
        setEventImage(""); 
        setEventMode(""); 
    };

    const onImageUpload = (e) => {
        if (e.files && e.files[0]) {
            setEventImage(e.files[0]);
        } else {
            console.log("No file selected");
        }
    };
    
    

    const modeOptions = [
        { label: "Online", value: "Online" },
        { label: "Offline", value: "Offline" }
    ];

    const openRegistrationDialog = async (eventName) => {

        console.log("Opening registration dialog for event:", eventName);
        setSelectedEvent(eventName); 
    
        try {
            const encodedEventName = encodeURIComponent(eventName);
            const url = `${import.meta.env.VITE_API_URL}/events/${encodedEventName}/registrations`;
            console.log("Constructed URL:", url);  
            const response = await axios.get(url);
            console.log("Fetched registrations:", response.data); 
            setRegistrations(response.data); 
        } catch (error) {
            console.error("Error fetching registrations", error);
        }
    
        setRegistrationDialogVisible(true);

    };

    const closeRegistrationDialog = () => {
        setRegistrationDialogVisible(false);
        setRegistrations([]);
    };

    const downloadExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
    
        XLSX.writeFile(workbook, 'registrations.xlsx');
    };

    return (
        <div className="admin-dashboard-container">
            <AdminHeader />
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

            <div className="flex-auto p-7 mb-7 sm:mb-20 sm:px-14">
                <div className="flex sm:mt-7 mb-24">
                    <div className="font-black text-4xl sm:text-6xl">EVENTS</div>
                    <div className="flex-auto border-b-4 mb-2 ml-2"></div>
                </div>

                <button 
                    className="bg-gradient-to-r from-red-600 to-blue-500 translate-y-[-150%] text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-700 hover:to-red-600 transition-colors duration-200 mb-4"
                    style={{ alignSelf: 'flex-start' }}
                    onClick={() => setDialogVisible(true)}
                >
                    Add New Event
                </button>

                <Dialog
                    header="Add New Event"
                    visible={dialogVisible}
                    style={{ width: '50vw' }}
                    onHide={() => setDialogVisible(false)}
                    className="rounded-lg animate__animated animate__fadeInDown"
                >
                    <div className="p-fluid flex flex-col gap-4">
                        <div>
                            <label htmlFor="eventName" className="block mb-2">Event Name</label>
                            <InputText
                                id="eventName"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                placeholder="Enter event name"
                            />
                        </div>

                        <div>
                            <label htmlFor="eventDescription" className="block mb-2">Event Description</label>
                            <InputTextarea
                                id="eventDescription"
                                value={eventDescription}
                                onChange={(e) => setEventDescription(e.target.value)}
                                placeholder="Enter event description"
                                rows={3}
                                autoResize
                            />
                        </div>

                        <div>
                            <label htmlFor="eventDate" className="block mb-2">Date and Time</label>
                            <Calendar
                                id="eventDate"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.value)}
                                showIcon
                                showTime
                                placeholder="Select date and time"
                            />
                        </div>

                        <div>
                            <label htmlFor="eventVenue" className="block mb-2">Venue</label>
                            <InputText
                                id="eventVenue"
                                value={eventVenue}
                                onChange={(e) => setEventVenue(e.target.value)}
                                placeholder="Enter venue"
                            />
                        </div>

                        <div>
                            <label htmlFor="eventMode" className="block mb-2">Mode</label>
                            <Dropdown
                                id="eventMode"
                                value={eventMode}
                                options={modeOptions}
                                onChange={(e) => setEventMode(e.value)}
                                placeholder="Select Mode"
                            />
                        </div>

                        <div>
                            <label htmlFor="eventImage" className="block mb-2">Event Image</label>
                            <FileUpload
                                id="eventImage"
                                mode="basic"
                                accept="image/*"
                                maxFileSize={1000000} 
                                onSelect={onImageUpload}
                                chooseLabel="Choose Image"
                            />
                        </div>

                        <button
                            onClick={handleAddEvent}
                            className="mt-5 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-green-600 hover:to-blue-600 transition-colors duration-200"
                        >
                            Save Event
                        </button>
                    </div>
                </Dialog>
                <Dialog
                    header="Registration Details"
                    visible={registrationDialogVisible}
                    style={{ width: '50vw' }}
                    onHide={closeRegistrationDialog}
                    className="rounded-lg transition-opacity duration-300 bg-gradient-to-b from-white to-gray-100 !important"
                >
                   <button 
                        onClick={() => downloadExcel(registrations)} 
                        className="absolute top-2 right-2 left-[-15px] p-2 text-white rounded-full w-10 h-10 flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg"
                        style={{ 
                            zIndex: 10, 
                            transform: "translate(650px, 11px)", 
                            background: "linear-gradient(to right, black, #6B7280)" 
                        }}
                    >
                        <i className="pi pi-download"></i>
                    </button>

                    <div className="rounded-lg transition-opacity duration-300 bg-gradient-to-b from-white to-gray-500">
                    {registrations.length > 0 ? (
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Year</th>
                                    <th className="border border-gray-300 px-4 py-2">Branch</th>
                                    <th className="border border-gray-300 px-4 py-2">Email ID</th>
                                    <th className="border border-gray-300 px-4 py-2">Mobile No</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations.map((reg, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2 text-gray-800">{reg.name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-gray-800">{reg.year}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-gray-800">{reg.branch}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-gray-800">{reg.emailId}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-gray-800">{reg.mobileNo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No registrations found for this event.</p>
                    )}
                    </div>

                  
                </Dialog>


                <div className="mt-10">
                <div className="flex sm:mt-7 mb-24">
                <div className="font-black text-2xl sm:text-4xl">UPCOMING EVENTS</div>
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
                                <button onClick={() => openRegistrationDialog(event.eventName)} className="mt-4 bg-white text-green-500 font-semibold py-2 px-4 rounded hover:bg-gray-200">Check Registrations</button>
                                </div>
                        ))
                    ) : (
                        <p>No upcoming events currently</p>
                    )}
                </div>

               


         </div>
            </div>

           
        </div>
    );
};

export default AdminEvents;
