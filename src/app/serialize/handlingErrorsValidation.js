class serialize {
    async serializeErrors(error) {
        const handlingErrors = error.details;
        const result = [];
    
        handlingErrors.forEach((object) => {
            result.push({
                description: object.path[0],
                name: object.message
            });
        });
        return result
    }
}

module.exports = new serialize();

  