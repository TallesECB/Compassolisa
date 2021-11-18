const UserRepository = require('../../repository/UserRepository');
const Conflicts = require('../../errors/Conflicts');

class EmailValid {
  async createEmail(payload) {
    const validEmail = await UserRepository.getAll({ email: payload.email });
    if (validEmail.docs.length > 0) {
      throw new Conflicts(`Email ${payload.email}`);
    }
  }

  async updateEmail(payload, id) {
    const validEmail = await UserRepository.getAll({ email: payload.email });
    if (validEmail.docs.length > 0) {
      for (let i = 0; i < validEmail.docs.length; i++) {
        if (validEmail.docs[i].id !== id) {
          throw new Conflicts(`Email ${payload.email}`);
        }
      }
    }
  }
}

module.exports = new EmailValid();
