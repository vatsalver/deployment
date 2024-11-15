import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
    const [search, setsearch] = useState('');
    const [foodCat, setfoodCat] = useState([]);
    const [foodItem, setfoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("https://eatit-server.vercel.app/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();
        setfoodItem(response[0]);
        setfoodCat(response[1]);
        //    console.log(response[0],response[1]);

    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleControls"
                    className="carousel slide"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-inner" id="carousel">
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={search}
                                    onChange={(e) => { setsearch(e.target.value) }}
                                />
                                {/* <button
                                    className="btn btn-outline-warning text-white bg-warning"
                                    type="submit"
                                >
                                    Search
                                </button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img
                                src="https://food.annapurnaderoyal.com/wp-content/uploads/2021/07/Chilli-Paneer.jpg"
                                className="d-block w-100"
                                style={{ filter: "brightness(50%)", objectFit: "cover" }}
                                alt="..."
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://www.shanfoods.com/wp-content/uploads/2022/07/vegtable-biryani.jpg"
                                className="d-block w-100"
                                style={{ filter: "brightness(50%)", objectFit: "cover" }}
                                alt="..."
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://www.cookforindia.com/wp-content/uploads/2016/08/Paneer-Tikka-_LR-1140x500.jpg"
                                className="d-block w-100"
                                style={{ filter: "brightness(50%)", objectFit: "cover" }}
                                alt="..."
                            />
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div></div>
            <div className='container'>
                {
                    foodCat && foodCat.length !== 0
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3' key={data._id}>
                                    <div className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {foodItem && foodItem.length !== 0 ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card foodItem={filterItems}
                                                        options={filterItems.options[0]}
                                                    ></Card>
                                                </div>
                                            )
                                        })
                                        : <div>No Such Data Found</div>}
                                </div>
                            )
                        }) : ""
                }
            </div>
            <div><Footer /></div>
        </>
    );
};
