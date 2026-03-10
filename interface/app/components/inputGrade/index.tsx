interface InputGradeProps {

    label: string;
    value: number;
    onChange: (newValue: number) => void;
}

export default function InputGrade({ label, value, onChange }: InputGradeProps) {


    return(
        <div className="flex justify-center items-center text-2xl">
            <label className="mr-2">{label}:</label>
            <div
                className="flex text-black pl-3 pr-3 py-1 text-center ml-2"
            >
                <div className="flex flex-col mr-2">

                    <label>1</label>
                    <input type="radio" value="1" checked={value === 1} onChange={() => onChange(1)} />
                </div>

                <div className="flex flex-col mr-2">
                    <label>2</label>
                    <input type="radio" value="2" checked={value === 2} onChange={() => onChange(2)} />
                </div>  

                <div className="flex flex-col mr-2">
                    <label>3</label>
                    <input type="radio" value="3" checked={value === 3} onChange={() => onChange(3)} />
                </div>

                <div className="flex flex-col mr-2">
                    <label>4</label>
                    <input type="radio" value="4" checked={value === 4} onChange={() => onChange(4)} />
                </div>

                <div className="flex flex-col mr-2">
                    <label>5</label>
                    <input type="radio" value="5" checked={value === 5} onChange={() => onChange(5)} />
                </div>
            </div>
        </div>
    )
}