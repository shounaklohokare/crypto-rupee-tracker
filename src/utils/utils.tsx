
export const roundDown = (num : number, decimalPlaces : number) =>{
    const factor = Math.pow(10, decimalPlaces);
    return String(Math.floor(num * factor) / factor);
}

export const formatNum = (num : string | number) => {

    const n = Number(num)

    if(n > 10000000000){
        const x = n/10000000000;
        return roundDown(x, 2) + "K Crores";
    }else if(n > 10000000){
        const x = n/10000000;
        return roundDown(x, 2) + " Crores";
    }else if(n > 100000){
        const x = n/100000;
        return roundDown(x, 2) + " Lakhs"
    }

    return roundDown(n, 4)

}

export const formatDate = (dateInStr : string) => {

    const date = new Date(dateInStr);

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    return `${day}th ${month} ${year}`;

}