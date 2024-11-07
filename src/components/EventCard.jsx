// EventCard.js
import PropTypes from 'prop-types';

const handleRegister = ({ heading }) => {
    alert(`You have registered for the event: ${heading}`);
};

const EventCard = ({ heading, text, image }) => {
    return (
        <div className="border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col items-center">
            {image && (
                <img src={image} alt={heading} className="w-full h-48 object-cover rounded-lg mb-4" />
            )}
            <h3 className="text-xl font-bold mb-2">{heading}</h3>
            <p className="text-gray-700 text-center">{text}</p>
            {/* Register Button */}
            <button
                onClick={handleRegister} // Function for handling registration
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
            >
                Register
            </button>
        </div>
    );
};

// Prop validation
EventCard.propTypes = {
    heading: PropTypes.string.isRequired, // Heading must be a string and is required
    text: PropTypes.string.isRequired,    // Text must be a string and is required
    image: PropTypes.string,               // Image can be a string (optional)
};

export default EventCard;
