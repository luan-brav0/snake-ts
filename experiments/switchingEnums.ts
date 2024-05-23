enum Num {
    One = "one",
    Two = "two",
    Three = "three"
}

const initNum = (n: number): Num | undefined => 
    n == 1  ? 
        Num.One 
    : n == 2 ?
        Num.Two 
    : n == 3 ? 
        Num.Three 
    : undefined

let num: Num | undefined = initNum(2);

// can't do that
switch (num){
    case Num.One:
        console.log(Num.One);
        break;
    case "two":
        console.log(Num.Two);
        break;
    case "three":
        console.log(Num.Three);
        break;

}
// output: "2"
