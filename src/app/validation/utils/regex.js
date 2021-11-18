class regex {
    constructor() {
        this.CpfRegex = /^\d{3}.\d{3}.\d{3}-\d{2}$/;
        this.CnpjRegex = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/;
        this.CepRegex = /[0-9]{5}-[0-9]{3}$/;
        this.SenhaRegex = /^[a-zA-Z0-9]{8,30}$/;
    }
}

module.exports = new regex()