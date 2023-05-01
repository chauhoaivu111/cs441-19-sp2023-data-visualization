import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import usePaginations from "./Paginations";
import axios from 'axios';
import { Link } from "react-router-dom";
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';

const NewsCard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const options = {
            method: "GET",
            url: "https://covid-19-news.p.rapidapi.com/v1/covid",
            params: { q: "covid", lang: "en", media: "True" },
            headers: {
                "X-RapidAPI-Key": "5a7bbd5f84msh659c969df773736p126d76jsnee4c0aff2e01",
                "X-RapidAPI-Host": "covid-19-news.p.rapidapi.com",
            },
        };

        axios
            .request(options)
            .then(function (response) {
                setData(response.data.articles);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);

    console.log(data)


    let [page, setPage] = useState(1);
    const PER_PAGE = 9;

    const count = Math.ceil(data.length / PER_PAGE);
    var _DATA = usePaginations(data, PER_PAGE);

    // console.log(_DATA)

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };
    return (

        <div>
            <h1>News About Covid 19</h1>
            <div className='big_frame_newscard'>
                {
                    _DATA.currentDatas().map((item) => (
                        <div key={item._id} className='frame_newscard'>
                            <Link to={{ pathname: item.link }}
                                target="_blank"
                                rel="noreferrer"
                                style={{ textDecoration: 'none' }}>
                                <div className='frame_title'>

                                    {

                                        item.title.length > 70 ? <h3>{item.title.substring(0, 60) + "..."}</h3> : <h3>{item.title}</h3>
                                    }


                                </div>
                                <div className='frame_summary'>
                                    <p>{item.summary.substring(0, 250) + "..."}</p>
                                </div>

                                <div className='frame_date'><p>{item.published_date}</p></div>



                                <div className='frame_author'>
                                    {
                                        item.author.length === 0 ? <span> Author : <p> Unanmed</p></span> : <span> Author : <p>{item.author}</p></span>

                                    }

                                    <div className='frame_rank'>
                                        <div className='frame_rank__icon' >
                                            <p><span>Rank : </span> {item.rank}</p>
                                            <StarBorderPurple500Icon style={{ color: "#f7ed2f" }} />
                                        </div>

                                    </div>
                                </div>




                            </Link>

                        </div>
                    ))}
            </div>
            <div className="frame_piantion_news">
                <Pagination
                    count={count}
                    size="large"
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChange}

                />
            </div>
        </div>
    )
}

export default NewsCard
