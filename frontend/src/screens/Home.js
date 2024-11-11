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
                                src="https://www.google.com/url?sa=i&url=https%3A%2F%2Forder.bikanervala.com%2Fproduct-detail%2Fpaneer-tikka-punjabi&psig=AOvVaw3_kSV94JQLBAZcFsk4U7ai&ust=1731400517605000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKCrkN7v04kDFQAAAAAdAAAAABAE"
                                className="d-block w-100"
                                style={{ filter: "brightness(50%)", objectFit: "cover" }}
                                alt="..."
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.youtube.com%2Fwatch%3Fv%3DDo7ZdUodDdw&psig=AOvVaw2FqwswA9U2hPywkRMgdUXZ&ust=1731400575490000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNC46_Tv04kDFQAAAAAdAAAAABAE"
                                className="d-block w-100"
                                style={{ filter: "brightness(50%)", objectFit: "cover" }}
                                alt="..."
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.maggi.in%2Fen%2Fpaneer-chilli-recipe%2F&psig=AOvVaw0pIybN-Y0A-IYojawNR06M&ust=1731400637306000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMC9mZTw04kDFQAAAAAdAAAAABAE"
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
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
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
