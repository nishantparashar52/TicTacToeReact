import React, { useState, useEffect } from 'react';

function App() {
    const [initialArray, setInitialArray] = useState([]);
    const [whichPlayer, setPlayer] = useState(true);
    const [winner, setWinner] = useState(null);
    const arraySize = 3;

    useEffect(() => {
        getInitialArray(arraySize);
    }, []);
    const getInitialArray = n => {
        let arr = Array(n).fill().map(() => Array(n).fill(''))
        setInitialArray(arr);
    }
    const player = (i, j) => {
        if(winner || initialArray[i][j] !== '') return;
        const currenSymbol = whichPlayer ? 'X' : '0';
        initialArray[i][j] = currenSymbol;
        setInitialArray([...initialArray]);
        checkWinner(i,j , currenSymbol);
        setPlayer(!whichPlayer);
    }
    const checkWinner = (i, j, currenSymbol) => {
        const isExtreme = isExtremeEnd(i,j);
        let count = {i: 0, j: 0};
        if(isExtreme) {
            for(let c = 0, len = initialArray[0].length; c < len; c++) {
                if(initialArray[i][c] === currenSymbol) count.i += 1;
            }
            if(count.i === 3) setWinner(currenSymbol);
            for(let r = 0, len = initialArray.length; r < len; r++) {
                if(initialArray[r][j] === currenSymbol) count.j += 1;;
            }
            if(count.j === 3) setWinner(currenSymbol);
        }
    }
    const isExtremeEnd = (i,j) => {
        if(i === 0 || j === 0 || (i = initialArray[0].length) || (j = initialArray.length)) {
            return true;
        }
        return false;
    }
    return (
        <div>
            {initialArray.map((item, i) => {
                return (
                    <div key={i}>
                        {item.map((itemIndex,j) => {
                            return (
                                <button style={{height: '20px', width:'20px'}} key={j} onClick={() => player(i, j)}>{itemIndex}</button>
                            );
                        })}
                    </div>
                );
            })}
            {winner && <div>{`Winner is ${winner}` }</div>}
        </div>
    );
}
export default React.memo(App);
