import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


type ResultCardProps = {
    url: string;
    title?: string;
    description?: string;
    image?: string;
    error?: string
};

export default function ResultCard({ url, title, description, image, error }: ResultCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{url}</CardTitle>
            </CardHeader>
            <CardContent>
                <h3 className="underline font-bold">Description</h3>
                <p>{description}</p>
                <h3 className="underline font-bold">Image</h3>

                <p>{image}</p>
            </CardContent>
            <CardFooter>
                <p className="text-red-500">{error}</p>
            </CardFooter>
        </Card>
    )
}
