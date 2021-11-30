class Repository {
  constructor(schema) {
    this.schema = schema;
  }

  async create(payload) {
    return this.schema.create(payload);
  }

  async getAll(payloadFind, offset = 0, limit = 100) {
    return this.schema.paginate(payloadFind, { offset, limit });
  }

  async getById(id) {
    return this.schema.findById(id);
  }

  async update(id, payload) {
    return this.schema.findByIdAndUpdate(id, payload, { new: true });
  }

  async remove(id) {
    return this.schema.findByIdAndRemove(id);
  }
}

module.exports = Repository;
