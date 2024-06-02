var loader_id;

const show_loader = function() {
  if(loader_id) { return }
  loading_chars = ['▁','▂','▃','▄','▅','▆','▇','█','▉','▊','▋','▌','▍','▎','▏']
  loading_chars = ['▁','▁','▁','▁','▁','▁','▁','▁','▁','▁','▁','▁','▁','▁','▁']
  loading_chars = ['▁','▂','▃','▄','▅','▆','▇','▆','▅','▄','▃','▂','▁']
  counter = 0;
  loader_id = setInterval(function() {
    loading_text = [...loading_chars];
    char = loading_text[counter % loading_chars.length];
    char = '<span class="trans">' + char + '</span>';
    char = ''
    char = ['▃▆▃▆▃']
    loading_text[counter % loading_chars.length] = char;
    counter += 1;
    console.log(loading_text.join());
    $('.loader').html(loading_text.join(''));
  }, 100);
}
