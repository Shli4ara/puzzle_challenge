import {useState} from "react";
import {RenderGrid} from "../components/Grid";

import './style.css';

function Index() {
    const [count, setCount] = useState(0);
    const [error, setError] = useState(false);

    const changeCount = (e) => {
        const value = e.target.value;

        setCount(() => {
            if (value < 3 || value > 16) {
                setError(true);

                return count
            } else {
                setError(false);

                return value
            }
        });
    }



    return (
        <div className="App">

            <div className={"welcome-text"}>
                <div>
                    Введите количество ячеек <input onChange={changeCount} type={"number"} min="3" max="16" />
                </div>
            </div>

            {error ? (
                <div className={"error"}>
                    <span>Укажите значение в диапазоне от 3 до 16 включительно</span>
                </div>
            ) : (
                <RenderGrid count={count} />
            )}
        </div>
    );
}

export default Index;
