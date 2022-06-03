import './style.css';
import {useEffect, useState} from "react";

export const RenderGrid = ({ count, changeCountStep }) => {
    const EMPTY = {
        countLine: null,
        title: "",
        key: "empty",
    }

    const [fivers, setFivers] = useState({});
    const [correctFivers, setCorrectFivers] = useState([]);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        let fivers = {},
            correctFivers = [],
            countLine = 0;

        for (let i = 1; i < (count * count); i++) {
            if ((i - 1) % count === 0) {
                countLine++;
                fivers[countLine] = [];
            }

            fivers[countLine].push({
                countLine,
                title: i,
                key: i
            });

            correctFivers.push(i);
        }

        if (Array.isArray(fivers[countLine])) {
            addEmpty(countLine, fivers[countLine])
        }

        setCompleted(false);
        setFivers(fivers);
        setCorrectFivers(correctFivers)
    }, [count]);


    const onClickFiver = (e) => {
        if (completed || e.target.id.split('_')[1] == EMPTY.key) return;

        let line = Number(e.target.id.split("_")[0]),
            index = Number(e.target.id.split("_")[1]);

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

        changeCountStep((prev) => {
            return prev + 1;
        });

        if (fivers[line - 1] && fivers[line - 1][indexElem].key === EMPTY.key) {
            locationEmpty.line = line - 1;

            replaceFiver(locationEmpty, locationFiver);
        } else if (fivers[line + 1] && fivers[line + 1][indexElem].key === EMPTY.key) {
            locationEmpty.line = line + 1;

            replaceFiver(locationEmpty, locationFiver);
        } else if (fivers[line][indexElem + 1] && fivers[line][indexElem + 1].key === EMPTY.key) {
            locationEmpty.line = line;
            locationEmpty.index = indexElem + 1;

            replaceFiver(locationEmpty, locationFiver);
        } else if (fivers[line][indexElem - 1] && fivers[line][indexElem - 1].key === EMPTY.key) {
            locationEmpty.line = line;
            locationEmpty.index = indexElem - 1;

            replaceFiver(locationEmpty, locationFiver);
        }
    }

    const addEmpty = (countLine, array) => {
        EMPTY.countLine = countLine;

        return array.push(EMPTY);
    }

    const randomFivers = () => {
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

            element.countLine = countLine;
            obj[countLine].push(element);
        })

        changeCountStep(0);
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

        let arrKeyFivers = [],
            inProgress = true;

        for (const [_, value] of Object.entries(newFivers)) {
            value.forEach(element => {
                arrKeyFivers.push(element.key)
            })
        }

        correctFivers.forEach((value, index) => {
            if (value !== arrKeyFivers[index]) {
                inProgress = false;
            }
        })

        if (inProgress == true) {
            setCompleted(true);
        }
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

    const restartGame = () => {
        setCompleted(false);
        randomFivers();
    }


    return (
        <>
            {count > 0 && completed == false && (
                <button className={"random-button"} onClick={randomFivers}>Перемешать</button>
            )}

            {completed && (
                <div className={"finish"}>
                    <div className={"completed-puzzle"}>Ура! Вы собрали пазл!</div>
                    <button className={"random-button"} onClick={restartGame}>Повторить</button>
                </div>
            )}

            <div className={"wrapper"}>
                <div></div>
                <div style={{gridTemplateColumns: `repeat(${count}, 1fr)`}} className={`grid ${completed ? "completed" : null}`}>
                    {renderFiver()}
                </div>
                <div></div>
            </div>
        </>
    )
}