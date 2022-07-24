const calc = (num1, num2, method) => {
    switch (method) {
        case "Multiplication" : {
            return num1 * num2;
        }
        case "Division" : {
            if (num2 === 0) throw new Error("Second number cant be zero!")
            return num1 / num2;
        }
    }
}
module.exports = calc;
