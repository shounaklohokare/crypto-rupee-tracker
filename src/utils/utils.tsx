import numeral from 'numeral'

export const roundDown = (num : number) =>{
    return num < 1 ? numeral(num).format('0,0.00000') : numeral(num).format('0,0.00');
}

export const roundDownPercent = (num : number) =>{
    return numeral(num).format('0,0.00');
}

export const formatNum = (num : string | number) => {

    const n = Number(num)

    if(n > 1000000000000){
        const x = n/1000000000000;
        return roundDown(x)+ " Lakh Crores";
    }else if(n > 10000000000){
        const x = n/10000000000;
        return roundDown(x)+ " Thousand Crores";
    }else if(n > 10000000){
        const x = n/10000000;
        return roundDown(x) + " Crores";
    }else if(n > 100000){
        const x = n/100000;
        return roundDown(x) + " Lakhs"
    }


    return roundDown(n)

}

export const formatDate = (dateInStr : string) => {

    const date = new Date(dateInStr);

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    return `${day}th ${month} ${year}`;

}