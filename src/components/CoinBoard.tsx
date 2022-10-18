import React, { useState } from 'react';
import { IChartData, IProps } from "../modules/modules";
import '../styles/CoinBoard.css'
import type { ChartData } from 'chart.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment'
import axios, {AxiosResponse} from "axios";
import {useActions} from "../hooks/actions";
import {useAppSelector} from "../hooks/redux";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



export function CoinBoard( props: IProps): JSX.Element {
    const { name, image, symbol, price, volume, priceChange, id } = props;
    const [chartBtn, setChartBtn] = useState<boolean>(false);
    const [chartRange, setChartRange] = useState<string>('7')
    const [chartData, setChartData] = useState<ChartData<'line'>>();
    const { addFavourite,removeFavourite } = useActions()
    const {favorites} = useAppSelector(state => state.watchList)
    const [isFav, setIsFav] = useState(favorites.includes(id))

    function addToWatchList(event: React.MouseEvent<HTMLButtonElement>) {
      event.preventDefault()
        console.log(event);
        addFavourite(id)
        setIsFav(true)
    }

    function removeToWatchList(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        removeFavourite(id)
        setIsFav(false)
    }

    function btnHandler(event:React.MouseEvent<HTMLButtonElement>): void {
        setChartBtn(prev => !prev)
            axios.get<IChartData>(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`)
                .then((response:AxiosResponse) => {
                 setChartData({
                 labels: response.data.prices.map((price: number[]) => {return moment.unix(price[0] / 1000).format("MM-DD")}),
                 datasets: [
                        {
                             label: '30 Days Chart',
                            data: response.data.prices.map((price: number[]) => {return price[1]}),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                         },
                    ],
                })
            })
    }

    function changeHandler( rateTimeInterval: string): void {
        axios.get<IChartData>(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${rateTimeInterval}&interval=daily`)
            .then((response:AxiosResponse) => {
                setChartData({
                    labels: response.data.prices.map((price: number[]) => {return moment.unix(price[0] / 1000).format("MM-DD")}),
                    datasets: [
                        {
                            label: `${rateTimeInterval} Days Chart`,
                            data: response.data.prices.map((price: number[]) => {return price[1]}),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                    ],
                })
            })
    }


    return (
        <div className="coinBoard_container">
            <div className="coinBoard_row">
                    <img className="coinBoard_img" src={image} alt="crypto"/>
                    <p className="coinBoard_name">{name}</p>
                    <p className="coinBoard_symbol">{symbol}</p>
                    <p className="coinBoard_price">${price}</p>
                    <p className="coinBoard_volume">${volume.toLocaleString()}</p>
                { priceChange < 0 ? (
                    <p className="coinBoard_percent red">{priceChange.toFixed(2)}%</p>
                    ) : (
                    <p className="coinBoard_percent green">{priceChange.toFixed(2)}%</p>
                )}
                <button
                        value={id}
                        className='coinBoard_btn'
                        onClick={btnHandler}
                    >{chartBtn ? "Hide Chart" : "Show Chart"}</button>

                { !isFav && <button
                    value={id}
                    onClick={addToWatchList}
                >
                    Like
                </button>
                }

                {isFav && <button
                    value={id}
                    onClick={removeToWatchList}
                    >
                    Dislike
                    </button>
                }

            </div>
                { chartBtn && <div className="chartRate_container">
                    <select
                        className="chartRate_select"
                        onChange={(e) => {
                            setChartRange(e.target.value);
                            changeHandler(chartRange!)
                        }
                    }
                    >
                        <option
                            className="chartRate_option"
                            value="7">30 Days</option>
                        <option value="30">7 Days</option>
                    </select>
                    {chartData ? <Line data={chartData} /> : <p>Loading...</p>}
                </div> }

        </div>
    );
}