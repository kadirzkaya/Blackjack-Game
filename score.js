const score=(val)=>{

    switch (val) {
        case "A":
            return 1;
        case "J":
            return 11;
        case "Q":
            return 12;
        case "K":
            return 13;
        default:
            return val;
    }
}