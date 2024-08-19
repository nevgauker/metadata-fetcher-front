import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type FetchRowProps = {
    selectValue: string;
    inputValue: string;
    onChange: (updatedRow: { selectValue: string; inputValue: string }) => void;
};

export default function FetchRow({ selectValue, inputValue, onChange }: FetchRowProps) {

    const handleSelectChange = (value: string) => {
        onChange({ selectValue: value, inputValue });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ selectValue, inputValue: e.target.value });
    };


    return (
        <div className="flex space-x-4">
            <Select value={selectValue} onValueChange={handleSelectChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="https://" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="https://">https://</SelectItem>
                    <SelectItem value="http://">http://</SelectItem>
                </SelectContent>
            </Select>
            <Input value={inputValue} onChange={handleInputChange} />
        </div>
    )

}