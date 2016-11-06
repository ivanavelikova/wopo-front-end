import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    const tags = serialized.map(tag => tag.name);
    return tags.join();
  },

  serialize(deserialized) {
    return deserialized;
  }
});
