import { useState } from "react";
import Shameem from '../assets/images/Sir.jpg';
import { Sidebar } from "primereact/sidebar";
import { Link } from "react-router-dom";
import Header from "./Header";
import '../styles/execom.css';

const Execom = () => {
    const [visible, setVisible] = useState(false);

    const [imgList, setImgList] = useState([
        {
            id: 0,
            name: 'Prof. Shameem Ansar A',
            role: 'Faculty Coordinator',
            image: Shameem
        },
    ]);

    const [items, setItems] = useState([
        { id: 0, title: 2022 },
        { id: 1, title: 2023 },
        { id: 2, title: 2024 },
        { id: 3, title: 2025 },
        { id: 4, title: 2026 }
    ]);

    const [currentYear, setCurrentYear] = useState(2024);

    const renderedCards = imgList.map(item => (
        <div key={item.id} className="execom-card bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 transform hover:scale-105">
            <img src={item.image} alt={item.name} className="execom-card-image w-32 h-32 object-cover mx-auto mb-4 shadow-md" />
            <div className="execom-card-info text-center">
                <div className="execom-card-name text-lg font-semibold text-gray-900 mb-2">{item.name}</div>
                <div className="execom-card-role text-sm text-gray-600">ROLE: {item.role}</div>
            </div>
        </div>
    ));
    

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
                        <Link to="/" onClick={() => setVisible(false)}>
                            Home
                        </Link>
                        <Link to="/events" onClick={() => setVisible(false)}>
                            Events
                        </Link>
                        <Link to="/execom" onClick={() => setVisible(false)}>
                            Execom
                        </Link>
                        <Link to="/contacts" onClick={() => setVisible(false)}>
                            Contact
                        </Link>
                    </div>
                </Sidebar>
            </div>

            <div className="flex-auto p-7 mb-7 sm:mb-20 sm:px-14">
                <div className="flex sm:mt-7 mb-24">
                    <div className="font-black text-4xl sm:text-6xl">EXECOM</div>
                    <div className="flex-auto border-b-4 mb-2 ml-2"></div>
                </div>

                <div className="mb-16">
                    Current year: {currentYear}
                </div>
                
                <div className="flex justify-center">
                    <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full md:w-[85%] xl:w-[90%] 2xl:w-3/4 md:gap-y-16">
                        {renderedCards}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Execom;
