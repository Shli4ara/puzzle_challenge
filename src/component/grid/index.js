import './style.css';
import {useEffect, useState} from "react";

export const RenderGrid = ({ count }) => {
    const EMPTY = {
        countLine: null,
        title: "",
        key: "empty",
    }

    const [fivers, setFivers] = useState({});
    const [complited, setComplited] = useState(false);

    useEffect(() => {
        let obj = {};
        let countLine = 0;

        for (let i = 1; i < (count * count); i++) {
            if ((i - 1) % count === 0) {
                countLine++;
                obj[countLine] = [];
            }

            obj[countLine].push({
                countLine,
                title: i,
                key: i
            })

        }

        if (Array.isArray(obj[countLine])) {
            addEmpty(countLine, obj[countLine])
        }

        setFivers(obj);
    }, [count]);


    const onClickFiver = (e) => {
        let line = Number(e.target.id.split("_")[0]);
        let index = Number(e.target.id.split("_")[1]);
        let obj = {};

        let indexElem = fivers[line].findIndex(elem => elem.key === index)

        let locationEmpty = {
            line: null,
            index: indexElem
        };
        let locationFiver = {
            line,
            index: indexElem
        };

        //TODO Запилить бабель на ? (null | undefined)

        if (fivers[line - 1] && fivers[line - 1][indexElem].key === EMPTY.key) {
            locationEmpty.line = line - 1;

            replaceFiver(locationEmpty, locationFiver);
            console.log("zalet. dirka svergy")
        } else if (fivers[line + 1] && fivers[line + 1][indexElem].key === EMPTY.key) {
            locationEmpty.line = line + 1;

            replaceFiver(locationEmpty, locationFiver);
            console.log("zalet. dirka snizu")
        } else if (fivers[line][indexElem + 1] && fivers[line][indexElem + 1].key === EMPTY.key) {
            locationEmpty.line = line;
            locationEmpty.index = indexElem + 1;

            replaceFiver(locationEmpty, locationFiver);
            console.log("zalet. dirka sprava")
        } else if (fivers[line][indexElem - 1] && fivers[line][indexElem - 1].key === EMPTY.key) {
            locationEmpty.line = line;
            locationEmpty.index = indexElem - 1;

            replaceFiver(locationEmpty, locationFiver);

            console.log("zalet. dirka sleva")
        } else {
            console.log("zalet. hui v rot")
        }
    }

    const examinationFivers = () => {

    }

    const addEmpty = (countLine, array) => {
        EMPTY.countLine = countLine;

        return array.push(EMPTY);
    }

    const random = () => {
        let arr = [];

        for (const key in fivers) {
            fivers[key].forEach(e => arr.push(e))
        }

        arr.sort(() => Math.random() - 0.5);

        let obj = {}
        let countLine = 0;

        for (let i = 1; i < (count * count); i++) {
            if ((i - 1) % count === 0) {
                countLine++;
                obj[countLine] = [];
            }
        }

        countLine = 0;

        arr.forEach((element, index) => {
            if (index % count === 0) {
                countLine++;
            }

            //TODO кажется я тут малость мутирую данные

            element.countLine = countLine;
            obj[countLine].push(element);
        })

        setFivers(obj);
    }

    const replaceFiver = (locationEmpty, locationFiver) => {
        let newFivers = JSON.parse(JSON.stringify(fivers));
        let fiver = JSON.parse(JSON.stringify(fivers[locationFiver.line][locationFiver.index]));

        fiver.countLine = locationEmpty.line;
        EMPTY.countLine = locationFiver.line;

        newFivers[locationEmpty.line][locationEmpty.index] = fiver;
        newFivers[locationFiver.line][locationFiver.index] = EMPTY;

        setFivers(newFivers);
    }

    const renderFiver = () => {
        if (!Object.keys(fivers).length) return;

        let arr = [];

        for (const key in fivers) {
            fivers[key].forEach(e => {
                arr.push(<div key={e.key} id={`${e.countLine}_${e.key}`} onClick={onClickFiver} className={"fiver"}>{e.title}</div>)
            })
        }

        return arr;
    }

    return (
        <>
            <button onClick={random}>перемешать</button>

            <div className={"wrapper"}>
                <div></div>
                <div style={{gridTemplateColumns: `repeat(${count}, 1fr)`}} className={"grid"}>
                    {renderFiver()}
                </div>
                <div></div>
            </div>
        </>
    )
}