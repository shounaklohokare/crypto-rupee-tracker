
export const roundDown = (num : number, decimalPlaces : number) =>{
    const factor = Math.pow(10, decimalPlaces);
    return Math.floor(num * factor) / factor;
}

export const formatPrice = (num : number) => {

    if(num > 10000000){
        const x = num/10000000;
        return roundDown(x, 2) + " Crores";
    }else if(num > 100000){
        const x = num/100000;
        return roundDown(x, 2) + " Lakhs"
    }

    return roundDown(num, 4)

}