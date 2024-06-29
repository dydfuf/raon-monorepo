import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@raonc/ui/components/card";
import { Badge } from "@raonc/ui/components/badge";

interface Props {
  title: string;
  timeToRead: string;
  description: string;
  releaseDate: string;
  categories: string[];
}

export default function ContentCard({
  title,
  timeToRead,
  description,
  releaseDate,
  categories,
}: Props) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-center">
          {timeToRead} · {releaseDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {categories.map((category) => (
            <Badge key={category} className="rounded-full">
              {category}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4">{description}</p>
      </CardContent>
    </Card>
  );
}
