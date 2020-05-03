$(function() {
  // load iframe
  $('.comment-form').append('<iframe class="blogger-iframe-colorize blogger-comment-from-post" id="comment-editor" name="comment-editor" src="" title="comment iframe (viennalate.blogspot.com)"></iframe>')
  // load script
  $.getScript('https://www.blogger.com/static/v1/jsbin/2567313873-comment_from_post_iframe.js').done(function(){
    BLOG_CMT_createIframe('https://www.blogger.com/rpc_relay.html')
  })
  var l = '',id = '',li = ''
  // Memanggil iframe saat mengklik tombol balas
  $('.comment a.comment-reply').click(function(e) {
    l = $('#comment-editor').attr('src')
    $('.cancel-reply').remove()
    $('.comment-actions').removeAttr('style')
    $('#top-continue.continue').hide()
    var $this = $(this),
    id = $this.attr('data-comment-id')
    l = l + '&parentID=' + id
    li = $this.parent().parent().parent().attr('id')
    $('#comment-editor').attr('src', l)
    $this.parent().hide()
    $('#comment-editor').appendTo($('#' + li + '>.comment-replybox-single'))
    $('#' + li + '>.comment-replybox-single').append('<div class="cancel-reply"><button class="theme-button blue" type="button">Batalkan</button></div>')
    $('.cancel-reply').click(function() {
      $(this).remove()
      $('.comment-actions,#top-continue.continue').removeAttr('style')
      $('#comment-editor').appendTo($('.comment-form'))
    })
  })
  // Memanggil iframe saat mengklik tombol tambahkan komentar bawah
  $('#top-continue.continue>a.comment-reply').click(function(e) {
    e.preventDefault()
    $(this).parent().hide()
    $('.cancel-reply').remove()
    $('.comment-actions').removeAttr('style')
    $('#comment-editor').appendTo($(this).parent().next())
    $('.comment-replybox-thread').append('<div class="cancel-reply"><button class="theme-button blue" type="button">Batalkan</button></div>')
    $('.cancel-reply').click(function() {
      $(this).remove()
      $('.comment-actions,#top-continue.continue').removeAttr('style')
      $('#comment-editor').appendTo($('.comment-form'))
    })
  })
})
