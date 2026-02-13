const num: number = 10;

const sum = (a: number, b: number): number => {
  return a + b;
};

console.log(sum(1, 2));

interface IProps {
  a: number;
  b: number;
  c: string;
  d: boolean;
}

type Optional<T, k extends keyof T> = Omit<T, k> & Partial<Pick<T, k>>;
type PropsOptions = Optional<IProps, "c" | "d">;
const props: PropsOptions = {
  a: 1,
  b: 2,
};

props.c = "hello";
props.d = true;
