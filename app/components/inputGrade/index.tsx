interface InputGradeProps {

    label: string;
    value: number;
    onChange: (newValue: number) => void;
}

export default function InputGrade({ label, value, onChange }: InputGradeProps) {


    return(
        <div className="flex flex-col justify-center items-center text-2xl">
            <label className="mb-2">{label}</label>
            <select
                value={value}
                onChange={onChange ? (e) => onChange(Number(e.target.value)) : undefined}
                className="text-black rounded pl-3 pr-3 py-1 appearance-none w-20 text-center border-2 border-gray-800"
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
    )
}