import {useState} from "react";

import './style.css';
import {RenderGrid} from "../component/grid";

function Index() {
    const [count, setCount] = useState(5);
    const [error, setError] = useState(false);

    const changeCount = (e) => {
        const value = e.target.value;

        setCount(value)
        // setCount(() => {
        //     if (value < 4 || value > 15) {
        //         setError(true);
        //
        //         return count
        //     } else {
        //         setError(false);
        //
        //         return value
        //     }
        // });
    }



    return (
        <div className="App">
            Введите количество ячеек <input onChange={changeCount} type={"number"} />

            {error && "введите норммальное значение"}

            <RenderGrid count={count} />
        </div>
    );
}

export default Index;
