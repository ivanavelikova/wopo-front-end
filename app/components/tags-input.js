import Ember from 'ember';

const {
  observer,
  inject: {
    service
  }
} = Ember;

export default Ember.Component.extend({
  network: service(),

  onInsertOrDestroy: observer('insertOrDestroy', function () {
    const input = $('.tags-input');

    if (this.get('insertOrDestroy') === true) {
      const tags = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace
      });
      tags.initialize();

      this
        .get('network')
        .getData('tags', true)
        .then(response => {
          tags.add(response.tags);
        });

      input.tagsinput({
        tagClass: 'tag-primary',
        typeaheadjs: {
          name: 'tags',
          displayKey: 'name',
          valueKey: 'name',
          source: tags.ttAdapter()
        }
      });

      const ttInput = $('.tt-input');
      const ttInputSize = ttInput.attr('placeholder').length;
      ttInput.attr('size', ttInputSize);
    } else {
      input.tagsinput('destroy');
    }
  })

});
