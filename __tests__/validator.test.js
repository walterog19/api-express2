const {validateEmail} = require("./../api/lib/validator");

describe("Test Validators",()=>{
    it("Email is valid", ()=>{
        const email= "walterog19@gmail.com";
        expect(validateEmail(email)).toBe(true);
        
    });

    it("Email is not valid", ()=>{

        const email= "walterog19";
        expect(validateEmail(email)).toBe(false);
        

    });

})