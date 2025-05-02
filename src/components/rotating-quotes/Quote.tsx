import { Card, CardContent, CardFooter } from '../ui/card';

interface QuoteProps {
  text: string;
  author?: string;
}

export function Quote(props: QuoteProps) {
  const { text, author } = props;

  return (
    <Card className="max-w-sm w-full h-[250px] justify-between bg-[url('/dark-gym.png')] bg-cover bg-center bg-opacity-50">
      <CardContent>
        <p className="text-xl text-white text-shadow-md text-shadow-black">{text}</p>
      </CardContent>
      <CardFooter className="justify-end self-end">{author && <p className="text-sm italic">— {author}</p>}</CardFooter>
    </Card>
  );
}
