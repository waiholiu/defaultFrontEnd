interface Rate {
    currency:string,
    rate:string,
    name:string
}

interface Rates extends Array<Rate>{
    rates : Rate[]
}