/* Althea CMS: media picker for image / images fields. */
(function ($) {
  'use strict'

  $(document).on('click', '.althea-media-select', function (event) {
    event.preventDefault()
    var $box = $(this).closest('.althea-media')
    var multiple = $box.data('multiple') === 1
    var $input = $box.find('.althea-media-ids')
    var $preview = $box.find('.althea-media-preview')

    var frame = wp.media({
      title: multiple ? 'Choose images' : 'Choose image',
      library: { type: 'image' },
      multiple: multiple ? 'add' : false,
      button: { text: 'Use selected' },
    })

    frame.on('open', function () {
      var selection = frame.state().get('selection')
      String($input.val() || '')
        .split(',')
        .filter(Boolean)
        .forEach(function (id) {
          var attachment = wp.media.attachment(id)
          attachment.fetch()
          selection.add(attachment)
        })
    })

    frame.on('select', function () {
      var items = frame.state().get('selection').toJSON()
      $input.val(items.map(function (item) { return item.id }).join(','))
      $preview.empty()
      items.forEach(function (item) {
        var thumb = (item.sizes && item.sizes.thumbnail) ? item.sizes.thumbnail.url : item.url
        $preview.append($('<img>').attr({ src: thumb, alt: '' }))
      })
    })

    frame.open()
  })

  $(document).on('click', '.althea-media-clear', function (event) {
    event.preventDefault()
    var $box = $(this).closest('.althea-media')
    $box.find('.althea-media-ids').val('')
    $box.find('.althea-media-preview').empty()
  })
})(jQuery)
