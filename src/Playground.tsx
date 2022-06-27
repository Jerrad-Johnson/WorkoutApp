import {Dispatch, SetStateAction, useState} from "react";
let cc = console.log;

function Playground(){
    const [setCountState, setSetCountState] = useState<number[]>([2, 2]);

    let simpleArray: number[] = [0, 1];

    let ChildComponents = simpleArray.map((e, k) => {

        return (
            <div key={k}>
                <Child
                    setCount = {setCountState[k]}
                    setCountState = {setCountState}
                    setSetCountState = {setSetCountState}
                    instance = {k}
                />
            </div>
        )
    });

    return (<div>
                {ChildComponents}
            </div>
    );
}

function Child({setCount, setCountState, setSetCountState, instance}:
                   {setCount: number,
                       setCountState: number[],
                       setSetCountState: Dispatch<SetStateAction<number[]>>,
                       instance: number}){

    let uselessArray: number[] = [0];

    let grandchild: JSX.Element[] = uselessArray.map((e, k) => {
       return (
           <div key={k}>
                <GrandChild
                    setCount = {setCount}
                    instance = {instance}
                    setCountState = {setCountState}
                    setSetCountState = {setSetCountState}
                />
            </div>
       );
    });


    return (<>
            Times to Repeat
        {grandchild}
    </>);
}

function GrandChild({setCount, instance, setCountState, setSetCountState}:
                        {setCount: number,
                            instance: number,
                            setCountState: number[],
                            setSetCountState: Dispatch<SetStateAction<number[]>>}){

    let x: number[] = [];

    cc(setCount); // This does not log upon selecting a new value.
    for (let i = 0; i < setCount; i++){
        x[i] = i;
    }

    let y: JSX.Element[] = x.map((e, k) => {
        return (
          <span key={k}>
              &nbsp; Lorem Ipsum &nbsp;
          </span>
        );
    })

    return (
        <>
        <select onChange={(e) => {
            let temp = setCountState;
            temp[instance] = +e.target.value;
            //setSetCountState(prev => prev.map((value, index) => index === instance ? value + e.target.value : value))
            cc(setCountState) // This *does* log upon selecting a new value.
        }}>
            <option>2</option>
            <option>3</option>
            <option>4</option>
        </select>

            {y}
        </>
    );
}


export default Playground;