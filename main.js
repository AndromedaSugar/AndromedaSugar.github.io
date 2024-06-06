document.fonts.ready.then(function () {
  $('h1').fadeTo(3000, 1, 'swing');
  $('.fab').fadeTo(3000, 1, 'swing');
});

const all_traits_object  = Object.entries(window.all_traits);

$(function() {
  load_traits();
  randomize();
  preload_sources();

  $('.layer_select').change(function() {
    layer_id = '#layer'+$(this).attr('id');
    image_path = 'assets/' + $(this).val() + '.png';
    load_image(image_path, layer_id);
  });

  $('.randomize_button').click(function() {
    randomize();
  });

   $('#download_button').click(function() {
    downloadImage();
  });
});

const load_traits = function() {
  all_traits_object.forEach(function(traits_map, i){
    layer_id = '#'+i;
    Object.entries(traits_map[1]).forEach(function(trait){
      $(layer_id).append('<option value="'+trait[1]+'">'+trait[0]+'</option>')
    });
  });
}

const load_image = function(src, layer_id=null) {
  $('.loader').show();
  preload(src)
  .then(function() {
    $('.loader').hide();
    if(layer_id) { $(layer_id).attr('src', src); }
  })
}

const preload_sources = async function() {
  sources = [];
  all_traits_object.forEach(function(traits_map, i){
    Object.entries(traits_map[1]).forEach(function(trait){
      sources.push('./assets/' + trait[1] + '.png');
    });
  });
  sources.map(preload);
}

const preload = function(src) {
  return new Promise(function(resolve, reject) {
    const img = new Image();
    img.onload = function() {
      console.log(src);
      resolve(src);
    }
    img.src = src;
  });
}

const preload_async = async function(src) {
  return await preload(src);
}

const images_loaded = function() {
  $('select').trigger('change');
  $('.loader').hide();
  console.log('Images loaded');
}

const randomize = async function() {
  $('.loader').show();
  sources = []
  all_traits_object.forEach(function(traits_map, i){
    traits = traits_map[1];
    keys = Object.keys(traits);
    values = keys.map(function(v) { return traits[v] });
    console.log(values.length)
    rand_trait = values[Math.floor((Math.random()*values.length))];
    if(rand_trait != null) {
      $('#'+i).val(rand_trait)
      sources.push('./assets/' + rand_trait + '.png');
    }
  });

  Promise.all(sources.map(preload_async))
  .then(function() {
    images_loaded();
  });
}

const downloadImage = function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const images = $('.layer_select').map(function() {
    return new Image();
  }).get();

  images.forEach((img, index) => {
    img.src = 'assets/' + $('.layer_select').eq(index).val() + '.png';
  });

  Promise.all(images.map(img => new Promise((resolve) => {
    img.onload = resolve;
  }))).then(() => {
    canvas.width = images[0].width;
    canvas.height = images[0].height;
    images.forEach(img => {
      ctx.drawImage(img, 0, 0);
    });
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'image.png';
    link.click();
  });
}
