import React, {useEffect, useState} from 'react';
import { IChartData, IProps } from "../modules/modules";
import '../styles/CoinBoard.css'
import type { ChartData, ChartOptions } from 'chart.js';
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
    const [chartRange, setChartRange] = useState<string>("7")
    const [chartData, setChartData] = useState<ChartData<'line'>>();
    const [chartOptions, setChartOptions] = useState<ChartOptions<'line'>>({
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Cypto Chart',
            },
        },
    })


    function btnHandler(event:React.MouseEvent<HTMLButtonElement>){
        setChartBtn(prev => !prev)
            axios.get<IChartData>(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`)
                .then((response:AxiosResponse) => {
             setChartData({
                 labels: response.data.prices.map((price: number[]) => {return moment.unix(price[0] / 1000).format("MM-DD")}),
                 datasets: [
                     {
                         label: 'Dataset 1',
                         data: response.data.prices.map((price: number[]) => {return price[1]}),
                         borderColor: 'rgb(255, 99, 132)',
                         backgroundColor: 'rgba(255, 99, 132, 0.5)',
                     },
                 ],
             })
            })
    }

    function changeHandler(limit: string) {
        axios.get<IChartData>(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${limit}&interval=daily`)
            .then((response:AxiosResponse) => {
                setChartData({
                    labels: response.data.prices.map((price: number[]) => {return moment.unix(price[0] / 1000).format("MM-DD")}),
                    datasets: [
                        {
                            label: 'Dataset 1',
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
                        className='chartRate_btn'
                        onClick={btnHandler}
                    >{chartBtn ? "Hide Chart" : "Show Chart"}</button>
            </div>
                { chartBtn && <div className="chartRate_container">

                    <select
                        onChange={(event) => {
                            setChartRange( event.target.value);
                            console.log(chartRange)
                            changeHandler(chartRange)
                        }
                    }
                    >
                        <option value="7">30 days</option>
                        <option value="30">7 days</option>
                    </select>

                    {chartData ? <Line data={chartData} options={chartOptions} /> : <p>Loading...</p>}
                </div> }

        </div>
    );
}